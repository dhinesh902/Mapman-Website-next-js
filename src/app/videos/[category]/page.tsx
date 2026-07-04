"use client";

import { useState, useEffect, useRef, useCallback } from "react";
import { useParams, useRouter } from "next/navigation";
import { motion } from "framer-motion";
import { Play, Eye, Loader2, ArrowLeft, MapPin } from "lucide-react";
import Link from "next/link";
import { getCategoryVideosPaginated } from "@/services/apiService";
import { MyVideosData } from "@/models/videos_model";

export default function CategoryVideosPage() {
  const params = useParams();
  const router = useRouter();
  const categoryName = (params?.category as string) || "";

  const [videos, setVideos] = useState<MyVideosData[]>([]);
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(true);
  const [hasMore, setHasMore] = useState(true);
  const [error, setError] = useState("");

  const observer = useRef<IntersectionObserver | null>(null);
  const lastVideoElementRef = useCallback(
    (node: HTMLDivElement | null) => {
      if (loading) return;
      if (observer.current) observer.current.disconnect();
      observer.current = new IntersectionObserver((entries) => {
        if (entries[0].isIntersecting && hasMore) {
          setPage((prevPage) => prevPage + 1);
        }
      });
      if (node) observer.current.observe(node);
    },
    [loading, hasMore],
  );

  useEffect(() => {
    if (!categoryName) return;

    const fetchVideos = async () => {
      try {
        setLoading(true);
        const res = await getCategoryVideosPaginated(categoryName, page);
        if (res && res.data && Array.isArray(res.data)) {
          if (res.data.length === 0) {
            setHasMore(false);
          } else {
            setVideos((prev) =>
              page === 1 ? res.data : [...prev, ...res.data],
            );
            // Assuming 30 is the page size, if less than 30 returned, no more data
            if (res.data.length < 30) {
              setHasMore(false);
            }
          }
        } else {
          setHasMore(false);
        }
      } catch (err) {
        console.error(err);
        setError("Failed to load category videos.");
        setHasMore(false);
      } finally {
        setLoading(false);
      }
    };

    fetchVideos();
  }, [categoryName, page]);

  const getMediaUrl = (url: string) =>
    url.startsWith("http") ? url : `https://api.mapman.in${url}`;

  return (
    <div className="w-full px-2 md:px-4 lg:px-8 py-6 pb-8 relative overflow-hidden max-w-[1920px] mx-auto min-h-screen">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center gap-6 mb-8 border-b border-slate-200 dark:border-slate-800 pb-6">
        <button
          onClick={() => router.back()}
          className="w-10 h-10 flex items-center justify-center rounded-xl bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-700 transition-colors text-slate-700 dark:text-slate-300"
        >
          <ArrowLeft className="w-5 h-5" />
        </button>
        <div>
          <h1 className="text-3xl font-bold font-heading mb-2 capitalize text-slate-900 dark:text-white">
            {decodeURIComponent(categoryName)} Videos
          </h1>
          <p className="text-slate-500">
            Explore community content in this category
          </p>
        </div>
      </div>

      {/* Video Grid */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        {videos.map((video, idx) => {
          const mediaUrl = video.thumbnail
            ? getMediaUrl(video.thumbnail)
            : getMediaUrl(video.video || "");

          const isVideoFile =
            mediaUrl.endsWith(".mp4") ||
            mediaUrl.endsWith(".webm") ||
            mediaUrl.endsWith(".m3u8");

          return (
            <motion.div
              ref={idx === videos.length - 1 ? lastVideoElementRef : null}
              key={video.id || idx}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: (idx % 10) * 0.1 }}
              className="group relative bg-white dark:bg-slate-900 rounded-[2rem] overflow-hidden border border-slate-100 dark:border-slate-800/60 hover:border-primary/40 shadow-md hover:shadow-2xl hover:shadow-primary/20 transition-all duration-500 flex flex-col hover:-translate-y-2 z-10"
            >
              <div className="relative aspect-[4/3] overflow-hidden cursor-pointer bg-slate-100 dark:bg-slate-800 m-2 rounded-[1.5rem]">
                {/* Views Badge */}
                {video.views !== undefined && (
                  <div className="absolute top-3 left-3 z-20 flex items-center gap-1.5 px-3 py-1.5 bg-white/20 backdrop-blur-md border border-white/30 rounded-xl text-white text-xs font-bold shadow-lg">
                    <Eye className="w-4 h-4" />
                    {video.views || 0}
                  </div>
                )}

                {isVideoFile ? (
                  <video
                    src={mediaUrl}
                    autoPlay
                    loop
                    muted
                    playsInline
                    className="object-cover w-full h-full group-hover:scale-110 transition-transform duration-700"
                  />
                ) : (
                  <img
                    src={mediaUrl}
                    alt={video.videoTitle || video.category || "Video"}
                    className="object-cover w-full h-full group-hover:scale-110 transition-transform duration-700"
                  />
                )}

                <div className="absolute inset-0 bg-gradient-to-t from-slate-900/90 via-transparent to-transparent opacity-60 group-hover:opacity-80 transition-opacity duration-500 pointer-events-none" />

                <div className="absolute inset-0 bg-black/10 group-hover:bg-black/30 transition-colors flex items-center justify-center opacity-0 group-hover:opacity-100">
                  <div className="w-16 h-16 bg-white/20 text-white rounded-full flex items-center justify-center shadow-[0_0_30px_rgba(255,255,255,0.2)] transform scale-90 group-hover:scale-100 transition-all duration-300 backdrop-blur-md border border-white/30">
                    <Play className="w-6 h-6 ml-1 fill-white" />
                  </div>
                </div>
              </div>

              <div className="p-5 lg:p-6 relative z-20 bg-white dark:bg-slate-900 flex-1 flex flex-col justify-between">
                <div>
                  <h3 className="font-extrabold text-lg md:text-xl capitalize text-slate-900 dark:text-white line-clamp-1 group-hover:text-primary transition-colors duration-300 mb-2">
                    {video.videoTitle || video.category}
                  </h3>
                  {video.shopName && (
                    <div className="flex items-center gap-2.5 text-sm font-medium text-slate-500 line-clamp-1 mb-2">
                      <div className="bg-primary/10 p-1.5 rounded-lg text-primary">
                        <MapPin className="w-3.5 h-3.5" />
                      </div>
                      {video.shopName}
                    </div>
                  )}
                </div>
              </div>
            </motion.div>
          );
        })}
      </div>

      {loading && (
        <div className="flex justify-center items-center py-10 w-full col-span-full">
          <Loader2 className="w-8 h-8 animate-spin text-primary" />
        </div>
      )}

      {error && !loading && (
        <div className="flex flex-col items-center justify-center py-20 text-red-500 font-medium">
          <p>{error}</p>
          <button
            onClick={() => {
              setError("");
              setPage(1);
            }}
            className="mt-4 px-6 py-2 bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 rounded-lg hover:bg-slate-200 dark:hover:bg-slate-700 transition-colors"
          >
            Try Again
          </button>
        </div>
      )}

      {!loading && !error && videos.length === 0 && (
        <div className="text-center py-20 text-slate-500 font-medium">
          No videos available for this category yet.
        </div>
      )}

      {!hasMore && videos.length > 0 && (
        <div className="text-center py-8 text-slate-400 font-medium text-sm">
          You've reached the end of the videos.
        </div>
      )}
    </div>
  );
}
