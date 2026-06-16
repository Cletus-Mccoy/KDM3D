# Google Drive Portfolio Integration

## Overview

This portfolio dynamically loads projects from a Google Drive folder structure. The client can update their portfolio by simply adding/removing folders and images in Google Drive—no code changes needed!

## Folder Structure

```
📁 website/
  📁 Modern Villa [Architectuur]/
    📄 description.txt
    🖼️ exterior.jpg
    🖼️ interior.jpg
  📁 Office Building [Commercieel]/
    📄 description.txt
    🖼️ image1.jpg
```

### Naming Conventions

**Project Folders:** `Project Name [Category]` or `Project Name`
**Images:** `.jpg`, `.jpeg`, `.png`, `.gif`, `.webp`
**Description:** Must be named `description.txt`

## Setup Steps

### 1. Create Google Cloud Project & Enable Drive API

1. Go to [Google Cloud Console](https://console.cloud.google.com/)
2. Create a new project
3. Navigate to **APIs & Services** → **Library**
4. Search for "Google Drive API" and **Enable** it

### 2. Create API Key

1. **APIs & Services** → **Credentials**
2. **Create Credentials** → **API Key**
3. **Edit API key** to restrict it:
   - **HTTP referrers**: Add `http://localhost:*`, `https://yourdomain.com/*`, `https://*.pages.dev/*`
   - **API restrictions**: Select only "Google Drive API"

### 3. Organize Google Drive

1. Create a `website` folder
2. Add project subfolders with images and `description.txt`
3. Get folder ID from URL: `drive.google.com/drive/folders/[FOLDER_ID]`

### 4. Make Folder Public

1. Right-click `website` folder → **Share**
2. **Change to anyone with the link** → **Viewer**
3. Click **Done**

### 5. Configure Environment Variables

**Cloudflare Pages:**
- Workers & Pages → Your Project → Settings → Environment variables
- Add `VITE_GOOGLE_DRIVE_API_KEY` and `VITE_GOOGLE_DRIVE_FOLDER_ID`
- Redeploy

**Local Development:**
```bash
VITE_GOOGLE_DRIVE_API_KEY=your_key
VITE_GOOGLE_DRIVE_FOLDER_ID=your_folder_id
```

## Image Loading

Uses high-res thumbnails: `drive.google.com/thumbnail?id={FILE_ID}&sz=w1600`

This solves the common issue where thumbnails load but full images don't.

## Features

- Automatic project discovery from Drive folders
- Image gallery with navigation
- Project descriptions from txt files
- Category badges from folder names
- Fallback to static images if Drive not configured

## How Updates Work

**No workers, cronjobs, or backend needed!**

The portfolio fetches directly from Google Drive API on every page load:

- **When it updates**: Instantly - next visitor sees changes you made in Drive
- **How it works**: Browser calls Google Drive API directly (client-side)
- **Caching**: None - always fresh data from Drive
- **Infrastructure**: Zero - works on static hosting

### Pros
✅ Zero infrastructure cost  
✅ Instant updates (next page load shows changes)  
✅ No backend or worker maintenance  
✅ Simple deployment  
✅ Perfect for Cloudflare Pages static hosting  

### Cons
❌ Google Drive API rate limits (1000 requests per 100 seconds)  
❌ Slight delay on initial page load while fetching  
❌ Every visitor makes API calls (uses your quota)  

### When to Add Caching (Optional)

Consider adding a Cloudflare Worker with caching if you experience:
- Slow portfolio loading times
- High traffic (approaching API rate limits)
- Need for faster performance

A Worker would cache portfolio data for 15-30 minutes, serving all visitors from edge cache instead of calling Drive API every time. This trades instant updates for better performance.

## Troubleshooting

- **No projects showing**: Check folder is public and API key is valid
- **Images not loading**: Verify folder sharing is set to "anyone with link"
- **API quota exceeded**: Google Drive API has daily limits (check Cloud Console)
- **Slow loading**: Consider implementing Cloudflare Worker caching (optional)
