"use client";

import { useState, useEffect, useRef } from "react";
import { useSearchParams, useRouter } from "next/navigation";
import {
  ArrowLeft,
  Share2,
  BookmarkPlus,
  Play,
  Pause,
  Volume2,
  VolumeX,
  Maximize,
  MapPin,
  Eye,
  Calendar,
  Loader2,
  Check,
} from "lucide-react";
import { saveOthersVideosApi } from "@/services/apiService";

export default function VideoPlayerPage() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const videoIdParam = searchParams.get("videoId");

  const [playlist, setPlaylist] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    try {
      const storedPlaylist = sessionStorage.getItem("videoPlaylist");
      if (storedPlaylist) {
        const parsed = JSON.parse(storedPlaylist);
        setPlaylist(parsed);
      } else {
        setError("No video data found. Please go back and try again.");
      }
    } catch (err) {
      console.error("Failed to parse playlist", err);
      setError("Failed to load video.");
    } finally {
      setLoading(false);
    }
  }, []);

  // Scroll to the targeted video once rendered
  useEffect(() => {
    if (playlist.length > 0 && videoIdParam) {
      // Small timeout to ensure DOM is fully rendered before scrolling
      const timer = setTimeout(() => {
        const element = document.getElementById(`video-${videoIdParam}`);
        if (element) {
          element.scrollIntoView({ behavior: "auto" });
        }
      }, 100);
      return () => clearTimeout(timer);
    }
  }, [playlist, videoIdParam]);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-slate-50 dark:bg-slate-950">
        <Loader2 className="w-12 h-12 text-primary animate-spin" />
      </div>
    );
  }

  if (error || playlist.length === 0) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center bg-slate-50 dark:bg-slate-950 text-slate-700 dark:text-slate-300">
        <p className="text-xl font-bold mb-4">{error || "Video not found."}</p>
        <button
          onClick={() => router.back()}
          className="px-6 py-2 bg-primary text-white rounded-xl shadow-lg font-semibold"
        >
          Go Back
        </button>
      </div>
    );
  }

  return (
    <div className="h-screen w-full bg-slate-900 overflow-y-scroll snap-y snap-mandatory relative" style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}>

      {playlist.map((video) => (
        <VideoItem key={video.id} video={video} />
      ))}
    </div>
  );
}

function VideoItem({ video }: { video: any }) {
  const containerRef = useRef<HTMLDivElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);

  const [isPlaying, setIsPlaying] = useState(false);
  const [isMuted, setIsMuted] = useState(false);
  const [isBuffering, setIsBuffering] = useState(false);
  const [isSaved, setIsSaved] = useState(false);
  const [isSaving, setIsSaving] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            // Play video when in view
            if (videoRef.current) {
              videoRef.current.play().catch((e) => console.log("Autoplay prevented", e));
              setIsPlaying(true);
            }
          } else {
            // Pause video when out of view
            if (videoRef.current) {
              videoRef.current.pause();
              setIsPlaying(false);
            }
          }
        });
      },
      { threshold: 0.6 } // trigger when 60% of the item is visible
    );

    if (containerRef.current) {
      observer.observe(containerRef.current);
    }

    return () => {
      observer.disconnect();
    };
  }, []);

  const getMediaUrl = (url?: string) => {
    if (!url) return "";
    return url.startsWith("http") ? url : `https://api.mapman.in${url}`;
  };

  const mediaUrl = getMediaUrl(video.video || video.categoryVideo);
  const isVideoFile = mediaUrl.endsWith(".mp4") || mediaUrl.endsWith(".webm") || mediaUrl.endsWith(".m3u8");

  const handlePlayPause = () => {
    if (videoRef.current) {
      if (isPlaying) {
        videoRef.current.pause();
      } else {
        videoRef.current.play();
      }
      setIsPlaying(!isPlaying);
    }
  };

  const handleMuteToggle = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (videoRef.current) {
      videoRef.current.muted = !isMuted;
      setIsMuted(!isMuted);
    }
  };

  const handleFullscreen = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (videoRef.current) {
      if (videoRef.current.requestFullscreen) {
        videoRef.current.requestFullscreen();
      }
    }
  };

  const handleShareWhatsApp = () => {
    const url = window.location.href;
    const text = `Check out this video: ${video.videoTitle || video.categoryName || "Mapman Video"}\n${url}`;
    window.open(`https://api.whatsapp.com/send?text=${encodeURIComponent(text)}`, "_blank");
  };

  const handleSaveVideo = async () => {
    if (!video?.id) return;
    setIsSaving(true);
    try {
      await saveOthersVideosApi(video.id, "active");
      setIsSaved(true);
      setTimeout(() => setIsSaved(false), 3000);
    } catch (err) {
      console.error(err);
      alert("Failed to save video. Please try again.");
    } finally {
      setIsSaving(false);
    }
  };

  return (
    <div
      id={`video-${video.id}`}
      ref={containerRef}
      className="h-screen w-full snap-start snap-always shrink-0 flex items-center justify-center"
    >
      <div className="w-full h-full flex flex-col bg-white dark:bg-slate-900 rounded-none overflow-hidden">

        {/* Player Container */}
        <div className="relative flex-shrink bg-black flex items-center justify-center overflow-hidden group min-h-[40vh] md:min-h-[50vh]">
          {isBuffering && (
            <div className="absolute inset-0 z-20 flex items-center justify-center bg-black/40 backdrop-blur-sm">
              <Loader2 className="w-12 h-12 text-white animate-spin" />
            </div>
          )}

          {isVideoFile ? (
            <video
              ref={videoRef}
              src={mediaUrl}
              className="w-full h-full object-contain max-h-[60vh]"
              playsInline
              loop
              onPlay={() => setIsPlaying(true)}
              onPause={() => setIsPlaying(false)}
              onWaiting={() => setIsBuffering(true)}
              onPlaying={() => setIsBuffering(false)}
              onClick={handlePlayPause}
              controls={false}
            />
          ) : (
            <img src={mediaUrl} alt="Thumbnail" className="w-full h-full object-contain max-h-[60vh]" />
          )}

          {/* Custom Controls Overlay */}
          {isVideoFile && (
            <div className="absolute bottom-0 left-0 right-0 p-4 bg-gradient-to-t from-black/80 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center gap-4 text-white z-30">
              <button onClick={(e) => { e.stopPropagation(); handlePlayPause(); }} className="hover:text-primary transition-colors">
                {isPlaying ? <Pause className="w-6 h-6" /> : <Play className="w-6 h-6" />}
              </button>
              <button onClick={handleMuteToggle} className="hover:text-primary transition-colors">
                {isMuted ? <VolumeX className="w-6 h-6" /> : <Volume2 className="w-6 h-6" />}
              </button>
              <div className="flex-1"></div>
              <button onClick={handleFullscreen} className="hover:text-primary transition-colors">
                <Maximize className="w-6 h-6" />
              </button>
            </div>
          )}
        </div>

        {/* Details Section (Scrollable if needed) */}
        <div className="p-6 md:p-8 overflow-y-auto">
          <div className="flex flex-col md:flex-row md:items-start justify-between gap-6">
            <div className="flex-1">
              <h1 className="text-2xl md:text-3xl font-extrabold text-slate-900 dark:text-white mb-2">
                {video.videoTitle || video.categoryName || "Untitled Video"}
              </h1>

              <div className="flex flex-wrap items-center gap-4 text-sm font-medium text-slate-500 dark:text-slate-400 mb-6">
                {video.shopName && (
                  <div className="flex items-center gap-1.5 text-primary bg-primary/10 px-3 py-1.5 rounded-lg">
                    <MapPin className="w-4 h-4" />
                    {video.shopName}
                  </div>
                )}
                {video.views !== undefined && (
                  <div className="flex items-center gap-1.5">
                    <Eye className="w-4 h-4" />
                    {video.views} Views
                  </div>
                )}
                {video.createdAt && (
                  <div className="flex items-center gap-1.5">
                    <Calendar className="w-4 h-4" />
                    {new Date(video.createdAt).toLocaleDateString()}
                  </div>
                )}
              </div>

              <p className="text-slate-600 dark:text-slate-300 leading-relaxed max-w-3xl whitespace-pre-wrap line-clamp-2">
                {video.description || "No description provided."}
              </p>
            </div>

            {/* Action Buttons */}
            <div className="flex gap-3 shrink-0">
              <button
                onClick={handleShareWhatsApp}
                className="flex items-center gap-2 px-5 py-2.5 bg-[#25D366]/10 text-[#25D366] hover:bg-[#25D366] hover:text-white rounded-xl font-bold transition-all duration-300 shadow-sm"
              >
                <Share2 className="w-5 h-5" /> Share
              </button>
              <button
                onClick={handleSaveVideo}
                disabled={isSaving || isSaved}
                className={`flex items-center gap-2 px-5 py-2.5 rounded-xl font-bold transition-all duration-300 shadow-sm ${isSaved
                  ? "bg-emerald-500 text-white"
                  : "bg-primary text-white hover:bg-primary/90 hover:shadow-lg hover:shadow-primary/30"
                  }`}
              >
                {isSaving ? (
                  <Loader2 className="w-5 h-5 animate-spin" />
                ) : isSaved ? (
                  <><Check className="w-5 h-5" /> Saved</>
                ) : (
                  <><BookmarkPlus className="w-5 h-5" /> Save</>
                )}
              </button>
            </div>
          </div>
        </div>

      </div>
    </div>
  );
}
