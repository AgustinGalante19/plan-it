"use client"
import { useRouter } from "next/navigation"
import React, { useRef, useState } from "react"

const BoardItem = ({
  title,
  description,
  id,
}: {
  title: string
  description: string | null
  id: string
}) => {
  const divRef = useRef<HTMLDivElement>(null)
  const [isFocused, setIsFocused] = useState(false)
  const [position, setPosition] = useState({ x: 0, y: 0 })
  const [opacity, setOpacity] = useState(0)

  const { push } = useRouter()

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!divRef.current || isFocused) return

    const div = divRef.current
    const rect = div.getBoundingClientRect()

    setPosition({ x: e.clientX - rect.left, y: e.clientY - rect.top })
  }

  const handleFocus = () => {
    setIsFocused(true)
    setOpacity(1)
  }

  const handleBlur = () => {
    setIsFocused(false)
    setOpacity(0)
  }

  const handleMouseEnter = () => {
    setOpacity(1)
  }

  const handleMouseLeave = () => {
    setOpacity(0)
  }

  return (
    <button
      onClick={() => push(`boards/${id}`)}
      className='hover:drop-shadow-[0_25px_25px_rgba(152,124,249,0.2)] rounded-md transition-all hover:scale-105'
    >
      <div
        ref={divRef}
        onMouseMove={handleMouseMove}
        onFocus={handleFocus}
        onBlur={handleBlur}
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
        className='relative flex h-32 w-96 overflow-hidden rounded-md bg-gradient-to-r dark:from-primary/60 dark:to-primary/50 from-primary/90 to-primary/70 p-4 text-white'
      >
        <div
          className='pointer-events-none absolute -inset-px opacity-0 transition duration-300'
          style={{
            opacity,
            background: `radial-gradient(600px circle at ${position.x}px ${position.y}px, rgba(255,182,255,.4), transparent 70%)`,
          }}
        />
        <div className='flex flex-col items-start'>
          <h5 className='text-lg font-semibold'>{title}</h5>
          <p>{description}</p>
        </div>
      </div>
    </button>
  )
}

export default BoardItem
