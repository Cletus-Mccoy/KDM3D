import { useState, useEffect } from 'react';
import { useScrollReveal } from '../hooks/useScrollReveal';
import { fetchProjects, type ProjectData } from '@/lib/googleDrive';
import ProjectGallery from '@/components/ProjectGallery';
import { Loader2 } from 'lucide-react';

// Fallback projects if Google Drive is not configured
const fallbackProjects = [
  {
    id: 'fallback-1',
    name: 'Architecturale maquettes',
    category: 'Maatwerk',
    description: '',
    images: [{
      id: '1',
      name: 'portfolio-1.jpg',
      thumbnailUrl: '/images/portfolio-1.jpg',
      fullResUrl: '/images/portfolio-1.jpg',
    }],
  },
  {
    id: 'fallback-2',
    name: 'Organische lattice structuur',
    category: 'Prototyping',
    description: '',
    images: [{
      id: '2',
      name: 'portfolio-2.jpg',
      thumbnailUrl: '/images/portfolio-2.jpg',
      fullResUrl: '/images/portfolio-2.jpg',
    }],
  },
  {
    id: 'fallback-3',
    name: 'Desk organizer',
    category: 'Functioneel design',
    description: '',
    images: [{
      id: '3',
      name: 'portfolio-3.jpg',
      thumbnailUrl: '/images/portfolio-3.jpg',
      fullResUrl: '/images/portfolio-3.jpg',
    }],
  },
  {
    id: 'fallback-4',
    name: 'Mechanische onderdelen',
    category: 'Technisch',
    description: '',
    images: [{
      id: '4',
      name: 'portfolio-4.jpg',
      thumbnailUrl: '/images/portfolio-4.jpg',
      fullResUrl: '/images/portfolio-4.jpg',
    }],
  },
  {
    id: 'fallback-5',
    name: 'Artistieke sculptuur',
    category: 'Kunst',
    description: '',
    images: [{
      id: '5',
      name: 'portfolio-5.jpg',
      thumbnailUrl: '/images/portfolio-5.jpg',
      fullResUrl: '/images/portfolio-5.jpg',
    }],
  },
  {
    id: 'fallback-6',
    name: 'Industriele brackets',
    category: 'Productie',
    description: '',
    images: [{
      id: '6',
      name: 'portfolio-6.jpg',
      thumbnailUrl: '/images/portfolio-6.jpg',
      fullResUrl: '/images/portfolio-6.jpg',
    }],
  },
];

export default function Portfolio() {
  const headingRef = useScrollReveal<HTMLDivElement>({ y: 40 });
  const gridRef = useScrollReveal<HTMLDivElement>({ y: 40, stagger: 0.1 });
  
  const [projects, setProjects] = useState<ProjectData[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedProject, setSelectedProject] = useState<ProjectData | null>(null);
  const [galleryOpen, setGalleryOpen] = useState(false);

  useEffect(() => {
    async function loadProjects() {
      setLoading(true);
      try {
        const driveProjects = await fetchProjects();
        if (driveProjects.length > 0) {
          setProjects(driveProjects);
        } else {
          // Use fallback if no projects from Drive
          setProjects(fallbackProjects);
        }
      } catch (error) {
        console.error('Failed to load projects:', error);
        setProjects(fallbackProjects);
      } finally {
        setLoading(false);
      }
    }

    loadProjects();
  }, []);

  const openProject = (project: ProjectData) => {
    setSelectedProject(project);
    setGalleryOpen(true);
  };

  const closeGallery = () => {
    setGalleryOpen(false);
    // Delay clearing selected project to allow dialog close animation
    setTimeout(() => setSelectedProject(null), 300);
  };

  return (
    <section
      id="portfolio"
      className="section-light"
      style={{ padding: 'var(--section-py) var(--container-px)' }}
    >
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div ref={headingRef} className="text-center mb-16">
          <p className="section-label">Portfolio</p>
          <h2 className="section-title">Eerdere projecten</h2>
          <p
            className="section-body mx-auto"
            style={{ maxWidth: 550 }}
          >
            Een selectie van 3D-geprinte projecten die ik heb mogen realiseren.
            Van functionele prototypes tot artistieke objecten.
          </p>
        </div>

        {/* Loading State */}
        {loading && (
          <div className="flex justify-center items-center py-20">
            <Loader2 className="animate-spin" size={40} style={{ color: 'var(--color-orange)' }} />
          </div>
        )}

        {/* Portfolio Grid */}
        {!loading && (
          <div
            ref={gridRef}
            data-stagger
            className="grid grid-cols-2 lg:grid-cols-3 gap-4 lg:gap-6"
          >
            {projects.map((project) => (
              <button
                key={project.id}
                data-reveal-child
                className="portfolio-item group cursor-pointer"
                onClick={() => openProject(project)}
                style={{ '--ratio': '4/3' } as React.CSSProperties}
              >
                <img
                  src={project.images[0].thumbnailUrl}
                  alt={project.name}
                  loading="lazy"
                  className="transition-transform group-hover:scale-105"
                />
                <div className="portfolio-item-overlay">
                  <p className="portfolio-item-title">{project.name}</p>
                  <p className="portfolio-item-category">{project.category}</p>
                  {project.images.length > 1 && (
                    <p className="text-xs mt-1 opacity-75">
                      +{project.images.length - 1} meer foto's
                    </p>
                  )}
                </div>
              </button>
            ))}
          </div>
        )}

        {/* Empty State */}
        {!loading && projects.length === 0 && (
          <div className="text-center py-20">
            <p className="text-gray-500">Geen projecten gevonden.</p>
          </div>
        )}
      </div>

      {/* Project Gallery Modal */}
      <ProjectGallery
        project={selectedProject}
        open={galleryOpen}
        onClose={closeGallery}
      />
    </section>
  );
}
