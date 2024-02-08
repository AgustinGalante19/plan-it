"use client"

import { ClerkProvider } from "@clerk/nextjs"
import { shadesOfPurple } from "@clerk/themes"

function Providers({ children }: { children: React.ReactNode }) {
  return (
    <ClerkProvider
      appearance={{
        baseTheme: shadesOfPurple,
        variables: {
          colorPrimary: "#DFCFFC",
          colorBackground: "#6944E9",
          colorInputText: "#000",
          colorInputBackground: "#fff",
        },
      }}
    >
      {children}
    </ClerkProvider>
  )
}

export default Providers
