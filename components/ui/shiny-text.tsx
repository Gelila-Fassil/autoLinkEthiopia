'use client'

import { motion } from 'framer-motion'
import { CSSProperties } from 'react'

interface ShinyTextProps {
  children: string
  className?: string
  shimmerWidth?: number
  speed?: number
}

export function ShinyText({
  children,
  className = '',
  shimmerWidth = 100,
  speed = 3,
}: ShinyTextProps) {
  return (
    <motion.span
      initial={{ backgroundPosition: '200% center' }}
      animate={{ backgroundPosition: '-200% center' }}
      transition={{
        repeat: Infinity,
        duration: speed,
        ease: 'linear',
      }}
      className={`inline-block bg-clip-text text-transparent ${className}`}
      style={
        {
          backgroundImage: `linear-gradient(
            90deg,
            #bba14f 0%,
            #d4af37 ${shimmerWidth / 2}%,
            #f0e68c ${shimmerWidth}%,
            #d4af37 ${100 - shimmerWidth / 2}%,
            #bba14f 100%
          )`,
          backgroundSize: '200% auto',
          '--shimmer-width': `${shimmerWidth}px`,
        } as CSSProperties
      }
    >
      {children}
    </motion.span>
  )
}
