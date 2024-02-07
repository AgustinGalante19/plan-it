"use client"

import { Moon, Sun } from "lucide-react"
import { useEffect, useState } from "react"
import { motion } from "framer-motion"

function ThemeSwitcher() {
  const [currentTheme, setCurrentTheme] = useState<"dark" | "light">(
    window.matchMedia("(prefers-color-scheme: dark)").matches ? "dark" : "light"
  )

  useEffect(() => {
    const configTheme = () => {
      if (
        localStorage.theme === "dark" ||
        (!("theme" in localStorage) &&
          window.matchMedia("(prefers-color-scheme: dark)").matches)
      ) {
        document.documentElement.classList.add("dark")
      } else {
        document.documentElement.classList.remove("dark")
      }

      /*       localStorage.theme = "light"

      localStorage.theme = "dark"

      localStorage.removeItem("theme") */
    }
    configTheme()
  }, [])

  return (
    <motion.button
      className='absoulte z-10 p-3 rounded-full flex justify-center items-center w-12 bg-primary bottom-0 right-0 m-2'
      type='button'
      whileTap={{
        rotateY: 50,
      }}
      onClick={() => {
        document.documentElement.classList.toggle("dark")
        if (currentTheme === "dark") {
          setCurrentTheme("light")
        } else {
          setCurrentTheme("dark")
        }
      }}
    >
      {currentTheme === "dark" ? <Moon color='white' /> : <Sun color='white' />}
    </motion.button>
  )
}

export default ThemeSwitcher
