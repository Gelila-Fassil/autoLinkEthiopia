"use client"

import Link from "next/link"
import { motion } from "framer-motion"
import { MapPin, Phone, Mail, Instagram, Youtube, Facebook, Twitter } from "lucide-react"

export function Footer() {

  return (
    <footer className="relative border-t border-primary/20 bg-gradient-to-b from-background via-background/95 to-black overflow-hidden">
      {/* Background Pattern */}
      <div className="absolute inset-0 digital-pattern opacity-5 pointer-events-none" />
      
      <div className="relative z-10 max-w-7xl mx-auto px-8 md:px-16 py-16 md:py-24">
        {/* Main Footer Content - Top Row */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 lg:gap-12 mb-12">
          {/* Brand Section */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="space-y-4"
          >
            <div className="text-3xl font-serif font-bold tracking-tight">
              <span className="text-primary italic">A</span>
              <span className="tracking-[0.2em] text-white">UTOLINK</span>
            </div>
            <p className="text-[10px] uppercase tracking-[0.3em] text-primary/80 mb-2">
              ETHIOPIA
            </p>
            <p className="text-sm text-white/60 leading-relaxed">
              Curating the finest collection of luxury automobiles and investment-grade properties for Ethiopia's elite.
            </p>
          </motion.div>

          {/* Quick Links */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="space-y-4"
          >
            <h3 className="text-lg font-serif font-bold text-white mb-4">Quick Links</h3>
            <ul className="space-y-3">
              <li>
                <Link href="/" className="text-sm text-white/60 hover:text-primary transition-colors flex items-center gap-2 group">
                  <span className="w-1 h-1 rounded-full bg-primary/50 group-hover:bg-primary transition-colors" />
                  Home
                </Link>
              </li>
              <li>
                <Link href="/inventory" className="text-sm text-white/60 hover:text-primary transition-colors flex items-center gap-2 group">
                  <span className="w-1 h-1 rounded-full bg-primary/50 group-hover:bg-primary transition-colors" />
                  Inventory
                </Link>
              </li>
              <li>
                <Link href="/houses" className="text-sm text-white/60 hover:text-primary transition-colors flex items-center gap-2 group">
                  <span className="w-1 h-1 rounded-full bg-primary/50 group-hover:bg-primary transition-colors" />
                  House Rentals
                </Link>
              </li>
              <li>
                <Link href="/contact" className="text-sm text-white/60 hover:text-primary transition-colors flex items-center gap-2 group">
                  <span className="w-1 h-1 rounded-full bg-primary/50 group-hover:bg-primary transition-colors" />
                  Contact
                </Link>
              </li>
            </ul>
          </motion.div>

          {/* Contact Info */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="space-y-4"
          >
            <h3 className="text-lg font-serif font-bold text-white mb-4">Contact</h3>
            <ul className="space-y-4">
              <li className="flex items-start gap-3">
                <MapPin className="w-5 h-5 text-primary mt-0.5 flex-shrink-0" />
                <span className="text-sm text-white/60">Bole Sub-City, Addis Ababa, Ethiopia</span>
              </li>
              <li className="flex items-center gap-3">
                <Phone className="w-5 h-5 text-primary flex-shrink-0" />
                <a href="tel:+251911234567" className="text-sm text-white/60 hover:text-primary transition-colors">
                  +251 911 234 567
                </a>
              </li>
              <li className="flex items-center gap-3">
                <Mail className="w-5 h-5 text-primary flex-shrink-0" />
                <a href="mailto:info@autolinkethiopia.com" className="text-sm text-white/60 hover:text-primary transition-colors">
                  info@autolinkethiopia.com
                </a>
              </li>
            </ul>
          </motion.div>

          {/* Social Media */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="space-y-4"
          >
            <h3 className="text-lg font-serif font-bold text-white mb-4">Follow Us</h3>
            <div className="flex gap-4 flex-wrap">
              <a
                href="#"
                target="_blank"
                rel="noopener noreferrer"
                className="w-10 h-10 flex items-center justify-center rounded-full bg-white/5 border border-primary/20 hover:bg-primary/10 hover:border-primary/60 transition-all group"
              >
                <Instagram className="w-5 h-5 text-white/60 group-hover:text-primary transition-colors" />
              </a>
              <a
                href="#"
                target="_blank"
                rel="noopener noreferrer"
                className="w-10 h-10 flex items-center justify-center rounded-full bg-white/5 border border-primary/20 hover:bg-primary/10 hover:border-primary/60 transition-all group"
              >
                <Youtube className="w-5 h-5 text-white/60 group-hover:text-primary transition-colors" />
              </a>
              <a
                href="#"
                target="_blank"
                rel="noopener noreferrer"
                className="w-10 h-10 flex items-center justify-center rounded-full bg-white/5 border border-primary/20 hover:bg-primary/10 hover:border-primary/60 transition-all group"
              >
                <Facebook className="w-5 h-5 text-white/60 group-hover:text-primary transition-colors" />
              </a>
              <a
                href="#"
                target="_blank"
                rel="noopener noreferrer"
                className="w-10 h-10 flex items-center justify-center rounded-full bg-white/5 border border-primary/20 hover:bg-primary/10 hover:border-primary/60 transition-all group"
              >
                <Twitter className="w-5 h-5 text-white/60 group-hover:text-primary transition-colors" />
              </a>
            </div>
          </motion.div>
        </div>

        {/* Bottom Bar */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.5 }}
          className="pt-8 border-t border-primary/10 flex flex-col md:flex-row items-center justify-between gap-4"
        >
          <p className="text-xs uppercase tracking-widest text-white/40">
            © 2025 Autolink Ethiopia. All Rights Reserved.
          </p>
          <div className="flex items-center gap-6">
            <Link href="#" className="text-xs uppercase tracking-wider text-white/40 hover:text-primary transition-colors">
              Privacy Policy
            </Link>
            <span className="w-1 h-1 rounded-full bg-primary/40" />
            <Link href="#" className="text-xs uppercase tracking-wider text-white/40 hover:text-primary transition-colors">
              Terms of Service
            </Link>
          </div>
        </motion.div>
      </div>
    </footer>
  )
}
