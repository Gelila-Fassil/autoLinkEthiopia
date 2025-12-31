'use client'

import { motion, useScroll, useTransform } from 'framer-motion'
import { ReactNode, useRef } from 'react'

interface TrueFocusProps {
  children: ReactNode
  className?: string
  blurAmount?: number
  scaleAmount?: number
}

export function TrueFocus({
  children,
  className = '',
  blurAmount = 8,
  scaleAmount = 0.95,
}: TrueFocusProps) {
  const ref = useRef<HTMLDivElement>(null)
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ['start end', 'end start'],
  })

  const blur = useTransform(
    scrollYProgress,
    [0, 0.3, 0.7, 1],
    [`blur(${blurAmount}px)`, 'blur(0px)', 'blur(0px)', `blur(${blurAmount}px)`]
  )

  const scale = useTransform(scrollYProgress, [0, 0.3, 0.7, 1], [scaleAmount, 1, 1, scaleAmount])

  const opacity = useTransform(scrollYProgress, [0, 0.3, 0.7, 1], [0.3, 1, 1, 0.3])

  return (
    <motion.div ref={ref} style={{ filter: blur, scale, opacity }} className={className}>
      {children}
    </motion.div>
  )
}
