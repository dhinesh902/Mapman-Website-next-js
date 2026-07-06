"use client";

import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  ArrowRight,
  Play,
  MapPin,
  Star,
  Clock,
  CheckCircle2,
  Loader2,
  ChevronLeft,
  ChevronRight,
} from "lucide-react";
import Link from "next/link";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { getHomeData } from "@/services/apiService";
import { TopBanner, Category, CategoryBanner, Shop } from "@/models/home_model";

const stats = [
  { label: "Shops", value: "100+" },
  { label: "Cities", value: "500+" },
  { label: "Users", value: "100+" },
  { label: "Searches", value: "200+" },
];

const featuredLocations = [
  {
    id: 1,
    name: "Grand Palace Hotel",
    rating: 4.8,
    address: "Downtown, Chennai",
    category: "Hotels",
    isOpen: true,
    image:
      "https://images.unsplash.com/photo-1566073771259-6a8506099945?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
  },
  {
    id: 2,
    name: "Green Leaf Restaurant",
    rating: 4.6,
    address: "T Nagar, Chennai",
    category: "Restaurants",
    isOpen: true,
    image:
      "https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
  },
  {
    id: 3,
    name: "City Care Hospital",
    rating: 4.9,
    address: "Anna Nagar, Chennai",
    category: "Hospitals",
    isOpen: false,
    image:
      "https://images.unsplash.com/photo-1519494026892-80bbd2d6fd0d?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
  },
  {
    id: 4,
    name: "Supermart Grocery",
    rating: 4.5,
    address: "Velachery, Chennai",
    category: "Grocery",
    isOpen: true,
    image:
      "https://images.unsplash.com/photo-1534723452862-4c874018d66d?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
  },
];

const features = [
  {
    title: "Accurate Location Tracking",
    desc: "Pinpoint accuracy using advanced geolocation.",
  },
  {
    title: "Verified Business Listings",
    desc: "100% genuine and verified local businesses.",
  },
  {
    title: "Easy Navigation",
    desc: "Seamless routing and direction assistance.",
  },
  {
    title: "Real-Time Updates",
    desc: "Live status of business hours and availability.",
  },
];

const getImageUrl = (url: string | null) => {
  if (!url) return "";
  if (url.startsWith("http")) return url;
  return `https://api.mapman.in${url}`;
};

const checkIfOpen = (openTime?: string, closeTime?: string) => {
  if (!openTime || !closeTime) return true; // Default to open
  try {
    const now = new Date();
    const currentTime = now.getHours() * 60 + now.getMinutes();

    const parseTime = (timeStr: string) => {
      const match = timeStr.trim().match(/(\d+):(\d+)\s*(AM|PM)/i);
      if (!match) return -1;
      let hours = parseInt(match[1]);
      const minutes = parseInt(match[2]);
      const period = match[3].toUpperCase();
      if (period === 'PM' && hours < 12) hours += 12;
      if (period === 'AM' && hours === 12) hours = 0;
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

const getHoverImage = (shop: Shop) => {
  return shop.image1 || shop.image2 || shop.image3 || shop.image4 || null;
};

export default function Home() {
  const router = useRouter();
  const [loading, setLoading] = useState(true);
  const [topBanners, setTopBanners] = useState<TopBanner[]>([]);
  const [categories, setCategories] = useState<Category[]>([]);
  const [categoryBanners, setCategoryBanners] = useState<CategoryBanner[]>([]);
  const [shops, setShops] = useState<Shop[]>([]);
  const [currentBannerIdx, setCurrentBannerIdx] = useState(0);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await getHomeData();
        if (response.status === 200 && response.data) {
          setTopBanners(response.data.topBanners || []);

          let fetchedCategories: Category[] = response.data.category || [];
          fetchedCategories = fetchedCategories.filter(
            (c) => c.categoryImage !== null,
          );

          const othersCategory = fetchedCategories.find(
            (c) => c.categoryName.toLowerCase() === "others",
          );
          const otherCategories = fetchedCategories.filter(
            (c) => c.categoryName.toLowerCase() !== "others",
          );

          if (othersCategory) {
            otherCategories.push(othersCategory);
          }

          setCategories(otherCategories);
          setCategoryBanners(response.data.categoryBanners || []);
          setShops(response.data.shops || []);
        }
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  useEffect(() => {
    if (topBanners.length > 1) {
      const interval = setInterval(() => {
        setCurrentBannerIdx((prev) => (prev + 1) % topBanners.length);
      }, 5000);
      return () => clearInterval(interval);
    }
  }, [topBanners]);

  const nextBanner = () => {
    setCurrentBannerIdx((prev) => (prev + 1) % topBanners.length);
  };
  const prevBanner = () => {
    setCurrentBannerIdx(
      (prev) => (prev - 1 + topBanners.length) % topBanners.length,
    );
  };

  if (loading) {
    return (
      <div className="min-h-[70vh] flex flex-col items-center justify-center">
        <Loader2 className="w-10 h-10 animate-spin text-primary mb-4" />
        <p className="text-slate-500 font-medium">Loading MAPMAN...</p>
      </div>
    );
  }

  const mainBanner = topBanners.length > 0 ? topBanners[0] : null;

  return (
    <div className="flex flex-col gap-12 pb-16 overflow-x-hidden">
      {/* Top Banner Section (Full Width, 0 Radius) */}
      <section className="relative w-full overflow-hidden bg-slate-900">
        {topBanners.length > 0 ? (
          <div className="relative w-full h-[500px] sm:h-[600px] lg:h-[85vh] lg:min-h-[700px] group overflow-hidden">
            <AnimatePresence mode="popLayout" initial={false}>
              <motion.div
                key={currentBannerIdx}
                initial={{ x: "100%", opacity: 1 }}
                animate={{ x: 0, opacity: 1 }}
                exit={{ x: "-100%", opacity: 1 }}
                transition={{ duration: 0.6, ease: "easeInOut" }}
                className="absolute inset-0"
              >
                <Image
                  src={getImageUrl(
                    topBanners[currentBannerIdx].backgroundImage,
                  )}
                  alt="Top Banner"
                  fill
                  className="object-cover object-center"
                  priority
                />
              </motion.div>
            </AnimatePresence>

            {/* Overlay if there's text/contact in future, currently kept subtle */}
            <div className="absolute inset-0 bg-gradient-to-t from-black/20 via-transparent to-transparent" />

            {/* Nav Arrows */}
            {topBanners.length > 1 && (
              <>
                <button
                  onClick={prevBanner}
                  className="absolute left-4 top-1/2 -translate-y-1/2 bg-white/30 hover:bg-white/90 text-white hover:text-black p-2 rounded-full backdrop-blur-sm transition-all opacity-0 group-hover:opacity-100"
                >
                  <ChevronLeft className="w-6 h-6" />
                </button>
                <button
                  onClick={nextBanner}
                  className="absolute right-4 top-1/2 -translate-y-1/2 bg-white/30 hover:bg-white/90 text-white hover:text-black p-2 rounded-full backdrop-blur-sm transition-all opacity-0 group-hover:opacity-100"
                >
                  <ChevronRight className="w-6 h-6" />
                </button>

                {/* Dots */}
                <div className="absolute bottom-6 left-1/2 -translate-x-1/2 flex gap-2">
                  {topBanners.map((_, i) => (
                    <button
                      key={i}
                      onClick={() => setCurrentBannerIdx(i)}
                      className={`w-2.5 h-2.5 rounded-full transition-all ${i === currentBannerIdx ? "bg-white w-6" : "bg-white/50"}`}
                    />
                  ))}
                </div>
              </>
            )}
          </div>
        ) : (
          <div className="w-full h-[300px] bg-slate-100 dark:bg-slate-800 flex items-center justify-center text-slate-400">
            No Banners Available
          </div>
        )}
      </section>

      {/* Hero Info Card (Reverted to old 2-column layout but smaller text) */}
      <section className="w-full px-2 md:px-4 lg:px-8 mt-4">
        <div className="bg-primary/5 dark:bg-slate-800/30 rounded-3xl p-6 md:p-12 border border-primary/10 dark:border-slate-700">
          <div className="grid lg:grid-cols-2 gap-8 lg:gap-12 items-center">
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5 }}
            >
              <h1 className="text-2xl md:text-3xl lg:text-4xl font-extrabold tracking-tight text-foreground mb-4 leading-tight font-heading">
                Discover Nearby Businesses with{" "}
                <span className="text-primary bg-clip-text text-transparent bg-gradient-to-r from-primary to-accent">
                  MAPMAN
                </span>
              </h1>
              <p className="text-sm md:text-base text-slate-600 dark:text-slate-400 mb-6 max-w-lg">
                Find trusted shops, services, and local businesses around you
                instantly using our interactive map platform.
              </p>
              <div className="flex flex-wrap gap-3 mb-8">
                <Link
                  href="/map"
                  className="inline-flex items-center justify-center gap-2 bg-primary hover:bg-primary/90 text-white px-5 py-2.5 rounded-full font-medium transition-transform hover:scale-105 shadow-md shadow-primary/25 text-sm"
                >
                  <MapPin className="w-4 h-4" />
                  Explore Map
                </Link>
                <Link
                  href="/videos"
                  className="inline-flex items-center justify-center gap-2 bg-white dark:bg-slate-800 hover:bg-slate-50 dark:hover:bg-slate-700 text-slate-900 dark:text-white px-5 py-2.5 rounded-full font-medium transition-transform hover:scale-105 shadow-md shadow-slate-200/50 dark:shadow-none border border-slate-200 dark:border-slate-700 text-sm"
                >
                  <Play className="w-4 h-4 text-primary" />
                  Watch Videos
                </Link>
              </div>

              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                {stats.map((stat, idx) => (
                  <motion.div
                    key={stat.label}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.2 + idx * 0.1 }}
                    className="bg-white dark:bg-slate-800 p-3 rounded-xl shadow-sm border border-slate-100 dark:border-slate-700 text-center"
                  >
                    <div className="text-lg md:text-xl font-bold text-primary mb-0.5">
                      {stat.value}
                    </div>
                    <div className="text-xs text-slate-500 font-medium">
                      {stat.label}
                    </div>
                  </motion.div>
                ))}
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="relative hidden lg:block"
            >
              <div className="absolute inset-0 bg-gradient-to-tr from-primary/20 to-accent/20 rounded-full blur-3xl" />
              <Image
                src={
                  mainBanner?.image
                    ? getImageUrl(mainBanner.image)
                    : "https://images.unsplash.com/photo-1524661135-423995f22d0b?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80"
                }
                alt="Map Navigation"
                width={500}
                height={500}
                className="relative z-10 rounded-3xl shadow-xl border-4 border-white dark:border-slate-800 object-cover aspect-[4/3] bg-white w-full"
              />
            </motion.div>
          </div>
        </div>
      </section>

      {/* Categories Grid (4 per row) */}
      {categories.length > 0 && (
        <section className="w-full px-2 md:px-4 lg:px-8 mt-4">
          <div className="flex items-end justify-between mb-8">
            <div>
              <h2 className="text-xl md:text-2xl font-bold font-heading mb-1">
                Browse Categories
              </h2>
              <p className="text-slate-500 text-sm md:text-base">
                Explore businesses by categories
              </p>
            </div>
            <Link
              href="/shoplist"
              className="text-primary font-medium flex items-center gap-1 hover:gap-2 transition-all text-sm md:text-base"
            >
              View All <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-4 md:gap-6">
            {categories.map((category, idx) => (
              <motion.div
                key={category.id}
                onClick={() => router.push(`/map?category=${encodeURIComponent(category.categoryName)}`)}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-50px" }}
                transition={{
                  delay: (idx % 6) * 0.1,
                  duration: 0.5,
                  ease: "easeOut",
                }}
                className="group cursor-pointer relative bg-white dark:bg-slate-900/80 backdrop-blur-xl rounded-[2.5rem] border border-slate-100 dark:border-slate-800/60 shadow-sm hover:shadow-xl hover:shadow-primary/10 transition-all duration-300 p-6 pb-8 flex flex-col items-center justify-center gap-4 overflow-hidden z-10"
              >
                {/* Background decorative elements */}
                <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-bl from-primary/5 to-transparent rounded-bl-full -z-10 group-hover:scale-125 transition-transform duration-700" />
                <div className="absolute bottom-0 left-0 w-full h-1.5 bg-gradient-to-r from-primary to-accent transform scale-x-0 group-hover:scale-x-100 transition-transform duration-500 origin-left" />

                <div className="relative w-20 h-20 md:w-24 md:h-24 bg-slate-50 dark:bg-slate-800 rounded-full flex items-center justify-center p-5 group-hover:bg-gradient-to-br group-hover:from-primary group-hover:to-accent transition-colors duration-300 shadow-inner group-hover:shadow-primary/40 group-hover:-translate-y-1">
                  <div className="relative w-full h-full group-hover:scale-110 transition-transform duration-300">
                    <Image
                      src={getImageUrl(category.categoryImage)}
                      alt={category.categoryName}
                      fill
                      className="object-contain"
                    />
                  </div>
                </div>

                <div className="text-center z-10 flex flex-col items-center">
                  <h3 className="font-extrabold text-sm md:text-base text-slate-800 dark:text-slate-100 capitalize line-clamp-1 group-hover:text-primary group-hover:-translate-y-1 transition-all duration-300">
                    {category.categoryName}
                  </h3>
                  <div className="absolute bottom-3 md:bottom-4 opacity-0 translate-y-2 group-hover:opacity-100 group-hover:translate-y-0 transition-all duration-300 flex items-center justify-center gap-1 text-[10px] md:text-xs text-primary font-bold uppercase tracking-wider">
                    Explore <ArrowRight className="w-3 h-3" />
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </section>
      )}

      {/* Category Banners (Professional Enhancement) */}
      {categoryBanners.length > 0 && (
        <section className="w-full px-2 md:px-4 lg:px-8">
          <div className="mb-8">
            <h2 className="text-xl md:text-2xl font-bold font-heading mb-1">
              Popular Sections
            </h2>
            <p className="text-slate-500 text-sm md:text-base">
              Explore trending categories tailored for you
            </p>
          </div>
          <div className="grid md:grid-cols-3 gap-4 lg:gap-6">
            {categoryBanners.map((banner, idx) => (
              <motion.div
                key={banner.id}
                initial={{ opacity: 0, y: 40 }}
                onClick={() => router.push(`/map?category=${encodeURIComponent(banner.category)}`)}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: idx * 0.1, duration: 0.7, ease: "easeOut" }}
                className="relative rounded-[2rem] overflow-hidden group h-[250px] md:h-[280px] lg:h-[320px] flex flex-col justify-end shadow-lg hover:shadow-2xl hover:shadow-primary/20 transition-all duration-500 z-10 cursor-pointer"
              >
                {/* Image */}
                <Image
                  src={getImageUrl(banner.backgroundImage)}
                  alt={banner.title}
                  fill
                  className="object-cover transition-transform duration-700 group-hover:scale-110"
                />
                
                {/* Overlays */}
                <div className="absolute inset-0 bg-gradient-to-b from-transparent via-black/10 to-black/90 z-0 pointer-events-none" />
                <div className="absolute inset-0 bg-gradient-to-tr from-primary/40 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-700 z-0 mix-blend-overlay pointer-events-none" />
                
                {/* Category Badge - Top Right */}
                <div className="absolute top-5 right-5 z-20">
                  <div className="px-4 py-1.5 bg-black/40 backdrop-blur-md border border-white/20 rounded-full text-white text-[10px] font-bold uppercase tracking-[0.2em] shadow-lg overflow-hidden relative group/badge transition-colors hover:bg-black/60">
                    <div className="absolute inset-0 bg-gradient-to-r from-primary to-accent opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none" />
                    <span className="relative z-10">{banner.category}</span>
                  </div>
                </div>

                {/* Content Box (Glassmorphism) */}
                <div className="relative z-20 p-3 md:p-4 w-full transform transition-transform duration-500 translate-y-3 group-hover:translate-y-0">
                  <div className="bg-white/10 backdrop-blur-xl border border-white/20 rounded-2xl p-4 shadow-2xl relative overflow-hidden group-hover:bg-white/20 transition-colors duration-500">
                    <div className="absolute inset-0 bg-gradient-to-br from-white/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none" />
                    
                    <h3 className="text-lg md:text-xl lg:text-2xl font-black text-white mb-1 capitalize drop-shadow-md relative z-10">
                      {banner.title}
                    </h3>
                    
                    <div className="flex items-center justify-between relative z-10 mt-2">
                      <span className="text-slate-200 text-xs md:text-sm font-semibold flex items-center gap-2 group-hover:text-white transition-colors">
                        {banner.contact || "Explore Collection"}
                      </span>
                      <div className="w-8 h-8 md:w-10 md:h-10 rounded-full bg-white text-slate-900 flex items-center justify-center transform group-hover:-rotate-45 group-hover:bg-primary group-hover:text-white transition-all duration-300 shadow-md shrink-0">
                        <ArrowRight className="w-4 h-4 md:w-5 md:h-5" />
                      </div>
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </section>
      )}

      {/* Featured Locations */}
      <section className="w-full px-2 md:px-4 lg:px-8">
        <div className="mb-8">
          <h2 className="text-xl md:text-2xl font-bold font-heading mb-1">
            Featured Locations
          </h2>
          <p className="text-slate-500 text-sm md:text-base">
            Top rated businesses around you
          </p>
        </div>
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4 lg:gap-6">
          {shops.map((shop, idx) => {
            const isOpen = checkIfOpen(shop.openTime, shop.closeTime);
            const hoverImage = getHoverImage(shop);
            const hasHoverImage = !!hoverImage;

            return (
              <motion.div
                key={shop.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: idx * 0.1, duration: 0.5 }}
                className="group relative bg-white dark:bg-slate-900 rounded-[2rem] overflow-hidden border border-slate-100 dark:border-slate-800/60 hover:border-primary/40 shadow-md hover:shadow-2xl hover:shadow-primary/20 transition-all duration-500 flex flex-col hover:-translate-y-2 z-10"
              >
                <div className="relative h-48 lg:h-56 overflow-hidden bg-slate-100 dark:bg-slate-800 m-2 rounded-[1.5rem]">
                  <Image
                    src={
                      shop.shopImage
                        ? getImageUrl(shop.shopImage)
                        : "https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80"
                    }
                    alt={shop.shopName || "Shop"}
                    fill
                    className={`object-cover transition-transform duration-700 ${hasHoverImage ? 'group-hover:opacity-0 group-hover:scale-110' : 'group-hover:scale-110'}`}
                  />
                  {hasHoverImage && (
                    <Image
                      src={getImageUrl(hoverImage)}
                      alt={shop.shopName || "Shop Hover"}
                      fill
                      className="object-cover opacity-0 group-hover:opacity-100 transition-all duration-700 group-hover:scale-110"
                    />
                  )}
                  {/* Glassmorphism Overlays */}
                  <div className="absolute inset-0 bg-gradient-to-t from-slate-900/90 via-slate-900/20 to-transparent opacity-70 group-hover:opacity-90 transition-opacity duration-500 pointer-events-none" />

                  <div className="absolute top-3 right-3 flex flex-col gap-2 z-20">
                    <div className="bg-white/90 dark:bg-slate-900/90 backdrop-blur-md px-2.5 py-1.5 rounded-xl text-xs font-bold flex items-center gap-1.5 shadow-lg text-slate-900 dark:text-white border border-white/20">
                      <Star className="w-3.5 h-3.5 text-amber-500 fill-amber-500" /> 4.5
                    </div>
                  </div>

                  <div className="absolute bottom-3 left-3 right-3 flex items-center justify-between z-20">
                    <span className="text-[10px] font-bold uppercase tracking-wider bg-white/20 backdrop-blur-md border border-white/30 text-white px-3 py-1.5 rounded-xl shadow-lg truncate max-w-[50%]">
                      {shop.category}
                    </span>
                    <div className={`flex items-center gap-1.5 text-[10px] font-bold uppercase tracking-wider px-3 py-1.5 rounded-xl shadow-lg backdrop-blur-md border shrink-0 ${isOpen ? 'bg-emerald-500/30 text-emerald-100 border-emerald-500/50' : 'bg-red-500/30 text-red-100 border-red-500/50'}`}>
                      <Clock className="w-3 h-3" />
                      {isOpen ? 'Open' : 'Closed'}
                    </div>
                  </div>
                </div>

                <div className="p-5 lg:p-6 flex flex-col flex-1 relative bg-white dark:bg-slate-900 z-20">
                  <h3 className="font-extrabold text-xl md:text-xl text-slate-900 dark:text-white mb-2 line-clamp-1 group-hover:text-primary transition-colors">
                    {shop.shopName}
                  </h3>

                  <div className="text-slate-500 dark:text-slate-400 text-sm mb-5 flex items-start gap-2.5 leading-relaxed">
                    <div className="bg-primary/10 p-1.5 rounded-lg text-primary mt-0.5 shrink-0">
                      <MapPin className="w-3.5 h-3.5" />
                    </div>
                    <span className="line-clamp-2 font-medium">{shop.address}</span>
                  </div>

                  <div className="mt-auto pt-2">
                    <Link href={`/shop/${shop.id}`} className="w-full bg-slate-50 hover:bg-gradient-to-r hover:from-primary hover:to-accent text-slate-700 hover:text-white dark:bg-slate-800 dark:hover:text-white transition-all duration-300 py-3.5 rounded-xl font-bold text-sm flex items-center justify-center gap-2 group/btn shadow-sm hover:shadow-lg hover:shadow-primary/25 border border-slate-100 dark:border-slate-700/50 hover:border-transparent">
                      View Details
                      <ArrowRight className="w-4 h-4 group-hover/btn:translate-x-1 transition-transform" />
                    </Link>
                  </div>
                </div>
              </motion.div>
            );
          })}
        </div>
      </section>

      {/* Why Choose Us */}
      <section className="w-full px-2 md:px-4 lg:px-8 mb-4">
        <div className="bg-gradient-to-br from-primary/5 to-accent/5 dark:from-slate-800/80 dark:to-slate-800/50 rounded-3xl p-6 md:p-12 border border-primary/10 dark:border-slate-700 relative overflow-hidden">
          {/* Decorative blur */}
          <div className="absolute top-0 right-0 w-64 h-64 bg-primary/10 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2" />

          <div className="text-center mb-10 md:mb-14 relative z-10">
            <h2 className="text-2xl md:text-3xl font-extrabold font-heading mb-3">
              Why Choose MAPMAN
            </h2>
            <p className="text-slate-500 text-sm md:text-base max-w-2xl mx-auto">
              We provide the most reliable and easy-to-use platform for
              discovering businesses around your location.
            </p>
          </div>
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6 relative z-10">
            {features.map((feature, idx) => (
              <motion.div
                key={feature.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: idx * 0.1 }}
                className="relative bg-white dark:bg-slate-900 p-6 md:p-8 rounded-[2rem] shadow-lg border border-slate-100 dark:border-slate-800 group hover:-translate-y-2 hover:shadow-xl hover:shadow-primary/10 transition-all duration-500 overflow-hidden z-10"
              >
                <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-bl from-primary/10 to-transparent rounded-bl-[100px] -z-10 group-hover:scale-110 transition-transform duration-500" />

                <div className="w-14 h-14 bg-gradient-to-br from-primary to-accent rounded-2xl flex items-center justify-center text-white mb-6 shadow-lg shadow-primary/30 group-hover:scale-110 group-hover:-rotate-3 transition-transform duration-500">
                  <CheckCircle2 className="w-7 h-7" />
                </div>
                <h3 className="font-extrabold text-lg md:text-xl text-slate-900 dark:text-white mb-3 group-hover:text-primary transition-colors duration-300">
                  {feature.title}
                </h3>
                <p className="text-slate-500 text-sm md:text-base leading-relaxed font-medium">
                  {feature.desc}
                </p>

                <div className="absolute bottom-0 left-10 right-10 h-1 bg-gradient-to-r from-primary to-accent rounded-t-full opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
              </motion.div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
