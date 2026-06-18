// 'use client';

// import { Select, SelectContent, SelectGroup, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
// import { ThemeType, useTheme } from "../context/ThemeProvider";

// const themeSelect = [
//   { label: "Light", value: "light" },
//   { label: "Dark", value: "dark" },
// ]

// export default function SidebarThemeSelect () {

//     const { setTheme } = useTheme();

//     function handleThemeChange (value: ThemeType) {
//         setTheme(value);
//     }

//     return <Select onValueChange={handleThemeChange}>
//       <SelectTrigger className="w-45">
//         <SelectValue placeholder="Theme" />
//       </SelectTrigger>
//       <SelectContent>
//         <SelectGroup>
//           {themeSelect.map((item) => (
//             <SelectItem key={item.value} value={item.value}>
//               {item.label}
//             </SelectItem>
//           ))}
//         </SelectGroup>
//       </SelectContent>
//     </Select>
// }

"use client"

import { Moon, Sun } from "lucide-react"
import { useTheme } from "next-themes"

import { Button } from "@/components/ui/button"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"

export function ThemeToggle() {
  const { setTheme } = useTheme()

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="outline" size="icon">
          <Sun className="h-[1.2rem] w-[1.2rem] scale-100 rotate-0 transition-all dark:scale-0 dark:-rotate-90" />
          <Moon className="absolute h-[1.2rem] w-[1.2rem] scale-0 rotate-90 transition-all dark:scale-100 dark:rotate-0" />
          <span className="sr-only">Toggle theme</span>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end">
        <DropdownMenuItem onClick={() => setTheme("light")}>
          Light
        </DropdownMenuItem>
        <DropdownMenuItem onClick={() => setTheme("dark")}>
          Dark
        </DropdownMenuItem>
        <DropdownMenuItem onClick={() => setTheme("system")}>
          System
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  )
}
