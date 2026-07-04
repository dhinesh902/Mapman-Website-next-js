"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import {
  Store,
  Star,
  MapPin,
  Search,
  Filter,
  LayoutGrid,
  List as ListIcon,
  Navigation,
  Edit,
  Trash2,
  Loader2,
} from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { fetchShopApi, deleteShopApi } from "@/services/apiService";
import { Shop } from "@/models/home_model";

const getImageUrl = (url: string | null) => {
  if (!url)
    return "https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80";
  if (url.startsWith("http")) return url;
  return `https://api.mapman.in${url}`;
};

export default function ShopListPage() {
  const [view, setView] = useState<"grid" | "list">("grid");
  const [shops, setShops] = useState<Shop[]>([]);
  const [loading, setLoading] = useState(true);

  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("");
  const [selectedStatus, setSelectedStatus] = useState("");

  useEffect(() => {
    const fetchShops = async () => {
      setLoading(true);
      try {
        const res = await fetchShopApi();
        if (res && res.data) {
          setShops(res.data);
        }
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };
    fetchShops();
  }, []);

  const handleDeleteShop = async (shopId: number | undefined) => {
    if (!shopId) return;
    if (confirm("Are you sure you want to delete this shop?")) {
      try {
        await deleteShopApi(shopId);
        setShops((prev) => prev.filter((s) => s.id !== shopId));
      } catch (err) {
        console.error("Error deleting shop:", err);
        alert("Failed to delete shop.");
      }
    }
  };

  return (
    <div className="w-full px-2 lg:px-4 py-8 pb-8 max-w-[1920px] mx-auto">
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-8">
        <div>
          <h1 className="text-3xl font-bold font-heading mb-2">
            Shop Directory
          </h1>
          <p className="text-slate-500">
            Manage and explore registered businesses
          </p>
        </div>
        <Link
          href="/register"
          className="bg-primary text-white hover:bg-primary/90 px-6 py-3 rounded-xl font-bold flex items-center justify-center gap-2 shadow-lg shadow-primary/25 transition-all w-full md:w-auto"
        >
          <Store className="w-5 h-5" /> Register New Shop
        </Link>
      </div>

      {/* Filters & Search */}
      <div className="bg-white dark:bg-slate-800 p-4 rounded-2xl border border-slate-100 dark:border-slate-700 shadow-sm mb-8 flex flex-col lg:flex-row gap-4 items-center">
        <div className="relative w-full lg:flex-1">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400" />
          <input
            type="text"
            placeholder="Search shops by name or address..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-10 pr-4 py-3 bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-700 rounded-xl outline-none focus:ring-2 focus:ring-primary/50"
          />
        </div>

        <div className="flex bg-slate-100 dark:bg-slate-900 p-1.5 rounded-xl self-end lg:self-auto w-full lg:w-auto shrink-0">
          <button
            onClick={() => setView("grid")}
            className={`flex-1 lg:flex-none p-2 rounded-lg flex items-center justify-center transition-colors ${view === "grid" ? "bg-white dark:bg-slate-800 shadow-sm text-primary" : "text-slate-400 hover:text-slate-700"}`}
          >
            <LayoutGrid className="w-5 h-5" />
          </button>
          <button
            onClick={() => setView("list")}
            className={`flex-1 lg:flex-none p-2 rounded-lg flex items-center justify-center transition-colors ${view === "list" ? "bg-white dark:bg-slate-800 shadow-sm text-primary" : "text-slate-400 hover:text-slate-700"}`}
          >
            <ListIcon className="w-5 h-5" />
          </button>
        </div>
      </div>

      {/* Main Content */}
      {loading ? (
        <div className="flex flex-col items-center justify-center py-20">
          <Loader2 className="w-10 h-10 animate-spin text-primary mb-4" />
          <p className="text-slate-500 font-medium">Loading shops...</p>
        </div>
      ) : (
        (() => {
          const filteredShops = shops.filter((shop) => {
            const query = searchQuery.toLowerCase();
            const matchesSearch =
              shop.shopName?.toLowerCase().includes(query) ||
              shop.address?.toLowerCase().includes(query);
            const matchesCategory = selectedCategory
              ? shop.category?.toLowerCase() === selectedCategory.toLowerCase()
              : true;
            const matchesStatus = selectedStatus
              ? shop.status?.toLowerCase() === selectedStatus.toLowerCase()
              : true;
            return matchesSearch && matchesCategory && matchesStatus;
          });

          if (filteredShops.length === 0) {
            return (
              <div className="text-center py-20 bg-white dark:bg-slate-800 rounded-2xl border border-slate-100 dark:border-slate-700 shadow-sm">
                <Store className="w-12 h-12 text-slate-300 mx-auto mb-4" />
                <h3 className="text-xl font-bold text-slate-900 dark:text-white mb-2">
                  No shops found
                </h3>
                <p className="text-slate-500">
                  Try adjusting your filters or search query.
                </p>
              </div>
            );
          }

          return view === "grid" ? (
            <div className="grid md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 lg:gap-6">
              {filteredShops.map((shop, i) => (
                <motion.div
                  key={shop.id || i}
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: i * 0.1 }}
                  className="bg-white dark:bg-slate-800 rounded-2xl border border-slate-100 dark:border-slate-700 shadow-sm hover:shadow-xl transition-all overflow-hidden flex flex-col group"
                >
                  <div className="relative h-48 w-full overflow-hidden">
                    <Image
                      src={getImageUrl(shop.shopImage || null)}
                      alt={shop.shopName || "Shop"}
                      fill
                      className="object-cover group-hover:scale-105 transition-transform duration-500"
                    />
                    <div className="absolute top-3 right-3 bg-white/90 backdrop-blur-sm px-2 py-1 rounded-lg text-sm font-semibold flex items-center gap-1 shadow-sm text-slate-900">
                      <Star className="w-4 h-4 text-amber-500 fill-amber-500" />{" "}
                      4.5
                    </div>
                    <div
                      className={`absolute top-3 left-3 px-2 py-1 rounded-lg text-xs font-bold shadow-sm backdrop-blur-sm uppercase tracking-wider ${shop.status === "active" ? "bg-emerald-500/90 text-white" : "bg-amber-500/90 text-white"}`}
                    >
                      {shop.status || "Unknown"}
                    </div>
                  </div>
                  <div className="p-5 flex flex-col flex-1">
                    <h3 className="text-xl font-bold mb-1 truncate text-slate-900 dark:text-white">
                      {shop.shopName || "Unnamed Shop"}
                    </h3>
                    <p className="text-primary text-xs font-semibold mb-3 bg-primary/10 px-2 py-1 rounded-md w-fit uppercase tracking-wider">
                      {shop.category || "General"}
                    </p>
                    <div className="flex items-start gap-2 text-sm text-slate-500 mb-4">
                      <MapPin className="w-4 h-4 shrink-0 mt-0.5" />{" "}
                      <span className="line-clamp-2 leading-relaxed">
                        {shop.address || "No address available"}
                      </span>
                    </div>
                    <div className="flex flex-wrap gap-2 mt-auto pt-4 border-t border-slate-100 dark:border-slate-700">
                      <Link
                        href={`/shop/${shop.id}`}
                        className="flex-1 min-w-[30%] bg-slate-100 dark:bg-slate-700 hover:bg-slate-200 dark:hover:bg-slate-600 transition-colors py-2 rounded-lg text-sm font-semibold flex items-center justify-center gap-1.5 text-slate-700 dark:text-slate-200"
                      >
                        <Navigation className="w-4 h-4" /> View
                      </Link>
                      <Link
                        href={`/edit-shop?id=${shop.id}`}
                        className="flex-1 min-w-[30%] bg-primary/10 text-primary hover:bg-primary/20 transition-colors py-2 rounded-lg text-sm font-semibold flex items-center justify-center gap-1.5"
                      >
                        <Edit className="w-4 h-4" /> Edit
                      </Link>
                      <button
                        onClick={() => handleDeleteShop(shop.id)}
                        className="flex-1 min-w-[30%] bg-red-50 text-red-600 hover:bg-red-100 dark:bg-red-500/10 dark:hover:bg-red-500/20 transition-colors py-2 rounded-lg text-sm font-semibold flex items-center justify-center gap-1.5"
                      >
                        <Trash2 className="w-4 h-4" /> Delete
                      </button>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          ) : (
            /* List View */
            <div className="flex flex-col gap-4">
              {filteredShops.map((shop, i) => (
                <motion.div
                  key={shop.id || i}
                  initial={{ opacity: 0, x: -10 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: i * 0.1 }}
                  className="bg-white dark:bg-slate-800 rounded-2xl border border-slate-100 dark:border-slate-700 shadow-sm hover:shadow-md transition-all p-4 flex flex-col md:flex-row items-center gap-6 group"
                >
                  <div className="relative h-24 w-24 rounded-xl overflow-hidden shrink-0 hidden md:block">
                    <Image
                      src={getImageUrl(shop.shopImage || null)}
                      alt={shop.shopName || "Shop"}
                      fill
                      className="object-cover group-hover:scale-105 transition-transform duration-500"
                    />
                  </div>
                  <div className="flex-1 min-w-0 w-full">
                    <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 mb-2">
                      <h3 className="text-xl font-bold truncate text-slate-900 dark:text-white">
                        {shop.shopName || "Unnamed Shop"}
                      </h3>
                      <div
                        className={`px-2 py-1 rounded-lg text-xs font-bold w-fit uppercase tracking-wider ${shop.status === "active" ? "bg-emerald-100 text-emerald-700 dark:bg-emerald-500/20 dark:text-emerald-400" : "bg-amber-100 text-amber-700 dark:bg-amber-500/20 dark:text-amber-400"}`}
                      >
                        {shop.status || "Unknown"}
                      </div>
                    </div>
                    <div className="flex flex-wrap items-center gap-4 text-sm text-slate-500">
                      <span className="text-primary font-semibold bg-primary/10 px-2 py-0.5 rounded-md uppercase tracking-wider">
                        {shop.category || "General"}
                      </span>
                      <span className="flex items-center gap-1">
                        <Star className="w-4 h-4 text-amber-500 fill-amber-500" />{" "}
                        4.5
                      </span>
                      <span className="flex items-center gap-1 truncate">
                        <MapPin className="w-4 h-4 shrink-0" />{" "}
                        <span className="truncate">
                          {shop.address || "No address available"}
                        </span>
                      </span>
                    </div>
                  </div>
                  <div className="flex md:flex-col gap-2 shrink-0 w-full md:w-auto mt-4 md:mt-0">
                    <Link
                      href={`/shop/${shop.id}`}
                      className="flex-1 md:w-28 bg-slate-100 dark:bg-slate-700 hover:bg-slate-200 dark:hover:bg-slate-600 transition-colors py-2 rounded-lg text-sm font-semibold flex items-center justify-center gap-1.5 text-slate-700 dark:text-slate-200"
                    >
                      <Navigation className="w-4 h-4" /> View
                    </Link>
                    <Link
                      href={`/edit-shop?id=${shop.id}`}
                      className="flex-1 md:w-28 bg-primary/10 text-primary hover:bg-primary/20 transition-colors py-2 rounded-lg text-sm font-semibold flex items-center justify-center gap-1.5"
                    >
                      <Edit className="w-4 h-4" /> Edit
                    </Link>
                    <button
                      onClick={() => handleDeleteShop(shop.id)}
                      className="flex-1 md:w-28 bg-red-50 text-red-600 hover:bg-red-100 dark:bg-red-500/10 dark:hover:bg-red-500/20 transition-colors py-2 rounded-lg text-sm font-semibold flex items-center justify-center gap-1.5"
                    >
                      <Trash2 className="w-4 h-4" /> Delete
                    </button>
                  </div>
                </motion.div>
              ))}
            </div>
          );
        })()
      )}
    </div>
  );
}
