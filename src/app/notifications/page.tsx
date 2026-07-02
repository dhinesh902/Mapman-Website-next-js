"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Bell, Check, Clock, Trash2, CheckCircle2, ShoppingBag, Video } from "lucide-react";

type Notification = {
  id: number;
  type: "shop" | "video" | "system";
  title: string;
  desc: string;
  time: string;
  read: boolean;
};

const initialNotifications: Notification[] = [
  { id: 1, type: "shop", title: "New Shop Added near you", desc: "A new pharmacy has opened 2 km away in Central, Chennai.", time: "2 hours ago", read: false },
  { id: 2, type: "video", title: "Your video got 100 views", desc: "Congratulations! Your video 'Top 10 Street Foods' is gaining traction.", time: "1 day ago", read: true },
  { id: 3, type: "system", title: "Profile updated successfully", desc: "Your contact details have been updated.", time: "3 days ago", read: true },
];

export default function NotificationsPage() {
  const [notifications, setNotifications] = useState<Notification[]>(initialNotifications);

  const markAsRead = (id: number) => {
    setNotifications(notifications.map(n => n.id === id ? { ...n, read: true } : n));
  };

  const deleteNotification = (id: number) => {
    setNotifications(notifications.filter(n => n.id !== id));
  };

  const markAllAsRead = () => {
    setNotifications(notifications.map(n => ({ ...n, read: true })));
  };

  const getIcon = (type: string) => {
    switch (type) {
      case "shop": return <ShoppingBag className="w-5 h-5" />;
      case "video": return <Video className="w-5 h-5" />;
      default: return <Bell className="w-5 h-5" />;
    }
  };

  return (
    <div className="container mx-auto px-4 md:px-6 py-8 pb-24 max-w-4xl">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between mb-8 gap-4">
        <div>
          <h1 className="text-3xl font-bold font-heading">Notifications</h1>
          <p className="text-slate-500 mt-1">Stay updated with your latest alerts</p>
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

      <div className="space-y-4">
        <AnimatePresence mode="popLayout">
          {notifications.length === 0 ? (
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              className="text-center py-20 bg-slate-50 dark:bg-slate-800/50 rounded-2xl border border-dashed border-slate-200 dark:border-slate-700"
            >
              <div className="w-16 h-16 bg-slate-100 dark:bg-slate-800 rounded-full flex items-center justify-center text-slate-400 mx-auto mb-4">
                <Bell className="w-8 h-8" />
              </div>
              <h3 className="text-xl font-semibold mb-2">No Notifications</h3>
              <p className="text-slate-500 max-w-sm mx-auto">You're all caught up! Check back later for new alerts and updates.</p>
            </motion.div>
          ) : (
            notifications.map((n) => (
              <motion.div
                key={n.id}
                layout
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, x: -50 }}
                className={`p-5 rounded-2xl border transition-all ${
                  n.read 
                    ? "bg-white dark:bg-slate-800 border-slate-100 dark:border-slate-700" 
                    : "bg-primary/5 border-primary/20 shadow-sm"
                }`}
              >
                <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-4">
                  <div className="flex gap-4">
                    <div className={`mt-1 shrink-0 w-12 h-12 rounded-xl flex items-center justify-center ${
                      n.read ? "bg-slate-100 dark:bg-slate-700 text-slate-500 dark:text-slate-400" : "bg-primary text-white shadow-md shadow-primary/20"
                    }`}>
                      {getIcon(n.type)}
                    </div>
                    <div>
                      <div className="flex items-center gap-2 mb-1">
                        <h3 className={`text-lg ${n.read ? "font-semibold text-slate-700 dark:text-slate-200" : "font-bold text-slate-900 dark:text-white"}`}>
                          {n.title}
                        </h3>
                        {!n.read && (
                          <span className="w-2 h-2 rounded-full bg-primary" />
                        )}
                      </div>
                      <p className={`text-sm mb-3 ${n.read ? "text-slate-500" : "text-slate-600 dark:text-slate-300 font-medium"}`}>
                        {n.desc}
                      </p>
                      <div className="flex items-center gap-1.5 text-xs text-slate-400 font-medium">
                        <Clock className="w-3.5 h-3.5" /> {n.time}
                      </div>
                    </div>
                  </div>
                  
                  <div className="flex items-center gap-2 self-end sm:self-start border-t border-slate-100 sm:border-0 pt-3 sm:pt-0 mt-3 sm:mt-0 w-full sm:w-auto justify-end">
                    {!n.read && (
                      <button 
                        onClick={() => markAsRead(n.id)}
                        className="text-primary text-sm font-medium hover:bg-primary/10 px-3 py-1.5 rounded-lg flex items-center gap-1.5 transition-colors"
                      >
                        <Check className="w-4 h-4" /> Read
                      </button>
                    )}
                    <button 
                      onClick={() => deleteNotification(n.id)}
                      className="text-slate-400 hover:text-red-500 hover:bg-red-50 dark:hover:bg-red-500/10 text-sm font-medium px-3 py-1.5 rounded-lg flex items-center gap-1.5 transition-colors"
                    >
                      <Trash2 className="w-4 h-4" /> Delete
                    </button>
                  </div>
                </div>
              </motion.div>
            ))
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}
