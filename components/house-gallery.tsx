"use client"

import { CardContainer, CardBody, CardItem } from "@/components/ui/3d-card"
import { ArrowRight, BedDouble, Bath, Maximize } from "lucide-react"
import { cn } from "@/lib/utils"
import Link from "next/link"

const HOUSES = [
  {
    id: 1,
    title: "Luxury Hillside Villa",
    location: "Entoto, Addis Ababa",
    price: "$8,500/mo",
    image: "/bole-penthouse.png", // Using existing placeholder
    bedrooms: 5,
    bathrooms: 6,
    sqft: "5,200"
  },
  {
    id: 2,
    title: "Modern Minimalist Home",
    location: "Bole, Addis Ababa",
    price: "$6,200/mo",
    image: "/kazanchis-villa.png", // Using existing placeholder
    bedrooms: 4,
    bathrooms: 4,
    sqft: "3,800"
  },
  {
    id: 3,
    title: "Classic Diplomatic Residence",
    location: "Old Airport, Addis Ababa",
    price: "$12,000/mo",
    image: "/bole-penthouse.png",
    bedrooms: 7,
    bathrooms: 8,
    sqft: "8,500"
  },
  {
    id: 4,
    title: "Urban Penthouse Suite",
    location: "Kazanchis, Addis Ababa",
    price: "$4,500/mo",
    image: "/kazanchis-villa.png",
    bedrooms: 3,
    bathrooms: 3,
    sqft: "2,400"
  },
  {
    id: 5,
    title: "Lakeview Retreat",
    location: "Bishoftu",
    price: "$3,800/mo",
    image: "/bole-penthouse.png",
    bedrooms: 4,
    bathrooms: 3,
    sqft: "3,200"
  },
  {
    id: 6,
    title: "Gated Community Mansion",
    location: "CMC, Addis Ababa",
    price: "$5,500/mo",
    image: "/kazanchis-villa.png",
    bedrooms: 6,
    bathrooms: 5,
    sqft: "4,800"
  }
]

export function HouseGallery() {
  return (
    <div className="w-full">
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {HOUSES.map((house, index) => {
            const isFeatured = index === 0 || index === 2;
            return (
              <CardContainer key={house.id} className="inter-var w-full h-full">
                <CardBody className={cn(
                  "relative group/card w-full h-full min-h-[520px] p-6 rounded-3xl transition-all duration-500 hover:-translate-y-3 flex flex-col",
                  "bg-gradient-to-br from-neutral-900 via-neutral-950 to-black",
                  "border-2 border-primary/30 hover:border-primary/80",
                  "shadow-[0_0_60px_-20px_rgba(187,161,79,0.2)] hover:shadow-[0_0_100px_-20px_rgba(187,161,79,0.5)]",
                  "backdrop-blur-sm",
                  isFeatured && "ring-2 ring-primary/50 ring-offset-2 ring-offset-background"
                )}>
                  {/* Animated gradient overlay */}
                  <div className="absolute inset-0 rounded-3xl bg-gradient-to-br from-primary/5 via-transparent to-primary/10 opacity-0 group-hover/card:opacity-100 transition-opacity duration-500 pointer-events-none" />
                  
                  {/* Shimmer border effect */}
                  <div className="absolute inset-0 rounded-3xl opacity-0 group-hover/card:opacity-100 transition-opacity duration-500 pointer-events-none">
                    <div className="absolute inset-0 rounded-3xl bg-gradient-to-r from-transparent via-primary/20 to-transparent gold-shimmer" />
                  </div>

                  <CardItem translateZ="50" className="w-full relative z-10">
                    <div className="relative aspect-[4/3] overflow-hidden rounded-2xl border-2 border-primary/20 bg-gradient-to-br from-neutral-800 to-black group-hover/card:border-primary/60 transition-all duration-500">
                      <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent z-10" />
                      <img
                        src={house.image || "/placeholder.svg"}
                        alt={house.title}
                        className="w-full h-full object-cover group-hover/card:scale-110 transition-transform duration-700"
                      />
                      {/* Featured badge */}
                      {isFeatured && (
                        <div className="absolute top-4 right-4 z-20 bg-primary text-background px-4 py-2 rounded-full text-[10px] font-bold uppercase tracking-widest shadow-lg">
                          Premium
                        </div>
                      )}
                      
                      {/* Location Badge */}
                      <div className="absolute bottom-4 left-4 z-20 overflow-hidden rounded-full border border-white/20">
                         <div className="bg-black/60 backdrop-blur-md px-4 py-1.5 text-xs font-medium text-white flex items-center gap-1">
                           <span className="w-1.5 h-1.5 rounded-full bg-primary animate-pulse"/>
                           {house.location}
                         </div>
                      </div>
                    </div>
                  </CardItem>

                  <div className="mt-6 space-y-4 relative z-10 flex flex-col flex-1">
                    <div>
                      <CardItem
                        translateZ="40"
                        className="text-2xl md:text-3xl font-serif font-bold text-white group-hover/card:text-primary transition-colors duration-300 leading-tight"
                      >
                        {house.title}
                      </CardItem>
                    </div>

                    {/* Features Grid */}
                    <CardItem translateZ="30" className="grid grid-cols-3 gap-2 py-4 border-y border-primary/10">
                      <div className="flex flex-col items-center justify-center p-2 rounded-xl bg-white/5 border border-white/5">
                        <BedDouble className="w-4 h-4 text-primary mb-1" />
                        <span className="text-xs text-white/70 font-medium">{house.bedrooms} Beds</span>
                      </div>
                      <div className="flex flex-col items-center justify-center p-2 rounded-xl bg-white/5 border border-white/5">
                        <Bath className="w-4 h-4 text-primary mb-1" />
                        <span className="text-xs text-white/70 font-medium">{house.bathrooms} Baths</span>
                      </div>
                      <div className="flex flex-col items-center justify-center p-2 rounded-xl bg-white/5 border border-white/5">
                        <Maximize className="w-4 h-4 text-primary mb-1" />
                        <span className="text-xs text-white/70 font-medium">{house.sqft} sqft</span>
                      </div>
                    </CardItem>

                    <div className="flex flex-col gap-4 pt-4 mt-auto">
                      <div className="flex justify-between items-center w-full">
                        <CardItem
                          translateZ="30"
                          className="text-2xl md:text-3xl font-serif font-bold gold-gradient"
                        >
                          {house.price}
                        </CardItem>
                        <span className="text-xs text-muted-foreground uppercase tracking-wider font-medium">Monthly</span>
                      </div>
                      
                      <Link href={`/houses/${house.id}`} className="w-full">
                        <CardItem
                          translateZ="40"
                          as="button"
                          className="w-full py-3 bg-primary text-background hover:bg-accent font-bold text-[10px] uppercase tracking-[0.3em] rounded-xl transition-all duration-300 flex items-center justify-center gap-2 group/btn hover:scale-[1.02] hover:shadow-[0_0_30px_rgba(187,161,79,0.5)] whitespace-nowrap"
                        >
                          View Property
                          <ArrowRight className="w-3 h-3 group-hover/btn:translate-x-1 transition-transform duration-300" />
                        </CardItem>
                      </Link>
                    </div>
                  </div>

                  {/* Corner accent decoration */}
                  <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-br from-primary/10 to-transparent rounded-bl-full opacity-50 group-hover/card:opacity-100 transition-opacity duration-500 pointer-events-none" />
                  <div className="absolute bottom-0 left-0 w-32 h-32 bg-gradient-to-tr from-primary/10 to-transparent rounded-tr-full opacity-50 group-hover/card:opacity-100 transition-opacity duration-500 pointer-events-none" />
                </CardBody>
              </CardContainer>
            );
          })}
        </div>
      </div>
    </div>
  )
}
