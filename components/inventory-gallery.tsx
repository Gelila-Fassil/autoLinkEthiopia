"use client"

import { CardContainer, CardBody, CardItem } from "@/components/ui/3d-card"
import { ArrowRight } from "lucide-react"
import { cn } from "@/lib/utils"
import Link from "next/link"

const CARS = [
  {
    id: 1,
    name: "Mercedes-Benz G63 AMG",
    category: "Luxury SUV",
    price: "$285,000",
    image: "/black-mercedes-g-wagon.jpg",
    year: "2025"
  },
  {
    id: 2,
    name: "Porsche 911 GT3",
    category: "Sports Car",
    price: "$245,000",
    image: "/white-porsche-911-gt3.jpg",
    year: "2024"
  },
  {
    id: 3,
    name: "Range Rover SV",
    category: "Luxury SUV",
    price: "$210,000",
    image: "/gold-range-rover.jpg",
    year: "2025"
  },
  {
    id: 4,
    name: "Rolls-Royce Ghost",
    category: "Ultra Luxury",
    price: "$390,000",
    image: "/rolls-royce-ghost-black.jpg",
    year: "2024",
  },
   {
    id: 2,
    name: "Porsche 911 GT3",
    category: "Sports Car",
    price: "$245,000",
    image: "/white-porsche-911-gt3.jpg",
    year: "2024"
  },
   {
    id: 1,
    name: "Mercedes-Benz G63 AMG",
    category: "Luxury SUV",
    price: "$285,000",
    image: "/black-mercedes-g-wagon.jpg",
    year: "2025"
  },
 
]

export function InventoryGallery() {
  return (
    <div className="w-full">
      <div className="max-w-7xl mx-auto">
        <div className="flex flex-col md:flex-row items-start md:items-end justify-between mb-10 gap-8">
          <div className="space-y-4">
            <h2 className="text-4xl md:text-5xl font-serif font-bold leading-tight">
              Latest <span className="text-primary italic">Arrivals</span>
            </h2>
          </div>
          <p className="text-muted-foreground max-w-md text-sm leading-relaxed">
            Discover our curated collection.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {CARS.map((car, index) => {
            const isFeatured = index % 3 === 0;
            return (
              <CardContainer key={car.id} className="inter-var w-full h-full">
                <CardBody className={cn(
                  "relative group/card w-full h-full min-h-[480px] p-6 rounded-3xl transition-all duration-500 hover:-translate-y-3 flex flex-col",
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
                    <div className="relative aspect-[16/9] overflow-hidden rounded-2xl border-2 border-primary/20 bg-gradient-to-br from-neutral-800 to-black group-hover/card:border-primary/60 transition-all duration-500">
                      <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent z-10" />
                      <img
                        src={car.image || "/placeholder.svg"}
                        alt={car.name}
                        className="w-full h-full object-cover group-hover/card:scale-110 transition-transform duration-700"
                      />
                      {/* Featured badge */}
                      {isFeatured && (
                        <div className="absolute top-4 right-4 z-20 bg-primary text-background px-4 py-2 rounded-full text-[10px] font-bold uppercase tracking-widest shadow-lg">
                          Featured
                        </div>
                      )}
                      {/* Year badge */}
                      <div className="absolute bottom-4 left-4 z-20 bg-black/80 backdrop-blur-md text-primary px-4 py-2 rounded-full text-xs font-bold border border-primary/30">
                        {car.year}
                      </div>
                    </div>
                  </CardItem>

                  <div className="mt-4 space-y-4 relative z-10 flex flex-col flex-1">
                    <div className="space-y-3">
                      <CardItem
                        translateZ="40"
                        className="text-3xl md:text-4xl font-serif font-bold text-white group-hover/card:text-primary transition-colors duration-300"
                      >
                        {car.name}
                      </CardItem>
                      <CardItem
                        as="p"
                        translateZ="30"
                        className="text-primary text-sm uppercase tracking-[0.3em] font-bold flex items-center gap-3"
                      >
                        <span className="w-12 h-px bg-primary/50" />
                        <span>{car.category}</span>
                        <span className="w-12 h-px bg-primary/50" />
                      </CardItem>
                    </div>

                    <div className="flex flex-col gap-4 pt-6 border-t-2 border-primary/20 group-hover/card:border-primary/60 transition-colors duration-300 mt-auto">
                      <div className="flex justify-between items-center w-full">
                        <CardItem
                          translateZ="30"
                          className="text-3xl md:text-3xl font-serif font-bold gold-gradient"
                        >
                          {car.price}
                        </CardItem>
                      </div>
                      
                      <Link href={`/inventory/${car.id}`} className="w-full">
                        <CardItem
                          translateZ="40"
                          as="button"
                          className="w-full py-3 bg-primary text-background hover:bg-accent font-bold text-[10px] uppercase tracking-[0.3em] rounded-xl transition-all duration-300 flex items-center justify-center gap-2 group/btn hover:scale-[1.02] hover:shadow-[0_0_30px_rgba(187,161,79,0.5)] whitespace-nowrap"
                        >
                          View Details
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
