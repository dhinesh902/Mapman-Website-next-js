"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
  import {Mail,
  Phone,
  MapPin,
  Send,
  Loader2,
  ChevronDown,
  CheckCircle2,
  Globe,
  MessageCircle,
} from "lucide-react";
import { useForm } from "react-hook-form";

const faqs = [
  {
    q: "How do I register my business?",
    a: "You can register your business by clicking on the 'Register Shop' button in your profile dashboard and filling out the required details.",
  },
  {
    q: "How can I upload videos?",
    a: "To upload videos, you need to be a registered shop owner. Go to your dashboard and select 'Upload Video'.",
  },
  {
    q: "Is MAPMAN free?",
    a: "Yes, MAPMAN is completely free for users to discover and explore nearby businesses.",
  },
  {
    q: "How do I update my shop details?",
    a: "You can easily edit your shop information by navigating to 'Edit Shop Details' in your account settings.",
  },
];

export default function ContactPage() {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<
    "idle" | "success" | "error"
  >("idle");
  const [openFaq, setOpenFaq] = useState<number | null>(null);

  const onSubmit = async (data: any) => {
    setIsSubmitting(true);
    setSubmitStatus("idle");
    // Simulate API call
    setTimeout(() => {
      setIsSubmitting(false);
      setSubmitStatus("success");
      reset();
      setTimeout(() => setSubmitStatus("idle"), 5000);
    }, 1500);
  };

  return (
    <div className="flex flex-col pb-8">
      {/* Stylish Top Banner */}
      <section className="relative w-full h-[55vh] min-h-[450px] flex items-center justify-center overflow-hidden pt-20 group">
        <div className="absolute inset-0 bg-slate-900/65 z-10" />
        <div className="absolute inset-0 bg-gradient-to-t from-slate-50 dark:from-slate-950 via-transparent to-transparent z-10" />
        <motion.div
          initial={{ scale: 1.1 }}
          animate={{ scale: 1 }}
          transition={{ duration: 1.5, ease: "easeOut" }}
          className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1596524430615-b46475ddff6e?auto=format&fit=crop&q=80')] bg-cover bg-center"
        />

        <div className="relative z-20 text-center px-4 max-w-4xl mx-auto mt-10">
          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.1, ease: "easeOut" }}
            className="text-5xl md:text-6xl lg:text-7xl font-extrabold text-white font-heading tracking-tight mb-6 drop-shadow-xl"
          >
            Get In{" "}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary to-accent">
              Touch
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
            <span className="w-1.5 h-1.5 rounded-full bg-accent/50" />
            <span className="text-white font-bold">Contact Us</span>
          </motion.div>
        </div>
      </section>

      <div className="container mx-auto px-4 md:px-6 -mt-10 relative z-20">
        <div className="grid lg:grid-cols-12 gap-8 lg:gap-12">
          {/* Contact Info & Map */}
          <div className="lg:col-span-5 space-y-8">
            <div className="bg-white/80 dark:bg-slate-900/80 backdrop-blur-xl p-8 rounded-[2.5rem] shadow-xl border border-white/50 dark:border-slate-800 space-y-8">
              <h2 className="text-2xl font-bold font-heading mb-2">
                Contact Details
              </h2>
              <div className="space-y-6">
                <div className="flex gap-5 items-start group">
                  <div className="w-14 h-14 bg-primary/10 dark:bg-primary/20 rounded-[1.25rem] flex items-center justify-center shrink-0 group-hover:bg-primary group-hover:text-white transition-colors duration-300">
                    <Phone className="text-primary group-hover:text-white w-6 h-6 transition-colors duration-300" />
                  </div>
                  <div>
                    <p className="font-semibold text-lg mb-1">Phone & WhatsApp</p>
                    <div className="flex items-center gap-3 mt-1">
                      <a href="tel:+919342376760" className="text-slate-500 dark:text-slate-400 font-medium hover:text-primary transition-colors flex items-center gap-1">
                        +91 9342376760
                      </a>
                      <span className="text-slate-300 dark:text-slate-700">|</span>
                      <a href="https://wa.me/919342376760" target="_blank" rel="noopener noreferrer" className="text-emerald-600 dark:text-emerald-500 hover:text-emerald-700 font-medium flex items-center gap-1">
                        <MessageCircle className="w-4 h-4" /> WhatsApp
                      </a>
                    </div>
                  </div>
                </div>
                <div className="flex gap-5 items-start group">
                  <div className="w-14 h-14 bg-accent/10 dark:bg-accent/20 rounded-[1.25rem] flex items-center justify-center shrink-0 group-hover:bg-accent group-hover:text-white transition-colors duration-300">
                    <Mail className="text-accent group-hover:text-white w-6 h-6 transition-colors duration-300" />
                  </div>
                  <div>
                    <p className="font-semibold text-lg mb-1">Email</p>
                    <a
                      href="mailto:mapman6760@gmail.com"
                      className="text-slate-500 dark:text-slate-400 font-medium hover:text-accent transition-colors"
                    >
                      mapman6760@gmail.com
                    </a>
                  </div>
                </div>
                <div className="flex gap-5 items-start group">
                  <div className="w-14 h-14 bg-blue-500/10 dark:bg-blue-500/20 rounded-[1.25rem] flex items-center justify-center shrink-0 group-hover:bg-blue-500 group-hover:text-white transition-colors duration-300">
                    <Globe className="text-blue-500 group-hover:text-white w-6 h-6 transition-colors duration-300" />
                  </div>
                  <div>
                    <p className="font-semibold text-lg mb-1">Website</p>
                    <a
                      href="https://pafagelsoftwaresolutionspvtltd.in"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-slate-500 dark:text-slate-400 font-medium hover:text-blue-500 transition-colors"
                    >
                      pafagelsoftwaresolutionspvtltd.in
                    </a>
                  </div>
                </div>
                <div className="flex gap-5 items-start group">
                  <div className="w-14 h-14 bg-primary/10 dark:bg-primary/20 rounded-[1.25rem] flex items-center justify-center shrink-0 group-hover:bg-primary group-hover:text-white transition-colors duration-300">
                    <MapPin className="text-primary group-hover:text-white w-6 h-6 transition-colors duration-300" />
                  </div>
                  <div>
                    <p className="font-semibold text-lg mb-1">
                      Location
                    </p>
                    <p className="text-slate-500 dark:text-slate-400 font-medium leading-relaxed">
                      Coimbatore, Tamilnadu India.
                    </p>
                  </div>
                </div>
              </div>
            </div>

            <div className="rounded-[2.5rem] overflow-hidden border-4 border-white dark:border-slate-800 h-[320px] shadow-xl relative bg-slate-100 dark:bg-slate-900">
              <iframe
                src="https://maps.google.com/maps?q=Coimbatore,Tamilnadu,India&t=&z=13&ie=UTF8&iwloc=&output=embed"
                width="100%"
                height="100%"
                style={{ border: 0 }}
                allowFullScreen={false}
                loading="lazy"
                className="grayscale opacity-90 hover:grayscale-0 hover:opacity-100 transition-all duration-700"
              />
            </div>
          </div>

          {/* Contact Form */}
          <div className="lg:col-span-7">
            <div className="bg-white/80 dark:bg-slate-900/80 backdrop-blur-xl p-8 md:p-12 rounded-[2.5rem] shadow-[0_8px_30px_rgb(0,0,0,0.08)] border border-white/50 dark:border-slate-800">
              <div className="mb-10">
                <h2 className="text-3xl font-extrabold mb-3 font-heading">
                  Send a Message
                </h2>
                <p className="text-slate-500 dark:text-slate-400 font-medium">
                  Fill out the form below and we'll get back to you shortly.
                </p>
              </div>

              {submitStatus === "success" && (
                <motion.div
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="mb-8 p-4 bg-emerald-50 dark:bg-emerald-500/10 text-emerald-700 dark:text-emerald-400 border border-emerald-200 dark:border-emerald-500/20 rounded-2xl flex items-center gap-3 font-medium"
                >
                  <div className="w-8 h-8 rounded-full bg-emerald-100 dark:bg-emerald-500/20 flex items-center justify-center shrink-0">
                    <CheckCircle2 className="w-5 h-5" />
                  </div>
                  Message sent successfully! We'll get back to you soon.
                </motion.div>
              )}

              <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
                <div>
                  <input
                    {...register("name", { required: "Full name is required" })}
                    placeholder="Full Name"
                    className="w-full p-4 md:p-5 bg-slate-50 dark:bg-slate-950/50 border border-slate-200 dark:border-slate-800 rounded-2xl outline-none focus:ring-2 focus:ring-primary/50 focus:border-primary/50 transition-all placeholder:text-slate-400 font-medium"
                  />
                  {errors.name && (
                    <span className="text-red-500 text-xs mt-1.5 block font-medium pl-2">
                      {errors.name.message as string}
                    </span>
                  )}
                </div>
                <div className="grid md:grid-cols-2 gap-6">
                  <div>
                    <input
                      {...register("email", {
                        required: "Email is required",
                        pattern: /^\S+@\S+$/i,
                      })}
                      type="email"
                      placeholder="Email Address"
                      className="w-full p-4 md:p-5 bg-slate-50 dark:bg-slate-950/50 border border-slate-200 dark:border-slate-800 rounded-2xl outline-none focus:ring-2 focus:ring-primary/50 focus:border-primary/50 transition-all placeholder:text-slate-400 font-medium"
                    />
                    {errors.email && (
                      <span className="text-red-500 text-xs mt-1.5 block font-medium pl-2">
                        {errors.email.message as string}
                      </span>
                    )}
                  </div>
                  <div>
                    <input
                      {...register("phone", { required: "Phone is required" })}
                      placeholder="Phone Number"
                      className="w-full p-4 md:p-5 bg-slate-50 dark:bg-slate-950/50 border border-slate-200 dark:border-slate-800 rounded-2xl outline-none focus:ring-2 focus:ring-primary/50 focus:border-primary/50 transition-all placeholder:text-slate-400 font-medium"
                    />
                    {errors.phone && (
                      <span className="text-red-500 text-xs mt-1.5 block font-medium pl-2">
                        {errors.phone.message as string}
                      </span>
                    )}
                  </div>
                </div>
                <div>
                  <input
                    {...register("subject", {
                      required: "Subject is required",
                    })}
                    placeholder="Subject"
                    className="w-full p-4 md:p-5 bg-slate-50 dark:bg-slate-950/50 border border-slate-200 dark:border-slate-800 rounded-2xl outline-none focus:ring-2 focus:ring-primary/50 focus:border-primary/50 transition-all placeholder:text-slate-400 font-medium"
                  />
                  {errors.subject && (
                    <span className="text-red-500 text-xs mt-1.5 block font-medium pl-2">
                      {errors.subject.message as string}
                    </span>
                  )}
                </div>
                <div>
                  <textarea
                    {...register("message", {
                      required: "Message is required",
                    })}
                    placeholder="Your Message"
                    rows={5}
                    className="w-full p-4 md:p-5 bg-slate-50 dark:bg-slate-950/50 border border-slate-200 dark:border-slate-800 rounded-2xl outline-none focus:ring-2 focus:ring-primary/50 focus:border-primary/50 transition-all resize-none placeholder:text-slate-400 font-medium"
                  />
                  {errors.message && (
                    <span className="text-red-500 text-xs mt-1.5 block font-medium pl-2">
                      {errors.message.message as string}
                    </span>
                  )}
                </div>
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full bg-gradient-to-r from-primary to-accent text-white py-4 md:py-5 rounded-2xl font-bold flex items-center justify-center gap-2 hover:scale-[1.02] transition-transform shadow-xl shadow-primary/25 disabled:opacity-70 disabled:hover:scale-100 text-lg"
                >
                  {isSubmitting ? (
                    <Loader2 className="w-6 h-6 animate-spin" />
                  ) : (
                    <>
                      <Send className="w-5 h-5" /> Send Message
                    </>
                  )}
                </button>
              </form>
            </div>
          </div>
        </div>

        {/* FAQ Section */}
        <section className="container mx-auto px-4 md:px-6 pt-16">
          <h2 className="text-3xl font-bold text-center mb-10 font-heading">
            Frequently Asked Questions
          </h2>
          <div className="max-w-3xl mx-auto space-y-4">
            {faqs.map((faq, idx) => (
              <div
                key={idx}
                className="bg-white dark:bg-slate-800 rounded-2xl border border-slate-100 dark:border-slate-700 overflow-hidden shadow-sm"
              >
                <button
                  onClick={() => setOpenFaq(openFaq === idx ? null : idx)}
                  className="w-full p-6 text-left flex justify-between items-center focus:outline-none"
                >
                  <span className="font-semibold text-lg">{faq.q}</span>
                  <ChevronDown
                    className={`w-5 h-5 text-slate-400 transition-transform ${openFaq === idx ? "rotate-180" : ""}`}
                  />
                </button>
                <AnimatePresence>
                  {openFaq === idx && (
                    <motion.div
                      initial={{ height: 0 }}
                      animate={{ height: "auto" }}
                      exit={{ height: 0 }}
                      className="overflow-hidden"
                    >
                      <div className="p-6 pt-0 text-slate-500 border-t border-slate-50 dark:border-slate-700 mt-2">
                        {faq.a}
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            ))}
          </div>
        </section>
      </div>
    </div>
  );
}
