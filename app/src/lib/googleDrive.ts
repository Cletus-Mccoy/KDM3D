/**
 * Google Drive API integration for dynamic portfolio loading
 * 
 * Folder structure expected:
 * /website/
 *   /project-1/
 *     - description.txt
 *     - image1.jpg
 *     - image2.jpg
 *   /project-2/
 *     - description.txt
 *     - image1.jpg
 */

const GOOGLE_DRIVE_API_KEY = import.meta.env.VITE_GOOGLE_DRIVE_API_KEY || '';
const GOOGLE_DRIVE_FOLDER_ID = import.meta.env.VITE_GOOGLE_DRIVE_FOLDER_ID || '';

export interface DriveFile {
  id: string;
  name: string;
  mimeType: string;
  webViewLink?: string;
  thumbnailLink?: string;
}

export interface ProjectData {
  id: string;
  name: string;
  description: string;
  images: ProjectImage[];
  category?: string;
}

export interface ProjectImage {
  id: string;
  name: string;
  thumbnailUrl: string;
  fullResUrl: string;
}

/**
 * Get high-resolution thumbnail URL by modifying Google's thumbnail link
 * Google Drive thumbnails are served at various sizes: s220, s1600, etc.
 * We force a higher resolution to get better quality
 */
export function getHighResThumbnailUrl(fileId: string, size: number = 1600): string {
  return `https://drive.google.com/thumbnail?id=${fileId}&sz=w${size}`;
}

/**
 * Get direct download/view URL for an image
 */
export function getDirectImageUrl(fileId: string): string {
  return `https://drive.google.com/uc?export=view&id=${fileId}`;
}

/**
 * List files in a specific folder
 */
async function listFilesInFolder(folderId: string): Promise<DriveFile[]> {
  const url = new URL('https://www.googleapis.com/drive/v3/files');
  url.searchParams.append('key', GOOGLE_DRIVE_API_KEY);
  url.searchParams.append('q', `'${folderId}' in parents and trashed=false`);
  url.searchParams.append('fields', 'files(id,name,mimeType,webViewLink,thumbnailLink)');
  url.searchParams.append('orderBy', 'name');

  const response = await fetch(url.toString());
  if (!response.ok) {
    throw new Error(`Failed to fetch files: ${response.statusText}`);
  }

  const data = await response.json();
  return data.files || [];
}

/**
 * Get file content (for description.txt)
 */
async function getFileContent(fileId: string): Promise<string> {
  const url = `https://www.googleapis.com/drive/v3/files/${fileId}?alt=media&key=${GOOGLE_DRIVE_API_KEY}`;
  
  const response = await fetch(url);
  if (!response.ok) {
    throw new Error(`Failed to fetch file content: ${response.statusText}`);
  }

  return response.text();
}

/**
 * Extract category from project name
 * Format: "project-name [Category]" or just "project-name"
 */
function extractCategoryFromName(name: string): { name: string; category: string } {
  const match = name.match(/^(.+?)\s*\[([^\]]+)\]\s*$/);
  if (match) {
    return {
      name: match[1].trim(),
      category: match[2].trim(),
    };
  }
  return {
    name,
    category: 'Project',
  };
}

/**
 * Fetch all projects from the Google Drive folder
 */
export async function fetchProjects(): Promise<ProjectData[]> {
  if (!GOOGLE_DRIVE_API_KEY || !GOOGLE_DRIVE_FOLDER_ID) {
    console.warn('Google Drive API key or folder ID not configured');
    return [];
  }

  try {
    // Get all folders in the 'website' folder
    const files = await listFilesInFolder(GOOGLE_DRIVE_FOLDER_ID);
    const projectFolders = files.filter(f => f.mimeType === 'application/vnd.google-apps.folder');

    // Process each project folder
    const projects = await Promise.all(
      projectFolders.map(async (folder): Promise<ProjectData> => {
        const { name, category } = extractCategoryFromName(folder.name);
        
        // Get files in this project folder
        const projectFiles = await listFilesInFolder(folder.id);

        // Get description
        const descFile = projectFiles.find(f => f.name.toLowerCase() === 'description.txt');
        let description = '';
        if (descFile) {
          try {
            description = await getFileContent(descFile.id);
          } catch (error) {
            console.warn(`Failed to load description for ${folder.name}:`, error);
          }
        }

        // Get images (jpg, jpeg, png)
        const imageFiles = projectFiles.filter(f => {
          const ext = f.name.toLowerCase().split('.').pop();
          return ['jpg', 'jpeg', 'png', 'gif', 'webp'].includes(ext || '');
        });

        const images: ProjectImage[] = imageFiles.map(img => ({
          id: img.id,
          name: img.name,
          thumbnailUrl: getHighResThumbnailUrl(img.id, 800),
          fullResUrl: getHighResThumbnailUrl(img.id, 1600), // Use high-res thumbnail instead of direct download
        }));

        return {
          id: folder.id,
          name,
          description: description.trim(),
          images,
          category,
        };
      })
    );

    // Filter out projects with no images
    return projects.filter(p => p.images.length > 0);
  } catch (error) {
    console.error('Failed to fetch projects from Google Drive:', error);
    return [];
  }
}

/**
 * Get a single project by ID
 */
export async function getProjectById(projectId: string): Promise<ProjectData | null> {
  const projects = await fetchProjects();
  return projects.find(p => p.id === projectId) || null;
}
