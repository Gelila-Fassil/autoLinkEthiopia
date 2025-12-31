"use client"

import { CardContainer, CardBody, CardItem } from "@/components/ui/3d-card"
import { Home, Shield, MapPin } from "lucide-react"
import { Boxes } from "@/components/ui/background-boxes"

const PROPERTIES = [
  {
    id: 1,
    title: "Bole Penthouse",
    location: "Bole, Addis Ababa",
    image: "/luxury-apartment-living-room.jpg",
    price: "$8,500/mo",
    bedrooms: 4,
  },
  {
    id: 2,
    title: "Kazanchis Villa",
    location: "Kazanchis, Addis Ababa",
    image: "/modern-villa-exterior-night.jpg",
    price: "$12,000/mo",
    bedrooms: 6,
  },
]
export function RentalsSection() {
  return (
    <section id="rentals" className="py-32 px-8 md:px-16 bg-background relative overflow-hidden flex flex-col items-center justify-center">
      <div className="absolute inset-0 w-full h-full bg-background z-0 [mask-image:radial-gradient(transparent,white)] pointer-events-none" />
      <Boxes />
      <div className="relative z-10 max-w-7xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-20 items-center mb-20">
          <div className="space-y-8">
            <div className="space-y-4">
              <span className="text-primary text-xs uppercase tracking-[0.3em] font-bold">Premium Properties</span>
              <h2 className="text-5xl md:text-7xl font-serif font-bold leading-tight text-foreground">
                House <span className="text-primary italic">Rentals</span>
              </h2>
            </div>

            <p className="text-muted-foreground text-lg leading-relaxed max-w-md">
              Exclusive residences in Addis Ababa's most prestigious neighborhoods.
            </p>

            <div className="grid grid-cols-2 gap-6 pt-4">
              <div className="border border-white/5 bg-white/[0.02] p-6 space-y-3 rounded-2xl">
                <Home className="w-6 h-6 text-primary" />
                <div className="text-2xl font-serif font-bold text-foreground">25+</div>
                <div className="text-xs uppercase tracking-wider text-muted-foreground font-medium">Luxury Units</div>
              </div>
              <div className="border border-white/5 bg-white/[0.02] p-6 space-y-3 rounded-2xl">
                <Shield className="w-6 h-6 text-primary" />
                <div className="text-2xl font-serif font-bold text-foreground">24/7</div>
                <div className="text-xs uppercase tracking-wider text-muted-foreground font-medium">Security</div>
              </div>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
          {PROPERTIES.map((property) => (
            <CardContainer key={property.id} className="inter-var w-full">
              <CardBody className="bg-neutral-900 border border-white/10 w-auto h-auto p-0 rounded-3xl overflow-hidden group/card transition-all duration-300 hover:border-primary/30">
                <CardItem translateZ="50" className="w-full relative">
                  <div className="relative aspect-[16/10] overflow-hidden">
                    <img
                      src={property.image || "/placeholder.svg"}
                      alt={property.title}
                      className="w-full h-full object-cover group-hover/card:scale-105 transition-transform duration-700"
                    />
                    <div className="absolute top-6 left-6">
                      <CardItem
                        translateZ="80"
                        className="bg-primary px-4 py-2 rounded-full text-background text-[10px] font-bold uppercase tracking-widest"
                      >
                        {property.location.split(',')[0]}
                      </CardItem>
                    </div>
                  </div>
                </CardItem>

                <div className="p-8 space-y-6">
                  <div className="flex justify-between items-start">
                    <div className="space-y-1">
                      <CardItem
                        translateZ="40"
                        className="text-2xl font-serif font-bold text-foreground"
                      >
                        {property.title}
                      </CardItem>
                      <CardItem
                        as="p"
                        translateZ="50"
                        className="text-muted-foreground text-sm"
                      >
                        {property.location}
                      </CardItem>
                    </div>
                    <CardItem
                      translateZ="60"
                      className="text-xl font-serif font-bold text-primary"
                    >
                      {property.price}
                    </CardItem>
                  </div>

                  <div className="flex items-center justify-between pt-6 border-t border-white/5">
                    <CardItem
                      translateZ="30"
                      className="flex items-center gap-4 text-xs font-medium text-muted-foreground"
                    >
                      <span>{property.bedrooms} Bedrooms</span>
                      <span className="h-1 w-1 rounded-full bg-white/20" />
                      <span>Furnished</span>
                    </CardItem>

                    <CardItem
                      translateZ="60"
                      as="button"
                      className="px-6 py-3 bg-white/5 hover:bg-primary text-foreground hover:text-background font-bold text-[10px] uppercase tracking-widest rounded-xl transition-all duration-300"
                    >
                      View Property
                    </CardItem>
                  </div>
                </div>
              </CardBody>
            </CardContainer>
          ))}
        </div>
      </div>
    </section >
  )
}
