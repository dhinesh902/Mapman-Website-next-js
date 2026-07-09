"use client";

import { useState, useEffect, Suspense } from "react";
import dynamic from "next/dynamic";
import { Search, Filter, Star, Navigation, MapPin, Loader2 } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useSearchParams, useRouter } from "next/navigation";
import { useAuth } from "@/providers/auth-provider";

// Dynamically import the map component with SSR disabled
const MapView = dynamic(() => import("./MapView"), {
  ssr: false,
  loading: () => (
    <div className="w-full h-full flex flex-col items-center justify-center bg-slate-50 dark:bg-slate-900 animate-pulse">
      <div className="w-16 h-16 border-4 border-primary border-t-transparent rounded-full animate-spin"></div>
      <p className="mt-4 text-slate-500 font-medium">Loading Map...</p>
    </div>
  ),
});

import { searchShops } from "@/services/apiService";
import { Shop } from "@/models/home_model";

const categories = [
  "All",
  "Theater",
  "Restaurant",
  "Hospital",
  "Bar",
  "Grocery",
  "Textile",
  "Resort",
  "Bunk",
  "Spa",
  "Hotel",
  "Jewellery",
  "Furniture",
  "Salons",
];

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

function MapPageContent() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const { isLoggedIn, openLoginSidebar } = useAuth();
  const catParam = searchParams.get("category");
  const [selectedCategory, setSelectedCategory] = useState(catParam || "All");
  const [shops, setShops] = useState<Shop[]>([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [isFetching, setIsFetching] = useState(true);
  const [selectedShopId, setSelectedShopId] = useState<string | null>(null);

  useEffect(() => {
    const fetchShops = async () => {
      setIsFetching(true);
      try {
        const query = (selectedCategory.toLowerCase() === "all" || selectedCategory.toLowerCase() === "others") ? "all" : selectedCategory.toLowerCase();
        const res = await searchShops(query);
        if (res && res.data) {
          setShops(res.data);
        } else {
          setShops([]);
        }
      } catch (err) {
        console.error(err);
        setShops([]);
      } finally {
        setIsFetching(false);
      }
    };
    fetchShops();
  }, [selectedCategory]);

  const filteredShops = shops.filter((shop) => {
    const matchCat =
      selectedCategory.toLowerCase() === "all" ||
      selectedCategory.toLowerCase() === "others" ||
      shop.category?.toLowerCase() === selectedCategory.toLowerCase();
    const query = searchQuery.toLowerCase();
    const matchSearch =
      shop.shopName?.toLowerCase().includes(query) ||
      shop.category?.toLowerCase().includes(query) ||
      shop.address?.toLowerCase().includes(query);
    return matchCat && !!matchSearch;
  });

  return (
    <div className="flex flex-col-reverse md:flex-row h-[calc(100vh-80px)] overflow-hidden">
      {/* Left Sidebar */}
      <div className="flex-1 md:flex-none w-full md:w-[400px] lg:w-[450px] bg-white dark:bg-slate-900 md:border-r border-slate-200 dark:border-slate-800 flex flex-col z-10 shadow-xl overflow-hidden">
        <div className="p-4 border-b border-slate-200 dark:border-slate-800 space-y-4">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400" />
            <input
              type="text"
              placeholder="Search shops, categories, address..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-10 pr-4 py-3 bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl focus:outline-none focus:ring-2 focus:ring-primary/50 transition-all text-sm"
            />
          </div>

          <div className="flex gap-2 overflow-x-auto pb-2 scrollbar-hide">
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setSelectedCategory(cat)}
                className={`px-4 py-2 rounded-lg text-sm font-medium whitespace-nowrap transition-colors ${selectedCategory.toLowerCase() === cat.toLowerCase()
                  ? "bg-primary text-white shadow-sm"
                  : "bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300 hover:bg-slate-200 dark:hover:bg-slate-700"
                  }`}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>

        <div className="flex-1 overflow-y-auto p-4 space-y-4 bg-slate-50/50 dark:bg-slate-900/50 relative">
          {isFetching ? (
            <div className="absolute inset-0 flex flex-col items-center justify-center bg-white/50 dark:bg-slate-900/50 backdrop-blur-sm z-20">
              <Loader2 className="w-8 h-8 animate-spin text-primary mb-2" />
              <span className="text-sm font-medium text-slate-500">Loading shops...</span>
            </div>
          ) : null}

          {filteredShops.map((shop) => {
            const isOpen = checkIfOpen(shop.openTime, shop.closeTime);
            return (
              <div
                key={shop.id}
                onClick={() => setSelectedShopId(shop.id ? String(shop.id) : null)}
                className="bg-white/80 dark:bg-slate-800/80 backdrop-blur-xl rounded-2xl p-3 flex gap-4 shadow-sm border border-slate-200/60 dark:border-slate-700/60 hover:shadow-lg hover:-translate-y-1 hover:border-primary/30 transition-all cursor-pointer group"
              >
                <div className="relative w-28 h-28 rounded-xl overflow-hidden shrink-0 shadow-inner">
                  <Image
                    src={
                      shop.shopImage
                        ? shop.shopImage.startsWith("http")
                          ? shop.shopImage
                          : `https://api.mapman.in${shop.shopImage}`
                        : "https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80"
                    }
                    alt={shop.shopName || "Shop"}
                    fill
                    className="object-cover group-hover:scale-110 transition-transform duration-500"
                  />
                  <div
                    className={`absolute top-2 left-2 px-1.5 py-0.5 rounded-md text-[9px] font-bold uppercase tracking-wider backdrop-blur-md border shadow-sm ${isOpen ? "bg-emerald-500/80 text-white border-emerald-400" : "bg-red-500/80 text-white border-red-400"}`}
                  >
                    {isOpen ? "Open" : "Closed"}
                  </div>
                </div>
                <div className="flex-1 min-w-0 flex flex-col">
                  <h3 className="font-extrabold text-foreground truncate group-hover:text-primary transition-colors text-base">
                    {shop.shopName}
                  </h3>
                  <div className="flex items-center gap-2 mt-1 mb-2">
                    <span className="text-[10px] font-bold uppercase tracking-wider bg-primary/10 text-primary px-2 py-0.5 rounded-md">
                      {shop.category}
                    </span>
                    <div className="flex items-center gap-0.5 text-xs font-semibold text-amber-500">
                      <Star className="w-3 h-3 fill-amber-500" /> 4.5
                    </div>
                  </div>
                  <p className="text-xs text-slate-500 flex items-start gap-1 line-clamp-2 leading-relaxed">
                    <MapPin className="w-3.5 h-3.5 shrink-0 mt-0.5" />
                    {shop.address}
                  </p>

                  <div className="mt-auto pt-2 flex gap-2">
                    <button 
                      onClick={(e) => {
                        e.stopPropagation();
                        if (shop.lat && shop.long) {
                          window.open(`https://www.google.com/maps/dir/?api=1&destination=${shop.lat},${shop.long}`, '_blank');
                        }
                      }}
                      className="flex-1 bg-slate-100 hover:bg-primary hover:text-white dark:bg-slate-700 dark:hover:bg-primary text-slate-700 dark:text-slate-200 py-1.5 rounded-lg text-xs font-bold flex items-center justify-center gap-1.5 transition-colors shadow-sm"
                    >
                      <Navigation className="w-3.5 h-3.5" /> Navigate
                    </button>
                    <button 
                      onClick={(e) => {
                        e.stopPropagation();
                        if (isLoggedIn) {
                          router.push(`/shop/${shop.id}`);
                        } else {
                          openLoginSidebar();
                        }
                      }}
                      className="flex-1 bg-primary text-white hover:bg-primary/90 py-1.5 rounded-lg text-xs font-bold flex items-center justify-center transition-colors shadow-sm cursor-pointer"
                    >
                      View Details
                    </button>
                  </div>
                </div>
              </div>
            );
          })}

          {!isFetching && filteredShops.length === 0 && (
            <div className="text-center py-10 text-slate-500">
              No shops found for this category.
            </div>
          )}
        </div>
      </div>

      {/* Right Map Area */}
      <div className="flex-1 relative bg-slate-100 dark:bg-slate-800 z-0 h-[50vh] md:h-auto">
        <MapView locations={filteredShops} selectedShopId={selectedShopId} />
      </div>
    </div>
  );
}

export default function MapPage() {
  return (
    <Suspense fallback={<div className="w-full h-[calc(100vh-80px)] flex items-center justify-center bg-slate-50 dark:bg-slate-900"><Loader2 className="w-10 h-10 animate-spin text-primary" /></div>}>
      <MapPageContent />
    </Suspense>
  );
}
