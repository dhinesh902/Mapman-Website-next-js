"use client";

import { motion } from "framer-motion";
import {
  Lightbulb,
  Target,
  Shield,
  Heart,
  CheckCircle2,
  TrendingUp,
  Users,
  MapPin,
  Search,
} from "lucide-react";
import Image from "next/image";

export default function AboutPage() {
  const values = [
    {
      title: "Innovation",
      desc: "Constant technological advancement",
      icon: Lightbulb,
    },
    { title: "Trust", desc: "Reliable and verified information", icon: Shield },
    {
      title: "Customer First",
      desc: "User-centric platform design",
      icon: Heart,
    },
    { title: "Quality", desc: "High standards in every listing", icon: Target },
  ];

  const stats = [
    { label: "Registered Businesses", value: "10K+" },
    { label: "Active Users", value: "50K+" },
    { label: "Cities Covered", value: "25+" },
    { label: "Partners", value: "200+" },
  ];

  const team = [
    {
      name: "Sarah Johnson",
      role: "CEO & Founder",
      image:
        "https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80",
    },
    {
      name: "Michael Chen",
      role: "CTO",
      image:
        "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80",
    },
    {
      name: "Priya Sharma",
      role: "Head of Operations",
      image:
        "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80",
    },
  ];

  return (
    <div className="flex flex-col pb-24">
      {/* Hero Banner - Glassmorphic Redesign */}
      <section className="relative pt-32 pb-40 overflow-hidden bg-slate-950 text-white flex items-center justify-center min-h-[50vh]">
        <Image
          src="https://images.unsplash.com/photo-1524661135-423995f22d0b?ixlib=rb-4.0.3&auto=format&fit=crop&w=1920&q=80"
          alt="Map Background"
          fill
          className="object-cover opacity-30"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-slate-950/60 via-slate-950/20 to-slate-950" />

        <div className="container mx-auto px-4 md:px-6 relative z-10 text-center max-w-4xl">
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.7 }}
            className="inline-block mb-6 px-6 py-2 rounded-full bg-white/10 backdrop-blur-md border border-white/20 shadow-xl"
          >
            <span className="bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent font-bold tracking-widest uppercase text-sm">
              Our Story
            </span>
          </motion.div>
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="text-5xl md:text-7xl font-extrabold font-heading mb-6 tracking-tight"
          >
            Redefining{" "}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary via-accent to-primary animate-[shimmer_3s_linear_infinite] bg-[length:200%_auto]">
              Discovery
            </span>
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="text-lg md:text-2xl text-slate-300 font-medium leading-relaxed max-w-2xl mx-auto"
          >
            Connecting People with Local Businesses Through Smart Location
            Technology.
          </motion.p>
        </div>
      </section>

      {/* Mission & Vision - Elevated Floating Cards */}
      <section className="container mx-auto px-4 md:px-6 -mt-24 relative z-20">
        <div className="grid md:grid-cols-2 gap-6 lg:gap-10">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="group relative bg-white/80 dark:bg-slate-900/80 backdrop-blur-xl p-8 md:p-12 rounded-[2.5rem] border border-white/50 dark:border-slate-700/50 shadow-[0_8px_30px_rgb(0,0,0,0.12)] hover:-translate-y-2 transition-transform duration-500 overflow-hidden"
          >
            <div className="absolute top-0 right-0 w-64 h-64 bg-primary/10 rounded-full blur-[80px] -z-10 group-hover:bg-primary/20 transition-colors duration-500" />
            <div className="w-16 h-16 bg-gradient-to-br from-primary to-primary/70 text-white rounded-[1.5rem] flex items-center justify-center mb-8 shadow-lg shadow-primary/30 group-hover:scale-110 transition-transform duration-500">
              <Target className="w-8 h-8" />
            </div>
            <h2 className="text-3xl font-extrabold mb-4 font-heading text-slate-900 dark:text-white">
              Our Mission
            </h2>
            <p className="text-slate-600 dark:text-slate-400 leading-relaxed text-lg">
              To make discovering nearby businesses simple, accurate, and
              accessible through intelligent mapping technology. We aim to
              empower local businesses while providing users with reliable
              location-based information.
            </p>
          </motion.div>
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            className="group relative bg-white/80 dark:bg-slate-900/80 backdrop-blur-xl p-8 md:p-12 rounded-[2.5rem] border border-white/50 dark:border-slate-700/50 shadow-[0_8px_30px_rgb(0,0,0,0.12)] hover:-translate-y-2 transition-transform duration-500 overflow-hidden"
          >
            <div className="absolute top-0 right-0 w-64 h-64 bg-accent/10 rounded-full blur-[80px] -z-10 group-hover:bg-accent/20 transition-colors duration-500" />
            <div className="w-16 h-16 bg-gradient-to-br from-accent to-accent/70 text-white rounded-[1.5rem] flex items-center justify-center mb-8 shadow-lg shadow-accent/30 group-hover:scale-110 transition-transform duration-500">
              <Lightbulb className="w-8 h-8" />
            </div>
            <h2 className="text-3xl font-extrabold mb-4 font-heading text-slate-900 dark:text-white">
              Our Vision
            </h2>
            <p className="text-slate-600 dark:text-slate-400 leading-relaxed text-lg">
              To become the world's most trusted business discovery platform by
              delivering innovative mapping solutions, seamless navigation, and
              real-time business information.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Stats / Achievements */}
      <section className="container mx-auto px-4 md:px-6 py-24">
        <div className="bg-primary/5 dark:bg-slate-800 rounded-3xl p-12 border border-primary/10 dark:border-slate-700 text-center">
          <h2 className="text-3xl font-bold font-heading mb-12">
            Our Achievements
          </h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {stats.map((stat, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
              >
                <div className="text-4xl md:text-5xl font-extrabold text-primary mb-2 font-heading">
                  {stat.value}
                </div>
                <div className="text-slate-600 dark:text-slate-400 font-medium">
                  {stat.label}
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Core Values */}
      <section className="container mx-auto px-4 md:px-6">
        <h2 className="text-3xl font-bold text-center mb-12 font-heading">
          Core Values
        </h2>
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {values.map((v, i) => (
            <motion.div
              key={v.title}
              initial={{ y: 20, opacity: 0 }}
              whileInView={{ y: 0, opacity: 1 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
              className="bg-white dark:bg-slate-800 p-8 rounded-2xl border border-slate-100 dark:border-slate-700 shadow-sm text-center group hover:shadow-md transition-all"
            >
              <div className="w-16 h-16 mx-auto bg-slate-50 dark:bg-slate-700 group-hover:bg-primary group-hover:text-white transition-colors rounded-full flex items-center justify-center text-primary mb-6">
                <v.icon className="w-8 h-8" />
              </div>
              <h3 className="font-bold text-xl mb-2">{v.title}</h3>
              <p className="text-slate-500 text-sm">{v.desc}</p>
            </motion.div>
          ))}
        </div>
      </section>
    </div>
  );
}
