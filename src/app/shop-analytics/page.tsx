"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import {
  Video,
  Eye,
  Loader2,
  PlayCircle,
  Clock,
  TrendingUp,
  BarChart3,
  ChevronRight,
} from "lucide-react";
import { getShopAnalyticsApi } from "@/services/apiService";
import { ShopAnalyticsModel, TotalVideo } from "@/models/videos_model";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";

export default function ShopAnalyticsPage() {
  const router = useRouter();
  const [loading, setLoading] = useState(true);
  const [videos, setVideos] = useState<TotalVideo[]>([]);
  const [totalViews, setTotalViews] = useState(0);

  useEffect(() => {
    const fetchAnalytics = async () => {
      try {
        setLoading(true);
        const res: ShopAnalyticsModel = await getShopAnalyticsApi();
        const videoList = res?.data?.totalVideos || [];
        setVideos(videoList);
        setTotalViews(res?.data?.totalViews || 0);
      } catch (error) {
        console.error("Failed to fetch shop analytics", error);
      } finally {
        setLoading(false);
      }
    };

    fetchAnalytics();
  }, []);

  const handleVideoClick = (videoId: number | undefined) => {
    if (!videoId) return;
    sessionStorage.setItem("videoPlaylist", JSON.stringify(videos));
    router.push(`/video-player?videoId=${videoId}`);
  };

  if (loading) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[70vh] gap-4">
        <div className="relative">
          <div className="absolute inset-0 bg-primary/20 rounded-full blur-xl animate-pulse" />
          <Loader2 className="w-12 h-12 animate-spin text-primary relative z-10" />
        </div>
        <p className="text-slate-500 font-bold tracking-widest uppercase text-sm animate-pulse mt-2">
          Loading Analytics...
        </p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-slate-50/50 dark:bg-slate-950/50">
      {/* Top Header Background */}
      <div className="absolute top-0 left-0 right-0 h-96 bg-gradient-to-b from-primary/5 via-primary/5 to-transparent dark:from-primary/10 dark:via-primary/5 -z-10 pointer-events-none" />

      <div className="container mx-auto px-4 md:px-6 py-10 pb-20 max-w-7xl font-sans relative">
        {/* Breadcrumb & Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12">
          <div>
            <div className="flex items-center gap-2 text-sm font-medium text-slate-500 mb-4">
              <Link
                href="/profile"
                className="hover:text-primary transition-colors"
              >
                Profile
              </Link>
              <ChevronRight className="w-4 h-4" />
              <span className="text-primary font-bold">Analytics</span>
            </div>
            <h1 className="text-3xl md:text-4xl font-extrabold font-heading text-slate-900 dark:text-white tracking-tight flex items-center gap-4">
              Shop Analytics
              <div className="hidden md:flex px-3 py-1 bg-emerald-100 dark:bg-emerald-500/20 text-emerald-600 dark:text-emerald-400 text-sm rounded-lg items-center gap-1.5 font-bold shadow-sm">
                <TrendingUp className="w-4 h-4" /> Live
              </div>
            </h1>
          </div>
        </div>

        {/* Premium Summary Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-12">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="bg-white dark:bg-slate-900 rounded-[2rem] p-8 border border-slate-100 dark:border-slate-800 shadow-xl shadow-slate-200/40 dark:shadow-none relative overflow-hidden group"
          >
            <div className="absolute top-0 right-0 w-48 h-48 bg-gradient-to-br from-primary/10 to-transparent rounded-full blur-3xl group-hover:scale-150 transition-transform duration-700" />
            <div className="flex items-center gap-6 relative z-10">
              <div className="w-20 h-20 rounded-2xl bg-gradient-to-br p-4 from-primary to-blue-600 text-white flex items-center justify-center shrink-0 shadow-lg shadow-primary/30 group-hover:scale-110 group-hover:rotate-3 transition-all duration-500">
                <img
                  src="https://cdn-icons-png.flaticon.com/128/5540/5540081.png"
                  alt="video"
                />
              </div>
              <div>
                <p className="text-slate-500 font-bold mb-1 text-sm uppercase tracking-widest">
                  Total Uploads
                </p>
                <div className="flex items-end gap-3">
                  <h2 className="text-5xl font-black text-slate-900 dark:text-white leading-none tracking-tight">
                    {videos.length}
                  </h2>
                </div>
              </div>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="bg-white dark:bg-slate-900 rounded-[2rem] p-8 border border-slate-100 dark:border-slate-800 shadow-xl shadow-slate-200/40 dark:shadow-none relative overflow-hidden group"
          >
            <div className="absolute top-0 right-0 w-48 h-48 bg-gradient-to-br from-accent/10 to-transparent rounded-full blur-3xl group-hover:scale-150 transition-transform duration-700" />
            <div className="flex items-center gap-6 relative z-10">
              <div className="w-20 h-20 rounded-2xl bg-gradient-to-br p-4 from-accent to-orange-500 text-white flex items-center justify-center shrink-0 shadow-lg shadow-accent/30 group-hover:scale-110 group-hover:-rotate-3 transition-all duration-500">
                <img
                  src="https://cdn-icons-png.flaticon.com/128/2235/2235419.png"
                  alt="view"
                />
              </div>
              <div>
                <p className="text-slate-500 font-bold mb-1 text-sm uppercase tracking-widest">
                  Total Views
                </p>
                <div className="flex items-end gap-3">
                  <h2 className="text-5xl font-black text-slate-900 dark:text-white leading-none tracking-tight">
                    {totalViews.toLocaleString()}
                  </h2>
                  <span className="text-emerald-500 font-bold text-sm bg-emerald-50 dark:bg-emerald-500/10 px-2 py-0.5 rounded-md mb-1">
                    +24%
                  </span>
                </div>
              </div>
            </div>
          </motion.div>
        </div>

        {/* Video List Section */}
        <div>
          <div className="flex items-center justify-between mb-8">
            <h2 className="text-2xl font-bold font-heading text-slate-900 dark:text-white flex items-center gap-3">
              Videos
            </h2>
          </div>

          {videos.length === 0 ? (
            <div className="text-center py-20 bg-white dark:bg-slate-900 rounded-[2rem] border border-dashed border-slate-300 dark:border-slate-700 shadow-sm">
              <div className="w-20 h-20 bg-slate-100 dark:bg-slate-800 rounded-full flex items-center justify-center mx-auto mb-6">
                <PlayCircle className="w-10 h-10 text-slate-400" />
              </div>
              <h3 className="text-xl font-bold text-slate-900 dark:text-white mb-2">
                No Videos Found
              </h3>
              <p className="text-slate-500 max-w-md mx-auto">
                You haven't uploaded any videos for your shop yet. Start
                uploading to see your analytics grow!
              </p>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-4 xl:grid-cols-4 gap-6 lg:gap-8">
              {videos.map((video, idx) => (
                <motion.div
                  key={video.id}
                  initial={{ opacity: 0, scale: 0.95, y: 20 }}
                  animate={{ opacity: 1, scale: 1, y: 0 }}
                  transition={{ delay: idx * 0.05 }}
                  onClick={() => handleVideoClick(video.id)}
                  className="group bg-white dark:bg-slate-900 rounded-[1.5rem] overflow-hidden border border-slate-100 dark:border-slate-800 shadow-lg shadow-slate-200/40 dark:shadow-none hover:shadow-2xl hover:shadow-primary/10 hover:-translate-y-1 transition-all duration-300 flex flex-col cursor-pointer"
                >
                  <div className="relative aspect-video bg-black/5 overflow-hidden">
                    {video.thumbnail ? (
                      <Image
                        src={
                          video.thumbnail.startsWith("http")
                            ? video.thumbnail
                            : `https://api.mapman.in${video.thumbnail}`
                        }
                        alt={video.videoTitle || "Thumbnail"}
                        fill
                        className="object-cover group-hover:scale-110 transition-transform duration-700"
                      />
                    ) : (
                      <div className="absolute inset-0 flex items-center justify-center bg-slate-100 dark:bg-slate-800">
                        <PlayCircle className="w-12 h-12 text-slate-300" />
                      </div>
                    )}

                    {/* Hover Overlay with Play Button */}
                    <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center z-10">
                      <div className="w-14 h-14 bg-white/20 backdrop-blur-md rounded-full flex items-center justify-center border border-white/40 transform scale-75 group-hover:scale-100 transition-transform duration-300">
                        <PlayCircle className="w-8 h-8 text-white ml-1" />
                      </div>
                    </div>

                    <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent opacity-90 pointer-events-none" />

                    <div className="absolute top-4 left-4 z-20">
                      <span className="text-[10px] font-bold text-white bg-black/40 backdrop-blur-md px-3 py-1.5 rounded-full uppercase tracking-wider border border-white/10 shadow-sm">
                        {video.category || "General"}
                      </span>
                    </div>

                    <div className="absolute bottom-4 left-4 right-4 z-20 flex items-center justify-between">
                      <h3 className="font-bold text-lg text-white line-clamp-1 drop-shadow-md pr-2">
                        {video.videoTitle || "Untitled Video"}
                      </h3>
                    </div>
                  </div>

                  <div className="p-6 flex flex-col flex-1 bg-white dark:bg-slate-900">
                    <p className="text-sm text-slate-500 mb-6 line-clamp-2 leading-relaxed flex-1">
                      {video.description || "No description provided."}
                    </p>

                    <div className="flex items-center justify-between pt-5 border-t border-slate-100 dark:border-slate-800">
                      <div className="flex flex-col">
                        <span className="text-[10px] uppercase font-bold text-slate-400 tracking-wider mb-1">
                          Total Views
                        </span>
                        <div className="flex items-center gap-1.5 font-bold text-slate-900 dark:text-white">
                          <Eye className="w-4 h-4 text-accent" />{" "}
                          {video.viewCount?.toLocaleString() || 0}
                        </div>
                      </div>

                      {video.createdAt && (
                        <div className="flex flex-col items-end">
                          <span className="text-[10px] uppercase font-bold text-slate-400 tracking-wider mb-1">
                            Uploaded
                          </span>
                          <span className="text-sm font-bold text-slate-700 dark:text-slate-300 flex items-center gap-1.5">
                            {new Date(video.createdAt).toLocaleDateString(
                              undefined,
                              {
                                month: "short",
                                day: "numeric",
                                year: "numeric",
                              },
                            )}
                          </span>
                        </div>
                      )}
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
