"use client";

import { useState, useEffect, useRef, Suspense } from "react";
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

function VideoPlayerContent() {
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
          element.scrollIntoView({ behavior: "smooth", block: "start" });
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
    <div className="h-screen w-full bg-slate-900 overflow-y-scroll snap-y snap-mandatory scroll-smooth relative" style={{ scrollbarWidth: 'none', msOverflowStyle: 'none', WebkitOverflowScrolling: 'touch' }}>

      {playlist.map((video) => (
        <VideoItem key={video.id} video={video} />
      ))}
    </div>
  );
}

export default function VideoPlayerPage() {
  return (
    <Suspense fallback={<div className="min-h-screen flex items-center justify-center bg-slate-50 dark:bg-slate-950"><Loader2 className="w-12 h-12 text-primary animate-spin" /></div>}>
      <VideoPlayerContent />
    </Suspense>
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
  const [progress, setProgress] = useState(0);

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
      alert("Video saved successfully!");
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
      className="h-screen w-full snap-start snap-always shrink-0 flex items-center justify-center pt-0 lg:pt-28 pb-0 lg:pb-8 px-0 lg:px-8 relative"
    >
      <div className="w-full h-full flex flex-col lg:flex-row bg-transparent lg:bg-white lg:dark:bg-slate-900 rounded-none lg:rounded-3xl overflow-hidden lg:shadow-[0_20px_50px_rgba(0,0,0,0.4)] lg:border lg:border-slate-200 lg:dark:border-slate-800 relative">

        {/* Player Container */}
        <div className="absolute inset-0 lg:relative lg:inset-auto flex-shrink lg:flex-1 bg-black flex items-center justify-center overflow-hidden group min-h-[100vh] lg:min-h-full z-0">
          {isBuffering && (
            <div className="absolute inset-0 z-20 flex items-center justify-center bg-black/40 backdrop-blur-sm">
              <Loader2 className="w-12 h-12 text-white animate-spin" />
            </div>
          )}

          {isVideoFile ? (
            <video
              ref={videoRef}
              src={mediaUrl}
              className="w-full h-full object-cover lg:object-contain cursor-pointer"
              playsInline
              loop
              onPlay={() => setIsPlaying(true)}
              onPause={() => setIsPlaying(false)}
              onWaiting={() => setIsBuffering(true)}
              onPlaying={() => setIsBuffering(false)}
              onTimeUpdate={(e) => {
                const videoElement = e.currentTarget;
                if (videoElement.duration) {
                  setProgress((videoElement.currentTime / videoElement.duration) * 100);
                }
              }}
              onClick={handlePlayPause}
              controls={false}
            />
          ) : (
            <img src={mediaUrl} alt="Thumbnail" className="w-full h-full object-cover lg:object-contain" />
          )}

          {/* Central Play Button Overlay (when paused) */}
          {isVideoFile && !isPlaying && !isBuffering && (
            <div className="absolute inset-0 z-10 flex items-center justify-center pointer-events-none">
              <div className="w-10 h-10 bg-white/10 backdrop-blur-lg border border-white/20 rounded-full flex items-center justify-center shadow-[0_0_40px_rgba(255,255,255,0.1)] group-hover:scale-110 transition-transform duration-500">
                <Play className="w-5 h-5 text-white" fill="white" />
              </div>
            </div>
          )}

          {/* Custom Controls Overlay */}
          {isVideoFile && (
            <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/90 via-black/40 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 z-30 flex flex-col">
              {/* Progress Bar */}
              <div className="w-full h-1.5 bg-white/20 cursor-pointer relative group/progress" onClick={(e) => {
                e.stopPropagation();
                if (videoRef.current) {
                  const rect = e.currentTarget.getBoundingClientRect();
                  const x = e.clientX - rect.left;
                  const newProgress = (x / rect.width) * 100;
                  videoRef.current.currentTime = (newProgress / 100) * videoRef.current.duration;
                  setProgress(newProgress);
                }
              }}>
                <div
                  className="h-full bg-primary transition-all duration-75 ease-linear relative"
                  style={{ width: `${progress}%` }}
                >
                  <div className="absolute right-0 top-1/2 -translate-y-1/2 w-3.5 h-3.5 bg-white rounded-full shadow-lg scale-0 group-hover/progress:scale-100 transition-transform duration-200" />
                </div>
              </div>

              <div className="p-4 md:p-6 flex items-center gap-4 text-white">
                <button onClick={(e) => { e.stopPropagation(); handlePlayPause(); }} className="w-10 h-10 flex items-center justify-center rounded-full bg-white/10 hover:bg-primary/90 hover:scale-110 transition-all backdrop-blur-md shadow-lg border border-white/10">
                  {isPlaying ? <Pause className="w-5 h-5 fill-white" /> : <Play className="w-5 h-5 ml-1 fill-white" />}
                </button>
                <button onClick={handleMuteToggle} className="w-10 h-10 flex items-center justify-center rounded-full bg-white/10 hover:bg-white/20 hover:scale-110 transition-all backdrop-blur-md shadow-lg border border-white/10">
                  {isMuted ? <VolumeX className="w-5 h-5" /> : <Volume2 className="w-5 h-5" />}
                </button>
                <div className="flex-1"></div>
                <button onClick={handleFullscreen} className="w-10 h-10 flex items-center justify-center rounded-full bg-white/10 hover:bg-white/20 hover:scale-110 transition-all backdrop-blur-md shadow-lg border border-white/10">
                  <Maximize className="w-5 h-5" />
                </button>
              </div>
            </div>
          )}
        </div>

        {/* Details Section (Scrollable if needed) */}
        <div className="absolute bottom-16 lg:bottom-auto left-0 right-0 lg:relative lg:left-auto lg:right-auto flex-1 p-5 md:p-8 overflow-y-auto bg-gradient-to-t from-black via-black/60 to-transparent lg:bg-white lg:dark:bg-slate-900/95 lg:backdrop-blur-xl border-t lg:border-t-0 lg:border-l border-transparent lg:border-slate-100 lg:dark:border-slate-800 shadow-none lg:shadow-[0_-10px_30px_-15px_rgba(0,0,0,0.1)] lg:dark:shadow-[0_-10px_30px_-15px_rgba(0,0,0,0.3)] z-40 lg:w-[450px] lg:shrink-0 lg:h-full flex flex-col max-h-[40vh] lg:max-h-full pointer-events-none lg:pointer-events-auto">

          <div className="flex-1 flex flex-col pointer-events-auto">
            <div className="flex justify-between items-start gap-4 mb-4">
              <h1 className="text-xl md:text-2xl font-extrabold text-white lg:text-transparent lg:bg-clip-text lg:bg-gradient-to-r lg:from-slate-900 lg:to-slate-600 lg:dark:from-white lg:dark:to-slate-400 font-heading tracking-tight leading-tight drop-shadow-md lg:drop-shadow-none">
                {video.videoTitle || video.categoryName || "Untitled Video"}
              </h1>

              {/* Action Buttons (Top Right) */}
              <div className="flex items-center gap-2 shrink-0">
                <button
                  onClick={handleShareWhatsApp}
                  className="flex items-center justify-center p-2.5 bg-[#25D366]/10 text-[#25D366] border border-[#25D366]/30 hover:bg-[#25D366] hover:text-white rounded-xl transition-all duration-300 hover:shadow-lg hover:shadow-[#25D366]/30 group"
                  title="Share"
                >
                  <Share2 className="w-5 h-5 group-hover:scale-110 transition-transform" />
                </button>
                <button
                  onClick={handleSaveVideo}
                  disabled={isSaving || isSaved}
                  className={`flex items-center justify-center p-2.5 rounded-xl transition-all duration-300 hover:shadow-lg group ${isSaved
                    ? "bg-emerald-500 text-white shadow-emerald-500/30"
                    : "bg-gradient-to-r from-primary to-accent text-white hover:shadow-primary/30"
                    }`}
                  title="Save"
                >
                  {isSaving ? (
                    <Loader2 className="w-5 h-5 animate-spin" />
                  ) : isSaved ? (
                    <Check className="w-5 h-5" />
                  ) : (
                    <BookmarkPlus className="w-5 h-5 group-hover:scale-110 transition-transform" />
                  )}
                </button>
              </div>
            </div>

            <div className="flex flex-wrap items-center gap-2 mb-6">
              {video.shopName && (
                <div className="flex items-center gap-1.5 text-white lg:text-primary bg-white/20 lg:bg-primary/10 border border-white/20 lg:border-primary/20 px-3 py-1 rounded-full shadow-sm text-sm font-semibold backdrop-blur-sm lg:backdrop-blur-none">
                  <MapPin className="w-4 h-4" />
                  {video.shopName}
                </div>
              )}
              {video.views !== undefined && (
                <div className="flex items-center gap-1.5 bg-white/20 lg:bg-slate-100 lg:dark:bg-slate-800/80 border border-white/20 lg:border-slate-200 lg:dark:border-slate-700 px-3 py-1 rounded-full shadow-sm text-sm font-semibold text-white lg:text-slate-700 lg:dark:text-slate-300 backdrop-blur-sm lg:backdrop-blur-none">
                  <Eye className="w-4 h-4 text-white lg:text-slate-500 lg:dark:text-slate-400" />
                  {video.views} Views
                </div>
              )}
              {video.createdAt && (
                <div className="flex items-center gap-1.5 bg-white/20 lg:bg-slate-100 lg:dark:bg-slate-800/80 border border-white/20 lg:border-slate-200 lg:dark:border-slate-700 px-3 py-1 rounded-full shadow-sm text-sm font-semibold text-white lg:text-slate-700 lg:dark:text-slate-300 backdrop-blur-sm lg:backdrop-blur-none">
                  <Calendar className="w-4 h-4 text-white lg:text-slate-500 lg:dark:text-slate-400" />
                  {new Date(video.createdAt).toLocaleDateString()}
                </div>
              )}
            </div>

            <div className="bg-transparent lg:bg-slate-50 lg:dark:bg-slate-800/40 rounded-2xl p-0 lg:p-5 mb-6 border-0 lg:border lg:border-slate-100 lg:dark:border-slate-700/50 text-white lg:text-inherit">
              <h3 className="hidden lg:block text-xs font-bold text-slate-400 uppercase tracking-wider mb-3">Description</h3>
              <p className="text-white/90 lg:text-slate-700 lg:dark:text-slate-300 leading-relaxed whitespace-pre-wrap text-sm md:text-base font-medium line-clamp-2 lg:line-clamp-none drop-shadow-md lg:drop-shadow-none">
                {video.description || "No description provided."}
              </p>
            </div>
          </div>


        </div>

      </div>
    </div>
  );
}
