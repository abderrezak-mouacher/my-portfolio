import { useEffect, useState } from "react";

export default function VideoPlayer({ localVideos = [], youtubeVideos = [], videoTitle = "Demo Video" }) {
  const [validatedLocalVideos, setValidatedLocalVideos] = useState([]);
  const hasLocalVideo = Array.isArray(validatedLocalVideos) && validatedLocalVideos.length > 0;
  const hasYoutubeVideos = youtubeVideos.length > 0;
  const initialTab = hasLocalVideo ? "local" : "youtube";
  const [activeTab, setActiveTab] = useState(initialTab); // "local" or "youtube"
  const [selectedYoutubeIndex, setSelectedYoutubeIndex] = useState(0);
  const [selectedLocalIndex, setSelectedLocalIndex] = useState(0);

  useEffect(() => {
    let active = true;

    const validateVideo = (videoUrl) => {
      return new Promise((resolve) => {
        const video = document.createElement('video');
        let finished = false;

        const cleanup = () => {
          video.onloadedmetadata = null;
          video.onerror = null;
          video.src = '';
        };

        const markDone = (valid) => {
          if (finished) return;
          finished = true;
          cleanup();
          resolve(valid ? videoUrl : null);
        };

        video.preload = 'metadata';
        video.onloadedmetadata = () => markDone(true);
        video.onerror = () => markDone(false);
        video.src = videoUrl;

        // Fallback in case the browser does not resolve quickly
        setTimeout(() => {
          markDone(false);
        }, 3000);
      });
    };

    const runValidation = async () => {
      const candidates = Array.isArray(localVideos) ? localVideos.filter(Boolean) : [];
      if (candidates.length === 0) {
        setValidatedLocalVideos([]);
        return;
      }

      const results = await Promise.all(candidates.map((video) => validateVideo(video)));
      if (!active) return;
      setValidatedLocalVideos(results.filter((item) => item));
    };

    runValidation();

    return () => {
      active = false;
    };
  }, [localVideos]);

  useEffect(() => {
    if (hasLocalVideo && hasYoutubeVideos) return;
    const nextTab = hasLocalVideo ? "local" : "youtube";
    if (activeTab !== nextTab) setActiveTab(nextTab);
  }, [activeTab, hasLocalVideo, hasYoutubeVideos]);

  useEffect(() => {
    if (!hasYoutubeVideos) return;
    if (selectedYoutubeIndex >= youtubeVideos.length) setSelectedYoutubeIndex(0);
  }, [hasYoutubeVideos, selectedYoutubeIndex, youtubeVideos.length]);

  useEffect(() => {
    if (selectedLocalIndex >= validatedLocalVideos.length) {
      setSelectedLocalIndex(0);
    }
  }, [validatedLocalVideos.length, selectedLocalIndex]);

  if (!hasLocalVideo && !hasYoutubeVideos) {
    return null;
  }

  const getYoutubeEmbedUrl = (videoId) => {
    return `https://www.youtube.com/embed/${videoId}?modestbranding=1&rel=0&controls=1`;
  };

  return (
    <div className="space-y-4">
      {/* Tab Navigation */}
      {hasLocalVideo && hasYoutubeVideos && (
        <div className="flex gap-2 border-b border-slate-700">
          <button
            onClick={() => {
              setActiveTab("local");
            }}
            className={`px-4 py-2 text-sm font-medium transition-all ${
              activeTab === "local"
                ? "text-copper-400 border-b-2 border-copper-400"
                : "text-slate-400 hover:text-slate-300"
            }`}
          >
            Local Demo
          </button>
          <button
            onClick={() => {
              setActiveTab("youtube");
            }}
            className={`px-4 py-2 text-sm font-medium transition-all ${
              activeTab === "youtube"
                ? "text-copper-400 border-b-2 border-copper-400"
                : "text-slate-400 hover:text-slate-300"
            }`}
          >
            YouTube ({youtubeVideos.length})
          </button>
        </div>
      )}

      {/* Local Video */}
      {hasLocalVideo && activeTab === "local" && (
        <div className="space-y-2">
          <video
            src={validatedLocalVideos[selectedLocalIndex]}
            controls
            autoPlay
            loop
            muted
            className="w-full rounded-lg bg-slate-900 shadow-lg"
            poster={validatedLocalVideos[selectedLocalIndex].replace(".mp4", "-poster.jpg")}
          >
            Your browser does not support the video tag.
          </video>
          {validatedLocalVideos.length > 1 && (
            <div className="flex gap-2 overflow-x-auto pb-2">
              {validatedLocalVideos.map((vid, idx) => (
                <button
                  key={vid}
                  onClick={() => setSelectedLocalIndex(idx)}
                  className={`relative flex-shrink-0 rounded-md overflow-hidden transition-all ${
                    idx === selectedLocalIndex ? "ring-2 ring-copper-400 scale-105" : "ring-1 ring-slate-600 opacity-70 hover:opacity-100"
                  }`}
                >
                  <img
                    src={vid.replace(/\.mp4$/, "-thumb.jpg")}
                    alt={`Local video ${idx + 1}`}
                    className="w-28 h-16 object-cover"
                    onError={(e) => {
                      e.target.src =
                        "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 120 90'%3E%3Crect fill='%23404040' width='120' height='90'/%3E%3Cpath fill='%23fff' d='M50 30v30l20-15z'/%3E%3C/svg%3E";
                    }}
                  />
                  <div className="absolute inset-0 flex items-center justify-center bg-black/40 opacity-0 hover:opacity-100 transition-opacity">
                    <span className="text-white text-xs font-medium">{idx + 1}</span>
                  </div>
                </button>
              ))}
            </div>
          )}
          <p className="text-xs text-slate-500">{videoTitle}</p>
        </div>
      )}

      {/* YouTube Videos */}
      {hasYoutubeVideos && activeTab === "youtube" && (
        <div className="space-y-4">
          {/* Main YouTube Player */}
          <div className="relative w-full" style={{ paddingBottom: "56.25%" }}>
            <iframe
              className="absolute inset-0 w-full h-full rounded-lg shadow-lg"
              src={getYoutubeEmbedUrl(youtubeVideos[selectedYoutubeIndex])}
              title={`YouTube Video ${selectedYoutubeIndex + 1}`}
              frameBorder="0"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
            />
          </div>

          {/* YouTube Video Thumbnails */}
          {youtubeVideos.length > 1 && (
            <div className="flex gap-2 overflow-x-auto pb-2">
              {youtubeVideos.map((videoId, idx) => (
                <button
                  key={idx}
                  onClick={() => setSelectedYoutubeIndex(idx)}
                  className={`relative flex-shrink-0 rounded-md overflow-hidden transition-all ${
                    idx === selectedYoutubeIndex
                      ? "ring-2 ring-copper-400 scale-105"
                      : "ring-1 ring-slate-600 opacity-70 hover:opacity-100"
                  }`}
                >
                  <img
                    src={`https://img.youtube.com/vi/${videoId}/default.jpg`}
                    alt={`Video ${idx + 1}`}
                    className="w-20 h-12 object-cover"
                    onError={(e) => {
                      e.target.src =
                        "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 120 90'%3E%3Crect fill='%23404040' width='120' height='90'/%3E%3Cpath fill='%23fff' d='M50 30v30l20-15z'/%3E%3C/svg%3E";
                    }}
                  />
                  <div className="absolute inset-0 flex items-center justify-center bg-black/40 opacity-0 hover:opacity-100 transition-opacity">
                    <span className="text-white text-xs font-medium">{idx + 1}</span>
                  </div>
                </button>
              ))}
            </div>
          )}

          <p className="text-xs text-slate-500">🎬 YouTube Playlist ({youtubeVideos.length} videos)</p>
        </div>
      )}

      {/* Single Video (No Tabs) */}
      {hasLocalVideo && !hasYoutubeVideos && activeTab === "local" && (
        <p className="text-xs text-slate-500">💾 Local Demo Video</p>
      )}

      {hasYoutubeVideos && !hasLocalVideo && activeTab === "youtube" && (
        <p className="text-xs text-slate-500">🎬 YouTube Playlist ({youtubeVideos.length} videos)</p>
      )}
    </div>
  );
}
