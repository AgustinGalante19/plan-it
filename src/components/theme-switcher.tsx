'use client';

import { Moon, Sun } from 'lucide-react';
import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';

function ThemeSwitcher() {
  const [currentTheme, setCurrentTheme] = useState<'dark' | 'light'>('light');

  useEffect(() => {
    const configTheme = () => {
      if (
        globalThis.localStorage.getItem('theme') === 'dark' ||
        (!('theme' in localStorage) &&
          window.matchMedia('(prefers-color-scheme: dark)').matches)
      ) {
        document.documentElement.classList.add('dark');
        globalThis.localStorage.setItem('theme', 'dark');
        setCurrentTheme('dark');
      } else {
        document.documentElement.classList.remove('dark');
        globalThis.localStorage.setItem('theme', 'light');
        setCurrentTheme('light');
      }
    };
    configTheme();
  }, []);

  return (
    <div className='absolute flex items-end bottom-0'>
      <motion.button
        className='p-3 rounded-full flex justify-center items-center w-12 bg-primary m-2'
        type='button'
        whileTap={{
          rotateY: 50,
        }}
        onClick={() => {
          document.documentElement.classList.toggle('dark');
          if (currentTheme === 'dark') {
            setCurrentTheme('light');
            globalThis.localStorage.setItem('theme', 'light');
          } else {
            setCurrentTheme('dark');
            globalThis.localStorage.setItem('theme', 'dark');
          }
        }}
      >
        {currentTheme === 'dark' ? (
          <Moon color='white' />
        ) : (
          <Sun color='white' />
        )}
      </motion.button>
    </div>
  );
}

export default ThemeSwitcher;
