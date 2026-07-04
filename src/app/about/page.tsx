"use client";

import { motion } from "framer-motion";
import {
  Lightbulb,
  Target,
  Shield,
  Heart,
  TrendingUp,
  Users,
  MapPin,
  Play,
  CheckCircle2,
  Video,
} from "lucide-react";

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

  return (
    <div className="flex flex-col bg-slate-50 dark:bg-slate-950 pb-8 font-sans selection:bg-primary/20">
      {/* Stylish Top Banner */}
      <section className="relative w-full h-[55vh] min-h-[450px] flex items-center justify-center overflow-hidden pt-20 group">
        <div className="absolute inset-0 bg-slate-900/60 z-10" />
        <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-transparent to-transparent z-10" />
        <motion.div
          initial={{ scale: 1.1 }}
          animate={{ scale: 1 }}
          transition={{ duration: 1.5, ease: "easeOut" }}
          className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1497366216548-37526070297c?auto=format&fit=crop&q=80')] bg-cover bg-center"
        />

        <div className="relative z-20 text-center px-4 max-w-4xl mx-auto mt-10">
          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.1, ease: "easeOut" }}
            className="text-5xl md:text-6xl lg:text-7xl font-extrabold text-white font-heading tracking-tight mb-6 drop-shadow-xl"
          >
            About{" "}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary to-accent">
              Mapman
            </span>
          </motion.h1>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.3 }}
            className="flex items-center justify-center gap-3 text-white/70 font-medium text-sm md:text-base uppercase tracking-widest"
          >
            <span className="hover:text-white transition-colors cursor-pointer">
              Home
            </span>
            <span className="w-1.5 h-1.5 rounded-full bg-primary/50" />
            <span className="text-white font-bold">About Us</span>
          </motion.div>
        </div>

        {/* Decorative bottom fade */}
        <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-slate-50 dark:from-slate-950 to-transparent z-20" />
      </section>

      {/* Modern Hero Section */}
      <section className="relative pt-20 pb-20 lg:pt-32 lg:pb-32 overflow-hidden px-4 md:px-8 max-w-7xl mx-auto w-full">
        {/* Decorative Gradients */}
        <div className="absolute top-0 right-0 -mr-20 -mt-20 w-[40rem] h-[40rem] bg-primary/10 rounded-full blur-3xl -z-10" />
        <div className="absolute bottom-0 left-0 -ml-20 -mb-20 w-[30rem] h-[30rem] bg-accent/10 rounded-full blur-3xl -z-10" />

        <div className="grid lg:grid-cols-2 gap-12 lg:gap-8 items-center">
          <div className="space-y-8">
            <h2 className="text-3xl md:text-4xl font-extrabold font-heading text-slate-900 dark:text-white">
              OUR STORY
            </h2>

            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
              className="text-3xl md:text-5xl lg:text-6xl font-black font-heading leading-[1.1] text-slate-900 dark:text-white"
            >
              Redefining <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-br from-primary via-accent to-primary">
                Local Exploration
              </span>
            </motion.h1>
          </div>

          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.2 }}
            className="text-lg text-slate-600 dark:text-slate-400 space-y-6 leading-relaxed bg-white/60 dark:bg-slate-900/60 p-8 md:p-10 rounded-[2rem] border border-slate-100 dark:border-slate-800 backdrop-blur-xl shadow-[0_8px_30px_rgb(0,0,0,0.04)] dark:shadow-none"
          >
            <p>
              <strong className="text-slate-900 dark:text-white font-bold">
                Developed and powered by the expert team at Pafagel Software
                Solutions Pvt Ltd,
              </strong>{" "}
              Mapman represents the pinnacle of location-intelligent technology.
              We recognized a major flaw in traditional business directories:
              dry text reviews and static images fail to capture the true
              essence, quality, and vibe of a business.
            </p>
            <p>
              Mapman solves this by combining interactive live maps with short,
              engaging shop video reels. We empower users to explore verified
              local restaurants, resorts, fashion hubs, and essential services
              visually before visiting. Concurrently, we provide merchants with
              an incredibly affordable, high-impact digital showcase to capture
              immediate foot traffic and build local brand authority.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Bento Grid: Mission & Vision */}
      <section className="px-4 md:px-8 max-w-7xl mx-auto w-full py-16">
        <div className="grid md:grid-cols-2 gap-6">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="group p-10 md:p-12 rounded-[2.5rem] bg-slate-900 text-white overflow-hidden relative shadow-xl shadow-slate-900/10"
          >
            <div className="absolute top-0 right-0 w-64 h-64 bg-primary/20 rounded-full blur-[80px] -z-10 transition-transform duration-700 group-hover:scale-150" />
            <Target className="w-12 h-12 text-primary mb-8" />
            <h2 className="text-3xl md:text-4xl font-extrabold mb-6 font-heading">
              Our Mission
            </h2>
            <p className="text-slate-300 text-lg leading-relaxed">
              To empower consumers with rapid, visually rich local discoveries
              using modern mapping and authentic video integrations. We aim to
              support local economies by giving small-to-medium business
              merchants an accessible, high-performance platform to tell their
              story, capture customer interest, and scale their footprint.
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="group p-10 md:p-12 rounded-[2.5rem] bg-primary text-white overflow-hidden relative shadow-xl shadow-primary/20"
          >
            <div className="absolute bottom-0 left-0 w-64 h-64 bg-white/10 rounded-full blur-[80px] -z-10 transition-transform duration-700 group-hover:scale-150" />
            <Lightbulb className="w-12 h-12 text-white/90 mb-8" />
            <h2 className="text-3xl md:text-4xl font-extrabold mb-6 font-heading">
              Our Vision
            </h2>
            <p className="text-primary-foreground/90 text-lg leading-relaxed font-medium">
              To establish Mapman as the global gold standard for hyper-local
              directory discovery and video commerce. By combining clean
              geolocation intelligence, strict merchant verification, and rich
              video aesthetics, we envision a future where every neighborhood
              shop is easily discoverable, and every local citizen feels
              instantly connected.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Minimalist Services List */}
      <section className="px-4 md:px-8 max-w-7xl mx-auto w-full py-24">
        <div className="max-w-2xl mb-16">
          <h2 className="text-4xl md:text-5xl font-extrabold font-heading text-slate-900 dark:text-white mb-6">
            Services We Offer
          </h2>
          <p className="text-xl text-slate-600 dark:text-slate-400">
            Engineered to deliver high utility for neighborhood explorers and
            maximum ROI for registered business owners.
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-8 lg:gap-10 max-w-6xl mx-auto">
          {[
            {
              icon: MapPin,
              title: "Nearby Business Discovery",
              desc: "Instantly find verified local services, boutiques, restaurants, and medical centers close to your coordinates using our live interactive map.",
              color: "text-blue-500",
              bg: "bg-blue-500/10 border-blue-500/20",
              glow: "group-hover:shadow-blue-500/20",
            },
            {
              icon: Play,
              title: "Business Video Promotions",
              desc: "Say goodbye to boring text. Watch premium shop video reels showcasing products, store ambiance, and services in real-time.",
              color: "text-accent",
              bg: "bg-accent/10 border-accent/20",
              glow: "group-hover:shadow-accent/20",
            },
            {
              icon: TrendingUp,
              title: "Smart Local Advertising",
              desc: "Allow physical storefronts to reach high-intent customers in their specific geographic radius with high-converting video promotions.",
              color: "text-emerald-500",
              bg: "bg-emerald-500/10 border-emerald-500/20",
              glow: "group-hover:shadow-emerald-500/20",
            },
            {
              icon: Users,
              title: "Active Community Building",
              desc: "Build meaningful local connections by allowing explorers to review shops, bookmark favorites, and share visual discoveries.",
              color: "text-violet-500",
              bg: "bg-violet-500/10 border-violet-500/20",
              glow: "group-hover:shadow-violet-500/20",
            },
          ].map((service, idx) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: idx * 0.1, duration: 0.5 }}
              className={`group relative p-8 md:p-10 rounded-[2rem] bg-white dark:bg-slate-900 border border-slate-100 dark:border-slate-800 transition-all duration-500 hover:-translate-y-2 hover:shadow-2xl ${service.glow} overflow-hidden`}
            >
              {/* Animated Glow Background */}
              <div
                className={`absolute -top-24 -right-24 w-48 h-48 rounded-full blur-[60px] opacity-0 group-hover:opacity-40 transition-opacity duration-500 ${service.bg.split(" ")[0]}`}
              />

              <div className="flex flex-col h-full relative z-10">
                <div
                  className={`w-16 h-16 rounded-2xl flex items-center justify-center border shadow-sm mb-8 transition-transform duration-500 group-hover:scale-110 group-hover:-rotate-3 ${service.bg} ${service.color}`}
                >
                  <service.icon className="w-8 h-8" />
                </div>

                <h3 className="text-2xl md:text-3xl font-extrabold text-slate-900 dark:text-white mb-4 leading-tight group-hover:text-primary transition-colors duration-300">
                  {service.title}
                </h3>

                <p className="text-lg text-slate-600 dark:text-slate-400 leading-relaxed mt-auto">
                  {service.desc}
                </p>
              </div>
            </motion.div>
          ))}
        </div>
      </section>

      {/* Rigorous Trust Standards */}
      <section className="relative py-24 bg-slate-900 overflow-hidden text-white w-full">
        {/* Decorative Background Patterns */}
        <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/cubes.png')] opacity-10" />
        <div className="absolute top-0 right-1/4 w-[40rem] h-[40rem] bg-primary/20 rounded-full blur-[100px] pointer-events-none" />
        <div className="absolute bottom-0 left-1/4 w-[30rem] h-[30rem] bg-accent/20 rounded-full blur-[100px] pointer-events-none" />

        <div className="relative z-10 px-4 md:px-8 max-w-7xl mx-auto w-full">
          <div className="max-w-3xl mx-auto text-center mb-16">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/10 border border-white/20 text-primary-foreground text-sm font-semibold tracking-wide uppercase mb-6 backdrop-blur-md shadow-xl"
            >
              <Shield className="w-4 h-4 text-primary" /> Why Trust Mapman
            </motion.div>
            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.1 }}
              className="text-3xl md:text-4xl font-extrabold font-heading mb-6 tracking-tight"
            >
              Why Businesses & Explorers Trust Mapman
            </motion.h2>
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.2 }}
              className="text-lg md:text-xl text-slate-300 leading-relaxed"
            >
              Unlike unverified, spam-heavy local listing boards, Mapman
              enforces high-quality video guidelines, manual coordinate audits,
              and strict Experience, Expertise, Authoritativeness, and
              Trustworthiness credentials.
            </motion.p>
          </div>

          <div className="grid md:grid-cols-2 gap-6 lg:gap-8 max-w-6xl mx-auto">
            {[
              {
                title: "100% Audited Listings",
                desc: "Every address coordinates, contact number, and business category is verified by our team.",
                icon: CheckCircle2,
                color: "text-emerald-400",
                bg: "bg-emerald-500/10",
                border: "border-emerald-500/20",
              },
              {
                title: "Premium Visual Engine",
                desc: "A sleek, lightning-fast UI designed to minimize friction and load dynamic feeds instantly.",
                icon: Video,
                color: "text-blue-400",
                bg: "bg-blue-500/10",
                border: "border-blue-500/20",
              },
              {
                title: "Authentic Local Crowd",
                desc: "Enjoy recommendations backed by real local explorers and verified merchant video uploads.",
                icon: Users,
                color: "text-orange-400",
                bg: "bg-orange-500/10",
                border: "border-orange-500/20",
              },
              {
                title: "Hyper-Local Accuracy",
                desc: "Precision latitude/longitude coordinates mapping ensures you arrive at the exact doorstep.",
                icon: MapPin,
                color: "text-violet-400",
                bg: "bg-violet-500/10",
                border: "border-violet-500/20",
              },
            ].map((feature, idx) => (
              <motion.div
                key={idx}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: idx * 0.1 + 0.2, duration: 0.5 }}
                className="flex items-start gap-6 p-8 rounded-3xl bg-white/5 border border-white/10 hover:bg-white/10 transition-colors backdrop-blur-sm"
              >
                <div
                  className={`w-14 h-14 rounded-2xl flex items-center justify-center shrink-0 ${feature.bg} ${feature.border} border`}
                >
                  <feature.icon className={`w-7 h-7 ${feature.color}`} />
                </div>
                <div>
                  <h3 className="text-xl font-bold mb-2 text-white">
                    {feature.title}
                  </h3>
                  <p className="text-slate-400 leading-relaxed">
                    {feature.desc}
                  </p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>
      <section className="px-4 md:px-8 max-w-7xl mx-auto w-full py-16 border-t border-slate-200/60 dark:border-slate-800/60 mt-10">
        <h2 className="text-3xl font-bold mb-10 font-heading text-slate-900 dark:text-white text-center">
          Core Values
        </h2>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
          {values.map((v, i) => (
            <motion.div
              key={v.title}
              initial={{ y: 20, opacity: 0 }}
              whileInView={{ y: 0, opacity: 1 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
              className="group p-8 rounded-3xl bg-white dark:bg-slate-900 border border-slate-100 dark:border-slate-800 hover:bg-slate-50 dark:hover:bg-slate-800 transition-colors text-center shadow-sm hover:shadow-md"
            >
              <v.icon className="w-8 h-8 text-primary mb-6 transition-transform duration-300 group-hover:-translate-y-1 mx-auto" />
              <h3 className="font-bold text-xl mb-3 text-slate-900 dark:text-white">
                {v.title}
              </h3>
              <p className="text-slate-500 text-sm font-medium">{v.desc}</p>
            </motion.div>
          ))}
        </div>
      </section>
    </div>
  );
}
