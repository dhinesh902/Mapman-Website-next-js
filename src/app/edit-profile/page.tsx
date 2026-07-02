"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { Save, Camera, X, User, CheckCircle2 } from "lucide-react";
import Link from "next/link";
import { motion } from "framer-motion";

export default function EditProfilePage() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const [success, setSuccess] = useState(false);
  const [preview, setPreview] = useState<string | null>(null);

  const onSubmit = (data: any) => {
    setSuccess(true);
    setTimeout(() => setSuccess(false), 3000);
  };

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const url = URL.createObjectURL(file);
      setPreview(url);
    }
  };

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-950 py-12 px-4 md:px-6 relative overflow-hidden">
      {/* Background Decorative Elements */}
      <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] rounded-full bg-primary/20 blur-[120px] pointer-events-none" />
      <div className="absolute bottom-[-10%] right-[-10%] w-[40%] h-[40%] rounded-full bg-accent/20 blur-[120px] pointer-events-none" />

      <div className="container mx-auto max-w-4xl relative z-10">
        <div className="flex items-center justify-between mb-10">
          <div>
            <h1 className="text-4xl font-extrabold font-heading text-slate-900 dark:text-white">
              Edit Profile
            </h1>
            <p className="text-slate-500 font-medium mt-2">
              Manage your personal settings
            </p>
          </div>
          <Link
            href="/profile"
            className="text-slate-500 bg-white/50 dark:bg-slate-800/50 hover:bg-white dark:hover:bg-slate-800 p-3 rounded-2xl shadow-sm backdrop-blur-sm transition-all hover:scale-105 border border-slate-200 dark:border-slate-700"
          >
            <X className="w-6 h-6" />
          </Link>
        </div>

        {success && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            className="mb-8 p-5 bg-emerald-50 dark:bg-emerald-500/10 text-emerald-700 dark:text-emerald-400 border border-emerald-200 dark:border-emerald-500/20 rounded-2xl flex items-center gap-3 font-bold shadow-sm"
          >
            <CheckCircle2 className="w-6 h-6" /> Profile updated successfully!
          </motion.div>
        )}

        <form
          onSubmit={handleSubmit(onSubmit)}
          className="bg-white/80 dark:bg-slate-900/80 backdrop-blur-xl p-8 md:p-10 rounded-[2.5rem] border border-white/50 dark:border-slate-700/50 shadow-2xl shadow-slate-200/50 dark:shadow-none space-y-8 relative overflow-hidden"
        >
          <div className="absolute top-0 right-0 w-64 h-64 bg-primary/5 rounded-bl-full -z-10" />

          {/* Photo Upload */}
          <div className="flex flex-col items-center justify-center mb-8 relative">
            <div className="relative w-36 h-36 rounded-full border-[6px] border-white dark:border-slate-800 shadow-xl bg-slate-100 dark:bg-slate-800 flex items-center justify-center overflow-hidden shrink-0 group">
              {preview ? (
                <img
                  src={preview}
                  alt="Preview"
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                />
              ) : (
                <User className="w-16 h-16 text-slate-300 group-hover:scale-110 transition-transform duration-500" />
              )}
              <label className="absolute inset-0 bg-black/50 flex flex-col items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300 cursor-pointer backdrop-blur-sm">
                <Camera className="w-8 h-8 text-white mb-1" />
                <span className="text-white text-xs font-bold uppercase tracking-wider">
                  Change
                </span>
                <input
                  type="file"
                  accept="image/*"
                  className="hidden"
                  onChange={handleImageChange}
                />
              </label>
            </div>
            {preview && (
              <button
                type="button"
                onClick={() => setPreview(null)}
                className="text-red-500 text-sm font-bold mt-4 hover:underline"
              >
                Remove Photo
              </button>
            )}
          </div>

          {/* Fields */}
          <div className="grid md:grid-cols-2 gap-6">
            <div className="col-span-full">
              <label className="block text-sm font-bold mb-2 text-slate-700 dark:text-slate-300 ml-2">
                Username
              </label>
              <input
                {...register("username", { required: true })}
                defaultValue="johndoe123"
                placeholder="Enter username"
                className="w-full p-4 md:p-5 bg-slate-50 dark:bg-slate-950/50 border border-slate-200 dark:border-slate-800 rounded-2xl outline-none focus:ring-2 focus:ring-primary/50 focus:border-primary/50 transition-all font-medium shadow-inner"
              />
            </div>

            <div>
              <label className="block text-sm font-bold mb-2 text-slate-700 dark:text-slate-300 ml-2">
                Email Address
              </label>
              <input
                {...register("email", {
                  required: true,
                  pattern: /^\S+@\S+$/i,
                })}
                type="email"
                defaultValue="john.doe@example.com"
                placeholder="Email"
                className="w-full p-4 md:p-5 bg-slate-50 dark:bg-slate-950/50 border border-slate-200 dark:border-slate-800 rounded-2xl outline-none focus:ring-2 focus:ring-primary/50 focus:border-primary/50 transition-all font-medium shadow-inner"
              />
            </div>

            <div>
              <label className="block text-sm font-bold mb-2 text-slate-700 dark:text-slate-300 ml-2">
                Mobile Number
              </label>
              <input
                {...register("phone", { required: true })}
                defaultValue="+91 9876543210"
                placeholder="Mobile Number"
                maxLength={10}
                className="w-full p-4 md:p-5 bg-slate-50 dark:bg-slate-950/50 border border-slate-200 dark:border-slate-800 rounded-2xl outline-none focus:ring-2 focus:ring-primary/50 focus:border-primary/50 transition-all font-medium shadow-inner"
              />
            </div>

            <div>
              <label className="block text-sm font-bold mb-2 text-slate-700 dark:text-slate-300 ml-2">
                State
              </label>
              <input
                {...register("state")}
                defaultValue="Tamil Nadu"
                placeholder="State"
                className="w-full p-4 md:p-5 bg-slate-50 dark:bg-slate-950/50 border border-slate-200 dark:border-slate-800 rounded-2xl outline-none focus:ring-2 focus:ring-primary/50 focus:border-primary/50 transition-all font-medium shadow-inner"
              />
            </div>

            <div>
              <label className="block text-sm font-bold mb-2 text-slate-700 dark:text-slate-300 ml-2">
                District
              </label>
              <input
                {...register("district")}
                defaultValue="Chennai"
                placeholder="District"
                className="w-full p-4 md:p-5 bg-slate-50 dark:bg-slate-950/50 border border-slate-200 dark:border-slate-800 rounded-2xl outline-none focus:ring-2 focus:ring-primary/50 focus:border-primary/50 transition-all font-medium shadow-inner"
              />
            </div>
          </div>

          <div className="pt-8 flex flex-col sm:flex-row gap-4">
            <Link
              href="/profile"
              className="w-full sm:w-1/3 py-4 md:py-5 text-center bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-700 rounded-2xl font-bold transition-all shadow-sm"
            >
              Cancel
            </Link>
            <button
              type="submit"
              className="w-full sm:w-2/3 bg-gradient-to-r from-primary to-accent text-white py-4 md:py-5 rounded-2xl font-bold flex items-center justify-center gap-2 hover:scale-[1.02] transition-transform shadow-xl shadow-primary/25 text-lg"
            >
              <Save className="w-5 h-5" /> Save Changes
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
