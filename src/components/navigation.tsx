"use client"

import Image from "next/image"
import blueprint from "@/assets/blueprint.png"
import Button from "./ui/button"
import { LogIn } from "lucide-react"
import { useState } from "react"
import { motion } from "framer-motion"
import { cn } from "@/utils/cn"

const tabs = [
  { label: "Home", id: 0 },
  { label: "Boards", id: 1 },
]

function Navigation() {
  const [activeTab, setActiveTab] = useState(tabs[0].id)

  return (
    <header className='flex container mx-auto max-w-5xl justify-between py-6 items-center'>
      <div className='flex items-center'>
        <Image width={30} height={30} alt='blueprint' src={blueprint} />
        <span className='text-2xl font-bold'>
          Plan-<span className='text-primary'>It</span>
        </span>
      </div>
      <div className='flex space-x-1'>
        {tabs.map((tab) => (
          <button
            key={tab.id}
            onClick={() => setActiveTab(tab.id)}
            className={cn(
              activeTab === tab.id ? "text-white" : "text-primary",
              "relative rounded-full px-4 py-2 font-bold outline-2 outline-sky-400 focus-visible:outline transition-colors"
            )}
          >
            {activeTab === tab.id && (
              <motion.div
                layoutId='active-pill'
                className='absolute inset-0 rounded-full bg-primary'
                transition={{ duration: 0.2 }}
              />
            )}
            <span className='relative'>{tab.label}</span>
          </button>
        ))}
      </div>
      <div>
        <Button>
          <LogIn size={16} /> Login
        </Button>
      </div>
    </header>
  )
}

export default Navigation
