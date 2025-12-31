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
    id: 5,
    name: "BMW M8 Competition",
    category: "Grand Tourer",
    price: "$175,000",
    image: "/placeholder.svg?key=d0y13",
    year: "2024",
  },
  {
    id: 6,
    name: "Bentley Continental GT",
    category: "Grand Tourer",
    price: "$325,000",
    image: "/placeholder.svg?key=z2coz",
    year: "2025",
  },
]

export function InventoryGallery() {
  return (
    <section id="inventory" className="py-32 px-8 md:px-16 bg-background">
      <div className="max-w-7xl mx-auto">
        <div className="flex flex-col md:flex-row items-start md:items-end justify-between mb-20 gap-8">
          <div className="space-y-4">
            <div className="h-0.5 w-16 bg-primary" />
            <h2 className="text-5xl md:text-7xl font-serif font-bold leading-tight">
              Latest <span className="text-primary italic">Arrivals</span>
            </h2>
          </div>
          <p className="text-muted-foreground max-w-md text-sm leading-relaxed">
            Discover our curated collection of the world's most prestigious automobiles.
            Each vehicle meticulously selected for discerning collectors.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
          {CARS.map((car, index) => {
            const isLightCard = index % 2 === 0;
            return (
              <CardContainer key={car.id} className="inter-var w-full">
                <CardBody className={cn(
                  "relative group/card w-auto h-auto min-h-[480px] p-6 rounded-2xl transition-all duration-300 hover:-translate-y-2 border",
                  isLightCard
                    ? "bg-[#e5e7eb] border-white/20 shadow-xl"
                    : "bg-background/40 backdrop-blur-xl border-primary/10 hover:border-primary/40"
                )}>
                  <CardItem translateZ="50" className="w-full">
                    <div className="relative aspect-[4/3] overflow-hidden rounded-xl border border-white/5 bg-neutral-900">
                      <img
                        src={car.image || "/placeholder.svg"}
                        alt={car.name}
                        className="w-full h-full object-contain group-hover/card:scale-105 transition-transform duration-500 p-4"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-background/40 via-transparent to-transparent opacity-0 group-hover/card:opacity-100 transition-opacity duration-300" />
                    </div>
                  </CardItem>

                  <div className="mt-8 space-y-6">
                    <div className="space-y-1">
                      <CardItem
                        translateZ="40"
                        className={cn(
                          "text-2xl font-serif font-bold transition-colors duration-300",
                          isLightCard ? "text-black group-hover/card:text-primary" : "text-white group-hover/card:text-primary"
                        )}
                      >
                        {car.name}
                      </CardItem>
                      <CardItem
                        as="p"
                        translateZ="30"
                        className={cn(
                          "text-[10px] uppercase tracking-[0.3em] font-bold",
                          isLightCard ? "text-black/60" : "text-primary/60"
                        )}
                      >
                        {car.year} • {car.category}
                      </CardItem>
                    </div>

                    <div className={cn(
                      "flex justify-between items-center pt-6 border-t",
                      isLightCard ? "border-black/10" : "border-white/5"
                    )}>
                      <CardItem
                        translateZ="30"
                        className={cn(
                          "text-2xl font-serif font-bold",
                          isLightCard ? "text-black" : "gold-gradient"
                        )}
                      >
                        {car.price}
                      </CardItem>
                      <Link href={`/inventory/${car.id}`}>
                        <CardItem
                          translateZ="40"
                          as="button"
                          className={cn(
                            "px-8 py-3 rounded-full text-[10px] uppercase tracking-[0.4em] font-bold transition-all duration-300 flex items-center gap-2 group/btn",
                            isLightCard ? "bg-black text-white hover:bg-primary" : "bg-primary text-background hover:bg-accent"
                          )}
                        >
                          Details
                          <ArrowRight className="w-4 h-4 group-hover/btn:translate-x-1 transition-transform" />
                        </CardItem>
                      </Link>
                    </div>
                  </div>
                </CardBody>
              </CardContainer>
            );
          })}
        </div>
      </div>
    </section>
  )
}
