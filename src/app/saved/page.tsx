"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Search,
  MapPin,
  Play,
  Clock,
  Star,
  Trash2,
  Navigation,
  Loader2,
  Eye,
} from "lucide-react";
import Link from "next/link";
import { fetchMySavedVideos, fetchSavedShops, saveOthersVideosApi, saveShopApi } from "@/services/apiService";
import { MyVideosData } from "@/models/videos_model";
import { Datum as ShopData } from "@/models/map_shops_model";

export default function SavedPage() {
  const [activeTab, setActiveTab] = useState<"videos" | "shops">("videos");

  const [videos, setVideos] = useState<MyVideosData[]>([]);
  const [videoPage, setVideoPage] = useState(1);
  const [hasMoreVideos, setHasMoreVideos] = useState(true);
  const [loadingVideos, setLoadingVideos] = useState(true);
  const [loadingMoreVideos, setLoadingMoreVideos] = useState(false);

  const [shops, setShops] = useState<ShopData[]>([]);
  const [shopPage, setShopPage] = useState(1);
  const [hasMoreShops, setHasMoreShops] = useState(true);
  const [loadingShops, setLoadingShops] = useState(true);
  const [loadingMoreShops, setLoadingMoreShops] = useState(false);

  const loadVideos = async (pageToLoad: number, isInitial: boolean = false) => {
    try {
      if (isInitial) setLoadingVideos(true);
      else setLoadingMoreVideos(true);

      const res = await fetchMySavedVideos(pageToLoad);
      if (res?.data && Array.isArray(res.data)) {
        if (res.data.length < 30) {
          setHasMoreVideos(false);
        }

        if (isInitial) {
          setVideos(res.data);
        } else {
          setVideos((prev) => [...prev, ...res.data]);
        }
      } else {
        setHasMoreVideos(false);
      }
    } catch (error) {
      console.error("Error fetching saved videos", error);
    } finally {
      setLoadingVideos(false);
      setLoadingMoreVideos(false);
    }
  };

  const loadShops = async (pageToLoad: number, isInitial: boolean = false) => {
    try {
      if (isInitial) setLoadingShops(true);
      else setLoadingMoreShops(true);

      const res = await fetchSavedShops(pageToLoad);
      if (res?.data && Array.isArray(res.data)) {
        if (res.data.length < 30) {
          setHasMoreShops(false);
        }

        if (isInitial) {
          setShops(res.data);
        } else {
          setShops((prev) => [...prev, ...res.data]);
        }
      } else {
        setHasMoreShops(false);
      }
    } catch (error) {
      console.error("Error fetching saved shops", error);
    } finally {
      setLoadingShops(false);
      setLoadingMoreShops(false);
    }
  };

  const handleRemoveVideo = async (videoId: number) => {
    try {
      await saveOthersVideosApi(videoId, "inactive");
      setVideos((prev) => prev.filter((v) => v.id !== videoId));
    } catch (error) {
      console.error("Error removing video:", error);
    }
  };

  const handleRemoveShop = async (shopId: number) => {
    try {
      await saveShopApi(shopId, "inactive");
      setShops((prev) => prev.filter((s) => s.id !== shopId));
    } catch (error) {
      console.error("Error removing shop:", error);
    }
  };

  useEffect(() => {
    loadVideos(1, true);
    loadShops(1, true);
  }, []);

  const handleLoadMoreVideos = () => {
    if (!loadingMoreVideos && hasMoreVideos) {
      const nextPage = videoPage + 1;
      setVideoPage(nextPage);
      loadVideos(nextPage, false);
    }
  };

  const handleLoadMoreShops = () => {
    if (!loadingMoreShops && hasMoreShops) {
      const nextPage = shopPage + 1;
      setShopPage(nextPage);
      loadShops(nextPage, false);
    }
  };

  return (
    <div className="container mx-auto px-2 md:px-4 py-8 pb-8 max-w-[1920px]">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 mb-8 px-2 md:px-0">
        <div>
          <h1 className="text-3xl font-bold font-heading mb-2">Saved Items</h1>
          <p className="text-slate-500">
            Manage your favorite videos and locations
          </p>
        </div>

        <div className="flex bg-slate-100 dark:bg-slate-800 p-1.5 rounded-xl self-start">
          <button
            onClick={() => setActiveTab("videos")}
            className={`relative px-6 py-2.5 rounded-lg text-sm font-semibold transition-colors ${activeTab === "videos" ? "text-primary" : "text-slate-600 dark:text-slate-300 hover:text-slate-900"}`}
          >
            Videos
            {activeTab === "videos" && (
              <motion.div
                layoutId="saved-tab"
                className="absolute inset-0 bg-white dark:bg-slate-900 rounded-lg shadow-sm -z-10"
              />
            )}
          </button>
          <button
            onClick={() => setActiveTab("shops")}
            className={`relative px-6 py-2.5 rounded-lg text-sm font-semibold transition-colors ${activeTab === "shops" ? "text-primary" : "text-slate-600 dark:text-slate-300 hover:text-slate-900"}`}
          >
            Shops
            {activeTab === "shops" && (
              <motion.div
                layoutId="saved-tab"
                className="absolute inset-0 bg-white dark:bg-slate-900 rounded-lg shadow-sm -z-10"
              />
            )}
          </button>
        </div>
      </div>

      <div className="relative max-w-md mb-8 px-2 md:px-0">
        <Search className="absolute left-5 md:left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400" />
        <input
          type="text"
          placeholder={`Search saved ${activeTab}...`}
          className="w-full pl-12 pr-4 py-3 bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl focus:outline-none focus:ring-2 focus:ring-primary/50 shadow-sm"
        />
      </div>

      <AnimatePresence mode="wait">
        {activeTab === "videos" ? (
          <motion.div
            key="videos"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
          >
            {loadingVideos ? (
              <div className="flex flex-col items-center justify-center min-h-[300px]">
                <Loader2 className="w-10 h-10 text-primary animate-spin mb-4" />
                <p className="text-slate-500 font-medium">
                  Loading saved videos...
                </p>
              </div>
            ) : videos.length === 0 ? (
              <div className="text-center py-20 text-slate-500">
                No saved videos found.
              </div>
            ) : (
              <>
                <div className="grid sm:grid-cols-2 lg:grid-cols-4 xl:grid-cols-4 gap-6">
                  {videos.map((video) => (
                    <div
                      key={video.id}
                      className="bg-white dark:bg-slate-800 rounded-2xl overflow-hidden shadow-sm hover:shadow-xl transition-all border border-slate-100 dark:border-slate-700 group flex flex-col"
                    >
                      <div className="relative h-48 bg-slate-900">
                        <img
                          src={
                            video.thumbnail?.startsWith("http")
                              ? video.thumbnail
                              : `https://api.mapman.in${video.thumbnail}`
                          }
                          alt={video.videoTitle || "Video"}
                          className="w-full h-full object-cover"
                          onError={(e) => {
                            (e.target as HTMLImageElement).src =
                              "https://images.unsplash.com/photo-1516245834210-c4c142787335?auto=format&fit=crop&q=80&w=400";
                          }}
                        />
                        <div className="absolute bottom-2 right-2 bg-black/70 text-white px-2 py-1 rounded-md text-xs font-medium flex items-center gap-1 backdrop-blur-sm">
                          <Eye className="w-3 h-3" /> {video.views || 0}
                        </div>
                      </div>
                      <div className="p-4 flex flex-col flex-1">
                        <h3 className="font-bold text-base line-clamp-2 mb-2">
                          {video.videoTitle}
                        </h3>
                        <div className="flex items-center justify-between mt-auto mb-4">
                          <span className="text-xs font-semibold text-primary bg-primary/10 px-2 py-1 rounded-md capitalize">
                            {video.category || "General"}
                          </span>
                          <span className="text-xs text-slate-500 flex items-center gap-1">
                            <MapPin className="w-3 h-3" />{" "}
                            <span className="truncate max-w-[100px]">
                              {video.shopName}
                            </span>
                          </span>
                        </div>
                        <button onClick={() => video.id && handleRemoveVideo(video.id)} className="w-full flex items-center justify-center gap-2 py-2 rounded-lg bg-red-50 text-red-600 hover:bg-red-100 dark:bg-red-500/10 dark:hover:bg-red-500/20 text-sm font-semibold transition-colors mt-auto">
                          <Trash2 className="w-4 h-4" /> Remove
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
                {hasMoreVideos && (
                  <div className="mt-12 flex justify-center">
                    <button
                      onClick={handleLoadMoreVideos}
                      disabled={loadingMoreVideos}
                      className="inline-flex items-center gap-3 bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-slate-700 dark:text-slate-200 hover:bg-slate-50 dark:hover:bg-slate-700 px-6 py-3 rounded-xl font-bold shadow-sm transition-all duration-300 disabled:opacity-70 disabled:cursor-not-allowed"
                    >
                      {loadingMoreVideos ? (
                        <>
                          <Loader2 className="w-4 h-4 animate-spin" />{" "}
                          Loading...
                        </>
                      ) : (
                        "Load More Videos"
                      )}
                    </button>
                  </div>
                )}
              </>
            )}
          </motion.div>
        ) : (
          <motion.div
            key="shops"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
          >
            {loadingShops ? (
              <div className="flex flex-col items-center justify-center min-h-[300px]">
                <Loader2 className="w-10 h-10 text-primary animate-spin mb-4" />
                <p className="text-slate-500 font-medium">
                  Loading saved shops...
                </p>
              </div>
            ) : shops.length === 0 ? (
              <div className="text-center py-20 text-slate-500">
                No saved shops found.
              </div>
            ) : (
              <>
                <div className="grid sm:grid-cols-2 lg:grid-cols-4 xl:grid-cols-4 gap-6">
                  {shops.map((shop) => (
                    <div
                      key={shop.id}
                      className="bg-white dark:bg-slate-800 rounded-2xl overflow-hidden shadow-sm hover:shadow-xl transition-all border border-slate-100 dark:border-slate-700 flex flex-col"
                    >
                      <div className="relative h-48 bg-slate-100 dark:bg-slate-900">
                        <img
                          src={
                            shop.shopImage?.startsWith("http")
                              ? shop.shopImage
                              : `https://api.mapman.in${shop.shopImage}`
                          }
                          alt={shop.shopName || "Shop"}
                          className="w-full h-full object-cover"
                          onError={(e) => {
                            (e.target as HTMLImageElement).src =
                              "https://images.unsplash.com/photo-1441986300917-64674bd600d8?auto=format&fit=crop&q=80&w=400";
                          }}
                        />
                        <div className="absolute top-3 right-3 bg-white/90 backdrop-blur-sm px-2 py-1 rounded-lg text-sm font-semibold flex items-center gap-1 shadow-sm text-slate-700">
                          <Star className="w-4 h-4 text-accent fill-accent" />{" "}
                          {4.5}
                        </div>
                      </div>
                      <div className="p-4 flex flex-col flex-1">
                        <h3 className="font-bold text-lg mb-1 line-clamp-1">
                          {shop.shopName}
                        </h3>
                        <p className="text-sm text-slate-500 mb-4 flex items-start gap-1.5 line-clamp-2">
                          <MapPin className="w-4 h-4 shrink-0 mt-0.5" />{" "}
                          {shop.address}
                        </p>
                        <span className="text-xs font-semibold text-primary bg-primary/10 px-2 py-1 rounded-md w-fit mb-4 capitalize">
                          {shop.category || "General"}
                        </span>

                        <div className="flex gap-2 mt-auto">
                          <Link
                            href={`/shop/${shop.id}`}
                            className="flex-1 flex items-center justify-center gap-1.5 py-2 rounded-lg bg-primary text-white hover:bg-primary/90 text-sm font-semibold transition-colors"
                          >
                            <Navigation className="w-4 h-4" /> View
                          </Link>
                          <button onClick={() => shop.id && handleRemoveShop(shop.id)} className="px-4 flex items-center justify-center rounded-lg bg-red-50 text-red-600 hover:bg-red-100 dark:bg-red-500/10 dark:hover:bg-red-500/20 transition-colors">
                            <Trash2 className="w-4 h-4" />
                          </button>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
                {hasMoreShops && (
                  <div className="mt-12 flex justify-center">
                    <button
                      onClick={handleLoadMoreShops}
                      disabled={loadingMoreShops}
                      className="inline-flex items-center gap-3 bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-slate-700 dark:text-slate-200 hover:bg-slate-50 dark:hover:bg-slate-700 px-6 py-3 rounded-xl font-bold shadow-sm transition-all duration-300 disabled:opacity-70 disabled:cursor-not-allowed"
                    >
                      {loadingMoreShops ? (
                        <>
                          <Loader2 className="w-4 h-4 animate-spin" />{" "}
                          Loading...
                        </>
                      ) : (
                        "Load More Shops"
                      )}
                    </button>
                  </div>
                )}
              </>
            )}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
