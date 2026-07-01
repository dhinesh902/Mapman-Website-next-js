"use client";

import { motion } from "framer-motion";
import { ArrowRight, Play, MapPin, Star, Clock, CheckCircle2 } from "lucide-react";
import Link from "next/link";
import Image from "next/image";

const stats = [
  { label: "Shops", value: "10,000+" },
  { label: "Cities", value: "500+" },
  { label: "Users", value: "50K+" },
  { label: "Searches", value: "1M+" },
];

const categories = [
  { name: "Restaurants", icon: "🍽️", count: 1250 },
  { name: "Hotels", icon: "🏨", count: 850 },
  { name: "Hospitals", icon: "🏥", count: 320 },
  { name: "Pharmacy", icon: "💊", count: 450 },
  { name: "Grocery", icon: "🛒", count: 2100 },
  { name: "Shopping", icon: "🛍️", count: 950 },
  { name: "Fuel Stations", icon: "⛽", count: 280 },
  { name: "Schools", icon: "🏫", count: 540 },
];

const featuredLocations = [
  {
    id: 1,
    name: "Grand Palace Hotel",
    rating: 4.8,
    address: "Downtown, Chennai",
    category: "Hotels",
    isOpen: true,
    image: "https://images.unsplash.com/photo-1566073771259-6a8506099945?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
  },
  {
    id: 2,
    name: "Green Leaf Restaurant",
    rating: 4.6,
    address: "T Nagar, Chennai",
    category: "Restaurants",
    isOpen: true,
    image: "https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
  },
  {
    id: 3,
    name: "City Care Hospital",
    rating: 4.9,
    address: "Anna Nagar, Chennai",
    category: "Hospitals",
    isOpen: false,
    image: "https://images.unsplash.com/photo-1519494026892-80bbd2d6fd0d?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
  },
  {
    id: 4,
    name: "Supermart Grocery",
    rating: 4.5,
    address: "Velachery, Chennai",
    category: "Grocery",
    isOpen: true,
    image: "https://images.unsplash.com/photo-1534723452862-4c874018d66d?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
  },
];

const features = [
  { title: "Accurate Location Tracking", desc: "Pinpoint accuracy using advanced geolocation." },
  { title: "Verified Business Listings", desc: "100% genuine and verified local businesses." },
  { title: "Easy Navigation", desc: "Seamless routing and direction assistance." },
  { title: "Real-Time Updates", desc: "Live status of business hours and availability." },
];

export default function Home() {
  return (
    <div className="flex flex-col gap-24 pb-24">
      {/* Hero Section */}
      <section className="relative pt-20 pb-32 overflow-hidden bg-gradient-to-b from-primary/5 to-transparent">
        <div className="container mx-auto px-4 md:px-6 relative z-10">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
            >
              <h1 className="text-5xl md:text-6xl font-extrabold tracking-tight text-foreground mb-6 leading-tight font-heading">
                Discover Nearby Businesses with <span className="text-primary bg-clip-text text-transparent bg-gradient-to-r from-primary to-accent">MAPMAN</span>
              </h1>
              <p className="text-lg text-slate-600 dark:text-slate-400 mb-8 max-w-lg">
                Find trusted shops, services, and local businesses around you instantly using our interactive map platform.
              </p>
              <div className="flex flex-wrap gap-4 mb-12">
                <Link href="/map" className="inline-flex items-center justify-center gap-2 bg-primary hover:bg-primary/90 text-white px-8 py-4 rounded-full font-medium transition-transform hover:scale-105 shadow-lg shadow-primary/25">
                  <MapPin className="w-5 h-5" />
                  Explore Map
                </Link>
                <Link href="/videos" className="inline-flex items-center justify-center gap-2 bg-white dark:bg-slate-800 hover:bg-slate-50 dark:hover:bg-slate-700 text-slate-900 dark:text-white px-8 py-4 rounded-full font-medium transition-transform hover:scale-105 shadow-lg shadow-slate-200/50 dark:shadow-none border border-slate-200 dark:border-slate-700">
                  <Play className="w-5 h-5 text-primary" />
                  Watch Videos
                </Link>
              </div>

              <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
                {stats.map((stat, idx) => (
                  <motion.div
                    key={stat.label}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.2 + idx * 0.1 }}
                    className="bg-white dark:bg-slate-800 p-4 rounded-2xl shadow-sm border border-slate-100 dark:border-slate-700 text-center"
                  >
                    <div className="text-2xl font-bold text-primary mb-1">{stat.value}</div>
                    <div className="text-sm text-slate-500 font-medium">{stat.label}</div>
                  </motion.div>
                ))}
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="relative hidden lg:block"
            >
              <div className="absolute inset-0 bg-gradient-to-tr from-primary/20 to-accent/20 rounded-full blur-3xl" />
              <Image
                src="https://images.unsplash.com/photo-1524661135-423995f22d0b?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80"
                alt="Map Navigation"
                width={600}
                height={600}
                className="relative z-10 rounded-3xl shadow-2xl border-4 border-white dark:border-slate-800 object-cover aspect-square"
              />
            </motion.div>
          </div>
        </div>
      </section>

      {/* Categories */}
      <section className="container mx-auto px-4 md:px-6">
        <div className="flex items-end justify-between mb-10">
          <div>
            <h2 className="text-3xl font-bold font-heading mb-2">Browse Categories</h2>
            <p className="text-slate-500">Explore businesses by categories</p>
          </div>
          <Link href="/categories" className="text-primary font-medium flex items-center gap-1 hover:gap-2 transition-all">
            View All <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6">
          {categories.map((category, idx) => (
            <motion.div
              key={category.name}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: idx * 0.05 }}
              whileHover={{ y: -5 }}
              className="group bg-white dark:bg-slate-800 p-6 rounded-2xl border border-slate-100 dark:border-slate-700 shadow-sm hover:shadow-md transition-all cursor-pointer flex flex-col items-center text-center"
            >
              <div className="text-4xl mb-4 group-hover:scale-110 transition-transform">{category.icon}</div>
              <h3 className="font-semibold text-foreground mb-1">{category.name}</h3>
              <p className="text-sm text-slate-500">{category.count} Locations</p>
            </motion.div>
          ))}
        </div>
      </section>

      {/* Featured Locations */}
      <section className="container mx-auto px-4 md:px-6">
        <div className="mb-10">
          <h2 className="text-3xl font-bold font-heading mb-2">Featured Locations</h2>
          <p className="text-slate-500">Top rated businesses around you</p>
        </div>
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
          {featuredLocations.map((location, idx) => (
            <motion.div
              key={location.id}
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ delay: idx * 0.1 }}
              className="bg-white dark:bg-slate-800 rounded-2xl overflow-hidden border border-slate-100 dark:border-slate-700 shadow-sm hover:shadow-xl transition-shadow group flex flex-col"
            >
              <div className="relative h-48 overflow-hidden">
                <Image src={location.image} alt={location.name} fill className="object-cover group-hover:scale-105 transition-transform duration-500" />
                <div className="absolute top-3 right-3 bg-white/90 dark:bg-slate-900/90 backdrop-blur-sm px-2 py-1 rounded-lg text-sm font-semibold flex items-center gap-1 shadow-sm">
                  <Star className="w-4 h-4 text-accent fill-accent" /> {location.rating}
                </div>
              </div>
              <div className="p-5 flex flex-col flex-1">
                <div className="flex justify-between items-start mb-2">
                  <h3 className="font-bold text-lg text-foreground line-clamp-1">{location.name}</h3>
                </div>
                <p className="text-slate-500 text-sm mb-4 flex items-center gap-1.5">
                  <MapPin className="w-4 h-4" /> {location.address}
                </p>
                <div className="flex items-center justify-between mt-auto pt-4 border-t border-slate-100 dark:border-slate-700">
                  <span className="text-xs font-medium bg-slate-100 dark:bg-slate-700 px-2 py-1 rounded-md text-slate-600 dark:text-slate-300">
                    {location.category}
                  </span>
                  <div className={`flex items-center gap-1 text-xs font-medium ${location.isOpen ? 'text-secondary' : 'text-red-500'}`}>
                    <Clock className="w-3.5 h-3.5" />
                    {location.isOpen ? "Open Now" : "Closed"}
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </section>

      {/* Why Choose Us */}
      <section className="container mx-auto px-4 md:px-6">
        <div className="bg-primary/5 dark:bg-slate-800/50 rounded-3xl p-8 md:p-12 border border-primary/10 dark:border-slate-700">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold font-heading mb-4">Why Choose MAPMAN</h2>
            <p className="text-slate-500 max-w-2xl mx-auto">We provide the most reliable and easy-to-use platform for discovering businesses around your location.</p>
          </div>
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-8">
            {features.map((feature, idx) => (
              <motion.div
                key={feature.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: idx * 0.1 }}
                className="bg-white dark:bg-slate-800 p-6 rounded-2xl shadow-sm hover:shadow-md transition-shadow"
              >
                <div className="w-12 h-12 bg-primary/10 rounded-xl flex items-center justify-center text-primary mb-4">
                  <CheckCircle2 className="w-6 h-6" />
                </div>
                <h3 className="font-semibold text-lg mb-2">{feature.title}</h3>
                <p className="text-slate-500 text-sm leading-relaxed">{feature.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
