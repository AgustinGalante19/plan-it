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
        },
      }}
    >
      {children}
    </ClerkProvider>
  )
}

export default Providers
