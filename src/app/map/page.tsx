"use client";

import { useState } from "react";
import dynamic from "next/dynamic";
import { Search, Filter, Star, Navigation } from "lucide-react";
import Image from "next/image";

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

const mockData = [
  {
    id: 1,
    shopName: "ABC Medical",
    category: "Pharmacy",
    latitude: 13.0827,
    longitude: 80.2707,
    address: "Central, Chennai",
    rating: 4.5,
    distance: "1.2 km",
    image: "https://images.unsplash.com/photo-1576602976047-174e57a47881?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80"
  },
  {
    id: 2,
    shopName: "Urban Cafe",
    category: "Restaurants",
    latitude: 13.0604,
    longitude: 80.2496,
    address: "T Nagar, Chennai",
    rating: 4.8,
    distance: "2.5 km",
    image: "https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80"
  },
  {
    id: 3,
    shopName: "City Market",
    category: "Grocery",
    latitude: 13.0418,
    longitude: 80.2341,
    address: "Adyar, Chennai",
    rating: 4.2,
    distance: "5.1 km",
    image: "https://images.unsplash.com/photo-1534723452862-4c874018d66d?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80"
  }
];

export default function MapPage() {
  const [selectedCategory, setSelectedCategory] = useState("All");

  return (
    <div className="flex flex-col md:flex-row h-[calc(100vh-80px)] overflow-hidden">
      {/* Left Sidebar */}
      <div className="w-full md:w-[400px] lg:w-[450px] bg-white dark:bg-slate-900 border-r border-slate-200 dark:border-slate-800 flex flex-col z-10 shadow-xl">
        <div className="p-4 border-b border-slate-200 dark:border-slate-800 space-y-4">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400" />
            <input 
              type="text" 
              placeholder="Search shops, categories..." 
              className="w-full pl-10 pr-4 py-3 bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl focus:outline-none focus:ring-2 focus:ring-primary/50 transition-all text-sm"
            />
          </div>
          
          <div className="flex gap-2 overflow-x-auto pb-2 scrollbar-hide">
            {["All", "Restaurants", "Pharmacy", "Grocery", "Hotels"].map(cat => (
              <button 
                key={cat}
                onClick={() => setSelectedCategory(cat)}
                className={`px-4 py-2 rounded-lg text-sm font-medium whitespace-nowrap transition-colors ${
                  selectedCategory === cat 
                    ? "bg-primary text-white shadow-sm" 
                    : "bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300 hover:bg-slate-200 dark:hover:bg-slate-700"
                }`}
              >
                {cat}
              </button>
            ))}
          </div>
          
          <div className="flex items-center gap-2">
            <button className="flex-1 flex items-center justify-center gap-2 py-2 border border-slate-200 dark:border-slate-700 rounded-lg text-sm font-medium text-slate-700 dark:text-slate-200 hover:bg-slate-50 dark:hover:bg-slate-800 transition-colors">
              <Filter className="w-4 h-4" /> Filters
            </button>
            <button className="flex-1 flex items-center justify-center gap-2 py-2 border border-slate-200 dark:border-slate-700 rounded-lg text-sm font-medium text-slate-700 dark:text-slate-200 hover:bg-slate-50 dark:hover:bg-slate-800 transition-colors">
              <Star className="w-4 h-4" /> Top Rated
            </button>
          </div>
        </div>

        <div className="flex-1 overflow-y-auto p-4 space-y-4 bg-slate-50/50 dark:bg-slate-900/50">
          {mockData.filter(d => selectedCategory === "All" || d.category === selectedCategory).map(shop => (
            <div key={shop.id} className="bg-white dark:bg-slate-800 rounded-xl p-3 flex gap-4 shadow-sm border border-slate-100 dark:border-slate-700 hover:shadow-md transition-all cursor-pointer group">
              <div className="relative w-24 h-24 rounded-lg overflow-hidden shrink-0">
                <Image src={shop.image} alt={shop.shopName} fill className="object-cover group-hover:scale-105 transition-transform" />
              </div>
              <div className="flex-1 min-w-0 py-1">
                <h3 className="font-bold text-foreground truncate">{shop.shopName}</h3>
                <p className="text-xs text-primary font-medium mb-1">{shop.category}</p>
                <div className="flex items-center gap-1 text-sm text-slate-500 mb-2">
                  <Star className="w-3.5 h-3.5 text-accent fill-accent" /> {shop.rating}
                  <span className="mx-1">•</span>
                  <span>{shop.distance}</span>
                </div>
                <div className="flex items-center gap-2 mt-auto">
                  <button className="flex-1 bg-primary/10 hover:bg-primary/20 text-primary py-1.5 rounded-lg text-xs font-semibold flex items-center justify-center gap-1 transition-colors">
                    <Navigation className="w-3.5 h-3.5" /> Navigate
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Right Map Area */}
      <div className="flex-1 relative bg-slate-100 dark:bg-slate-800 z-0 h-[50vh] md:h-auto">
        <MapView locations={mockData} />
      </div>
    </div>
  );
}
