"use client";

import { useEffect, useState, use } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  MapPin,
  Star,
  Clock,
  Phone,
  Globe,
  Loader2,
  Video as VideoIcon,
  Play,
  ArrowLeft,
  X,
} from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { getShopById } from "@/services/apiService";
import { Shop } from "@/models/home_model";
import { CategoryVideoData } from "@/models/videos_model";

const getImageUrl = (url: string | null) => {
  if (!url) return "";
  if (url.startsWith("http")) return url;
  return `https://api.mapman.in${url}`;
};

const checkIfOpen = (openTime?: string, closeTime?: string) => {
  if (!openTime || !closeTime) return true;
  try {
    const now = new Date();
    const currentTime = now.getHours() * 60 + now.getMinutes();

    const parseTime = (timeStr: string) => {
      const match = timeStr.trim().match(/(\d+):(\d+)\s*(AM|PM)/i);
      if (!match) return -1;
      let hours = parseInt(match[1]);
      const minutes = parseInt(match[2]);
      const period = match[3].toUpperCase();
      if (period === "PM" && hours < 12) hours += 12;
      if (period === "AM" && hours === 12) hours = 0;
      return hours * 60 + minutes;
    };

    const openMinutes = parseTime(openTime);
    const closeMinutes = parseTime(closeTime);

    if (openMinutes === -1 || closeMinutes === -1) return true;

    if (closeMinutes < openMinutes) {
      return currentTime >= openMinutes || currentTime <= closeMinutes;
    }
    return currentTime >= openMinutes && currentTime <= closeMinutes;
  } catch (e) {
    return true;
  }
};

export default function ShopDetailsPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const unwrappedParams = use(params);
  const shopId = unwrappedParams.id;

  const [shop, setShop] = useState<Shop | null>(null);
  const [videos, setVideos] = useState<CategoryVideoData[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [selectedImage, setSelectedImage] = useState<string | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      try {
        try {
          const shopRes = await getShopById(shopId);
          if (shopRes && shopRes.status === 200 && shopRes.data) {
            setShop(shopRes.data.shop || null);
            setVideos(shopRes.data.shopVideos || []);
          } else {
            setError("Shop not found.");
          }
        } catch (e) {
          console.error("Could not fetch individual shop", e);
          setError("Failed to load shop details.");
        }
      } catch (err) {
        console.error(err);
        setError("Failed to load shop details.");
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [shopId]);

  if (loading) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center">
        <Loader2 className="w-10 h-10 animate-spin text-primary mb-4" />
        <p className="text-slate-500 font-medium">Loading Shop Details...</p>
      </div>
    );
  }

  if (error || !shop) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center text-center px-4">
        <h2 className="text-2xl font-bold text-slate-800 dark:text-white mb-2">
          Oops!
        </h2>
        <p className="text-slate-500 mb-6">{error || "Shop not found."}</p>
        <Link
          href="/"
          className="bg-primary text-white px-6 py-2.5 rounded-full font-bold shadow-lg hover:shadow-primary/30 transition-all"
        >
          Go Back Home
        </Link>
      </div>
    );
  }

  const isOpen = checkIfOpen(shop.openTime, shop.closeTime);

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-950 pb-20">
      {/* Header Banner */}
      <div className="relative w-full h-[300px] md:h-[400px] lg:h-[450px]">
        <div
          className="absolute inset-0 cursor-pointer"
          onClick={() =>
            setSelectedImage(
              shop.shopImage
                ? getImageUrl(shop.shopImage)
                : "https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&q=80",
            )
          }
        >
          <Image
            src={
              shop.shopImage
                ? getImageUrl(shop.shopImage)
                : "https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&q=80"
            }
            alt={shop.shopName || "Shop"}
            fill
            className="object-cover"
          />
        </div>
        <div className="absolute inset-0 bg-gradient-to-t from-slate-900 via-slate-900/40 to-black/20 pointer-events-none" />

        <div className="absolute top-24 left-4 md:left-8 z-20">
          <Link
            href="/"
            className="bg-white/20 hover:bg-white/40 backdrop-blur-md p-2 rounded-full text-white inline-flex items-center justify-center transition-colors"
          >
            <ArrowLeft className="w-6 h-6" />
          </Link>
        </div>

        <div className="absolute bottom-0 left-0 w-full p-4 md:p-8 lg:p-12 z-20">
          <div className="max-w-[1920px] mx-auto flex flex-col md:flex-row gap-6 md:items-end justify-between">
            <div>
              <div className="flex flex-wrap items-center gap-3 mb-3">
                <span className="px-3 py-1 bg-primary text-white text-xs font-bold uppercase tracking-wider rounded-lg shadow-lg">
                  {shop.category || "General"}
                </span>
                <span
                  className={`flex items-center gap-1.5 px-3 py-1 text-xs font-bold uppercase tracking-wider rounded-lg shadow-lg backdrop-blur-md border ${isOpen
                      ? "bg-emerald-500/80 text-white border-emerald-400"
                      : "bg-red-500/80 text-white border-red-400"
                    }`}
                >
                  <Clock className="w-3 h-3" />
                  {isOpen ? "Open Now" : "Closed"}
                </span>
                {shop.openTime && shop.closeTime && (
                  <span className="text-white/80 text-sm font-medium">
                    {shop.openTime} - {shop.closeTime}
                  </span>
                )}
              </div>

              <h1 className="text-3xl md:text-4xl lg:text-5xl font-extrabold text-white mb-2 leading-tight">
                {shop.shopName}
              </h1>

              <p className="text-white/80 font-medium flex items-start gap-2 max-w-2xl">
                <MapPin className="w-5 h-5 shrink-0 mt-0.5 text-primary" />
                <span>{shop.address}</span>
              </p>
            </div>

            <div className="flex items-center gap-4 bg-white/10 backdrop-blur-md p-4 rounded-2xl border border-white/20 shadow-xl">
              <div className="text-center">
                <div className="flex items-center gap-1 text-amber-400 font-bold text-2xl">
                  <Star className="w-6 h-6 fill-amber-400" /> 4.8
                </div>
                <span className="text-white/70 text-xs uppercase tracking-wider font-semibold">
                  Ratings
                </span>
              </div>
              <div className="w-px h-10 bg-white/20 mx-2" />
              <div className="flex gap-2">
                {shop.whatsappNumber && (
                  <a
                    href={`https://wa.me/${shop.whatsappNumber}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-12 h-12 rounded-xl bg-[#25D366] text-white flex items-center justify-center hover:scale-110 transition-transform shadow-lg shadow-[#25D366]/30"
                  >
                    <svg
                      viewBox="0 0 24 24"
                      className="w-6 h-6 fill-current"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51a12.8 12.8 0 0 0-.57-.01c-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 0 1-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 0 1-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 0 1 2.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0 0 12.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 0 0 5.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 0 0-3.48-8.413Z" />
                    </svg>
                  </a>
                )}
                {shop.websiteLink && (
                  <a
                    href={shop.websiteLink}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-12 h-12 rounded-xl bg-primary text-white flex items-center justify-center hover:scale-110 transition-transform shadow-lg shadow-primary/30"
                  >
                    <Globe className="w-6 h-6" />
                  </a>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-[1920px] mx-auto px-4 md:px-8 py-8 md:py-12">
        <div className="grid lg:grid-cols-3 gap-8">
          {/* Left Column: Details */}
          <div className="lg:col-span-1 space-y-8">
            <div className="bg-white dark:bg-slate-900 rounded-[2rem] p-6 md:p-8 shadow-sm border border-slate-100 dark:border-slate-800">
              <h3 className="text-xl font-bold font-heading mb-6 flex items-center gap-2 text-slate-900 dark:text-white">
                <div className="w-8 h-8 rounded-lg bg-primary/10 text-primary flex items-center justify-center">
                  <Phone className="w-4 h-4" />
                </div>
                Contact Information
              </h3>

              <div className="space-y-4">
                {shop.whatsappNumber && (
                  <div className="flex flex-col">
                    <span className="text-sm text-slate-500 font-medium">
                      WhatsApp Number
                    </span>
                    <span className="text-slate-900 dark:text-white font-bold">
                      {shop.whatsappNumber}
                    </span>
                  </div>
                )}

                {shop.registerNumber && (
                  <div className="flex flex-col">
                    <span className="text-sm text-slate-500 font-medium">
                      Register Number
                    </span>
                    <span className="text-slate-900 dark:text-white font-bold">
                      {shop.registerNumber}
                    </span>
                  </div>
                )}

                {shop.shopNumber && (
                  <div className="flex flex-col">
                    <span className="text-sm text-slate-500 font-medium">
                      Shop Number
                    </span>
                    <span className="text-slate-900 dark:text-white font-bold">
                      {shop.shopNumber}
                    </span>
                  </div>
                )}

                {shop.websiteLink && (
                  <div className="flex flex-col">
                    <span className="text-sm text-slate-500 font-medium">
                      Website
                    </span>
                    <a
                      href={shop.websiteLink}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-primary font-bold hover:underline break-all"
                    >
                      {shop.websiteLink}
                    </a>
                  </div>
                )}
              </div>
            </div>

            {shop.description && (
              <div className="bg-white dark:bg-slate-900 rounded-[2rem] p-6 md:p-8 shadow-sm border border-slate-100 dark:border-slate-800">
                <h3 className="text-xl font-bold font-heading mb-4 text-slate-900 dark:text-white">
                  About the Shop
                </h3>
                <p className="text-slate-600 dark:text-slate-400 leading-relaxed font-medium">
                  {shop.description}
                </p>
              </div>
            )}

            {/* Gallery Preview if multiple images exist */}
            {(shop.image1 || shop.image2 || shop.image3 || shop.image4) && (
              <div className="bg-white dark:bg-slate-900 rounded-[2rem] p-6 md:p-8 shadow-sm border border-slate-100 dark:border-slate-800">
                <h3 className="text-xl font-bold font-heading mb-4 text-slate-900 dark:text-white">
                  Gallery
                </h3>
                <div className="grid grid-cols-2 gap-3">
                  {[shop.image1, shop.image2, shop.image3, shop.image4]
                    .filter((img): img is string => !!img)
                    .map((img, i) => (
                      <div
                        key={i}
                        onClick={() => setSelectedImage(getImageUrl(img))}
                        className="relative aspect-square rounded-xl overflow-hidden bg-slate-100 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 cursor-pointer group"
                      >
                        <Image
                          src={getImageUrl(img)}
                          alt="Gallery"
                          fill
                          className="object-cover group-hover:scale-110 transition-transform duration-500"
                        />
                      </div>
                    ))}
                </div>
              </div>
            )}
          </div>

          {/* Right Column: Videos */}
          <div className="lg:col-span-2 space-y-6">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-2xl font-bold font-heading flex items-center gap-2 text-slate-900 dark:text-white">
                <div className="w-10 h-10 rounded-xl bg-primary/10 text-primary flex items-center justify-center">
                  <VideoIcon className="w-5 h-5" />
                </div>
                Shop Videos
              </h2>
            </div>

            {videos.length === 0 ? (
              <div className="bg-white dark:bg-slate-900 rounded-[2rem] p-12 shadow-sm border border-slate-100 dark:border-slate-800 text-center flex flex-col items-center justify-center min-h-[300px]">
                <div className="w-20 h-20 bg-slate-50 dark:bg-slate-800 rounded-full flex items-center justify-center mb-4 text-slate-300 dark:text-slate-600">
                  <VideoIcon className="w-10 h-10" />
                </div>
                <h3 className="text-xl font-bold text-slate-900 dark:text-white mb-2">
                  No videos available
                </h3>
                <p className="text-slate-500">
                  This shop hasn't uploaded any videos yet.
                </p>
              </div>
            ) : (
              <div className="grid grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6">
                {videos.map((video, idx) => {
                  const mediaUrl = video.thumbnail
                    ? getImageUrl(video.thumbnail)
                    : getImageUrl(video.categoryVideo || "");
                  const isVideoFile =
                    mediaUrl.endsWith(".mp4") ||
                    mediaUrl.endsWith(".webm") ||
                    mediaUrl.endsWith(".m3u8");

                  return (
                    <motion.div
                      key={video.id || idx}
                      initial={{ opacity: 0, y: 20 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      viewport={{ once: true }}
                      transition={{ delay: idx * 0.1 }}
                      className="group relative bg-white dark:bg-slate-900 rounded-[2rem] overflow-hidden border border-slate-100 dark:border-slate-800/60 shadow-sm hover:shadow-xl hover:shadow-primary/20 transition-all duration-500 flex flex-col hover:-translate-y-1"
                    >
                      <div className="relative aspect-[4/3] overflow-hidden cursor-pointer bg-slate-100 dark:bg-slate-800 m-2 rounded-[1.5rem]">
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
                            alt={video.categoryName || "Video"}
                            className="object-cover w-full h-full group-hover:scale-110 transition-transform duration-700"
                          />
                        )}

                        <div className="absolute inset-0 bg-gradient-to-t from-slate-900/80 via-transparent to-transparent opacity-60 group-hover:opacity-80 transition-opacity duration-500" />

                        <div className="absolute inset-0 bg-black/10 group-hover:bg-black/30 transition-colors flex items-center justify-center opacity-0 group-hover:opacity-100">
                          <div className="w-14 h-14 bg-white/20 text-white rounded-full flex items-center justify-center shadow-[0_0_30px_rgba(255,255,255,0.2)] transform scale-90 group-hover:scale-100 transition-all duration-300 backdrop-blur-md border border-white/30">
                            <Play className="w-6 h-6 ml-1 fill-white" />
                          </div>
                        </div>
                      </div>

                      <div className="p-5 flex-1 bg-white dark:bg-slate-900 flex flex-col justify-center">
                        <h3 className="font-extrabold text-sm md:text-base capitalize text-slate-900 dark:text-white line-clamp-2 group-hover:text-primary transition-colors duration-300">
                          {video.categoryName || "Shop Video"}
                        </h3>
                        {video.createdAt && (
                          <span className="text-xs font-medium text-slate-500 mt-2 block">
                            {new Date(video.createdAt).toLocaleDateString(
                              undefined,
                              {
                                year: "numeric",
                                month: "long",
                                day: "numeric",
                              },
                            )}
                          </span>
                        )}
                      </div>
                    </motion.div>
                  );
                })}
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Image Sidebar */}
      <AnimatePresence>
        {selectedImage && (
          <>
            <motion.div
              initial={{ opacity: 0, backdropFilter: "blur(0px)" }}
              animate={{ opacity: 1, backdropFilter: "blur(4px)" }}
              exit={{ opacity: 0, backdropFilter: "blur(0px)" }}
              className="fixed inset-0 bg-slate-900/40 z-[100]"
              onClick={() => setSelectedImage(null)}
            />
            <motion.div
              initial={{ x: "100%", opacity: 0.5 }}
              animate={{ x: 0, opacity: 1 }}
              exit={{ x: "100%", opacity: 0.5 }}
              transition={{ type: "spring", damping: 30, stiffness: 300 }}
              className="fixed top-0 right-0 h-full w-full max-w-[32rem] bg-white dark:bg-slate-900 z-[101] shadow-2xl flex flex-col overflow-hidden border-l border-white/20 dark:border-slate-800/50"
            >
              <div className="flex items-center justify-between p-6 border-b border-slate-100 dark:border-slate-800">
                <h2 className="font-bold text-xl font-heading text-slate-900 dark:text-white">
                  Image Preview
                </h2>
                <button
                  onClick={() => setSelectedImage(null)}
                  className="p-2 bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-700 text-slate-500 rounded-full transition-all"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>
              <div className="flex-1 p-6 flex flex-col items-center justify-center bg-slate-50 dark:bg-slate-950 overflow-y-auto">
                <div className="relative w-full aspect-auto h-full max-h-[80vh] rounded-2xl overflow-hidden shadow-xl">
                  <Image
                    src={selectedImage}
                    alt="Preview"
                    fill
                    className="object-contain"
                  />
                </div>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </div>
  );
}
