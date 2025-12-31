"use client"

import { CardContainer, CardBody, CardItem } from "@/components/ui/3d-card"
import { ArrowRight } from "lucide-react"

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

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {CARS.map((car) => (
            <CardContainer key={car.id} className="inter-var w-full">
              <CardBody className="bg-neutral-900 border border-white/[0.1] w-auto h-auto min-h-[480px] p-6 rounded-2xl group/card transition-all duration-300 hover:border-primary/50">
                <CardItem translateZ="50" className="w-full">
                  <div className="relative aspect-[4/3] overflow-hidden rounded-xl">
                    <img
                      src={car.image || "/placeholder.svg"}
                      alt={car.name}
                      className="w-full h-full object-cover group-hover/card:scale-105 transition-transform duration-500"
                    />
                  </div>
                </CardItem>

                <div className="mt-6 space-y-4">
                  <div>
                    <CardItem
                      translateZ="30"
                      className="text-xl font-serif font-bold text-foreground"
                    >
                      {car.name}
                    </CardItem>
                    <CardItem
                      as="p"
                      translateZ="40"
                      className="text-primary text-[10px] uppercase tracking-widest font-bold mt-1"
                    >
                      {car.year} • {car.category}
                    </CardItem>
                  </div>

                  <div className="flex justify-between items-center pt-4 border-t border-white/[0.05]">
                    <CardItem translateZ="20" className="text-2xl font-serif font-bold text-primary">
                      {car.price}
                    </CardItem>
                    <CardItem
                      translateZ="30"
                      as="button"
                      className="px-6 py-2 bg-white/5 hover:bg-primary text-foreground hover:text-background rounded-full text-[10px] uppercase tracking-widest font-bold transition-all duration-300 flex items-center gap-2 group/btn"
                    >
                      View Details
                      <ArrowRight className="w-4 h-4 group-hover/btn:translate-x-1 transition-transform" />
                    </CardItem>
                  </div>
                </div>
              </CardBody>
            </CardContainer>
          ))}
        </div>
      </div>
    </section>
  )
}
