"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { Store, Star, MapPin, Search, Filter, LayoutGrid, List as ListIcon, Navigation, Edit } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

export default function ShopListPage() {
  const [view, setView] = useState<"grid" | "list">("grid");

  const shops = [
    { id: 1, name: "ABC Medical", category: "Pharmacy", rating: 4.5, address: "Central, Chennai", status: "Active", image: "https://images.unsplash.com/photo-1576602976047-174e57a47881?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80" },
    { id: 2, name: "Urban Cafe", category: "Restaurants", rating: 4.8, address: "T Nagar, Chennai", status: "Active", image: "https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80" },
    { id: 3, name: "City Market", category: "Grocery", rating: 4.2, address: "Adyar, Chennai", status: "Pending", image: "https://images.unsplash.com/photo-1534723452862-4c874018d66d?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80" },
    { id: 4, name: "Grand Palace", category: "Hotels", rating: 4.9, address: "Guindy, Chennai", status: "Active", image: "https://images.unsplash.com/photo-1566073771259-6a8506099945?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80" }
  ];

  return (
    <div className="container mx-auto px-4 md:px-6 py-8 pb-24">
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-8">
        <div>
          <h1 className="text-3xl font-bold font-heading mb-2">Shop Directory</h1>
          <p className="text-slate-500">Manage and explore registered businesses</p>
        </div>
        <Link href="/register" className="bg-primary text-white hover:bg-primary/90 px-6 py-3 rounded-xl font-bold flex items-center justify-center gap-2 shadow-lg shadow-primary/25 transition-all w-full md:w-auto">
          <Store className="w-5 h-5" /> Register New Shop
        </Link>
      </div>

      {/* Filters & Search */}
      <div className="bg-white dark:bg-slate-800 p-4 rounded-2xl border border-slate-100 dark:border-slate-700 shadow-sm mb-8 flex flex-col lg:flex-row gap-4 items-center">
        <div className="relative w-full lg:flex-1">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400" />
          <input type="text" placeholder="Search shops by name..." className="w-full pl-10 pr-4 py-3 bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-700 rounded-xl outline-none focus:ring-2 focus:ring-primary/50" />
        </div>
        <select className="w-full lg:w-48 p-3 bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-700 rounded-xl outline-none focus:ring-2 focus:ring-primary/50">
          <option value="">All Categories</option>
          <option>Restaurants</option>
          <option>Pharmacy</option>
          <option>Grocery</option>
          <option>Hotels</option>
        </select>
        <select className="w-full lg:w-48 p-3 bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-700 rounded-xl outline-none focus:ring-2 focus:ring-primary/50">
          <option value="">All Statuses</option>
          <option>Active</option>
          <option>Pending</option>
        </select>
        <div className="flex bg-slate-100 dark:bg-slate-900 p-1.5 rounded-xl self-end lg:self-auto w-full lg:w-auto shrink-0">
          <button onClick={() => setView("grid")} className={`flex-1 lg:flex-none p-2 rounded-lg flex items-center justify-center transition-colors ${view === "grid" ? "bg-white dark:bg-slate-800 shadow-sm text-primary" : "text-slate-400 hover:text-slate-700"}`}>
            <LayoutGrid className="w-5 h-5" />
          </button>
          <button onClick={() => setView("list")} className={`flex-1 lg:flex-none p-2 rounded-lg flex items-center justify-center transition-colors ${view === "list" ? "bg-white dark:bg-slate-800 shadow-sm text-primary" : "text-slate-400 hover:text-slate-700"}`}>
            <ListIcon className="w-5 h-5" />
          </button>
        </div>
      </div>
      
      {/* Grid View */}
      {view === "grid" ? (
        <div className="grid md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {shops.map((shop, i) => (
            <motion.div key={shop.id} initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} transition={{ delay: i * 0.1 }} className="bg-white dark:bg-slate-800 rounded-2xl border border-slate-100 dark:border-slate-700 shadow-sm hover:shadow-xl transition-all overflow-hidden flex flex-col group">
              <div className="relative h-48 w-full overflow-hidden">
                <Image src={shop.image} alt={shop.name} fill className="object-cover group-hover:scale-105 transition-transform duration-500" />
                <div className="absolute top-3 right-3 bg-white/90 backdrop-blur-sm px-2 py-1 rounded-lg text-sm font-semibold flex items-center gap-1 shadow-sm">
                  <Star className="w-4 h-4 text-accent fill-accent" /> {shop.rating}
                </div>
                <div className={`absolute top-3 left-3 px-2 py-1 rounded-lg text-xs font-bold shadow-sm backdrop-blur-sm ${shop.status === "Active" ? "bg-green-500/90 text-white" : "bg-amber-500/90 text-white"}`}>
                  {shop.status}
                </div>
              </div>
              <div className="p-5 flex flex-col flex-1">
                <h3 className="text-xl font-bold mb-1 truncate">{shop.name}</h3>
                <p className="text-primary text-xs font-semibold mb-3 bg-primary/10 px-2 py-1 rounded-md w-fit">{shop.category}</p>
                <div className="flex items-center gap-2 text-sm text-slate-500 mb-4">
                  <MapPin className="w-4 h-4 shrink-0" /> <span className="truncate">{shop.address}</span>
                </div>
                <div className="flex gap-2 mt-auto pt-4 border-t border-slate-100 dark:border-slate-700">
                  <button className="flex-1 bg-slate-100 dark:bg-slate-700 hover:bg-slate-200 transition-colors py-2 rounded-lg text-sm font-semibold flex items-center justify-center gap-1.5">
                    <Navigation className="w-4 h-4" /> View
                  </button>
                  <Link href="/edit-shop" className="flex-1 bg-primary/10 text-primary hover:bg-primary/20 transition-colors py-2 rounded-lg text-sm font-semibold flex items-center justify-center gap-1.5">
                    <Edit className="w-4 h-4" /> Edit
                  </Link>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      ) : (
        /* List View */
        <div className="flex flex-col gap-4">
          {shops.map((shop, i) => (
            <motion.div key={shop.id} initial={{ opacity: 0, x: -10 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: i * 0.1 }} className="bg-white dark:bg-slate-800 rounded-2xl border border-slate-100 dark:border-slate-700 shadow-sm hover:shadow-md transition-all p-4 flex flex-col md:flex-row items-center gap-6">
              <div className="relative h-24 w-24 rounded-xl overflow-hidden shrink-0 hidden md:block">
                <Image src={shop.image} alt={shop.name} fill className="object-cover" />
              </div>
              <div className="flex-1 min-w-0 w-full">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 mb-2">
                  <h3 className="text-xl font-bold truncate">{shop.name}</h3>
                  <div className={`px-2 py-1 rounded-lg text-xs font-bold w-fit ${shop.status === "Active" ? "bg-green-100 text-green-700" : "bg-amber-100 text-amber-700"}`}>
                    {shop.status}
                  </div>
                </div>
                <div className="flex flex-wrap items-center gap-4 text-sm text-slate-500">
                  <span className="text-primary font-semibold bg-primary/10 px-2 py-0.5 rounded-md">{shop.category}</span>
                  <span className="flex items-center gap-1"><Star className="w-4 h-4 text-accent fill-accent" /> {shop.rating}</span>
                  <span className="flex items-center gap-1"><MapPin className="w-4 h-4" /> {shop.address}</span>
                </div>
              </div>
              <div className="flex md:flex-col gap-2 shrink-0 w-full md:w-auto mt-4 md:mt-0">
                <button className="flex-1 md:w-28 bg-slate-100 dark:bg-slate-700 hover:bg-slate-200 transition-colors py-2 rounded-lg text-sm font-semibold flex items-center justify-center gap-1.5">
                  <Navigation className="w-4 h-4" /> View
                </button>
                <Link href="/edit-shop" className="flex-1 md:w-28 bg-primary/10 text-primary hover:bg-primary/20 transition-colors py-2 rounded-lg text-sm font-semibold flex items-center justify-center gap-1.5">
                  <Edit className="w-4 h-4" /> Edit
                </Link>
              </div>
            </motion.div>
          ))}
        </div>
      )}

      {/* Pagination */}
      <div className="flex justify-center mt-12 gap-2">
        <button className="w-10 h-10 rounded-lg border border-slate-200 flex items-center justify-center hover:bg-slate-50 disabled:opacity-50" disabled>&lt;</button>
        <button className="w-10 h-10 rounded-lg bg-primary text-white font-bold flex items-center justify-center shadow-md">1</button>
        <button className="w-10 h-10 rounded-lg border border-slate-200 flex items-center justify-center hover:bg-slate-50">2</button>
        <button className="w-10 h-10 rounded-lg border border-slate-200 flex items-center justify-center hover:bg-slate-50">3</button>
        <button className="w-10 h-10 rounded-lg border border-slate-200 flex items-center justify-center hover:bg-slate-50">&gt;</button>
      </div>
    </div>
  );
}
