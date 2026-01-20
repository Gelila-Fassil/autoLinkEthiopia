"use client"

import { Navbar } from "@/components/navbar"
import { Footer } from "@/components/footer"
import dynamic from "next/dynamic"

const HeroSection = dynamic(() => import("@/components/hero-section").then(mod => mod.HeroSection), { ssr: false })
const SpotlightCar = dynamic(() => import("@/components/spotlight-car").then(mod => mod.SpotlightCar), { ssr: false })
const InventoryGallery = dynamic(() => import("@/components/inventory-gallery").then(mod => mod.InventoryGallery), { ssr: false })
const RentalsSection = dynamic(() => import("@/components/rentals-section").then(mod => mod.RentalsSection), { ssr: false })
const HouseGallery = dynamic(() => import("@/components/house-gallery").then(mod => mod.HouseGallery), { ssr: false })

export default function LandingPage() {
  return (
    <main className="min-h-screen bg-background selection:bg-primary selection:text-primary-foreground">
      <Navbar />

      <HeroSection />
      <div className="py-24">
        <InventoryGallery />
      </div>

      <SpotlightCar />

      <RentalsSection />

      <section className="py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-serif font-bold text-white mb-4">
              Luxury <span className="text-primary italic">Houses</span>
            </h2>
            <p className="text-white/60 text-lg max-w-2xl mx-auto">
              Discover premium homes and residences available now.
            </p>
          </div>
          <HouseGallery />
        </div>
      </section>

      <Footer />
    </main>
  )
}
