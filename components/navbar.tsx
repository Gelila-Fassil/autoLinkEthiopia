"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import { cn } from "@/lib/utils"
import { FloatingDock } from "@/components/ui/floating-dock"
import { Car, Home, Mail, Building2 } from "lucide-react"
import { TestDriveModal } from "@/components/test-drive-modal"

const navigationItems = [
  {
    title: "Home",
    icon: <Home />,
    href: "/",
  },
  {
    title: "Inventory",
    icon: <Car />,
    href: "/inventory",
  },
  {
    title: "House Rentals",
    icon: <Building2 />,
    href: "/houses",
  },
  {
    title: "Contact",
    icon: <Mail />,
    href: "/contact",
  },
]

export function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false)
  const [isTestDriveModalOpen, setIsTestDriveModalOpen] = useState(false)

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 50)
    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  return (
    <>
      <nav
        className={cn(
          "fixed top-0 left-0 right-0 z-[60] transition-all duration-700 py-6 px-8 md:px-16",
          isScrolled ? "glass-dark py-4" : "bg-transparent",
        )}
      >
        {/* Three sections - equal width with center wider */}
        <div className="grid grid-cols-[1fr_2fr_1fr] items-center gap-4 max-w-7xl mx-auto">
          {/* Left: Logo */}
          <div className="flex justify-start">
            <Link href="/" className="group flex flex-col items-start leading-none">
              <span className="text-2xl font-serif font-bold tracking-[-0.02em] flex items-baseline text-foreground">
                <span className="text-primary italic mr-1">A</span>
                <span className="tracking-[0.15em]">UTOLINK</span>
              </span>
              <span className="text-[8px] uppercase tracking-[0.5em] text-muted-foreground mt-1 group-hover:text-primary transition-colors">
                ETHIOPIA
              </span>
            </Link>
          </div>

          {/* Center: Floating Dock (wider - 2x the width) */}
          <div className="flex justify-center">
            <FloatingDock
              items={navigationItems}
              desktopClassName="shadow-[0_0_40px_-10px_rgba(187,161,79,0.4)]"
              mobileClassName="shadow-[0_0_40px_-10px_rgba(187,161,79,0.4)]"
            />
          </div>

          {/* Right: Book a Test Drive Button */}
          <div className="flex justify-end">
            <div className="hidden lg:block">
              <button 
                onClick={() => setIsTestDriveModalOpen(true)}
                className="px-6 py-3 border-2 border-primary text-primary hover:bg-primary hover:text-background transition-all duration-300 text-sm uppercase tracking-wider font-semibold whitespace-nowrap"
              >
                Place Your Ad
              </button>
            </div>
          </div>
        </div>
      </nav>

      {/* Test Drive Modal */}
      <TestDriveModal 
        isOpen={isTestDriveModalOpen} 
        onClose={() => setIsTestDriveModalOpen(false)} 
      />
    </>
  )
}
