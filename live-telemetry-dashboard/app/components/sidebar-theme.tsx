'use client';

import { Select, SelectContent, SelectGroup, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { ThemeType, useTheme } from "../context/ThemeProvider";

const themeSelect = [
  { label: "Light", value: "light" },
  { label: "Dark", value: "dark" },
]

export default function SidebarThemeSelect () {

    const { setTheme } = useTheme();

    function handleThemeChange (value: ThemeType) {
        setTheme(value);
    }

    return <Select onValueChange={handleThemeChange}>
      <SelectTrigger className="w-45">
        <SelectValue placeholder="Theme" />
      </SelectTrigger>
      <SelectContent>
        <SelectGroup>
          {themeSelect.map((item) => (
            <SelectItem key={item.value} value={item.value}>
              {item.label}
            </SelectItem>
          ))}
        </SelectGroup>
      </SelectContent>
    </Select>
}