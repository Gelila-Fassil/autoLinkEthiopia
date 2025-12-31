"use client"

import { motion, useMotionValue, useTransform, animate } from "framer-motion"
import Image from "next/image"
import { useEffect } from "react"

export function RotatingCarShowcase({
  image = "/luxury-sports-car-lamborghini-revuelto-hero.jpg"
}: {
  image?: string
}) {
  const rotation = useMotionValue(0)

  useEffect(() => {
    const controls = animate(rotation, 360, {
      duration: 25,
      repeat: Number.POSITIVE_INFINITY,
      ease: "linear",
    })

    return controls.stop
  }, [rotation])

  const rotateY = useTransform(rotation, (value) => `${value}deg`)

  return (
    <div className="relative w-full h-full flex items-center justify-center perspective-[2500px]">
      {/* Showroom Platform (Static Base) */}
      <div className="absolute bottom-[10%] w-[550px] h-[180px] perspective-[1000px]">
        {/* Main white circular base like in the image */}
        <div className="absolute inset-0 bg-white shadow-[0_20px_50px_rgba(0,0,0,0.3)] rounded-[100%] border-b-[12px] border-neutral-300" />

        {/* Inset ring / rotating surface */}
        <motion.div
          style={{ rotateZ: rotation }}
          className="absolute inset-[4%] rounded-full border border-neutral-200/50 bg-neutral-50/10 shadow-inner flex items-center justify-center"
        >
          {/* Subtle rotation markers on the platform */}
          {[...Array(24)].map((_, i) => (
            <div
              key={i}
              className="absolute w-[1px] h-2 bg-neutral-300/30"
              style={{
                transform: `rotate(${i * 15}deg) translateY(-240px)`,
              }}
            />
          ))}
        </motion.div>

        {/* Top glossy surface */}
        <div className="absolute inset-0 rounded-full bg-gradient-to-tr from-white/10 via-transparent to-black/5 pointer-events-none" />
      </div>

      {/* Rotating Car */}
      <div className="relative w-full h-full flex items-center justify-center -mt-20">
        <motion.div style={{ rotateY }} className="relative w-[750px] h-[450px] preserve-3d">
          {/* Car Image (Red Luxury Sports Car) */}
          <div className="relative w-full h-full transform-gpu">
            {/* Real shadow on the platform */}
            <motion.div
              animate={{
                opacity: [0.3, 0.5, 0.3],
                scale: [0.95, 1, 0.95],
              }}
              transition={{
                duration: 4,
                repeat: Number.POSITIVE_INFINITY,
                ease: "easeInOut",
              }}
              className="absolute bottom-[-20px] left-1/2 -translate-x-1/2 w-[500px] h-[100px] bg-black/50 rounded-[100%] blur-[40px]"
            />

            {/* High-quality Red Sports Car */}
            <Image
              src={image} // Using the dynamic image prop
              alt="Rotating Luxury Car"
              fill
              className="object-contain drop-shadow-[0_20px_50px_rgba(0,0,0,0.4)]"
              priority
            />

            {/* Specular reflections on car body */}
            <motion.div
              animate={{
                backgroundPosition: ["0% 50%", "100% 50%", "0% 50%"],
              }}
              transition={{
                duration: 5,
                repeat: Number.POSITIVE_INFINITY,
                ease: "linear",
              }}
              className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent bg-[length:200%_100%] pointer-events-none"
            />
          </div>
        </motion.div>
      </div>

      {/* Showroom Lighting (Static) */}
      <div className="absolute inset-0 pointer-events-none">
        {/* Top Spotlights */}
        <div className="absolute top-0 left-1/4 w-[1px] h-full bg-gradient-to-b from-primary/20 to-transparent blur-2xl" />
        <div className="absolute top-0 right-1/4 w-[1px] h-full bg-gradient-to-b from-primary/20 to-transparent blur-2xl" />

        {/* Floor Reflections */}
        <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-full h-[300px] bg-gradient-radial from-primary/5 to-transparent blur-3xl opacity-50" />
      </div>
    </div>
  )
}
