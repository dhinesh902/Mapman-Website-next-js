"use client";

import Link from "next/link";
import { MessageCircle, Camera, Briefcase, Video, Send, MapPin, Mail, Phone } from "lucide-react";

export default function Footer() {
  return (
    <footer className="bg-white dark:bg-slate-900 border-t border-slate-200 dark:border-slate-800 pt-16 pb-8">
      <div className="container mx-auto px-4 md:px-6">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-12">
          {/* Brand Info */}
          <div>
            <Link href="/" className="flex items-center gap-2 mb-6">
              <div className="bg-primary p-2 rounded-xl">
                <MapPin className="text-white w-6 h-6" />
              </div>
              <span className="text-2xl font-bold tracking-tight text-foreground">
                MAP<span className="text-primary">MAN</span>
              </span>
            </Link>
            <p className="text-slate-600 dark:text-slate-400 mb-6 leading-relaxed">
              Find trusted shops, services, and local businesses around you instantly using our interactive map platform.
            </p>
            <div className="flex items-center gap-4">
              <SocialIcon Icon={MessageCircle} href="#" />
              <SocialIcon Icon={Camera} href="#" />
              <SocialIcon Icon={Briefcase} href="#" />
              <SocialIcon Icon={Video} href="#" />
              <SocialIcon Icon={Send} href="#" />
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="font-semibold text-lg mb-6 text-foreground">Quick Links</h3>
            <ul className="space-y-4">
              <FooterLink href="/">Home</FooterLink>
              <FooterLink href="/map">Map</FooterLink>
              <FooterLink href="/videos">Videos</FooterLink>
              <FooterLink href="/contact">Contact</FooterLink>
            </ul>
          </div>

          {/* Company & Support */}
          <div>
            <h3 className="font-semibold text-lg mb-6 text-foreground">Company</h3>
            <ul className="space-y-4 mb-8">
              <FooterLink href="/about">About Us</FooterLink>
              <FooterLink href="#">Our Services</FooterLink>
              <FooterLink href="#">Careers</FooterLink>
              <FooterLink href="#">Blog</FooterLink>
            </ul>
            <h3 className="font-semibold text-lg mb-6 text-foreground">Support</h3>
            <ul className="space-y-4">
              <FooterLink href="#">Privacy Policy</FooterLink>
              <FooterLink href="#">Terms & Conditions</FooterLink>
              <FooterLink href="#">FAQ</FooterLink>
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h3 className="font-semibold text-lg mb-6 text-foreground">Contact Information</h3>
            <ul className="space-y-6">
              <li className="flex gap-4 items-start">
                <div className="mt-1 bg-primary/10 p-2 rounded-lg text-primary">
                  <MapPin className="w-5 h-5" />
                </div>
                <div>
                  <p className="font-medium text-foreground mb-1">Address:</p>
                  <p className="text-slate-600 dark:text-slate-400">123 Business Street,<br />Chennai, Tamil Nadu,<br />India</p>
                </div>
              </li>
              <li className="flex gap-4 items-start">
                <div className="mt-1 bg-primary/10 p-2 rounded-lg text-primary">
                  <Mail className="w-5 h-5" />
                </div>
                <div>
                  <p className="font-medium text-foreground mb-1">Email:</p>
                  <a href="mailto:support@mapman.com" className="text-slate-600 dark:text-slate-400 hover:text-primary transition-colors">
                    support@mapman.com
                  </a>
                </div>
              </li>
              <li className="flex gap-4 items-start">
                <div className="mt-1 bg-primary/10 p-2 rounded-lg text-primary">
                  <Phone className="w-5 h-5" />
                </div>
                <div>
                  <p className="font-medium text-foreground mb-1">Phone:</p>
                  <p className="text-slate-600 dark:text-slate-400">+91 98765 43210</p>
                </div>
              </li>
            </ul>
          </div>
        </div>

        <div className="border-t border-slate-200 dark:border-slate-800 pt-8 flex flex-col md:flex-row items-center justify-between text-slate-500 dark:text-slate-400 text-sm">
          <p>© 2026 MAPMAN. All Rights Reserved.</p>
          <div className="flex gap-6 mt-4 md:mt-0">
            <Link href="#" className="hover:text-primary transition-colors">Privacy</Link>
            <Link href="#" className="hover:text-primary transition-colors">Terms</Link>
            <Link href="#" className="hover:text-primary transition-colors">Cookies</Link>
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
      className="w-10 h-10 rounded-full bg-slate-100 dark:bg-slate-800 flex items-center justify-center text-slate-600 dark:text-slate-400 hover:bg-primary hover:text-white transition-all transform hover:-translate-y-1"
    >
      <Icon className="w-5 h-5" />
    </a>
  );
}

function FooterLink({ href, children }: { href: string; children: React.ReactNode }) {
  return (
    <li>
      <Link href={href} className="text-slate-600 dark:text-slate-400 hover:text-primary transition-colors hover:pl-1 inline-block">
        {children}
      </Link>
    </li>
  );
}
