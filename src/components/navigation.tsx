"use client"

import Button from "./ui/button"
import { LogIn } from "lucide-react"
import { useEffect, useState } from "react"
import { motion } from "framer-motion"
import { cn } from "@/utils/cn"
import Link from "next/link"
import { usePathname, useRouter } from "next/navigation"
import { UserButton, useAuth } from "@clerk/nextjs"

const tabs = [
  { label: "Home", id: 0, path: "/" },
  { label: "Boards", id: 1, path: "/boards" },
]

function Navigation() {
  const [activeTab, setActiveTab] = useState(tabs[0].id)
  const { push } = useRouter()

  const { isSignedIn } = useAuth()
  const pathname = usePathname()

  useEffect(() => {
    tabs.forEach(({ path, id }) => {
      if (path === pathname) setActiveTab(id)
    })
  }, [pathname])

  return (
    <header className='flex container mx-auto max-w-5xl justify-between py-6 items-center'>
      <div className='flex items-center'>
        <Link href='/'>
          <span className='text-2xl font-bold'>
            Plan <span className='text-primary'>It</span>
          </span>
        </Link>
      </div>
      <div className='flex space-x-1'>
        {tabs.map((tab) => (
          <button
            key={tab.id}
            onClick={() => {
              setActiveTab(tab.id)
              push(tab.path)
            }}
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
        {!isSignedIn ? (
          <Button onClick={() => push("/sign-in")}>
            Login
            <LogIn size={16} className='ml-2' />
          </Button>
        ) : (
          <UserButton afterSignOutUrl='/' />
        )}
      </div>
    </header>
  )
}

export default Navigation
