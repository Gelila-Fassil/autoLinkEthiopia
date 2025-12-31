"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import { motion, AnimatePresence } from "framer-motion"
import { cn } from "@/lib/utils"

export function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false)
  const [isOpen, setIsOpen] = useState(false)

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 50)
    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  return (
    <>
      <nav
        className={cn(
          "fixed top-0 left-0 right-0 z-[60] transition-all duration-700 py-6 px-8 md:px-16 flex items-center justify-between",
          // <CHANGE> Updated glassmorphism styling
          isScrolled ? "glass-dark py-4" : "bg-transparent",
        )}
      >
        <Link href="/" className="group flex flex-col items-start leading-none">
          <span className="text-2xl font-serif font-bold tracking-[-0.02em] flex items-baseline text-foreground">
            <span className="text-primary italic mr-1">A</span>
            <span className="tracking-[0.15em]">UTOLINK</span>
          </span>
          <span className="text-[8px] uppercase tracking-[0.5em] text-muted-foreground mt-1 group-hover:text-primary transition-colors">
            ETHIOPIA
          </span>
        </Link>

        <div className="hidden md:flex items-center gap-12 text-sm uppercase tracking-wider">
          <Link href="/inventory" className="hover:text-primary transition-colors">
            Inventory
          </Link>
          <Link href="#rentals" className="hover:text-primary transition-colors">
            House Rentals
          </Link>
          <Link href="#services" className="hover:text-primary transition-colors">
            Services
          </Link>
          <Link href="#about" className="hover:text-primary transition-colors">
            About
          </Link>
          <Link href="#contact" className="hover:text-primary transition-colors">
            Contact
          </Link>
        </div>

        <div className="flex items-center gap-6">
          {/* <CHANGE> Added gold-outlined "Book a Test Drive" button */}
          <button className="hidden lg:block px-6 py-3 border-2 border-primary text-primary hover:bg-primary hover:text-background transition-all duration-300 text-sm uppercase tracking-wider font-semibold">
            Book a Test Drive
          </button>

          <button onClick={() => setIsOpen(true)} className="flex flex-col gap-1.5 group cursor-pointer md:hidden">
            <div className="w-7 h-[2px] bg-foreground group-hover:bg-primary transition-all duration-300" />
            <div className="w-5 h-[2px] bg-foreground group-hover:w-7 group-hover:bg-primary transition-all duration-300 self-end" />
          </button>
        </div>
      </nav>

      {/* <CHANGE> Updated full-screen menu overlay */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[70] bg-background flex items-center justify-center p-12"
          >
            <div className="absolute top-8 right-8">
              <button
                onClick={() => setIsOpen(false)}
                className="text-primary hover:text-foreground transition-colors uppercase tracking-[0.3em] text-xs font-bold"
              >
                CLOSE
              </button>
            </div>

            <div className="relative z-10 flex flex-col items-center gap-8 text-center">
              {["Inventory", "House Rentals", "Services", "About", "Contact"].map((item, i) => (
                <motion.div
                  key={item}
                  initial={{ y: 30, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  transition={{ delay: i * 0.1 }}
                >
                  <Link
                    href={item === "Inventory" ? "/inventory" : `#${item.toLowerCase().replace(' ', '-')}`}
                    onClick={() => setIsOpen(false)}
                    className="text-4xl md:text-6xl font-serif font-bold hover:text-primary transition-colors duration-300"
                  >
                    {item}
                  </Link>
                </motion.div>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}
