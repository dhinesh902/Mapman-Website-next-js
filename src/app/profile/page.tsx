"use client";

import {
  User,
  Settings,
  Video,
  MapPin,
  Edit,
  Store,
  Bell,
  LogOut,
  ChevronRight,
} from "lucide-react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { useState, useEffect } from "react";
import NotificationSidebar from "@/components/profile/NotificationSidebar";
import ReportIssueSidebar from "@/components/profile/ReportIssueSidebar";
import { Eye, Loader2 } from "lucide-react";
import { logoutApi, deleteAccountApi, getProfileApi } from "@/services/apiService";

export default function ProfilePage() {
  const stats = [
    {
      title: "Saved Videos",
      value: "24",
      icon: Video,
      color: "text-blue-500",
      bg: "bg-blue-500/10",
    },
    {
      title: "Saved Shops",
      value: "12",
      icon: MapPin,
      color: "text-emerald-500",
      bg: "bg-emerald-500/10",
    },
    {
      title: "Registered Shops",
      value: "1",
      icon: Store,
      color: "text-purple-500",
      bg: "bg-purple-500/10",
    },
    {
      title: "Notifications",
      value: "3",
      icon: Bell,
      color: "text-amber-500",
      bg: "bg-amber-500/10",
    },
  ];

  const [isNotificationSidebarOpen, setIsNotificationSidebarOpen] =
    useState(false);
  const [isReportIssueOpen, setIsReportIssueOpen] = useState(false);
  const [isLogoutModalOpen, setIsLogoutModalOpen] = useState(false);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [actionLoading, setActionLoading] = useState(false);
  const [profile, setProfile] = useState<any>(null);

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const res = await getProfileApi();
        if (res?.data) {
          setProfile(res.data);
        }
      } catch (error) {
        console.error("Failed to fetch profile", error);
      }
    };
    fetchProfile();
  }, []);

  const handleLogout = async () => {
    try {
      setActionLoading(true);
      await logoutApi();
      localStorage.removeItem("token");
      window.location.href = "/";
    } catch (error) {
      console.error("Logout failed:", error);
      // Still clear token and redirect on fail just in case
      localStorage.removeItem("token");
      window.location.href = "/";
    } finally {
      setActionLoading(false);
    }
  };

  const handleDeleteAccount = async () => {
    try {
      setActionLoading(true);
      await deleteAccountApi();
      localStorage.removeItem("token");
      window.location.href = "/";
    } catch (error) {
      console.error("Delete account failed:", error);
    } finally {
      setActionLoading(false);
    }
  };

  return (
    <div className="container mx-auto px-4 md:px-6 py-8 pb-8 max-w-6xl">
      <div className="grid lg:grid-cols-3 gap-8">
        {/* Left Sidebar - Profile Card */}
        <div className="lg:col-span-1 space-y-6">
          <div className="bg-slate-950 dark:bg-slate-900 rounded-[2.5rem] p-8 border border-slate-800 shadow-2xl flex flex-col items-center text-center relative overflow-hidden text-white">
            <div className="absolute top-0 right-0 w-48 h-48 bg-primary/20 rounded-full blur-[60px]" />
            <div className="relative w-32 h-32 rounded-full border-4 border-white/10 shadow-2xl mb-5 flex items-center justify-center bg-slate-800 overflow-hidden group">
              {profile?.profilePic ? (
                <img src={profile.profilePic.startsWith('http') ? profile.profilePic : `https://api.mapman.in${profile.profilePic}`} alt="Profile" className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500" />
              ) : (
                <User className="w-16 h-16 text-slate-400 group-hover:scale-110 transition-transform duration-500" />
              )}
            </div>
            <h1 className="text-3xl font-extrabold font-heading mb-1 text-white">
              {profile?.userName || "Loading..."}
            </h1>
            <p className="text-slate-400 font-medium mb-6">
              {profile?.email || "..."}
            </p>

            <Link
              href="/edit-profile"
              className="w-full py-4 bg-gradient-to-r from-primary to-accent text-white hover:scale-[1.02] rounded-2xl font-bold flex items-center justify-center gap-2 transition-all shadow-lg shadow-primary/25"
            >
              <Edit className="w-4 h-4" /> Edit Profile
            </Link>
          </div>

          <div className="bg-white dark:bg-slate-800 rounded-[2.5rem] p-4 border border-slate-100 dark:border-slate-700 shadow-sm flex flex-col gap-2">
            <button
              onClick={() => setIsNotificationSidebarOpen(true)}
              className="flex items-center justify-between p-4 hover:bg-slate-50 dark:hover:bg-slate-700/50 rounded-2xl transition-colors group w-full text-left"
            >
              <span className="font-semibold flex items-center gap-4 text-slate-700 dark:text-slate-200">
                <div className="w-10 h-10 rounded-xl bg-slate-100 dark:bg-slate-900 flex items-center justify-center group-hover:bg-primary/10 group-hover:text-primary transition-colors">
                  <Settings className="w-5 h-5" />
                </div>{" "}
                Account Settings
              </span>
              <ChevronRight className="w-4 h-4 text-slate-400 group-hover:text-primary transition-colors" />
            </button>
            <Link
              href="/saved"
              className="flex items-center justify-between p-4 hover:bg-slate-50 dark:hover:bg-slate-700/50 rounded-2xl transition-colors group"
            >
              <span className="font-semibold flex items-center gap-4 text-slate-700 dark:text-slate-200">
                <div className="w-10 h-10 rounded-xl bg-slate-100 dark:bg-slate-900 flex items-center justify-center group-hover:bg-primary/10 group-hover:text-primary transition-colors">
                  <Video className="w-5 h-5" />
                </div>{" "}
                Saved Items
              </span>
              <ChevronRight className="w-4 h-4 text-slate-400 group-hover:text-primary transition-colors" />
            </Link>
            <Link
              href="/viewed-videos"
              className="flex items-center justify-between p-4 hover:bg-slate-50 dark:hover:bg-slate-700/50 rounded-2xl transition-colors group"
            >
              <span className="font-semibold flex items-center gap-4 text-slate-700 dark:text-slate-200">
                <div className="w-10 h-10 rounded-xl bg-slate-100 dark:bg-slate-900 flex items-center justify-center group-hover:bg-primary/10 group-hover:text-primary transition-colors">
                  <Eye className="w-5 h-5" />
                </div>{" "}
                Viewed Videos
              </span>
              <ChevronRight className="w-4 h-4 text-slate-400 group-hover:text-primary transition-colors" />
            </Link>
            <button
              onClick={() => setIsLogoutModalOpen(true)}
              className="flex items-center justify-between p-4 hover:bg-red-50 text-red-600 dark:hover:bg-red-500/10 rounded-2xl transition-colors group mt-2 border border-transparent hover:border-red-100 dark:hover:border-red-500/20 w-full text-left"
            >
              <span className="font-semibold flex items-center gap-4">
                <div className="w-10 h-10 rounded-xl bg-red-50 dark:bg-red-500/10 flex items-center justify-center group-hover:bg-red-100 dark:group-hover:bg-red-500/20 transition-colors">
                  <LogOut className="w-5 h-5" />
                </div>{" "}
                Logout
              </span>
            </button>
            <button
              onClick={() => setIsDeleteModalOpen(true)}
              className="flex items-center justify-between p-4 hover:bg-red-50 text-red-600 dark:hover:bg-red-500/10 rounded-2xl transition-colors group mt-2 border border-transparent hover:border-red-100 dark:hover:border-red-500/20 w-full text-left"
            >
              <span className="font-semibold flex items-center gap-4">
                <div className="w-10 h-10 rounded-xl bg-red-50 dark:bg-red-500/10 flex items-center justify-center group-hover:bg-red-100 dark:group-hover:bg-red-500/20 transition-colors">
                  <User className="w-5 h-5" />
                </div>{" "}
                Delete Account
              </span>
            </button>
          </div>
        </div>

        {/* Right Content */}
        <div className="lg:col-span-2 space-y-8">
          {/* Quick Actions Section */}
          <div>
            <h2 className="text-2xl font-bold font-heading mb-6">
              Manage Business
            </h2>
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6">
              <Link href="/shop-analytics">
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.1 }}
                  className="bg-white dark:bg-slate-800 p-6 rounded-[2.5rem] border border-slate-100 dark:border-slate-700 shadow-sm hover:shadow-xl hover:-translate-y-1 transition-all duration-300 group text-center flex flex-col items-center gap-4 cursor-pointer h-full"
                >
                  <div className="w-16 h-16 bg-blue-50 dark:bg-blue-500/10 rounded-2xl flex items-center justify-center text-blue-500 group-hover:text-white transition-colors duration-300">
                    <img
                      src="https://cdn-icons-png.flaticon.com/128/2041/2041643.png"
                      alt="analytics"
                      height={25}
                      width={25}
                    />
                  </div>
                  <div>
                    <h3 className="text-lg font-bold text-slate-900 dark:text-white mb-1">
                      Shop Analytics
                    </h3>
                    <p className="text-slate-500 text-sm">
                      View your business performance & metrics
                    </p>
                  </div>
                </motion.div>
              </Link>

              <Link href="/shoplist">
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.2 }}
                  className="bg-white dark:bg-slate-800 p-6 rounded-[2.5rem] border border-slate-100 dark:border-slate-700 shadow-sm hover:shadow-xl hover:-translate-y-1 transition-all duration-300 group text-center flex flex-col items-center gap-4 cursor-pointer h-full"
                >
                  <div className="w-16 h-16 bg-emerald-50 dark:bg-emerald-500/10 rounded-2xl flex items-center justify-center text-emerald-500  group-hover:text-white transition-colors duration-300">
                    <img
                      src="https://cdn-icons-png.flaticon.com/128/869/869432.png"
                      alt="analytics"
                      height={25}
                      width={25}
                    />
                  </div>
                  <div>
                    <h3 className="text-lg font-bold text-slate-900 dark:text-white mb-1">
                      My Shop List
                    </h3>
                    <p className="text-slate-500 text-sm">
                      Manage your registered shops & details
                    </p>
                  </div>
                </motion.div>
              </Link>

              <button
                onClick={() => setIsReportIssueOpen(true)}
                className="text-left"
              >
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.3 }}
                  className="bg-white dark:bg-slate-800 p-6 rounded-[2.5rem] border border-slate-100 dark:border-slate-700 shadow-sm hover:shadow-xl hover:-translate-y-1 transition-all duration-300 group text-center flex flex-col items-center gap-4 cursor-pointer h-full"
                >
                  <div className="w-16 h-16 bg-amber-50 dark:bg-amber-500/10 rounded-2xl flex items-center justify-center text-amber-500 group-hover:text-white transition-colors duration-300">
                    <img
                      src="https://cdn-icons-png.flaticon.com/128/10984/10984650.png"
                      alt="report"
                      height={30}
                      width={30}
                    />
                  </div>
                  <div>
                    <h3 className="text-lg font-bold text-slate-900 dark:text-white mb-1">
                      Report an Issue
                    </h3>
                    <p className="text-slate-500 text-sm">
                      Let us know if you found a problem
                    </p>
                  </div>
                </motion.div>
              </button>
            </div>
          </div>

          {/* Help & Support Section */}
          <div className="mt-12">
            <h2 className="text-2xl font-bold font-heading mb-6">
              Help & Support
            </h2>
            <div className="grid sm:grid-cols-2 gap-4 md:gap-6">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3 }}
                className="bg-gradient-to-br from-primary to-accent p-8 rounded-[2.5rem] shadow-lg shadow-primary/20 text-white relative overflow-hidden group"
              >
                <div className="absolute top-0 right-0 w-32 h-32 bg-white/10 rounded-full blur-2xl group-hover:scale-150 transition-transform duration-700" />
                <h3 className="text-xl font-bold font-heading mb-2">
                  Need Assistance?
                </h3>
                <p className="text-white/80 text-sm mb-6 max-w-[200px]">
                  Our support team is available 24/7 to help you out.
                </p>
                <button className="bg-white text-primary px-5 py-2.5 rounded-xl font-bold text-sm shadow-md hover:scale-105 transition-transform">
                  Contact Support
                </button>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.4 }}
                className="bg-white dark:bg-slate-800 p-8 rounded-[2.5rem] border border-slate-100 dark:border-slate-700 shadow-sm flex flex-col justify-between hover:border-primary/30 transition-colors"
              >
                <div>
                  <h3 className="text-xl font-bold font-heading mb-2">
                    Documentation
                  </h3>
                  <p className="text-slate-500 text-sm mb-6">
                    Learn how to manage your shop, analyze data, and grow your
                    business.
                  </p>
                </div>
                <button className="w-max text-primary font-bold text-sm flex items-center gap-1 hover:gap-2 transition-all">
                  Read Guides <ChevronRight className="w-4 h-4" />
                </button>
              </motion.div>
            </div>
          </div>

          {/* Quick Contact Cards */}
          <div className="mt-12">
            <h2 className="text-2xl font-bold font-heading mb-6">
              Quick Contact
            </h2>
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 md:gap-6">
              <a
                href="sms:+919342376760"
                className="bg-white dark:bg-slate-800 p-6 rounded-[2rem] border border-slate-100 dark:border-slate-700 shadow-sm hover:shadow-lg hover:-translate-y-1 transition-all duration-300 flex flex-col items-center gap-4 text-center group"
              >
                <img
                  src="https://cdn-icons-png.flaticon.com/128/1817/1817646.png"
                  alt="SMS"
                  className="w-12 h-12 object-contain group-hover:scale-110 transition-transform"
                />
                <span className="font-bold text-sm text-slate-700 dark:text-slate-300">
                  SMS
                </span>
              </a>
              <a
                href="mailto:mapman6760@gmail.com"
                className="bg-white dark:bg-slate-800 p-6 rounded-[2rem] border border-slate-100 dark:border-slate-700 shadow-sm hover:shadow-lg hover:-translate-y-1 transition-all duration-300 flex flex-col items-center gap-4 text-center group"
              >
                <img
                  src="https://cdn-icons-png.flaticon.com/128/5968/5968534.png"
                  alt="Email"
                  className="w-12 h-12 object-contain group-hover:scale-110 transition-transform"
                />
                <span className="font-bold text-sm text-slate-700 dark:text-slate-300">
                  Email
                </span>
              </a>
              <a
                href="tel:+919342376760"
                className="bg-white dark:bg-slate-800 p-6 rounded-[2rem] border border-slate-100 dark:border-slate-700 shadow-sm hover:shadow-lg hover:-translate-y-1 transition-all duration-300 flex flex-col items-center gap-4 text-center group"
              >
                <img
                  src="https://cdn-icons-png.flaticon.com/128/724/724664.png"
                  alt="Call"
                  className="w-12 h-12 object-contain group-hover:scale-110 transition-transform"
                />
                <span className="font-bold text-sm text-slate-700 dark:text-slate-300">
                  Call
                </span>
              </a>
              <a
                href="https://wa.me/919342376760"
                target="_blank"
                rel="noopener noreferrer"
                className="bg-white dark:bg-slate-800 p-6 rounded-[2rem] border border-slate-100 dark:border-slate-700 shadow-sm hover:shadow-lg hover:-translate-y-1 transition-all duration-300 flex flex-col items-center gap-4 text-center group"
              >
                <img
                  src="https://cdn-icons-png.flaticon.com/128/5968/5968841.png"
                  alt="WhatsApp"
                  className="w-12 h-12 object-contain group-hover:scale-110 transition-transform"
                />
                <span className="font-bold text-sm text-slate-700 dark:text-slate-300">
                  WhatsApp
                </span>
              </a>
            </div>
          </div>
        </div>
      </div>

      <NotificationSidebar
        isOpen={isNotificationSidebarOpen}
        onClose={() => setIsNotificationSidebarOpen(false)}
      />
      <ReportIssueSidebar
        isOpen={isReportIssueOpen}
        onClose={() => setIsReportIssueOpen(false)}
      />

      {/* Logout Modal */}
      <AnimatePresence>
        {isLogoutModalOpen && (
          <div className="fixed inset-0 z-50 flex items-center justify-center px-4">
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsLogoutModalOpen(false)}
              className="absolute inset-0 bg-slate-900/40 backdrop-blur-sm"
            />
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              className="bg-white dark:bg-slate-800 rounded-3xl p-6 md:p-8 max-w-sm w-full relative z-10 shadow-2xl text-center"
            >
              <div className="w-16 h-16 bg-red-100 text-red-600 rounded-full flex items-center justify-center mx-auto mb-4">
                <LogOut className="w-8 h-8" />
              </div>
              <h2 className="text-2xl font-bold mb-2 text-slate-900 dark:text-white">
                Sign Out?
              </h2>
              <p className="text-slate-500 mb-6">
                Are you sure you want to log out of your account?
              </p>
              <div className="flex gap-3">
                <button
                  disabled={actionLoading}
                  onClick={() => setIsLogoutModalOpen(false)}
                  className="flex-1 py-3 bg-slate-100 text-slate-700 font-bold rounded-xl hover:bg-slate-200 transition-colors"
                >
                  Cancel
                </button>
                <button
                  disabled={actionLoading}
                  onClick={handleLogout}
                  className="flex-1 py-3 bg-red-500 text-white font-bold rounded-xl hover:bg-red-600 transition-colors flex justify-center items-center"
                >
                  {actionLoading ? (
                    <Loader2 className="w-5 h-5 animate-spin" />
                  ) : (
                    "Logout"
                  )}
                </button>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      {/* Delete Account Modal */}
      <AnimatePresence>
        {isDeleteModalOpen && (
          <div className="fixed inset-0 z-50 flex items-center justify-center px-4">
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsDeleteModalOpen(false)}
              className="absolute inset-0 bg-slate-900/60 backdrop-blur-sm"
            />
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              className="bg-white dark:bg-slate-800 rounded-3xl p-6 md:p-8 max-w-sm w-full relative z-10 shadow-2xl text-center"
            >
              <div className="w-16 h-16 bg-red-100 text-red-600 rounded-full flex items-center justify-center mx-auto mb-4">
                <User className="w-8 h-8" />
              </div>
              <h2 className="text-2xl font-bold mb-2 text-slate-900 dark:text-white">
                Delete Account?
              </h2>
              <p className="text-slate-500 mb-6">
                This action cannot be undone. All your data will be permanently
                removed.
              </p>
              <div className="flex gap-3">
                <button
                  disabled={actionLoading}
                  onClick={() => setIsDeleteModalOpen(false)}
                  className="flex-1 py-3 bg-slate-100 text-slate-700 font-bold rounded-xl hover:bg-slate-200 transition-colors"
                >
                  Cancel
                </button>
                <button
                  disabled={actionLoading}
                  onClick={handleDeleteAccount}
                  className="flex-1 py-3 bg-red-500 text-white font-bold rounded-xl hover:bg-red-600 transition-colors flex justify-center items-center"
                >
                  {actionLoading ? (
                    <Loader2 className="w-5 h-5 animate-spin" />
                  ) : (
                    "Delete"
                  )}
                </button>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
}
