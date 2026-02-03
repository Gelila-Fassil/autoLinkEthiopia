"use client"

import { Navbar } from "@/components/navbar"
import { Footer } from "@/components/footer"
import { HeroSection } from "@/components/hero-section"
import { SpotlightCar } from "@/components/spotlight-car"
import { InventoryGallery } from "@/components/inventory-gallery"
import { RentalsSection } from "@/components/rentals-section"
import { HouseGallery } from "@/components/house-gallery"

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
