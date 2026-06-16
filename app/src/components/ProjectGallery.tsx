import { useState } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { X, ChevronLeft, ChevronRight } from 'lucide-react';
import type { ProjectData } from '@/lib/googleDrive';

interface ProjectGalleryProps {
  project: ProjectData | null;
  open: boolean;
  onClose: () => void;
}

export default function ProjectGallery({ project, open, onClose }: ProjectGalleryProps) {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  if (!project) return null;

  const currentImage = project.images[currentImageIndex];
  const hasMultipleImages = project.images.length > 1;

  const nextImage = () => {
    setCurrentImageIndex((prev) => (prev + 1) % project.images.length);
  };

  const prevImage = () => {
    setCurrentImageIndex((prev) => (prev - 1 + project.images.length) % project.images.length);
  };

  const handleClose = () => {
    setCurrentImageIndex(0);
    onClose();
  };

  return (
    <Dialog open={open} onOpenChange={handleClose}>
      <DialogContent className="max-w-6xl max-h-[90vh] overflow-hidden p-0">
        <div className="flex flex-col h-full">
          {/* Header */}
          <DialogHeader className="px-6 py-4 border-b">
            <div className="flex items-start justify-between">
              <div>
                <DialogTitle className="text-2xl font-bold" style={{ color: 'var(--color-void)' }}>
                  {project.name}
                </DialogTitle>
                {project.category && (
                  <p className="text-sm mt-1" style={{ color: 'var(--color-orange)' }}>
                    {project.category}
                  </p>
                )}
              </div>
              <button
                onClick={handleClose}
                className="rounded-full p-2 hover:bg-gray-100 transition-colors"
                aria-label="Close"
              >
                <X size={20} />
              </button>
            </div>
          </DialogHeader>

          {/* Content */}
          <div className="flex-1 overflow-y-auto">
            <div className="p-6">
              {/* Image Gallery */}
              <div className="relative mb-6">
                <div className="relative aspect-video bg-gray-100 rounded-lg overflow-hidden">
                  <img
                    src={currentImage.fullResUrl}
                    alt={`${project.name} - ${currentImageIndex + 1}`}
                    className="w-full h-full object-contain"
                    loading="lazy"
                  />

                  {/* Navigation Arrows */}
                  {hasMultipleImages && (
                    <>
                      <button
                        onClick={prevImage}
                        className="absolute left-4 top-1/2 -translate-y-1/2 bg-white/90 hover:bg-white rounded-full p-3 shadow-lg transition-all"
                        aria-label="Previous image"
                      >
                        <ChevronLeft size={24} style={{ color: 'var(--color-void)' }} />
                      </button>
                      <button
                        onClick={nextImage}
                        className="absolute right-4 top-1/2 -translate-y-1/2 bg-white/90 hover:bg-white rounded-full p-3 shadow-lg transition-all"
                        aria-label="Next image"
                      >
                        <ChevronRight size={24} style={{ color: 'var(--color-void)' }} />
                      </button>
                    </>
                  )}

                  {/* Image Counter */}
                  {hasMultipleImages && (
                    <div className="absolute bottom-4 left-1/2 -translate-x-1/2 bg-black/70 text-white px-4 py-2 rounded-full text-sm">
                      {currentImageIndex + 1} / {project.images.length}
                    </div>
                  )}
                </div>

                {/* Thumbnail Strip */}
                {hasMultipleImages && (
                  <div className="flex gap-2 mt-4 overflow-x-auto pb-2">
                    {project.images.map((image, index) => (
                      <button
                        key={image.id}
                        onClick={() => setCurrentImageIndex(index)}
                        className={`flex-shrink-0 w-20 h-20 rounded-lg overflow-hidden border-2 transition-all ${
                          index === currentImageIndex
                            ? 'border-orange-500 scale-105'
                            : 'border-gray-200 hover:border-gray-400'
                        }`}
                      >
                        <img
                          src={image.thumbnailUrl}
                          alt={`Thumbnail ${index + 1}`}
                          className="w-full h-full object-cover"
                          loading="lazy"
                        />
                      </button>
                    ))}
                  </div>
                )}
              </div>

              {/* Description */}
              {project.description && (
                <div className="prose max-w-none">
                  <h3 className="text-lg font-semibold mb-3" style={{ color: 'var(--color-void)' }}>
                    Over dit project
                  </h3>
                  <p className="text-gray-700 whitespace-pre-wrap leading-relaxed">
                    {project.description}
                  </p>
                </div>
              )}

              {!project.description && (
                <p className="text-gray-500 italic text-center py-8">
                  Geen beschrijving beschikbaar voor dit project.
                </p>
              )}
            </div>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
