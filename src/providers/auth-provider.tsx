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
import {
  sendOtpApi,
  verifyOtpApi,
  sendEmailOtpApi,
  verifyEmailOtpApi,
  updateSendOtpApi,
  updateVerifyOtpApi
} from "@/services/apiService";
import { Mail } from "lucide-react";

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
  const [email, setEmail] = useState("");
  const [newMobile, setNewMobile] = useState("");
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
    setEmail("");
    setNewMobile("");
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
    } else if (loginStep === 2) {
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
    } else if (loginStep === 3) {
      // Step 3: Send Email OTP
      if (email.length > 5) {
        setIsLoading(true);
        try {
          const res = await sendEmailOtpApi(email);
          if (res.status === 200) {
            setLoginStep(4);
            setOtp("");
          } else {
            setErrorMsg("Failed to send OTP to email.");
          }
        } catch (error) {
          setErrorMsg("Error sending email OTP.");
        } finally {
          setIsLoading(false);
        }
      }
    } else if (loginStep === 4) {
      // Step 4: Verify Email OTP
      if (otp.length >= 4) {
        setIsLoading(true);
        try {
          const res = await verifyEmailOtpApi(email, parseInt(otp));
          if (res.status === 200) {
            setLoginStep(5);
            setOtp("");
          } else {
            setErrorMsg("Invalid email OTP.");
          }
        } catch (error) {
          setErrorMsg("Error verifying email OTP.");
        } finally {
          setIsLoading(false);
        }
      }
    } else if (loginStep === 5) {
      // Step 5: Send New Mobile OTP
      if (newMobile.length >= 10) {
        setIsLoading(true);
        try {
          const formattedMobile = newMobile.length === 10 ? `91${newMobile}` : newMobile.replace(/\D/g, "");
          const res = await updateSendOtpApi(email, formattedMobile);
          if (res.status === 200) {
            setLoginStep(6);
            setOtp("");
          } else {
            setErrorMsg("Failed to send OTP to new mobile.");
          }
        } catch (error) {
          setErrorMsg("Error sending mobile OTP.");
        } finally {
          setIsLoading(false);
        }
      }
    } else if (loginStep === 6) {
      // Step 6: Verify New Mobile OTP
      if (otp.length >= 4) {
        setIsLoading(true);
        try {
          const formattedMobile = newMobile.length === 10 ? `91${newMobile}` : newMobile.replace(/\D/g, "");
          const res = await updateVerifyOtpApi(email, formattedMobile, parseInt(otp));
          if (res.status === 200 && res.data?.token) {
            localStorage.setItem("token", res.data.token);
            if (res.data.userId) {
              localStorage.setItem("userId", res.data.userId.toString());
            }
            setIsLoggedIn(true);
            setIsSidebarOpen(false);
          } else {
            setErrorMsg("Invalid mobile OTP.");
          }
        } catch (error) {
          setErrorMsg("Error verifying mobile OTP.");
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
              className="fixed top-0 right-0 h-full w-full max-w-[24rem] bg-white dark:bg-slate-900 z-[101] shadow-2xl flex flex-col overflow-hidden border-l border-white/20 dark:border-slate-800/50"
            >
              {/* Decorative Background Elements */}
              <div className="absolute top-0 right-0 w-64 h-64 bg-primary/5 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2 pointer-events-none" />
              <div className="absolute bottom-0 left-0 w-80 h-80 bg-accent/5 rounded-full blur-3xl translate-y-1/2 -translate-x-1/4 pointer-events-none" />

              {/* Floating Close Button */}
              <button
                onClick={closeLoginSidebar}
                className="absolute top-4 right-4 p-2 bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-700 text-slate-500 rounded-full transition-all z-10"
              >
                <X className="w-5 h-5" />
              </button>

              <div className="p-6 md:p-8 flex-1 overflow-y-auto flex flex-col justify-center relative z-10">
                <div className="mb-10">
                  <div className="w-12 h-12 bg-gradient-to-br from-primary/20 to-primary/5 rounded-2xl flex items-center justify-center mb-4 shadow-inner ring-1 ring-primary/20 p-2">
                    <img src="app-logo.png" alt="app-logo" height={16}/>
                  </div>
                  <h2 className="text-2xl font-bold font-heading text-slate-900 dark:text-white mb-2">
                    {loginStep === 1
                      ? "Welcome Back"
                      : loginStep === 2 || loginStep === 4 || loginStep === 6
                      ? "Verify OTP"
                      : loginStep === 3
                      ? "Lost Mobile Number"
                      : "New Mobile Number"}
                  </h2>
                  <p className="text-slate-500 text-sm leading-relaxed">
                    {loginStep === 1
                      ? "Enter your mobile number to securely access and manage your Mapman account."
                      : loginStep === 2 || loginStep === 6
                      ? "We've sent a 6-digit secure code to your number. Please enter it below."
                      : loginStep === 3
                      ? "Enter your email address to recover your account."
                      : loginStep === 4
                      ? "We've sent an OTP to your email. Please enter it below."
                      : "Enter your new mobile number to link to your account."}
                  </p>
                </div>

                <form onSubmit={handleLoginSubmit} className="space-y-4">
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
                          className="w-full pl-11 pr-4 py-3 bg-slate-50 dark:bg-slate-800/50 border border-slate-200 dark:border-slate-700 rounded-xl focus:outline-none focus:ring-2 focus:ring-primary/50 focus:border-primary/50 transition-all text-slate-900 dark:text-white font-medium"
                          required
                          maxLength={10}
                        />
                      </div>
                      <div className="flex justify-end pt-1">
                        <button
                          type="button"
                          onClick={() => {
                            setLoginStep(3);
                            setErrorMsg("");
                          }}
                          className="text-sm font-medium text-primary hover:text-primary/80 transition-colors"
                        >
                          Lost Mobile Number?
                        </button>
                      </div>
                    </div>
                  ) : loginStep === 3 ? (
                    <div className="space-y-2">
                      <label className="block text-sm font-semibold text-slate-700 dark:text-slate-300">
                        Email Address
                      </label>
                      <div className="relative group">
                        <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none text-slate-400 group-focus-within:text-primary transition-colors">
                          <Mail className="w-5 h-5" />
                        </div>
                        <input
                          type="email"
                          value={email}
                          onChange={(e) => setEmail(e.target.value)}
                          placeholder="your.email@example.com"
                          className="w-full pl-11 pr-4 py-3 bg-slate-50 dark:bg-slate-800/50 border border-slate-200 dark:border-slate-700 rounded-xl focus:outline-none focus:ring-2 focus:ring-primary/50 focus:border-primary/50 transition-all text-slate-900 dark:text-white font-medium"
                          required
                        />
                      </div>
                    </div>
                  ) : loginStep === 5 ? (
                    <div className="space-y-2">
                      <label className="block text-sm font-semibold text-slate-700 dark:text-slate-300">
                        New Mobile Number
                      </label>
                      <div className="relative group">
                        <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none text-slate-400 group-focus-within:text-primary transition-colors">
                          <Phone className="w-5 h-5" />
                        </div>
                        <input
                          type="tel"
                          value={newMobile}
                          onChange={(e) => setNewMobile(e.target.value)}
                          placeholder="+91 98765 43210"
                          className="w-full pl-11 pr-4 py-3 bg-slate-50 dark:bg-slate-800/50 border border-slate-200 dark:border-slate-700 rounded-xl focus:outline-none focus:ring-2 focus:ring-primary/50 focus:border-primary/50 transition-all text-slate-900 dark:text-white font-medium"
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
                          className="w-full pl-11 pr-4 py-3 text-center tracking-[1em] font-bold text-lg bg-slate-50 dark:bg-slate-800/50 border border-slate-200 dark:border-slate-700 rounded-xl focus:outline-none focus:ring-2 focus:ring-primary/50 focus:border-primary/50 transition-all text-slate-900 dark:text-white"
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
                    className="w-full bg-gradient-to-r from-primary to-accent hover:opacity-90 text-white py-3 rounded-xl font-bold flex items-center justify-center gap-2 transition-all shadow-lg shadow-primary/30 active:scale-[0.98] disabled:opacity-70 disabled:pointer-events-none"
                  >
                    {isLoading ? (
                      <Loader2 className="w-5 h-5 animate-spin" />
                    ) : (
                      <>
                        {loginStep === 1 || loginStep === 3 || loginStep === 5 ? "Send Secure OTP" : "Verify & Sign In"}
                        <ArrowRight className="w-5 h-5" />
                      </>
                    )}
                  </button>

                  {(loginStep === 2 || loginStep === 4 || loginStep === 6) && (
                    <button
                      type="button"
                      onClick={() => {
                        if (loginStep === 2) setLoginStep(1);
                        else if (loginStep === 4) setLoginStep(3);
                        else if (loginStep === 6) setLoginStep(5);
                        setOtp("");
                      }}
                      className="w-full text-sm text-slate-500 hover:text-primary transition-colors text-center font-medium mt-2 py-2"
                    >
                      {loginStep === 2 ? "Change Mobile Number" : loginStep === 4 ? "Change Email Address" : "Change New Mobile Number"}
                    </button>
                  )}
                  {loginStep > 2 && (
                    <button
                      type="button"
                      onClick={() => {
                        setLoginStep(1);
                        setErrorMsg("");
                        setOtp("");
                      }}
                      className="w-full text-sm text-slate-500 hover:text-primary transition-colors text-center font-medium mt-1 py-1"
                    >
                      Back to Login
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
