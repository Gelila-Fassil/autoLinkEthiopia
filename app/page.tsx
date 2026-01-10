"use client"

import { Navbar } from "@/components/navbar"
import { Footer } from "@/components/footer"
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
      <div className="py-24">
        <InventoryGallery />
      </div>

      <SpotlightCar />



      <RentalsSection />

      <Footer />
    </main>
  )
}
