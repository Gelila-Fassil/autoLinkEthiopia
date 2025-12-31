"use client"

import { Navbar } from "@/components/navbar"
import dynamic from "next/dynamic"

const HeroSection = dynamic(() => import("@/components/hero-section").then(mod => mod.HeroSection), { ssr: false })
const SpotlightCar = dynamic(() => import("@/components/spotlight-car").then(mod => mod.SpotlightCar), { ssr: false })
const InventoryGallery = dynamic(() => import("@/components/inventory-gallery").then(mod => mod.InventoryGallery), { ssr: false })
const RentalsSection = dynamic(() => import("@/components/rentals-section").then(mod => mod.RentalsSection), { ssr: false })

export default function LandingPage() {
  return (
    <main className="min-h-screen bg-background selection:bg-primary selection:text-primary-foreground">
      <Navbar />

      <HeroSection />
      <InventoryGallery />

      <SpotlightCar />



      <RentalsSection />

      {/* <CHANGE> Updated footer with gold & black theme */}
      <footer id="contact" className="py-24 border-t border-border bg-background">
        <div className="max-w-7xl mx-auto px-8 md:px-16 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-16">
          <div className="space-y-8">
            <h3 className="text-2xl font-serif font-bold tracking-tight flex items-baseline gap-1">
              <span className="text-primary italic">A</span>
              <span className="tracking-[0.2em]">UTOLINK</span>
            </h3>
            <p className="text-sm text-muted-foreground leading-relaxed">
              Providing discrete, personalized service for high-net-worth individuals and diplomatic missions in Ethiopia.
            </p>
          </div>

          <div>
            <h4 className="text-xs uppercase tracking-widest text-primary font-bold mb-8">Showroom</h4>
            <ul className="space-y-4 text-sm text-muted-foreground">
              <li className="hover:text-foreground transition-colors cursor-pointer">New Arrivals</li>
              <li className="hover:text-foreground transition-colors cursor-pointer">Bespoke Ordering</li>
              <li className="hover:text-foreground transition-colors cursor-pointer">Armored Vehicles</li>
              <li className="hover:text-foreground transition-colors cursor-pointer">Financing</li>
            </ul>
          </div>

          <div>
            <h4 className="text-xs uppercase tracking-widest text-primary font-bold mb-8">Residences</h4>
            <ul className="space-y-4 text-sm text-muted-foreground">
              <li className="hover:text-foreground transition-colors cursor-pointer">Diplomatic Villas</li>
              <li className="hover:text-foreground transition-colors cursor-pointer">Luxury Penthouses</li>
              <li className="hover:text-foreground transition-colors cursor-pointer">Property Management</li>
            </ul>
          </div>

          <div>
            <h4 className="text-xs uppercase tracking-widest text-primary font-bold mb-8">Newsletter</h4>
            <p className="text-sm text-muted-foreground mb-6">Get early access to our most exclusive arrivals.</p>
            <div className="flex">
              <input
                type="email"
                placeholder="Email"
                className="bg-card border border-border px-4 py-3 text-sm w-full focus:outline-none focus:border-primary transition-colors"
              />
              <button className="bg-primary text-background px-6 py-3 font-bold uppercase text-[10px] tracking-widest hover:bg-accent transition-colors">
                Join
              </button>
            </div>
          </div>
        </div>

        <div className="max-w-7xl mx-auto px-8 md:px-16 mt-24 pt-8 border-t border-border flex flex-col md:flex-row justify-between items-center gap-6 text-[10px] uppercase tracking-widest text-muted-foreground">
          <p>© 2025 Autolink Ethiopia. All Rights Reserved.</p>
          <div className="flex gap-8">
            <span className="hover:text-foreground transition-colors cursor-pointer">Privacy Policy</span>
            <span className="hover:text-foreground transition-colors cursor-pointer">Terms of Service</span>
          </div>
        </div>
      </footer>
    </main>
  )
}
