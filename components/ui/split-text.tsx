'use client'

import { motion } from 'framer-motion'
import { ReactNode } from 'react'

interface SplitTextProps {
  children: string
  className?: string
  delay?: number
  duration?: number
  type?: 'chars' | 'words'
}

export function SplitText({
  children,
  className = '',
  delay = 0,
  duration = 0.05,
  type = 'chars',
}: SplitTextProps) {
  const splitContent = type === 'chars' ? children.split('') : children.split(' ')

  return (
    <span className={className}>
      {splitContent.map((item, index) => (
        <motion.span
          key={index}
          initial={{ opacity: 0, y: 20, filter: 'blur(8px)' }}
          animate={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
          transition={{
            duration: 0.4,
            delay: delay + index * duration,
            ease: [0.25, 0.46, 0.45, 0.94],
          }}
          className="inline-block"
          style={{ whiteSpace: type === 'words' ? 'pre' : 'normal' }}
        >
          {item === ' ' ? '\u00A0' : item}
        </motion.span>
      ))}
    </span>
  )
}
