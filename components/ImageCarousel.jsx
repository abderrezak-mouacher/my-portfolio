import { useState, useEffect } from "react";

export default function ImageCarousel({ images, className = "relative w-full h-56 overflow-hidden rounded-xl" }) {
  const [index, setIndex] = useState(0);
  const [isOpen, setIsOpen] = useState(false);
  const [validImages, setValidImages] = useState(images);
  const [isHovered, setIsHovered] = useState(false);

  // Check which images actually exist
  useEffect(() => {
    let mounted = true;
    const validated = [];
    let completed = 0;
    let successful = 0;

    if (images.length === 0) {
      setValidImages([]);
      return;
    }

    images.forEach((src) => {
      const img = new Image();
      img.onload = () => {
        validated.push(src);
        successful++;
        completed++;
        if (completed === images.length && mounted) {
          setValidImages(successful > 0 ? validated : []);
        }
      };
      img.onerror = () => {
        completed++;
        if (completed === images.length && mounted) {
          setValidImages(successful > 0 ? validated : []);
        }
      };
      img.src = src;
    });

    // Fallback timeout - set validated images if validation takes too long
    const timeout = setTimeout(() => {
      if (mounted) {
        setValidImages(successful > 0 ? validated : []);
      }
    }, 1500);

    return () => {
      mounted = false;
      clearTimeout(timeout);
    };
  }, [images]);

  const prev = () => {
    setIndex((index - 1 + validImages.length) % validImages.length);
  };

  const next = () => {
    setIndex((index + 1) % validImages.length);
  };

  // Auto-rotate images every 2 seconds (pauses on hover)
  useEffect(() => {
    if (validImages.length <= 1 || isHovered) return;
    
    const interval = setInterval(() => {
      setIndex((prev) => (prev + 1) % validImages.length);
    }, 2000);

    return () => clearInterval(interval);
  }, [validImages.length, isHovered]);

  useEffect(() => {
    const onKey = (e) => {
      if (e.key === 'Escape' && isOpen) setIsOpen(false);
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [isOpen]);

  // scroll thumbnail into view when open
  useEffect(() => {
    if (!isOpen) return;
    try {
      const el = document.querySelector(`[data-thumb-index="${index}"]`);
      if (el && el.scrollIntoView) el.scrollIntoView({ behavior: 'smooth', inline: 'center', block: 'nearest' });
    } catch (e) {
      // ignore
    }
  }, [index, isOpen]);

  const open = (i) => {
    setIndex(i);
    setIsOpen(true);
  };

  if (!validImages || validImages.length === 0) {
    return (
      <div className={`${className} bg-slate-800 flex items-center justify-center`}>
        <p className="text-slate-500 text-sm">Loading images...</p>
      </div>
    );
  }

  return (
    <>
      <div 
        className={className}
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
      >
        <img
          key={validImages[index]}
          src={validImages[index]}
          alt={`project-${index + 1}`}
          className="w-full h-full object-cover bg-slate-900 animate-in fade-in zoom-in duration-700"
          loading="lazy"
          onClick={() => open(index)}
          decoding="async"
        />

        {/* Image counter */}
        {validImages.length > 1 && (
          <div className="absolute top-3 right-3 px-3 py-1 text-xs bg-black/50 text-white rounded-full z-20 font-semibold">
            {index + 1}/{validImages.length}
          </div>
        )}
      </div>

      {/* Thumbnail Strip */}
      {validImages.length > 1 && (
        <div 
          className="w-full overflow-x-auto py-3 px-2 bg-slate-900/50 rounded-b-xl"
          onMouseEnter={() => setIsHovered(true)}
          onMouseLeave={() => setIsHovered(false)}
        >
          <div className="flex gap-2">
            {validImages.map((src, i) => (
              <button
                key={i}
                onClick={() => setIndex(i)}
                className={`flex-shrink-0 rounded-lg overflow-hidden transition-all ${
                  i === index
                    ? 'ring-2 ring-copper-400 scale-105'
                    : 'ring-1 ring-slate-600 opacity-60 hover:opacity-100'
                }`}
              >
                <img src={src} alt={`thumb-${i + 1}`} loading="lazy" className="w-16 h-12 object-cover" />
              </button>
            ))}
          </div>
        </div>
      )}

      {/* Lightbox modal */}
      {isOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/90 backdrop-blur-sm" onClick={() => setIsOpen(false)} role="dialog" aria-modal="true">
          <div className="relative max-w-[95vw] max-h-[90vh]" onClick={(e) => e.stopPropagation()}>
            <div className="flex flex-col items-center gap-4">
              <img 
                key={validImages[index]}
                src={validImages[index]} 
                alt={`project-full-${index + 1}`} 
                className="max-h-[70vh] max-w-[90vw] object-contain rounded-lg shadow-2xl shadow-black/50 bg-slate-900 animate-in fade-in zoom-in-50 duration-500"
                onMouseEnter={() => setIsHovered(true)}
                onMouseLeave={() => setIsHovered(false)}
                decoding="async"
              />

              {/* Thumbnails */}
              {validImages.length > 1 && (
                <div 
                  className="w-full max-w-[90vw] overflow-x-auto py-2 px-4"
                  onMouseEnter={() => setIsHovered(true)}
                  onMouseLeave={() => setIsHovered(false)}
                >
                  <div className="flex gap-3">
                    {validImages.map((src, i) => (
                      <button
                        key={i}
                        onClick={() => setIndex(i)}
                        data-thumb-index={i}
                        aria-label={`Thumbnail ${i + 1}`}
                        className={`flex-shrink-0 rounded-md overflow-hidden transition-all duration-300 ${i === index ? 'ring-2 ring-copper-400 scale-110' : 'ring-1 ring-slate-600 opacity-70 hover:opacity-100'}`}
                      >
                        <img src={src} alt={`thumb-${i + 1}`} loading="lazy" className="w-20 h-12 sm:w-28 sm:h-16 object-cover" />
                      </button>
                    ))}
                  </div>
                </div>
              )}
            </div>

            {/* Close */}
            <button onClick={() => setIsOpen(false)} className="absolute -top-8 right-0 text-white bg-black/40 hover:bg-black/60 px-3 py-1 rounded-md transition-all">✕</button>

            {/* Prev/Next */}
            {validImages.length > 1 && (
              <>
                <button onClick={prev} className="absolute left-[-48px] top-1/2 -translate-y-1/2 text-white bg-black/40 hover:bg-black/60 px-3 py-1 rounded-md transition-all">◀</button>
                <button onClick={next} className="absolute right-[-48px] top-1/2 -translate-y-1/2 text-white bg-black/40 hover:bg-black/60 px-3 py-1 rounded-md transition-all">▶</button>
              </>
            )}

            {/* Actions */}
            <div className="absolute bottom-3 left-1/2 -translate-x-1/2 flex items-center gap-3">
              <a href={validImages[index]} target="_blank" rel="noreferrer" className="text-xs text-white bg-black/40 hover:bg-black/60 px-3 py-1 rounded-md transition-all">Open image</a>
              <a href={validImages[index]} download className="text-xs text-white bg-black/40 hover:bg-black/60 px-3 py-1 rounded-md transition-all">Download</a>
            </div>

            {/* Counter */}
            {validImages.length > 1 && (
              <div className="absolute top-3 left-3 px-3 py-1 text-xs bg-black/40 text-white rounded-full">
                {index + 1}/{validImages.length}
              </div>
            )}
          </div>
        </div>
      )}
    </>
  );
}
