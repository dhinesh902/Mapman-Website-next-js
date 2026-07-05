"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Bell,
  Check,
  Clock,
  Trash2,
  CheckCircle2,
  ShoppingBag,
  Video,
  Loader2,
} from "lucide-react";
import { fetchNotificationsApi } from "@/services/apiService";
import { NotificationData } from "@/models/home_model";

export default function NotificationsPage() {
  const [notifications, setNotifications] = useState<NotificationData[]>([]);
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(true);
  const [loadingMore, setLoadingMore] = useState(false);
  const [hasMore, setHasMore] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const loadNotifications = async (currentPage: number) => {
    try {
      if (currentPage === 1) setLoading(true);
      else setLoadingMore(true);
      setError(null);

      const res = await fetchNotificationsApi(currentPage);
      const newData: NotificationData[] = res.data || [];

      if (currentPage === 1) {
        setNotifications(newData);
      } else {
        setNotifications((prev) => {
          const existingIds = new Set(prev.map((n) => n.id));
          const filteredNew = newData.filter((n) => !existingIds.has(n.id));
          return [...prev, ...filteredNew];
        });
      }

      setHasMore(newData.length === 30);
    } catch (err) {
      setError("Failed to fetch notifications.");
    } finally {
      setLoading(false);
      setLoadingMore(false);
    }
  };

  useEffect(() => {
    loadNotifications(page);
  }, [page]);

  const markAsRead = (id: number) => {
    setNotifications(
      notifications.map((n) =>
        n.id === id ? { ...n, readStatus: "read" } : n,
      ),
    );
  };

  const markAllAsRead = () => {
    setNotifications(notifications.map((n) => ({ ...n, readStatus: "read" })));
  };

  const getIcon = (type: string) => {
    switch (type) {
      case "shop":
        return <ShoppingBag className="w-5 h-5" />;
      case "video":
        return <Video className="w-5 h-5" />;
      default:
        return <Bell className="w-5 h-5" />;
    }
  };

  return (
    <div className="container mx-auto px-4 md:px-6 py-8 pb-8 max-w-7xl">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between mb-8 gap-4">
        <div>
          <h1 className="text-3xl font-bold font-heading">Notifications</h1>
          <p className="text-slate-500 mt-1">
            Stay updated with your latest alerts
          </p>
        </div>
        {notifications.length > 0 && (
          <button
            onClick={markAllAsRead}
            className="text-sm font-semibold text-primary hover:text-primary/80 flex items-center gap-1.5 bg-primary/10 px-4 py-2 rounded-lg transition-colors w-fit"
          >
            <CheckCircle2 className="w-4 h-4" /> Mark All as Read
          </button>
        )}
      </div>

      <div>
        {loading ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[1, 2, 3, 4, 5, 6].map((i) => (
              <div
                key={i}
                className="rounded-3xl border border-slate-100 dark:border-slate-800 bg-white dark:bg-slate-800/50 animate-pulse overflow-hidden"
              >
                <div className="h-32 bg-slate-200 dark:bg-slate-700 w-full" />
                <div className="p-6 space-y-4">
                  <div className="flex gap-4 items-center">
                    <div className="w-14 h-14 rounded-2xl bg-slate-200 dark:bg-slate-700 shrink-0" />
                    <div className="flex-1 space-y-2">
                      <div className="h-4 bg-slate-200 dark:bg-slate-700 rounded w-2/3" />
                      <div className="h-3 bg-slate-200 dark:bg-slate-700 rounded w-1/3" />
                    </div>
                  </div>
                  <div className="space-y-2">
                    <div className="h-3 bg-slate-200 dark:bg-slate-700 rounded w-full" />
                    <div className="h-3 bg-slate-200 dark:bg-slate-700 rounded w-4/5" />
                  </div>
                </div>
              </div>
            ))}
          </div>
        ) : error ? (
          <div className="text-center py-20 bg-red-50 dark:bg-red-500/10 rounded-2xl border border-red-100 dark:border-red-500/20 text-red-500">
            <p className="font-semibold">{error}</p>
            <button
              onClick={() => loadNotifications(page)}
              className="mt-4 px-4 py-2 bg-red-100 dark:bg-red-500/20 rounded-lg hover:bg-red-200 dark:hover:bg-red-500/30 transition-colors"
            >
              Try Again
            </button>
          </div>
        ) : (
          <>
            {notifications.length === 0 ? (
              <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                className="text-center py-20 bg-slate-50 dark:bg-slate-800/50 rounded-3xl border border-dashed border-slate-200 dark:border-slate-700 max-w-3xl mx-auto"
              >
                <div className="w-20 h-20 bg-slate-100 dark:bg-slate-800 rounded-full flex items-center justify-center text-slate-400 mx-auto mb-6 shadow-inner">
                  <Bell className="w-10 h-10" />
                </div>
                <h3 className="text-2xl font-bold font-heading mb-3 text-slate-800 dark:text-white">
                  No Notifications
                </h3>
                <p className="text-slate-500 max-w-md mx-auto text-lg">
                  You're all caught up! Check back later for new alerts and
                  updates.
                </p>
              </motion.div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                <AnimatePresence mode="popLayout">
                  {notifications.map((n) => (
                    <motion.div
                      key={n.id}
                      layout
                      initial={{ opacity: 0, scale: 0.9 }}
                      animate={{ opacity: 1, scale: 1 }}
                      exit={{ opacity: 0, scale: 0.9 }}
                      className={`group flex flex-col h-full rounded-[2rem] overflow-hidden border transition-all duration-300 hover:-translate-y-1 ${
                        n.readStatus === "read"
                          ? "bg-white dark:bg-slate-900 border-slate-200 dark:border-slate-800 hover:shadow-xl hover:shadow-slate-200/50 dark:hover:shadow-black/50"
                          : "bg-gradient-to-b from-primary/5 to-white dark:to-slate-900 border-primary/20 shadow-xl shadow-primary/5"
                      }`}
                    >
                      {/* Optional Media Banner */}
                      {n.msgImage && !n.msgImage.includes(".m3u8") ? (
                        <div className="w-full h-36 relative overflow-hidden bg-slate-100 dark:bg-slate-800">
                          <img
                            src={
                              n.msgImage.startsWith("/")
                                ? `https://d7bnll1h35b3b.cloudfront.net${n.msgImage}`
                                : n.msgImage
                            }
                            alt={n.msgTitle || "Notification"}
                            className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                            onError={(e) => {
                              (e.target as HTMLImageElement).style.display =
                                "none";
                            }}
                          />
                          <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-80" />
                        </div>
                      ) : (
                        <div className="w-full h-24 bg-gradient-to-br from-slate-100 to-slate-50 dark:from-slate-800 dark:to-slate-800/50 relative overflow-hidden">
                          <div className="absolute top-[-50%] right-[-10%] w-32 h-32 rounded-full bg-primary/10 blur-[30px]" />
                        </div>
                      )}

                      <div className="p-6 flex-1 flex flex-col relative -mt-12 z-10">
                        {n.openStatus === "notOpened" ? (
                          <div className="absolute top-6 right-6 w-3 h-3 bg-red-500 rounded-full animate-pulse shadow-[0_0_10px_rgba(239,68,68,0.8)]" />
                        ) : n.openStatus === "opened" ? (
                          <div className="absolute top-6 right-6 w-3 h-3 bg-green-500 rounded-full shadow-[0_0_10px_rgba(34,197,94,0.5)]" />
                        ) : null}
                        <div className="flex items-center gap-4 mb-4">
                          <div
                            className={`w-16 h-16 rounded-2xl flex items-center justify-center shrink-0 border-4 border-white dark:border-slate-900 ${
                              n.readStatus === "read"
                                ? "bg-slate-100 dark:bg-slate-800 text-slate-500"
                                : "bg-gradient-to-br from-primary to-accent text-white shadow-lg shadow-primary/30"
                            }`}
                          >
                            {getIcon(n.msgType || "system")}
                          </div>
                          <div className="pt-8">
                            <h3
                              className={`font-bold line-clamp-1 text-lg ${n.readStatus === "read" ? "text-slate-700 dark:text-slate-200" : "text-slate-900 dark:text-white"}`}
                            >
                              {n.msgTitle}
                            </h3>
                            <div className="flex items-center gap-1.5 text-xs text-slate-400 font-medium mt-1">
                              <Clock className="w-3.5 h-3.5" /> {n.createdAt}
                            </div>
                          </div>
                        </div>

                        <p
                          className={`text-sm mb-6 flex-1 ${n.readStatus === "read" ? "text-slate-500" : "text-slate-700 dark:text-slate-300 font-medium leading-relaxed"}`}
                        >
                          {n.msgDesc}
                        </p>
                      </div>
                    </motion.div>
                  ))}
                </AnimatePresence>
              </div>
            )}

            {hasMore && (
              <div className="pt-4 pb-8 flex justify-center">
                <button
                  onClick={() => setPage((p) => p + 1)}
                  disabled={loadingMore}
                  className="bg-primary/10 text-primary font-semibold px-8 py-3 rounded-xl hover:bg-primary/20 transition-colors disabled:opacity-50 flex items-center gap-2"
                >
                  {loadingMore && <Loader2 className="w-4 h-4 animate-spin" />}
                  {loadingMore ? "Loading more..." : "Load More"}
                </button>
              </div>
            )}
          </>
        )}
      </div>
    </div>
  );
}
