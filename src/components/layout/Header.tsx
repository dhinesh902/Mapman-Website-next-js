"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { Search, Bell, User, Menu, X, MapPin } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { useAuth } from "@/providers/auth-provider";

const navLinks = [
  { name: "Home", path: "/" },
  { name: "Map", path: "/map" },
  { name: "Videos", path: "/videos" },
  { name: "About Us", path: "/about" },
  { name: "Contact Us", path: "/contact" },
];

export default function Header() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const pathname = usePathname();
  const router = useRouter();
  const { isLoggedIn, openLoginSidebar } = useAuth();

  const handleAuthClick = (path: string) => {
    if (!isLoggedIn) {
      openLoginSidebar();
    } else {
      router.push(path);
    }
  };

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <header
      className={`fixed top-0 w-full z-50 transition-all duration-500 ease-out ${
        isScrolled
          ? "bg-white/80 dark:bg-slate-950/80 backdrop-blur-xl shadow-[0_8px_30px_rgb(0,0,0,0.04)] border-b border-slate-200/50 dark:border-slate-800/50 py-3"
          : "bg-transparent py-5 lg:py-6"
      }`}
    >
      <div className="w-full max-w-[1920px] mx-auto px-4 md:px-8 flex items-center justify-between">
        {/* Logo */}
        <Link href="/" className="flex items-center gap-2.5 group">
          <div className="bg-white dark:bg-slate-900 p-1.5 rounded-[14px] shadow-lg shadow-primary/30 border border-slate-100 dark:border-slate-800 group-hover:scale-110 transition-transform flex items-center justify-center">
            <img src="/app-logo.png" alt="Mapman Logo" className="w-8 h-8 object-contain" />
          </div>
          <span className="text-2xl lg:text-3xl font-extrabold tracking-tight text-slate-900 dark:text-white font-heading">
            MAP
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary to-accent">
              MAN
            </span>
          </span>
        </Link>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex items-center gap-2 lg:gap-4 bg-white/50 dark:bg-slate-900/50 p-1.5 rounded-full border border-slate-200/60 dark:border-slate-800/60 backdrop-blur-md shadow-sm">
          {navLinks.map((link) => {
            const isActive = pathname === link.path;
            return (
              <Link
                key={link.name}
                href={link.path}
                className={`relative px-5 py-2 text-sm font-bold transition-all duration-300 rounded-full ${
                  isActive
                    ? "text-primary bg-primary/10 shadow-inner"
                    : "text-slate-600 dark:text-slate-300 hover:text-primary hover:bg-slate-100 dark:hover:bg-slate-800"
                }`}
              >
                {link.name}
                {isActive && (
                  <motion.div
                    layoutId="navbar-indicator"
                    className="absolute -bottom-1.5 left-1/2 -translate-x-1/2 w-1.5 h-1.5 bg-primary rounded-full"
                    transition={{ type: "spring", stiffness: 300, damping: 30 }}
                  />
                )}
              </Link>
            );
          })}
        </nav>

        {/* Right Icons */}
        <div className="hidden md:flex items-center gap-2">
          <button className="w-11 h-11 rounded-full flex items-center justify-center text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800 hover:text-primary transition-colors group">
            <Search className="w-5 h-5 group-hover:scale-110 transition-transform" />
          </button>

          <button
            onClick={() => handleAuthClick("/notifications")}
            className="relative w-11 h-11 rounded-full flex items-center justify-center text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800 hover:text-primary transition-colors group"
          >
            <Bell className="w-5 h-5 group-hover:scale-110 transition-transform" />
            <span className="absolute top-2.5 right-2.5 w-2.5 h-2.5 bg-red-500 rounded-full border-2 border-white dark:border-slate-950 animate-pulse"></span>
          </button>

          <div className="h-6 w-px bg-slate-200 dark:bg-slate-700 mx-2"></div>

          <button
            onClick={() => handleAuthClick("/profile")}
            className="ml-2 group"
          >
            <div className="w-11 h-11 rounded-full bg-gradient-to-tr from-primary to-accent p-[2px] flex items-center justify-center overflow-hidden group-hover:scale-110 transition-transform duration-300 shadow-lg shadow-primary/20">
              <div className="w-full h-full bg-white dark:bg-slate-900 rounded-full flex items-center justify-center group-hover:bg-primary/5 transition-colors">
                <User className="w-5 h-5 text-slate-700 dark:text-slate-200 group-hover:text-primary transition-colors" />
              </div>
            </div>
          </button>
        </div>

        {/* Mobile Menu Button */}
        <button
          className="md:hidden w-11 h-11 flex items-center justify-center rounded-full bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-200 active:scale-95 transition-transform"
          onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
        >
          {isMobileMenuOpen ? (
            <X className="w-6 h-6" />
          ) : (
            <Menu className="w-6 h-6" />
          )}
        </button>
      </div>

      {/* Mobile Navigation */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0, y: -20 }}
            animate={{ opacity: 1, height: "auto", y: 0 }}
            exit={{ opacity: 0, height: 0, y: -20 }}
            transition={{ duration: 0.3, ease: "easeInOut" }}
            className="md:hidden absolute top-full left-0 w-full bg-white/95 dark:bg-slate-950/95 backdrop-blur-2xl border-b border-slate-200/50 dark:border-slate-800/50 shadow-2xl overflow-hidden"
          >
            <div className="px-6 py-8 flex flex-col gap-2">
              {navLinks.map((link) => (
                <Link
                  key={link.name}
                  href={link.path}
                  onClick={() => setIsMobileMenuOpen(false)}
                  className={`text-lg font-bold px-6 py-4 rounded-2xl transition-all ${
                    pathname === link.path
                      ? "bg-primary/10 text-primary"
                      : "text-slate-600 dark:text-slate-300 hover:bg-slate-50 dark:hover:bg-slate-900"
                  }`}
                >
                  {link.name}
                </Link>
              ))}

              <div className="h-px w-full bg-slate-200 dark:bg-slate-800 my-4" />

              <div className="flex items-center justify-between px-2">
                <button
                  onClick={() => {
                    setIsMobileMenuOpen(false);
                    handleAuthClick("/profile");
                  }}
                  className="flex items-center gap-4 text-slate-700 dark:text-slate-200 group"
                >
                  <div className="w-12 h-12 rounded-full bg-gradient-to-tr from-primary to-accent p-[2px]">
                    <div className="w-full h-full bg-white dark:bg-slate-900 rounded-full flex items-center justify-center">
                      <User className="w-6 h-6 text-slate-500 group-hover:text-primary transition-colors" />
                    </div>
                  </div>
                  <span className="font-bold text-lg">My Profile</span>
                </button>
                <div className="flex gap-3">
                  <button className="w-12 h-12 rounded-full bg-slate-100 dark:bg-slate-800 flex items-center justify-center text-slate-600 dark:text-slate-300">
                    <Search className="w-6 h-6" />
                  </button>
                  <button
                    onClick={() => {
                      setIsMobileMenuOpen(false);
                      handleAuthClick("/notifications");
                    }}
                    className="relative w-12 h-12 rounded-full bg-slate-100 dark:bg-slate-800 flex items-center justify-center text-slate-600 dark:text-slate-300"
                  >
                    <Bell className="w-6 h-6" />
                    <span className="absolute top-3 right-3 w-3 h-3 bg-red-500 rounded-full border-2 border-slate-100 dark:border-slate-800"></span>
                  </button>
                </div>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
