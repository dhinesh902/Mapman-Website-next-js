"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Search, MapPin, Play, Clock, Star, Trash2, Navigation } from "lucide-react";
import Image from "next/image";

export default function SavedPage() {
  const [activeTab, setActiveTab] = useState("videos");
  
  const savedVideos = [
    { id: 1, title: "Top 10 Street Food Places in Chennai", thumbnail: "https://images.unsplash.com/photo-1555939594-58d7cb561ad1?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80", duration: "10:24", category: "Restaurants", savedDate: "2 days ago" },
    { id: 2, title: "Best Luxury Hotels for Staycation", thumbnail: "https://images.unsplash.com/photo-1566073771259-6a8506099945?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80", duration: "15:30", category: "Hotels", savedDate: "1 week ago" }
  ];

  const savedShops = [
    { id: 1, name: "ABC Medical", category: "Pharmacy", rating: 4.5, address: "Central, Chennai", image: "https://images.unsplash.com/photo-1576602976047-174e57a47881?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80" },
    { id: 2, name: "Urban Cafe", category: "Restaurants", rating: 4.8, address: "T Nagar, Chennai", image: "https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80" }
  ];

  return (
    <div className="container mx-auto px-4 md:px-6 py-8 pb-24">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 mb-8">
        <div>
          <h1 className="text-3xl font-bold font-heading mb-2">Saved Items</h1>
          <p className="text-slate-500">Manage your favorite videos and locations</p>
        </div>

        <div className="flex bg-slate-100 dark:bg-slate-800 p-1.5 rounded-xl self-start">
          <button
            onClick={() => setActiveTab("videos")}
            className={`relative px-6 py-2.5 rounded-lg text-sm font-semibold transition-colors ${activeTab === "videos" ? "text-primary" : "text-slate-600 dark:text-slate-300 hover:text-slate-900"}`}
          >
            Videos
            {activeTab === "videos" && <motion.div layoutId="saved-tab" className="absolute inset-0 bg-white dark:bg-slate-900 rounded-lg shadow-sm -z-10" />}
          </button>
          <button
            onClick={() => setActiveTab("shops")}
            className={`relative px-6 py-2.5 rounded-lg text-sm font-semibold transition-colors ${activeTab === "shops" ? "text-primary" : "text-slate-600 dark:text-slate-300 hover:text-slate-900"}`}
          >
            Shops
            {activeTab === "shops" && <motion.div layoutId="saved-tab" className="absolute inset-0 bg-white dark:bg-slate-900 rounded-lg shadow-sm -z-10" />}
          </button>
        </div>
      </div>

      <div className="relative max-w-md mb-8">
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400" />
        <input type="text" placeholder={`Search saved ${activeTab}...`} className="w-full pl-10 pr-4 py-3 bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl focus:outline-none focus:ring-2 focus:ring-primary/50 shadow-sm" />
      </div>

      <AnimatePresence mode="wait">
        {activeTab === "videos" ? (
          <motion.div key="videos" initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -10 }} className="grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {savedVideos.map((video) => (
              <div key={video.id} className="bg-white dark:bg-slate-800 rounded-2xl overflow-hidden shadow-sm hover:shadow-xl transition-all border border-slate-100 dark:border-slate-700 group flex flex-col">
                <div className="relative aspect-video">
                  <Image src={video.thumbnail} alt={video.title} fill className="object-cover" />
                  <div className="absolute bottom-2 right-2 bg-black/70 text-white px-2 py-1 rounded-md text-xs font-medium flex items-center gap-1 backdrop-blur-sm">
                    <Clock className="w-3 h-3" /> {video.duration}
                  </div>
                </div>
                <div className="p-4 flex flex-col flex-1">
                  <h3 className="font-bold text-base line-clamp-2 mb-2">{video.title}</h3>
                  <div className="flex items-center justify-between mt-auto mb-4">
                    <span className="text-xs font-semibold text-primary bg-primary/10 px-2 py-1 rounded-md">{video.category}</span>
                    <span className="text-xs text-slate-500">Saved {video.savedDate}</span>
                  </div>
                  <button className="w-full flex items-center justify-center gap-2 py-2 rounded-lg bg-red-50 text-red-600 hover:bg-red-100 dark:bg-red-500/10 dark:hover:bg-red-500/20 text-sm font-semibold transition-colors mt-auto">
                    <Trash2 className="w-4 h-4" /> Remove
                  </button>
                </div>
              </div>
            ))}
          </motion.div>
        ) : (
          <motion.div key="shops" initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -10 }} className="grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {savedShops.map((shop) => (
              <div key={shop.id} className="bg-white dark:bg-slate-800 rounded-2xl overflow-hidden shadow-sm hover:shadow-xl transition-all border border-slate-100 dark:border-slate-700 flex flex-col">
                <div className="relative h-48">
                  <Image src={shop.image} alt={shop.name} fill className="object-cover" />
                  <div className="absolute top-3 right-3 bg-white/90 backdrop-blur-sm px-2 py-1 rounded-lg text-sm font-semibold flex items-center gap-1 shadow-sm">
                    <Star className="w-4 h-4 text-accent fill-accent" /> {shop.rating}
                  </div>
                </div>
                <div className="p-4 flex flex-col flex-1">
                  <h3 className="font-bold text-lg mb-1">{shop.name}</h3>
                  <p className="text-sm text-slate-500 mb-4 flex items-center gap-1.5"><MapPin className="w-4 h-4" /> {shop.address}</p>
                  <span className="text-xs font-semibold text-primary bg-primary/10 px-2 py-1 rounded-md w-fit mb-4">{shop.category}</span>
                  
                  <div className="flex gap-2 mt-auto">
                    <button className="flex-1 flex items-center justify-center gap-1.5 py-2 rounded-lg bg-primary text-white hover:bg-primary/90 text-sm font-semibold transition-colors">
                      <Navigation className="w-4 h-4" /> View
                    </button>
                    <button className="px-4 flex items-center justify-center rounded-lg bg-red-50 text-red-600 hover:bg-red-100 dark:bg-red-500/10 dark:hover:bg-red-500/20 transition-colors">
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
