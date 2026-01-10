"use client"

import { CardContainer, CardBody, CardItem } from "@/components/ui/3d-card"
import { Home, Shield, MapPin } from "lucide-react"
import { Boxes } from "@/components/ui/background-boxes"

const PROPERTIES = [
  {
    id: 1,
    title: "Bole Penthouse",
    location: "Bole, Addis Ababa",
    image: "/bole-penthouse.png",
    price: "$8,500/mo",
    bedrooms: 4,
  },
  {
    id: 2,
    title: "Kazanchis Villa",
    location: "Kazanchis, Addis Ababa",
    image: "/kazanchis-villa.png",
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
          <div className="relative h-[400px] w-full rounded-3xl overflow-hidden border border-white/10 shadow-2xl group">
            <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent z-10" />
            <div className="absolute inset-0 bg-primary/10 opacity-0 group-hover:opacity-100 transition-opacity duration-500 z-20" />
            <img 
              src="/bole-penthouse.png" 
              alt="Luxury Penthouse Interior" 
              className="w-full h-full object-cover transform group-hover:scale-105 transition-transform duration-700"
            />
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10">
          {PROPERTIES.map((property, index) => (
            <CardContainer key={property.id} className="inter-var w-full">
              <CardBody className="relative bg-gradient-to-br from-neutral-900 via-neutral-950 to-black border-2 border-primary/30 hover:border-primary/80 w-auto h-auto p-0 rounded-3xl overflow-hidden group/card transition-all duration-500 hover:-translate-y-3 shadow-[0_0_60px_-20px_rgba(187,161,79,0.2)] hover:shadow-[0_0_100px_-20px_rgba(187,161,79,0.5)] backdrop-blur-sm">
                {/* Animated gradient overlay */}
                <div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-transparent to-primary/10 opacity-0 group-hover/card:opacity-100 transition-opacity duration-500 pointer-events-none z-10" />
                
                {/* Shimmer border effect */}
                <div className="absolute inset-0 opacity-0 group-hover/card:opacity-100 transition-opacity duration-500 pointer-events-none z-10">
                  <div className="absolute inset-0 bg-gradient-to-r from-transparent via-primary/20 to-transparent gold-shimmer" />
                </div>

                <CardItem translateZ="50" className="w-full relative z-10">
                  <div className="relative aspect-[16/9] overflow-hidden rounded-t-3xl">
                    <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent z-20" />
                    <img
                      src={property.image || "/placeholder.svg"}
                      alt={property.title}
                      className="w-full h-full object-cover group-hover/card:scale-110 transition-transform duration-700"
                    />
                    <div className="absolute top-6 left-6 z-30">
                      <CardItem
                        translateZ="80"
                        className="bg-primary px-5 py-3 rounded-full text-background text-xs font-bold uppercase tracking-widest shadow-[0_0_20px_rgba(187,161,79,0.5)] border-2 border-primary/50 backdrop-blur-sm"
                      >
                        {property.location.split(',')[0]}
                      </CardItem>
                    </div>
                    {/* Price badge overlay */}
                    <div className="absolute top-6 right-6 z-30">
                      <CardItem
                        translateZ="80"
                        className="bg-black/80 backdrop-blur-md px-5 py-3 rounded-full text-primary text-lg font-serif font-bold border-2 border-primary/30 shadow-lg"
                      >
                        {property.price}
                      </CardItem>
                    </div>
                  </div>
                </CardItem>

                <div className="p-10 space-y-8 relative z-10 bg-gradient-to-b from-transparent to-black/40">
                  <div className="space-y-4">
                    <CardItem
                      translateZ="40"
                      className="text-3xl md:text-4xl font-serif font-bold text-white group-hover/card:text-primary transition-colors duration-300"
                    >
                      {property.title}
                    </CardItem>
                    <CardItem
                      as="p"
                      translateZ="50"
                      className="text-primary/80 text-sm uppercase tracking-wider font-medium flex items-center gap-3"
                    >
                      <MapPin className="w-4 h-4" />
                      {property.location}
                    </CardItem>
                  </div>

                  <div className="flex items-center justify-between pt-8 border-t-2 border-primary/20 group-hover/card:border-primary/60 transition-colors duration-300">
                    <CardItem
                      translateZ="30"
                      className="flex items-center gap-6 text-sm font-medium text-white/70"
                    >
                      <span className="flex items-center gap-2">
                        <Home className="w-5 h-5 text-primary" />
                        <span className="font-bold text-white">{property.bedrooms} Bedrooms</span>
                      </span>
                      <span className="h-1 w-1 rounded-full bg-primary/50" />
                      <span className="text-primary">Fully Furnished</span>
                    </CardItem>

                    <CardItem
                      translateZ="60"
                      as="button"
                      className="px-8 py-4 bg-primary text-background hover:bg-accent font-bold text-xs uppercase tracking-widest rounded-full transition-all duration-300 hover:scale-105 hover:shadow-[0_0_30px_rgba(187,161,79,0.5)]"
                    >
                      View Property
                    </CardItem>
                  </div>
                </div>

                {/* Corner accent decorations */}
                <div className="absolute top-0 right-0 w-40 h-40 bg-gradient-to-br from-primary/10 to-transparent rounded-bl-full opacity-50 group-hover/card:opacity-100 transition-opacity duration-500 pointer-events-none z-0" />
                <div className="absolute bottom-0 left-0 w-40 h-40 bg-gradient-to-tr from-primary/10 to-transparent rounded-tr-full opacity-50 group-hover/card:opacity-100 transition-opacity duration-500 pointer-events-none z-0" />
              </CardBody>
            </CardContainer>
          ))}
        </div>
      </div>
    </section >
  )
}
