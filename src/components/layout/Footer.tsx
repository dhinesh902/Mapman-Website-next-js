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
} from "lucide-react";

export default function Footer() {
  return (
    <footer className="relative bg-white dark:bg-slate-950 pt-10 pb-6 overflow-hidden border-t border-slate-200 dark:border-slate-800">
      {/* Decorative Top Gradient Line */}
      <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-primary via-accent to-primary opacity-70" />

      {/* Background Decorative Blurs */}
      <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] rounded-full bg-primary/5 blur-[120px] pointer-events-none" />
      <div className="absolute bottom-[-10%] right-[-10%] w-[40%] h-[40%] rounded-full bg-accent/5 blur-[120px] pointer-events-none" />

      <div className="container mx-auto px-4 md:px-6 relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-12 mb-16">
          {/* Brand Info */}
          <div className="lg:col-span-4">
            <Link
              href="/"
              className="flex items-center gap-2 mb-6 group inline-flex"
            >
              <div className="bg-gradient-to-br from-primary to-accent p-2 rounded-xl shadow-lg shadow-primary/25 group-hover:scale-110 transition-transform">
                <MapPin className="text-white w-7 h-7" />
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
            <div className="flex items-center gap-3">
              <SocialIcon Icon={MessageCircle} href="#" />
              <SocialIcon Icon={Camera} href="#" />
              <SocialIcon Icon={Briefcase} href="#" />
              <SocialIcon Icon={Video} href="#" />
              <SocialIcon Icon={Send} href="#" />
            </div>
          </div>

          {/* Quick Links */}
          <div className="lg:col-span-2 lg:col-start-6">
            <h3 className="font-extrabold text-lg mb-6 text-slate-900 dark:text-white uppercase tracking-wider text-sm">
              Explore
            </h3>
            <ul className="space-y-4">
              <FooterLink href="/">Home</FooterLink>
              <FooterLink href="/map">Interactive Map</FooterLink>
              <FooterLink href="/videos">Discover Videos</FooterLink>
              <FooterLink href="/contact">Contact Support</FooterLink>
            </ul>
          </div>

          {/* Company & Support */}
          <div className="lg:col-span-2">
            <h3 className="font-extrabold text-lg mb-6 text-slate-900 dark:text-white uppercase tracking-wider text-sm">
              Company
            </h3>
            <ul className="space-y-4 mb-8">
              <FooterLink href="/about">About Us</FooterLink>
              <FooterLink href="#">Our Services</FooterLink>
              <FooterLink href="#">Careers</FooterLink>
              <FooterLink href="#">Blog</FooterLink>
            </ul>
          </div>

          {/* Contact Info */}
          <div className="lg:col-span-3 lg:col-start-10">
            <h3 className="font-extrabold text-lg mb-6 text-slate-900 dark:text-white uppercase tracking-wider text-sm">
              Get in Touch
            </h3>
            <ul className="space-y-6">
              <li className="flex gap-4 items-start group">
                <div className="mt-1 bg-primary/10 p-2.5 rounded-xl text-primary group-hover:bg-primary group-hover:text-white transition-colors">
                  <MapPin className="w-5 h-5" />
                </div>
                <div>
                  <p className="font-bold text-slate-900 dark:text-white mb-1">
                    Address
                  </p>
                  <p className="text-slate-500 dark:text-slate-400 font-medium">
                    123 Business Street,
                    <br />
                    Chennai, Tamil Nadu
                  </p>
                </div>
              </li>
              <li className="flex gap-4 items-start group">
                <div className="mt-1 bg-primary/10 p-2.5 rounded-xl text-primary group-hover:bg-primary group-hover:text-white transition-colors">
                  <Mail className="w-5 h-5" />
                </div>
                <div>
                  <p className="font-bold text-slate-900 dark:text-white mb-1">
                    Email
                  </p>
                  <a
                    href="mailto:support@mapman.com"
                    className="text-slate-500 dark:text-slate-400 hover:text-primary transition-colors font-medium"
                  >
                    support@mapman.com
                  </a>
                </div>
              </li>
              <li className="flex gap-4 items-start group">
                <div className="mt-1 bg-primary/10 p-2.5 rounded-xl text-primary group-hover:bg-primary group-hover:text-white transition-colors">
                  <Phone className="w-5 h-5" />
                </div>
                <div>
                  <p className="font-bold text-slate-900 dark:text-white mb-1">
                    Phone
                  </p>
                  <p className="text-slate-500 dark:text-slate-400 font-medium">
                    +91 98765 43210
                  </p>
                </div>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="border-t border-slate-200 dark:border-slate-800/60 pt-8 flex flex-col md:flex-row items-center justify-between text-slate-500 font-medium text-sm">
          <p>
            © 2026{" "}
            <span className="font-bold text-slate-900 dark:text-white">
              MAPMAN
            </span>
            . All Rights Reserved.
          </p>
          <div className="flex gap-8 mt-4 md:mt-0">
            <Link href="#" className="hover:text-primary transition-colors">
              Privacy Policy
            </Link>
            <Link href="#" className="hover:text-primary transition-colors">
              Terms of Service
            </Link>
            <Link href="#" className="hover:text-primary transition-colors">
              Cookies
            </Link>
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
