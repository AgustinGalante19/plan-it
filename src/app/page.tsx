"use client"

import trelloCollage from "@/assets/TrelloUICollage_4x.webp"
import Button from "@/components/ui/button"
import { motion } from "framer-motion"
import { ChevronRight } from "lucide-react"
import Image from "next/image"
import Link from "next/link"

export default function Home() {
  return (
    <main className='container mx-auto pt-12'>
      <div className='flex justify-center'>
        <motion.div
          className='grid grid-cols-2 max-w-[900px] p-8 items-center'
          initial={{ translateX: -200 }}
          animate={{ translateX: 0 }}
        >
          <div>
            <h1 className='bg-gradient-to-r to-primary from-indigo-500/90  text-center inline-block mx-auto text-transparent bg-clip-text font-extrabold text-5xl'>
              Plan It
            </h1>
            <span className='block text-6xl font-bold'>
              Put order on your tasks
            </span>
          </div>
          <div className='relative flex'>
            <div className='absolute h-[400px] w-[400px] rounded-full bg-primary blur-2xl left-5 bottom-1 bg-opacity-20 dark:bg-opacity-30' />
            <Image
              src={trelloCollage}
              alt='some collage from trello'
              className='z-10 drop-shadow-2xl'
            />
          </div>
        </motion.div>
      </div>
      <div className='flex justify-center'>
        <Button className="hover:scale-110 transition-transform">
          <Link href='/boards' className='flex font-semibold items-center '>
            Get Started <ChevronRight size={20} />
          </Link>
        </Button>
      </div>
    </main>
  )
}
