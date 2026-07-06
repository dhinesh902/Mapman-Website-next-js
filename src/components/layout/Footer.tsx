"use client";

import Link from "next/link";
import {
  MessageCircle,
  Camera,
  Briefcase,
  Video,
  Send,
  MapPin,
  Mail,
  Phone,
  ChevronRight,
  Globe,
  Smartphone,
  Download,
} from "lucide-react";

export default function Footer() {
  return (
    <footer className="relative bg-white dark:bg-slate-950 pt-10 pb-6 overflow-hidden border-t border-slate-200 dark:border-slate-800">
      {/* Decorative Top Gradient Line */}
      <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-primary via-accent to-primary opacity-70" />

      {/* Background Decorative Blurs */}
      <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] rounded-full bg-primary/5 blur-[120px] pointer-events-none" />
      <div className="absolute bottom-[-10%] right-[-10%] w-[40%] h-[40%] rounded-full bg-accent/5 blur-[120px] pointer-events-none" />

      <div className="w-full max-w-[1920px] mx-auto px-4 md:px-8 relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-10 mb-16">
          {/* Brand Info */}
          <div className="lg:col-span-3">
            <Link
              href="/"
              className="flex items-center gap-2 mb-6 group inline-flex"
            >
              <div className="bg-white dark:bg-slate-900 p-1.5 rounded-xl shadow-lg shadow-primary/25 border border-slate-100 dark:border-slate-800 group-hover:scale-110 transition-transform flex items-center justify-center">
                <img
                  src="/app-logo.png"
                  alt="Mapman Logo"
                  className="w-8 h-8 object-contain"
                />
              </div>
              <span className="text-3xl font-extrabold tracking-tight text-slate-900 dark:text-white">
                MAP
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary to-accent">
                  MAN
                </span>
              </span>
            </Link>
            <p className="text-slate-500 dark:text-slate-400 mb-8 leading-relaxed font-medium pr-4">
              Find trusted shops, services, and local businesses around you
              instantly using our interactive map platform. Your neighborhood,
              simplified.
            </p>
            {/* <div className="flex items-center gap-3 mt-6">
              <SocialIcon Icon={MessageCircle} href="#" />
              <SocialIcon Icon={Camera} href="#" />
              <SocialIcon Icon={Briefcase} href="#" />
              <SocialIcon Icon={Video} href="#" />
              <SocialIcon Icon={Send} href="#" />
            </div> */}
          </div>

          {/* Quick Links */}
          <div className="lg:col-span-2">
            <h3 className="font-extrabold text-lg mb-6 text-slate-900 dark:text-white uppercase tracking-wider text-sm">
              Explore
            </h3>
            <ul className="space-y-4">
              <FooterLink href="/">Home</FooterLink>
              <FooterLink href="/map">Map</FooterLink>
              <FooterLink href="/videos">Videos</FooterLink>
              <FooterLink href="/profile">Profile</FooterLink>
              <FooterLink href="/about">About Us</FooterLink>
              <FooterLink href="/contact">Contact Us</FooterLink>
            </ul>
          </div>

          {/* Policies */}
          <div className="lg:col-span-2">
            <h3 className="font-extrabold text-lg mb-6 text-slate-900 dark:text-white uppercase tracking-wider text-sm">
              Policies
            </h3>
            <ul className="space-y-4 mb-8">
              <FooterLink href="/privacy-policy">Privacy Policy</FooterLink>
              <FooterLink href="/terms-and-conditions">
                Terms and Conditions
              </FooterLink>
            </ul>
          </div>

          {/* Contact Info */}
          <div className="lg:col-span-3">
            <h3 className="font-extrabold text-lg mb-6 text-slate-900 dark:text-white uppercase tracking-wider text-sm">
              Get in Touch
            </h3>
            <ul className="space-y-4">
              <li className="flex gap-4 items-center group p-3 rounded-2xl hover:bg-slate-50 dark:hover:bg-slate-900/50 transition-colors border border-transparent hover:border-slate-100 dark:hover:border-slate-800">
                <div className="bg-primary/10 p-2.5 rounded-xl text-primary group-hover:bg-gradient-to-br group-hover:from-primary group-hover:to-accent group-hover:text-white transition-all shadow-sm group-hover:shadow-primary/30">
                  <MapPin className="w-4 h-4" />
                </div>
                <div>
                  <p className="font-bold text-slate-900 dark:text-white text-xs uppercase tracking-wider mb-0.5 opacity-70">
                    Location
                  </p>
                  <p className="text-slate-600 dark:text-slate-300 font-medium text-sm">
                    Coimbatore, Tamilnadu India.
                  </p>
                </div>
              </li>
              <li className="flex gap-4 items-center group p-3 rounded-2xl hover:bg-slate-50 dark:hover:bg-slate-900/50 transition-colors border border-transparent hover:border-slate-100 dark:hover:border-slate-800">
                <div className="bg-primary/10 p-2.5 rounded-xl text-primary group-hover:bg-gradient-to-br group-hover:from-primary group-hover:to-accent group-hover:text-white transition-all shadow-sm group-hover:shadow-primary/30">
                  <Mail className="w-4 h-4" />
                </div>
                <div>
                  <p className="font-bold text-slate-900 dark:text-white text-xs uppercase tracking-wider mb-0.5 opacity-70">
                    Email
                  </p>
                  <a
                    href="mailto:mapman6760@gmail.com"
                    className="text-slate-600 dark:text-slate-300 hover:text-primary transition-colors font-medium text-sm block"
                  >
                    mapman6760@gmail.com
                  </a>
                </div>
              </li>
              <li className="flex gap-4 items-center group p-3 rounded-2xl hover:bg-slate-50 dark:hover:bg-slate-900/50 transition-colors border border-transparent hover:border-slate-100 dark:hover:border-slate-800">
                <div className="bg-primary/10 p-2.5 rounded-xl text-primary group-hover:bg-gradient-to-br group-hover:from-primary group-hover:to-accent group-hover:text-white transition-all shadow-sm group-hover:shadow-primary/30">
                  <Phone className="w-4 h-4" />
                </div>
                <div>
                  <p className="font-bold text-slate-900 dark:text-white text-xs uppercase tracking-wider mb-0.5 opacity-70">
                    Phone
                  </p>
                  <a
                    href="tel:+919342376760"
                    className="text-slate-600 dark:text-slate-300 hover:text-primary transition-colors font-medium text-sm block"
                  >
                    +91 9342376760
                  </a>
                </div>
              </li>
              <li className="flex gap-4 items-center group p-3 rounded-2xl hover:bg-slate-50 dark:hover:bg-slate-900/50 transition-colors border border-transparent hover:border-slate-100 dark:hover:border-slate-800">
                <div className="bg-primary/10 p-2.5 rounded-xl text-primary group-hover:bg-gradient-to-br group-hover:from-primary group-hover:to-accent group-hover:text-white transition-all shadow-sm group-hover:shadow-primary/30">
                  <Globe className="w-4 h-4" />
                </div>
                <div>
                  <p className="font-bold text-slate-900 dark:text-white text-xs uppercase tracking-wider mb-0.5 opacity-70">
                    Website
                  </p>
                  <a
                    href="https://pafagelsoftwaresolutionspvtltd.in"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-slate-600 dark:text-slate-300 hover:text-primary transition-colors font-medium text-sm block"
                  >
                    pafagelsoftwaresolutionspvtltd.in
                  </a>
                </div>
              </li>
            </ul>
          </div>

          {/* App Downloads */}
          <div className="lg:col-span-2">
            <h3 className="font-extrabold text-lg mb-6 text-slate-900 dark:text-white uppercase tracking-wider text-sm">
              Get The App
            </h3>
            <div className="flex flex-col gap-3.5">
              <a
                href="https://apps.apple.com/in/app/mapman-app/id6762550173"
                target="_blank"
                rel="noopener noreferrer"
                className="group flex items-center gap-3.5 bg-black hover:bg-slate-900 dark:bg-slate-900 dark:hover:bg-slate-800 text-white px-5 py-3 rounded-xl shadow-md shadow-black/10 hover:-translate-y-1 hover:shadow-xl hover:shadow-primary/20 transition-all duration-300 border border-slate-800"
              >
                <img
                  src="https://cdn-icons-png.flaticon.com/128/731/731985.png"
                  alt="App Store"
                  className="w-7 h-7 object-contain invert brightness-200"
                />
                <div className="flex flex-col text-left">
                  <span className="text-[10px] font-medium leading-[1.2] text-slate-300">
                    Download on the
                  </span>
                  <span className="text-[13px] font-semibold leading-[1.2] tracking-tight">
                    App Store
                  </span>
                </div>
              </a>
              <a
                href="https://play.google.com/store/apps/details?id=com.mapman.mapman"
                target="_blank"
                rel="noopener noreferrer"
                className="group flex items-center gap-3.5 bg-black hover:bg-slate-900 dark:bg-slate-900 dark:hover:bg-slate-800 text-white px-5 py-3 rounded-xl shadow-md shadow-black/10 hover:-translate-y-1 hover:shadow-xl hover:shadow-accent/20 transition-all duration-300 border border-slate-800"
              >
                <img
                  src="https://cdn-icons-png.flaticon.com/128/300/300218.png"
                  alt="Google Play"
                  className="w-7 h-7 object-contain"
                />
                <div className="flex flex-col text-left">
                  <span className="text-[10px] font-medium leading-[1.2] text-slate-300 uppercase tracking-wide">
                    Get it on
                  </span>
                  <span className="text-[13px] font-semibold leading-[1.2] tracking-tight">
                    Google Play
                  </span>
                </div>
              </a>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="border-t border-slate-200 dark:border-slate-800/60 pt-8 pb-4 flex flex-col md:flex-row items-center justify-between text-center md:text-left text-slate-500 font-medium text-sm gap-4">
          <p>
            © {new Date().getFullYear()}{" "}
            <span className="font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-primary to-accent">
              MAPMAN
            </span>
            . All Rights Reserved.
          </p>
          <div className="flex items-center gap-1.5 text-xs bg-slate-50 dark:bg-slate-900 px-3 py-1.5 rounded-full border border-slate-200 dark:border-slate-800">
            <span>Made with</span>
            <span className="text-red-500 animate-pulse">❤️</span>
            <span>for local businesses</span>
          </div>
        </div>
      </div>
    </footer>
  );
}

function SocialIcon({ Icon, href }: { Icon: any; href: string }) {
  return (
    <a
      href={href}
      className="w-11 h-11 rounded-full bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-800 flex items-center justify-center text-slate-500 hover:text-white hover:bg-gradient-to-br hover:from-primary hover:to-accent hover:border-transparent transition-all transform hover:scale-110 hover:-translate-y-1 shadow-sm hover:shadow-primary/30"
    >
      <Icon className="w-5 h-5" />
    </a>
  );
}

function FooterLink({
  href,
  children,
}: {
  href: string;
  children: React.ReactNode;
}) {
  return (
    <li>
      <Link
        href={href}
        className="group flex items-center text-slate-500 dark:text-slate-400 hover:text-primary dark:hover:text-primary transition-all font-medium"
      >
        <ChevronRight className="w-4 h-4 opacity-0 -ml-4 group-hover:opacity-100 group-hover:ml-0 transition-all text-primary" />
        <span className="transform group-hover:translate-x-1 transition-transform">
          {children}
        </span>
      </Link>
    </li>
  );
}
