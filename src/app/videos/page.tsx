"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { Search, Play, ThumbsUp, Eye, Share2, Heart, Clock, MoreVertical, Settings, Trash2, Edit } from "lucide-react";
import Image from "next/image";

const allVideos = [
  {
    id: 1,
    title: "Top 10 Street Food Places in Chennai",
    thumbnail: "https://images.unsplash.com/photo-1555939594-58d7cb561ad1?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
    duration: "10:24",
    category: "Restaurants",
    uploadedDate: "2 days ago",
    views: "15.4K",
    likes: "1.2K",
  },
  {
    id: 2,
    title: "Best Luxury Hotels for Staycation",
    thumbnail: "https://images.unsplash.com/photo-1566073771259-6a8506099945?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
    duration: "15:30",
    category: "Hotels",
    uploadedDate: "1 week ago",
    views: "42K",
    likes: "3.5K",
  },
  {
    id: 3,
    title: "Night Market Shopping Guide",
    thumbnail: "https://images.unsplash.com/photo-1534723452862-4c874018d66d?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
    duration: "08:45",
    category: "Shopping",
    uploadedDate: "3 weeks ago",
    views: "8.9K",
    likes: "850",
  },
  {
    id: 4,
    title: "Top Medical Facilities & Hospitals",
    thumbnail: "https://images.unsplash.com/photo-1519494026892-80bbd2d6fd0d?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
    duration: "12:15",
    category: "Hospitals",
    uploadedDate: "1 month ago",
    views: "5.2K",
    likes: "420",
  }
];

export default function VideosPage() {
  const [activeTab, setActiveTab] = useState("all");

  return (
    <div className="container mx-auto px-4 md:px-6 py-8 pb-24">
      {/* Header & Tabs */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 mb-8">
        <div>
          <h1 className="text-3xl font-bold font-heading mb-2">Video Gallery</h1>
          <p className="text-slate-500">Discover places through our community videos</p>
        </div>

        <div className="flex items-center gap-4 bg-slate-100 dark:bg-slate-800 p-1.5 rounded-xl">
          <button
            onClick={() => setActiveTab("all")}
            className={`relative px-6 py-2.5 rounded-lg text-sm font-semibold transition-colors ${
              activeTab === "all" ? "text-primary" : "text-slate-600 dark:text-slate-300 hover:text-slate-900 dark:hover:text-white"
            }`}
          >
            All Videos
            {activeTab === "all" && (
              <motion.div layoutId="video-tab" className="absolute inset-0 bg-white dark:bg-slate-900 rounded-lg shadow-sm -z-10" />
            )}
          </button>
          <button
            onClick={() => setActiveTab("my")}
            className={`relative px-6 py-2.5 rounded-lg text-sm font-semibold transition-colors ${
              activeTab === "my" ? "text-primary" : "text-slate-600 dark:text-slate-300 hover:text-slate-900 dark:hover:text-white"
            }`}
          >
            My Videos
            {activeTab === "my" && (
              <motion.div layoutId="video-tab" className="absolute inset-0 bg-white dark:bg-slate-900 rounded-lg shadow-sm -z-10" />
            )}
          </button>
        </div>
      </div>

      {/* Filters & Search */}
      <div className="flex flex-col sm:flex-row items-center gap-4 mb-8">
        <div className="relative w-full sm:max-w-md">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400" />
          <input 
            type="text" 
            placeholder="Search videos..." 
            className="w-full pl-10 pr-4 py-3 bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl focus:outline-none focus:ring-2 focus:ring-primary/50 transition-all shadow-sm"
          />
        </div>
        <select className="w-full sm:w-auto px-4 py-3 bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl outline-none focus:ring-2 focus:ring-primary/50 cursor-pointer shadow-sm">
          <option>Latest</option>
          <option>Most Viewed</option>
          <option>Trending</option>
        </select>
      </div>

      {/* Video Grid */}
      <div className="grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        {allVideos.map((video, idx) => (
          <motion.div
            key={video.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: idx * 0.1 }}
            className="bg-white dark:bg-slate-800 rounded-2xl overflow-hidden shadow-sm hover:shadow-xl transition-all group border border-slate-100 dark:border-slate-700"
          >
            <div className="relative aspect-video overflow-hidden cursor-pointer">
              <Image src={video.thumbnail} alt={video.title} fill className="object-cover group-hover:scale-105 transition-transform duration-500" />
              
              {/* Overlays */}
              <div className="absolute inset-0 bg-black/20 group-hover:bg-black/40 transition-colors flex items-center justify-center opacity-0 group-hover:opacity-100">
                <div className="w-12 h-12 bg-primary text-white rounded-full flex items-center justify-center shadow-lg transform scale-90 group-hover:scale-100 transition-all">
                  <Play className="w-5 h-5 ml-1" />
                </div>
              </div>
              
              <div className="absolute bottom-2 right-2 bg-black/70 text-white px-2 py-1 rounded-md text-xs font-medium flex items-center gap-1 backdrop-blur-sm">
                <Clock className="w-3 h-3" /> {video.duration}
              </div>
            </div>

            <div className="p-4">
              <div className="flex justify-between items-start mb-2">
                <h3 className="font-bold text-base line-clamp-2 pr-4">{video.title}</h3>
                {activeTab === "my" && (
                  <button className="text-slate-400 hover:text-slate-700 shrink-0">
                    <MoreVertical className="w-5 h-5" />
                  </button>
                )}
              </div>
              <p className="text-xs font-semibold text-primary mb-3 bg-primary/10 inline-block px-2 py-1 rounded-md">{video.category}</p>
              
              <div className="flex items-center justify-between text-xs text-slate-500">
                <div className="flex items-center gap-3">
                  <span className="flex items-center gap-1"><Eye className="w-4 h-4" /> {video.views}</span>
                  <span className="flex items-center gap-1"><ThumbsUp className="w-4 h-4" /> {video.likes}</span>
                </div>
                <span>{video.uploadedDate}</span>
              </div>

              <div className="border-t border-slate-100 dark:border-slate-700 mt-4 pt-4 flex items-center gap-2">
                {activeTab === "all" ? (
                  <>
                    <button className="flex-1 flex items-center justify-center gap-1.5 py-2 rounded-lg bg-slate-50 dark:bg-slate-700/50 hover:bg-slate-100 dark:hover:bg-slate-700 text-slate-600 dark:text-slate-300 transition-colors text-sm font-medium">
                      <Heart className="w-4 h-4" /> Favorite
                    </button>
                    <button className="flex-1 flex items-center justify-center gap-1.5 py-2 rounded-lg bg-slate-50 dark:bg-slate-700/50 hover:bg-slate-100 dark:hover:bg-slate-700 text-slate-600 dark:text-slate-300 transition-colors text-sm font-medium">
                      <Share2 className="w-4 h-4" /> Share
                    </button>
                  </>
                ) : (
                  <>
                    <button className="flex-1 flex items-center justify-center gap-1.5 py-2 rounded-lg bg-slate-50 dark:bg-slate-700/50 hover:bg-primary/10 hover:text-primary transition-colors text-sm font-medium">
                      <Edit className="w-4 h-4" /> Edit
                    </button>
                    <button className="flex-1 flex items-center justify-center gap-1.5 py-2 rounded-lg bg-slate-50 dark:bg-slate-700/50 hover:bg-red-50 hover:text-red-600 transition-colors text-sm font-medium">
                      <Trash2 className="w-4 h-4" /> Delete
                    </button>
                    <button className="flex-1 flex items-center justify-center gap-1.5 py-2 rounded-lg bg-slate-50 dark:bg-slate-700/50 hover:bg-slate-100 dark:hover:bg-slate-700 text-slate-600 dark:text-slate-300 transition-colors text-sm font-medium">
                      <Settings className="w-4 h-4" /> Stats
                    </button>
                  </>
                )}
              </div>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
}
