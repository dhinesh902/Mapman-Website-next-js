"use client";

import React, { createContext, useContext, useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  X,
  Smartphone,
  ArrowRight,
  Lock,
  Phone,
  ShieldCheck,
  Loader2,
} from "lucide-react";
import { sendOtpApi, verifyOtpApi } from "@/services/apiService";

interface AuthContextType {
  isLoggedIn: boolean;
  login: () => void;
  logout: () => void;
  isLoginSidebarOpen: boolean;
  openLoginSidebar: () => void;
  closeLoginSidebar: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [mobile, setMobile] = useState("");
  const [otp, setOtp] = useState("");
  const [loginStep, setLoginStep] = useState(1);
  const [isLoading, setIsLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState("");

  useEffect(() => {
    if (typeof window !== "undefined") {
      const token = localStorage.getItem("token");
      if (token) {
        setIsLoggedIn(true);
      }
    }
  }, []);

  const login = () => setIsLoggedIn(true);
  const logout = () => {
    setIsLoggedIn(false);
    if (typeof window !== "undefined") {
      localStorage.removeItem("token");
      localStorage.removeItem("userId");
    }
  };

  const openLoginSidebar = () => {
    setIsSidebarOpen(true);
    setLoginStep(1);
    setMobile("");
    setOtp("");
    setErrorMsg("");
  };

  const closeLoginSidebar = () => setIsSidebarOpen(false);

  const handleLoginSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMsg("");

    if (loginStep === 1) {
      if (mobile.length >= 10) {
        setIsLoading(true);
        try {
          const formattedMobile =
            mobile.length === 10 ? `91${mobile}` : mobile.replace(/\D/g, "");
          const res = await sendOtpApi(formattedMobile);
          if (res.status === 200) {
            setLoginStep(2);
          } else {
            setErrorMsg("Failed to send OTP.");
          }
        } catch (error) {
          setErrorMsg("Error sending OTP.");
        } finally {
          setIsLoading(false);
        }
      }
    } else {
      if (otp.length >= 4) {
        setIsLoading(true);
        try {
          const formattedMobile =
            mobile.length === 10 ? `91${mobile}` : mobile.replace(/\D/g, "");
          const res = await verifyOtpApi(formattedMobile, parseInt(otp));
          if (res.status === 200 && res.data?.token) {
            localStorage.setItem("token", res.data.token);
            if (res.data.userId) {
              localStorage.setItem("userId", res.data.userId.toString());
            }
            setIsLoggedIn(true);
            setIsSidebarOpen(false);
          } else {
            setErrorMsg("Invalid OTP.");
          }
        } catch (error) {
          setErrorMsg("Error verifying OTP.");
        } finally {
          setIsLoading(false);
        }
      }
    }
  };

  return (
    <AuthContext.Provider
      value={{
        isLoggedIn,
        login,
        logout,
        isLoginSidebarOpen: isSidebarOpen,
        openLoginSidebar,
        closeLoginSidebar,
      }}
    >
      {children}

      {/* Global Login Sidebar */}
      <AnimatePresence>
        {isSidebarOpen && (
          <>
            <motion.div
              initial={{ opacity: 0, backdropFilter: "blur(0px)" }}
              animate={{ opacity: 1, backdropFilter: "blur(4px)" }}
              exit={{ opacity: 0, backdropFilter: "blur(0px)" }}
              className="fixed inset-0 bg-slate-900/40 z-[100]"
              onClick={closeLoginSidebar}
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
              className="fixed top-0 right-0 h-full w-full max-w-[28rem] bg-white dark:bg-slate-900 z-[101] shadow-2xl flex flex-col overflow-hidden border-l border-white/20 dark:border-slate-800/50"
            >
              {/* Decorative Background Elements */}
              <div className="absolute top-0 right-0 w-64 h-64 bg-primary/5 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2 pointer-events-none" />
              <div className="absolute bottom-0 left-0 w-80 h-80 bg-accent/5 rounded-full blur-3xl translate-y-1/2 -translate-x-1/4 pointer-events-none" />

              {/* Floating Close Button */}
              <button
                onClick={closeLoginSidebar}
                className="absolute top-6 right-6 p-2.5 bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-700 text-slate-500 rounded-full transition-all z-10"
              >
                <X className="w-5 h-5" />
              </button>

              <div className="p-8 md:p-10 flex-1 overflow-y-auto flex flex-col justify-center relative z-10">
                <div className="mb-10">
                  <div className="w-16 h-16 bg-gradient-to-br from-primary/20 to-primary/5 rounded-2xl flex items-center justify-center mb-6 shadow-inner ring-1 ring-primary/20 p-2">
                    <img src="app-logo.png" alt="app-logo" height={20}/>
                  </div>
                  <h2 className="text-3xl font-bold font-heading text-slate-900 dark:text-white mb-3">
                    {loginStep === 1 ? "Welcome Back" : "Verify OTP"}
                  </h2>
                  <p className="text-slate-500 text-base leading-relaxed">
                    {loginStep === 1
                      ? "Enter your mobile number to securely access and manage your Mapman account."
                      : `We've sent a 6-digit secure code to your number. Please enter it below.`}
                  </p>
                </div>

                <form onSubmit={handleLoginSubmit} className="space-y-6">
                  {loginStep === 1 ? (
                    <div className="space-y-2">
                      <label className="block text-sm font-semibold text-slate-700 dark:text-slate-300">
                        Mobile Number
                      </label>
                      <div className="relative group">
                        <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none text-slate-400 group-focus-within:text-primary transition-colors">
                          <Phone className="w-5 h-5" />
                        </div>
                        <input
                          type="tel"
                          value={mobile}
                          onChange={(e) => setMobile(e.target.value)}
                          placeholder="+91 98765 43210"
                          className="w-full pl-11 pr-4 py-3.5 bg-slate-50 dark:bg-slate-800/50 border border-slate-200 dark:border-slate-700 rounded-xl focus:outline-none focus:ring-2 focus:ring-primary/50 focus:border-primary/50 transition-all text-slate-900 dark:text-white font-medium"
                          required
                          maxLength={10}
                        />
                      </div>
                    </div>
                  ) : (
                    <div className="space-y-2">
                      <label className="block text-sm font-semibold text-slate-700 dark:text-slate-300">
                        Secure OTP Code
                      </label>
                      <div className="relative group">
                        <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none text-slate-400 group-focus-within:text-primary transition-colors">
                          <Lock className="w-5 h-5" />
                        </div>
                        <input
                          type="text"
                          value={otp}
                          onChange={(e) => setOtp(e.target.value)}
                          placeholder="------"
                          className="w-full pl-11 pr-4 py-3.5 text-center tracking-[1em] font-bold text-xl bg-slate-50 dark:bg-slate-800/50 border border-slate-200 dark:border-slate-700 rounded-xl focus:outline-none focus:ring-2 focus:ring-primary/50 focus:border-primary/50 transition-all text-slate-900 dark:text-white"
                          required
                          maxLength={6}
                        />
                      </div>
                    </div>
                  )}

                  {errorMsg && (
                    <div className="text-red-500 text-sm font-medium text-center bg-red-50 dark:bg-red-900/20 p-2 rounded-lg">
                      {errorMsg}
                    </div>
                  )}

                  <button
                    type="submit"
                    disabled={isLoading}
                    className="w-full bg-gradient-to-r from-primary to-accent hover:opacity-90 text-white py-4 rounded-xl font-bold flex items-center justify-center gap-2 transition-all shadow-lg shadow-primary/30 active:scale-[0.98] disabled:opacity-70 disabled:pointer-events-none"
                  >
                    {isLoading ? (
                      <Loader2 className="w-5 h-5 animate-spin" />
                    ) : (
                      <>
                        {loginStep === 1 ? "Send Secure OTP" : "Verify & Sign In"}
                        <ArrowRight className="w-5 h-5" />
                      </>
                    )}
                  </button>

                  {loginStep === 2 && (
                    <button
                      type="button"
                      onClick={() => setLoginStep(1)}
                      className="w-full text-sm text-slate-500 hover:text-primary transition-colors text-center font-medium mt-2 py-2"
                    >
                      Change Mobile Number
                    </button>
                  )}
                </form>

                {/* Footer text */}
                <div className="mt-8 text-center">
                  <p className="text-xs text-slate-400">
                    By proceeding, you agree to Mapman's <br />
                    <a href="#" className="text-primary hover:underline">
                      Terms of Service
                    </a>{" "}
                    and{" "}
                    <a href="#" className="text-primary hover:underline">
                      Privacy Policy
                    </a>
                    .
                  </p>
                </div>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
}
