"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  X,
  AlertTriangle,
  Loader2,
  UploadCloud,
  Image as ImageIcon,
} from "lucide-react";
import { reportIssueApi } from "@/services/apiService";

interface ReportIssueSidebarProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function ReportIssueSidebar({
  isOpen,
  onClose,
}: ReportIssueSidebarProps) {
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [errorMsg, setErrorMsg] = useState("");

  const [formData, setFormData] = useState({
    issueType: "",
    description: "",
    email: "",
  });
  const [image, setImage] = useState<File | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.issueType || !formData.description || !formData.email) {
      setErrorMsg("Please fill in all required fields.");
      return;
    }

    setLoading(true);
    setErrorMsg("");

    try {
      const data = new FormData();
      data.append("issueType", formData.issueType);
      data.append("description", formData.description);
      data.append("email", formData.email);
      if (image) {
        data.append("image", image);
      }

      const res = await reportIssueApi(data);
      if (res?.status === 200 || res?.status === 201 || res?.data) {
        setSuccess(true);
        setTimeout(() => {
          onClose();
          resetForm();
        }, 2000);
      } else {
        setErrorMsg("Failed to report issue. Please try again.");
      }
    } catch (error) {
      console.error("Report issue error:", error);
      setErrorMsg("An error occurred. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const resetForm = () => {
    setFormData({ issueType: "", description: "", email: "" });
    setImage(null);
    setSuccess(false);
    setErrorMsg("");
  };

  const handleClose = () => {
    resetForm();
    onClose();
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            onClick={handleClose}
            className="fixed inset-0 bg-slate-900/40 dark:bg-black/60 backdrop-blur-sm z-[100]"
          />

          <motion.div
            initial={{ x: "100%", opacity: 0.5 }}
            animate={{ x: 0, opacity: 1 }}
            exit={{ x: "100%", opacity: 0.5 }}
            transition={{
              type: "spring",
              damping: 30,
              stiffness: 300,
              mass: 0.8,
            }}
            className="fixed top-0 right-0 w-full max-w-md h-full bg-white dark:bg-slate-900 z-[101] shadow-[[-20px_0_40px_rgba(0,0,0,0.1)]] flex flex-col font-sans rounded-l-[0rem] overflow-hidden"
          >
            <div className="relative p-8 pb-6 border-b border-slate-100 dark:border-slate-800">
              <div className="flex items-start justify-between relative z-10">
                <div className="flex flex-col gap-1.5">
                  <div className="w-12 h-12 bg-amber-100 text-amber-600 rounded-2xl flex items-center justify-center mb-3">
                    <img
                      src="https://cdn-icons-png.flaticon.com/128/10984/10984650.png"
                      alt="report"
                      height={30}
                      width={30}
                    />
                  </div>
                  <h2 className="text-2xl font-extrabold font-heading text-slate-900 dark:text-white tracking-tight">
                    Report an Issue
                  </h2>
                  <p className="text-sm text-slate-500 font-medium">
                    Let us know if you found a problem.
                  </p>
                </div>
                <button
                  onClick={handleClose}
                  className="w-10 h-10 bg-slate-100 dark:bg-slate-800 rounded-full flex items-center justify-center text-slate-500 hover:bg-slate-200"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>
            </div>

            <div className="p-8 flex-1 overflow-y-auto custom-scrollbar">
              {success ? (
                <div className="flex flex-col items-center justify-center h-full text-center">
                  <div className="w-16 h-16 bg-emerald-100 text-emerald-600 rounded-full flex items-center justify-center mb-4">
                    <svg
                      className="w-8 h-8"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M5 13l4 4L19 7"
                      />
                    </svg>
                  </div>
                  <h3 className="text-xl font-bold mb-2">Issue Reported</h3>
                  <p className="text-slate-500">
                    Thank you! We will look into it shortly.
                  </p>
                </div>
              ) : (
                <form className="space-y-6">
                  {errorMsg && (
                    <div className="p-3 bg-red-50 text-red-600 rounded-xl text-sm font-medium border border-red-100">
                      {errorMsg}
                    </div>
                  )}

                  <div>
                    <label className="block text-sm font-bold text-slate-700 dark:text-slate-300 mb-2">
                      Issue Type *
                    </label>
                    <select
                      value={formData.issueType}
                      onChange={(e) =>
                        setFormData({ ...formData, issueType: e.target.value })
                      }
                      className="w-full px-4 py-3 rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 focus:ring-2 focus:ring-primary outline-none"
                    >
                      <option value="">Select issue type</option>
                      <option value="bug">Login Button Not working</option>
                      <option value="content">Mobile Login Error</option>
                      <option value="shop">Page Not Loading</option>
                      <option value="display">UI/Display problem</option>
                      <option value="other">Other</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-sm font-bold text-slate-700 dark:text-slate-300 mb-2">
                      Email Address *
                    </label>
                    <input
                      type="email"
                      value={formData.email}
                      onChange={(e) =>
                        setFormData({ ...formData, email: e.target.value })
                      }
                      placeholder="your@email.com"
                      className="w-full px-4 py-3 rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 focus:ring-2 focus:ring-primary outline-none"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-bold text-slate-700 dark:text-slate-300 mb-2">
                      Description *
                    </label>
                    <textarea
                      value={formData.description}
                      onChange={(e) =>
                        setFormData({
                          ...formData,
                          description: e.target.value,
                        })
                      }
                      placeholder="Please describe the issue in detail..."
                      rows={4}
                      className="w-full px-4 py-3 rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 focus:ring-2 focus:ring-primary outline-none resize-none"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-bold text-slate-700 dark:text-slate-300 mb-2">
                      Screenshot (Optional)
                    </label>
                    <label className="flex flex-col items-center justify-center w-full h-32 border-2 border-slate-300 dark:border-slate-600 border-dashed rounded-xl cursor-pointer bg-slate-50 dark:bg-slate-800 hover:bg-slate-100 dark:hover:bg-slate-700 transition-colors">
                      <div className="flex flex-col items-center justify-center pt-5 pb-6">
                        {image ? (
                          <>
                            <ImageIcon className="w-8 h-8 text-primary mb-2" />
                            <p className="text-sm text-slate-500 font-medium truncate max-w-[200px]">
                              {image.name}
                            </p>
                          </>
                        ) : (
                          <>
                            <UploadCloud className="w-8 h-8 text-slate-400 mb-2" />
                            <p className="text-sm text-slate-500 font-medium">
                              Click to upload image
                            </p>
                          </>
                        )}
                      </div>
                      <input
                        type="file"
                        className="hidden"
                        accept="image/*"
                        onChange={(e) => setImage(e.target.files?.[0] || null)}
                      />
                    </label>
                  </div>

                  <button
                    type="button"
                    onClick={handleSubmit}
                    disabled={loading}
                    className="w-full py-4 rounded-xl bg-primary text-white font-bold hover:bg-primary/90 transition-colors flex items-center justify-center gap-2 mt-4"
                  >
                    {loading ? (
                      <Loader2 className="w-5 h-5 animate-spin" />
                    ) : (
                      "Submit Report"
                    )}
                  </button>
                </form>
              )}
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
