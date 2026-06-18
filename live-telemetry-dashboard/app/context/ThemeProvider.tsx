"use client"
 
import * as React from "react"
import { ThemeProvider as NextThemesProvider } from "next-themes"
 
export function ThemeProvider({
  children,
  ...props
}: React.ComponentProps<typeof NextThemesProvider>) {
  return <NextThemesProvider {...props} enableColorScheme>
    <div className={'grid grid-cols-[auto_1fr] min-w-full'}>
        {children}
    </div>
</NextThemesProvider>
}