"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { Video, Eye, Loader2, PlayCircle, Clock } from "lucide-react";
import { getMyVideos } from "@/services/apiService";
import { ShopVideo } from "@/models/home_model";
import Image from "next/image";

export default function ShopAnalyticsPage() {
  const [loading, setLoading] = useState(true);
  const [videos, setVideos] = useState<ShopVideo[]>([]);
  const [totalViews, setTotalViews] = useState(0);

  useEffect(() => {
    const fetchAnalytics = async () => {
      try {
        setLoading(true);
        const res = await getMyVideos();
        const videoList: ShopVideo[] = res?.data?.shopVideos || [];
        setVideos(videoList);
        
        const views = videoList.reduce((acc, video) => acc + (video.views || 0), 0);
        setTotalViews(views);
      } catch (error) {
        console.error("Failed to fetch shop analytics", error);
      } finally {
        setLoading(false);
      }
    };
    
    fetchAnalytics();
  }, []);

  if (loading) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[50vh] gap-4">
        <Loader2 className="w-10 h-10 animate-spin text-primary" />
        <p className="text-slate-500 font-medium text-lg">Loading analytics...</p>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 md:px-6 py-8 pb-8 max-w-7xl font-sans">
      <div className="mb-10">
        <h1 className="text-4xl font-extrabold font-heading text-slate-900 dark:text-white mb-2 tracking-tight">Shop Analytics</h1>
        <p className="text-slate-500 text-lg">Track your video performance and insights.</p>
      </div>

      {/* Summary Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 mb-10">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-white dark:bg-slate-900 rounded-3xl p-8 border border-slate-100 dark:border-slate-800 shadow-xl shadow-slate-200/40 dark:shadow-none flex items-center gap-6 group hover:-translate-y-1 transition-all duration-300"
        >
          <div className="w-16 h-16 rounded-2xl bg-primary/10 text-primary flex items-center justify-center shrink-0 group-hover:scale-110 group-hover:bg-primary group-hover:text-white transition-all duration-300">
            <Video className="w-8 h-8" />
          </div>
          <div>
            <p className="text-slate-500 font-semibold mb-1 text-sm uppercase tracking-wider">Total Videos</p>
            <h2 className="text-4xl font-black text-slate-900 dark:text-white">{videos.length}</h2>
          </div>
        </motion.div>

        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="bg-white dark:bg-slate-900 rounded-3xl p-8 border border-slate-100 dark:border-slate-800 shadow-xl shadow-slate-200/40 dark:shadow-none flex items-center gap-6 group hover:-translate-y-1 transition-all duration-300"
        >
          <div className="w-16 h-16 rounded-2xl bg-accent/10 text-accent flex items-center justify-center shrink-0 group-hover:scale-110 group-hover:bg-accent group-hover:text-white transition-all duration-300">
            <Eye className="w-8 h-8" />
          </div>
          <div>
            <p className="text-slate-500 font-semibold mb-1 text-sm uppercase tracking-wider">Total Views</p>
            <h2 className="text-4xl font-black text-slate-900 dark:text-white">{totalViews.toLocaleString()}</h2>
          </div>
        </motion.div>
      </div>

      {/* Video List */}
      <div className="bg-white dark:bg-slate-900 rounded-3xl border border-slate-100 dark:border-slate-800 overflow-hidden shadow-xl shadow-slate-200/30 dark:shadow-none">
        <div className="p-6 md:p-8 border-b border-slate-100 dark:border-slate-800 flex items-center justify-between">
          <h2 className="text-2xl font-bold font-heading">Uploaded Videos</h2>
        </div>
        
        <div className="p-6 md:p-8">
          {videos.length === 0 ? (
            <div className="text-center py-16 bg-slate-50 dark:bg-slate-800/50 rounded-2xl border border-dashed border-slate-200 dark:border-slate-700">
              <div className="w-16 h-16 bg-white dark:bg-slate-800 rounded-full flex items-center justify-center mx-auto mb-4 shadow-sm">
                <PlayCircle className="w-8 h-8 text-slate-400" />
              </div>
              <h3 className="text-lg font-bold text-slate-900 dark:text-white mb-2">No Videos Found</h3>
              <p className="text-slate-500 max-w-sm mx-auto">You haven't uploaded any videos for your shop yet.</p>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {videos.map((video, idx) => (
                <motion.div
                  key={video.id}
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: idx * 0.05 }}
                  className="group flex flex-col bg-slate-50 dark:bg-slate-800/50 rounded-2xl overflow-hidden border border-slate-100 dark:border-slate-700 hover:shadow-lg transition-all"
                >
                  <div className="relative aspect-video bg-black/5 flex items-center justify-center overflow-hidden">
                    {video.thumbnail ? (
                      <Image src={video.thumbnail.startsWith('http') ? video.thumbnail : `https://api.mapman.in${video.thumbnail}`} alt={video.videoTitle || "Thumbnail"} fill className="object-cover group-hover:scale-105 transition-transform duration-500" />
                    ) : (
                      <PlayCircle className="w-12 h-12 text-slate-300" />
                    )}
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-80" />
                    
                    <div className="absolute bottom-3 right-3 bg-white/20 backdrop-blur-md px-2.5 py-1 rounded-lg text-white text-xs font-bold flex items-center gap-1.5 shadow-sm">
                      <Eye className="w-3.5 h-3.5" /> {video.views || 0}
                    </div>
                  </div>
                  
                  <div className="p-5 flex flex-col flex-1">
                    <h3 className="font-bold text-lg mb-2 line-clamp-1 text-slate-900 dark:text-white">{video.videoTitle || "Untitled Video"}</h3>
                    <p className="text-sm text-slate-500 mb-4 line-clamp-2 leading-relaxed flex-1">
                      {video.description || "No description provided."}
                    </p>
                    
                    <div className="flex items-center justify-between mt-auto pt-4 border-t border-slate-200 dark:border-slate-700">
                      <span className="text-xs font-semibold text-primary bg-primary/10 px-2.5 py-1 rounded-md">{video.category || "General"}</span>
                      {video.createdAt && (
                        <span className="text-xs text-slate-400 font-medium flex items-center gap-1">
                          <Clock className="w-3 h-3" /> {new Date(video.createdAt).toLocaleDateString()}
                        </span>
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
