"use client";

import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, Bell, Loader2, Store, Video, ShieldCheck } from "lucide-react";
import {
  fetchNotificationPreferenceApi,
  updateNotificationPreferenceApi,
} from "@/services/apiService";

interface NotificationSidebarProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function NotificationSidebar({
  isOpen,
  onClose,
}: NotificationSidebarProps) {
  const [loading, setLoading] = useState(false);
  const [saving, setSaving] = useState(false);

  const [preferences, setPreferences] = useState({
    enableNotifications: 1,
    newShop: 0,
    newVideo: 0,
  });

  useEffect(() => {
    if (isOpen) {
      loadPreferences();
    }
  }, [isOpen]);

  const loadPreferences = async () => {
    try {
      setLoading(true);
      const res = await fetchNotificationPreferenceApi();
      if (res?.data) {
        setPreferences({
          enableNotifications: res.data.enableNotifications ?? 1,
          newShop: res.data.newShop ?? 0,
          newVideo: res.data.newVideo ?? 0,
        });
      }
    } catch (error) {
      console.error("Failed to load preferences:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleToggle = async (key: keyof typeof preferences) => {
    if (
      key !== "enableNotifications" &&
      preferences.enableNotifications === 0
    ) {
      return;
    }

    const newPreferences = {
      ...preferences,
      [key]: preferences[key] === 1 ? 0 : 1,
    };

    setPreferences(newPreferences);

    try {
      setSaving(true);
      await updateNotificationPreferenceApi(newPreferences);
    } catch (error) {
      console.error("Failed to update preferences:", error);
      setPreferences(preferences);
    } finally {
      setSaving(false);
    }
  };

  const isMasterDisabled = preferences.enableNotifications === 0;

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            onClick={onClose}
            className="fixed inset-0 bg-slate-900/40 dark:bg-black/60 backdrop-blur-sm z-[100]"
          />

          {/* Sidebar */}
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
            className="fixed top-0 right-0 w-full max-w-md h-full bg-white dark:bg-slate-900 z-[101] shadow-[[-20px_0_40px_rgba(0,0,0,0.1)]] dark:shadow-[[-20px_0_40px_rgba(0,0,0,0.5)]] flex flex-col font-sans rounded-l-[0rem] overflow-hidden border-l border-slate-200/50 dark:border-slate-800/50"
          >
            {/* Header */}
            <div className="relative p-8 pb-6 border-b border-slate-100 dark:border-slate-800/60 overflow-hidden">
              <div className="absolute top-0 right-0 w-64 h-64 bg-primary/10 rounded-full blur-[60px] -z-10 translate-x-1/2 -translate-y-1/2" />
              <div className="flex items-start justify-between relative z-10">
                <div className="flex flex-col gap-1.5">
                  <div className="w-12 h-12 bg-gradient-to-br from-primary to-accent rounded-2xl flex items-center justify-center text-white shadow-lg shadow-primary/25 mb-3">
                    <Bell className="w-6 h-6" />
                  </div>
                  <h2 className="text-2xl font-extrabold font-heading text-slate-900 dark:text-white tracking-tight">
                    Notification Settings
                  </h2>
                  <p className="text-sm text-slate-500 font-medium">
                    Control the alerts you want to receive.
                  </p>
                </div>
                <button
                  onClick={onClose}
                  className="w-10 h-10 bg-slate-100 dark:bg-slate-800 rounded-full flex items-center justify-center text-slate-500 hover:bg-slate-200 dark:hover:bg-slate-700 hover:text-slate-900 dark:hover:text-white transition-colors"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>
            </div>

            {/* Content */}
            <div className="p-8 flex-1 overflow-y-auto custom-scrollbar">
              {loading ? (
                <div className="flex flex-col items-center justify-center h-48 gap-4">
                  <Loader2 className="w-8 h-8 animate-spin text-primary" />
                  <p className="text-sm text-slate-500 font-medium animate-pulse">
                    Syncing preferences...
                  </p>
                </div>
              ) : (
                <div className="space-y-8">
                  {/* Master Toggle */}
                  <div className="bg-slate-50 dark:bg-slate-800/40 p-6 rounded-[2rem] border border-slate-200/60 dark:border-slate-700/60 shadow-sm relative overflow-hidden group">
                    <div className="absolute inset-0 bg-gradient-to-br from-primary/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                    <div className="flex items-center justify-between relative z-10">
                      <div className="flex gap-4 items-center pr-4">
                        <div className="w-10 h-10 rounded-full bg-white dark:bg-slate-700 shadow-sm flex items-center justify-center shrink-0 text-primary">
                          <ShieldCheck className="w-5 h-5" />
                        </div>
                        <div>
                          <h3 className="font-bold text-slate-900 dark:text-white mb-0.5 text-base">
                            Enable Notifications
                          </h3>
                          <p className="text-sm text-slate-500 leading-tight">
                            Master switch for real-time alerts.
                          </p>
                        </div>
                      </div>
                      <AnimatedToggle
                        isOn={preferences.enableNotifications === 1}
                        onToggle={() => handleToggle("enableNotifications")}
                        disabled={saving}
                      />
                    </div>
                  </div>

                  {/* Divider */}
                  <div className="flex items-center gap-4 px-2">
                    <div className="h-px flex-1 bg-gradient-to-r from-transparent via-slate-200 dark:via-slate-700 to-transparent" />
                    <span className="text-xs font-bold text-slate-400 uppercase tracking-widest">
                      Preferences
                    </span>
                    <div className="h-px flex-1 bg-gradient-to-r from-transparent via-slate-200 dark:via-slate-700 to-transparent" />
                  </div>

                  {/* Child Toggles */}
                  <div className="space-y-4">
                    <div
                      className={`bg-white dark:bg-slate-800/20 p-5 rounded-2xl border border-slate-100 dark:border-slate-800/80 transition-all duration-300 ${isMasterDisabled ? "opacity-40 grayscale" : "hover:border-slate-300 dark:hover:border-slate-700 hover:shadow-md"}`}
                    >
                      <div className="flex items-center justify-between">
                        <div className="flex gap-4 items-center pr-4">
                          <div
                            className={`w-10 h-10 rounded-full flex items-center justify-center shrink-0 transition-colors ${preferences.newShop === 1 && !isMasterDisabled ? "bg-emerald-100 text-emerald-600 dark:bg-emerald-500/20 dark:text-emerald-400" : "bg-slate-100 text-slate-400 dark:bg-slate-800"}`}
                          >
                            <Store className="w-4 h-4" />
                          </div>
                          <div>
                            <h3 className="font-bold text-slate-900 dark:text-white mb-0.5 text-sm">
                              New Shop Alerts
                            </h3>
                            <p className="text-[13px] text-slate-500 leading-tight">
                              Your new favourite shop is finally here.
                            </p>
                          </div>
                        </div>
                        <AnimatedToggle
                          isOn={preferences.newShop === 1}
                          onToggle={() => handleToggle("newShop")}
                          disabled={saving || isMasterDisabled}
                        />
                      </div>
                    </div>

                    <div
                      className={`bg-white dark:bg-slate-800/20 p-5 rounded-2xl border border-slate-100 dark:border-slate-800/80 transition-all duration-300 ${isMasterDisabled ? "opacity-40 grayscale" : "hover:border-slate-300 dark:hover:border-slate-700 hover:shadow-md"}`}
                    >
                      <div className="flex items-center justify-between">
                        <div className="flex gap-4 items-center pr-4">
                          <div
                            className={`w-10 h-10 rounded-full flex items-center justify-center shrink-0 transition-colors ${preferences.newVideo === 1 && !isMasterDisabled ? "bg-blue-100 text-blue-600 dark:bg-blue-500/20 dark:text-blue-400" : "bg-slate-100 text-slate-400 dark:bg-slate-800"}`}
                          >
                            <Video className="w-4 h-4" />
                          </div>
                          <div>
                            <h3 className="font-bold text-slate-900 dark:text-white mb-0.5 text-sm">
                              New Video Alerts
                            </h3>
                            <p className="text-[13px] text-slate-500 leading-tight">
                              Fresh video just dropped.
                            </p>
                          </div>
                        </div>
                        <AnimatedToggle
                          isOn={preferences.newVideo === 1}
                          onToggle={() => handleToggle("newVideo")}
                          disabled={saving || isMasterDisabled}
                        />
                      </div>
                    </div>
                  </div>
                </div>
              )}
            </div>

            {/* Footer */}
            <div className="p-6 border-t border-slate-100 dark:border-slate-800 bg-slate-50 dark:bg-slate-900/50 backdrop-blur-md">
              <div className="flex items-center justify-center gap-2">
                {saving ? (
                  <>
                    <Loader2 className="w-4 h-4 animate-spin text-primary" />
                    <p className="text-xs text-primary font-bold">
                      Saving changes...
                    </p>
                  </>
                ) : (
                  <p className="text-xs text-slate-500 font-medium flex items-center gap-1.5">
                    <ShieldCheck className="w-3.5 h-3.5 text-emerald-500" />{" "}
                    Securely synced to your account
                  </p>
                )}
              </div>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}

// Professional Animated Toggle Switch
function AnimatedToggle({
  isOn,
  onToggle,
  disabled,
}: {
  isOn: boolean;
  onToggle: () => void;
  disabled?: boolean;
}) {
  return (
    <div
      onClick={() => !disabled && onToggle()}
      className={`relative w-[52px] h-[30px] flex items-center rounded-full p-1 cursor-pointer transition-colors duration-300 ease-in-out shrink-0 ${disabled ? "opacity-70 cursor-not-allowed" : "hover:opacity-90"} ${isOn ? "bg-primary" : "bg-slate-300 dark:bg-slate-600"}`}
    >
      <motion.div
        layout
        transition={{ type: "spring", stiffness: 700, damping: 30 }}
        className="w-6 h-6 bg-white rounded-full shadow-sm"
        style={{
          marginLeft: isOn ? "22px" : "0px",
        }}
      />
    </div>
  );
}
