"use client";

import { useState, useEffect } from "react";
import { fetchMyViewedVideos } from "@/services/apiService";
import {
  Loader2,
  Play,
  Eye,
  Clock,
  MapPin,
  Search,
  ArrowLeft,
} from "lucide-react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { motion } from "framer-motion";

export default function ViewedVideosPage() {
  const router = useRouter();
  const [videos, setVideos] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [loadingMore, setLoadingMore] = useState(false);
  const [page, setPage] = useState(1);
  const [hasMore, setHasMore] = useState(true);

  const fetchVideos = async (
    pageNumber: number,
    isInitial: boolean = false,
  ) => {
    try {
      if (isInitial) setLoading(true);
      else setLoadingMore(true);

      const res = await fetchMyViewedVideos(pageNumber);
      if (res?.data && Array.isArray(res.data)) {
        if (res.data.length < 30) {
          setHasMore(false);
        }

        if (isInitial) {
          setVideos(res.data);
        } else {
          setVideos((prev) => [...prev, ...res.data]);
        }
      } else {
        setHasMore(false);
      }
    } catch (error) {
      console.error("Error fetching viewed videos", error);
    } finally {
      setLoading(false);
      setLoadingMore(false);
    }
  };

  useEffect(() => {
    fetchVideos(1, true);
  }, []);

  const handleVideoClick = (videoId: number | undefined) => {
    if (!videoId) return;
    sessionStorage.setItem("videoPlaylist", JSON.stringify(videos));
    router.push(`/video-player?videoId=${videoId}`);
  };

  const handleLoadMore = () => {
    if (!loadingMore && hasMore) {
      const nextPage = page + 1;
      setPage(nextPage);
      fetchVideos(nextPage, false);
    }
  };

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-950 py-12 px-4 md:px-8 relative overflow-hidden">
      {/* Background Decorative Elements */}
      <div className="absolute top-0 right-0 w-[40%] h-[40%] rounded-full bg-primary/10 blur-[120px] pointer-events-none" />
      <div className="absolute bottom-0 left-0 w-[40%] h-[40%] rounded-full bg-accent/10 blur-[120px] pointer-events-none" />

      <div className="max-w-[1920px] mx-auto relative z-10">
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 mb-12">
          <div>
            <Link
              href="/profile"
              className="inline-flex items-center gap-2 text-primary hover:text-accent font-semibold mb-4 transition-colors"
            >
              <ArrowLeft className="w-4 h-4" /> Back to Profile
            </Link>
            <h1 className="text-3xl md:text-4xl font-extrabold font-heading text-slate-900 dark:text-white mb-4">
              Viewed Videos
            </h1>
            <p className="text-slate-500 dark:text-slate-400 text-lg font-medium max-w-2xl">
              Keep track of all the shop videos you've watched. Discover them
              again easily.
            </p>
          </div>
        </div>

        {/* Loading State */}
        {loading ? (
          <div className="flex flex-col items-center justify-center min-h-[400px]">
            <Loader2 className="w-12 h-12 text-primary animate-spin mb-4" />
            <p className="text-slate-500 font-medium">
              Loading your viewed videos...
            </p>
          </div>
        ) : videos.length === 0 ? (
          <div className="bg-white dark:bg-slate-900 rounded-[2.5rem] p-12 border border-slate-200 dark:border-slate-800 text-center shadow-sm">
            <div className="w-20 h-20 bg-slate-100 dark:bg-slate-800 rounded-full flex items-center justify-center mx-auto mb-6">
              <Eye className="w-10 h-10 text-slate-400" />
            </div>
            <h3 className="text-2xl font-bold mb-2">No videos viewed yet</h3>
            <p className="text-slate-500 max-w-md mx-auto mb-8">
              Looks like you haven't watched any videos. Start exploring to see
              them appear here!
            </p>
            <Link
              href="/videos"
              className="inline-flex items-center gap-2 bg-gradient-to-r from-primary to-accent text-white px-8 py-4 rounded-xl font-bold shadow-lg hover:shadow-primary/30 transition-all hover:-translate-y-1"
            >
              <Play className="w-5 h-5" /> Explore Videos
            </Link>
          </div>
        ) : (
          <>
            {/* Grid */}
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 2xl:grid-cols-8 gap-4 md:gap-6">
              {videos.map((video, index) => (
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.05 }}
                  
                  key={`${video.id}-${index}`}
                  onClick={() => handleVideoClick(video.id)}
                  className="group relative rounded-[1.5rem] overflow-hidden border border-slate-200/50 dark:border-slate-700/50 shadow-sm hover:shadow-2xl hover:shadow-primary/20 hover:-translate-y-1 transition-all duration-300 cursor-pointer"
                >
                  <div className="relative aspect-[10/16] bg-slate-900 overflow-hidden rounded-[1.5rem]">
                    <img
                      src={
                        video.thumbnail?.startsWith("http")
                          ? video.thumbnail
                          : `https://api.mapman.in${video.thumbnail}`
                      }
                      alt={video.videoTitle}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700 opacity-90 group-hover:opacity-100"
                      onError={(e) => {
                        (e.target as HTMLImageElement).src =
                          "https://images.unsplash.com/photo-1516245834210-c4c142787335?auto=format&fit=crop&q=80&w=400";
                      }}
                    />

                    <div className="absolute inset-0 bg-gradient-to-b from-black/40 via-transparent to-black/80" />

                    {/* Top Badges */}
                    <div className="absolute top-2 left-2 flex flex-col gap-1.5 items-start">
                      <span className="bg-primary/90 backdrop-blur-sm text-white text-[10px] font-bold px-2 py-1 rounded-md shadow-sm uppercase tracking-wider">
                        {video.category || "General"}
                      </span>
                    </div>

                    <div className="absolute top-2 right-2 flex gap-2">
                      <span className="bg-white/20 backdrop-blur-md text-white text-[10px] font-bold px-2 py-1 rounded-md flex items-center gap-1">
                        <Eye className="w-3 h-3" /> {video.views || 0}
                      </span>
                    </div>

                    {/* Play Button Overlay */}
                    <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none">
                      <div className="w-12 h-12 bg-white/30 backdrop-blur-md rounded-full flex items-center justify-center transform scale-50 group-hover:scale-100 transition-all duration-300 delay-100">
                        <Play
                          className="w-5 h-5 text-white ml-1"
                          fill="currentColor"
                        />
                      </div>
                    </div>

                    {/* Bottom Info */}
                    <div className="absolute bottom-0 left-0 right-0 p-3 pt-12 bg-gradient-to-t from-black via-black/80 to-transparent translate-y-2 group-hover:translate-y-0 transition-transform duration-300">
                      <h3 className="text-white font-bold text-sm leading-tight mb-1.5 line-clamp-2 drop-shadow-md group-hover:text-primary transition-colors">
                        {video.videoTitle}
                      </h3>
                      <div className="flex flex-col gap-1 text-white/70 text-[10px] font-medium">
                        <span className="flex items-center gap-1.5 group-hover:text-white transition-colors">
                          <MapPin className="w-3 h-3 text-primary" />
                          <span className="truncate max-w-[100px]">
                            {video.shopName}
                          </span>
                        </span>
                        {video.createdAt && (
                          <span className="flex items-center gap-1.5 group-hover:text-white transition-colors mt-0.5">
                            <Clock className="w-3 h-3 text-slate-400" />
                            <span>
                              {(() => {
                                try {
                                  return new Date(
                                    video.createdAt,
                                  ).toLocaleDateString(undefined, {
                                    year: "numeric",
                                    month: "short",
                                    day: "numeric",
                                  });
                                } catch {
                                  return "Recently";
                                }
                              })()}
                            </span>
                          </span>
                        )}
                      </div>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>

            {/* Load More */}
            {hasMore && (
              <div className="mt-16 flex justify-center">
                <button
                  onClick={handleLoadMore}
                  disabled={loadingMore}
                  className="inline-flex items-center gap-3 bg-white dark:bg-slate-900 border-2 border-primary text-primary hover:bg-primary hover:text-white px-8 py-4 rounded-xl font-bold shadow-lg transition-all duration-300 disabled:opacity-70 disabled:cursor-not-allowed"
                >
                  {loadingMore ? (
                    <>
                      <Loader2 className="w-5 h-5 animate-spin" /> Loading
                      More...
                    </>
                  ) : (
                    "Load More Videos"
                  )}
                </button>
              </div>
            )}
          </>
        )}
      </div>
    </div>
  );
}
