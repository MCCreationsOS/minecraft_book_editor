"use client"
import { Switch } from "./switch"
import { useTheme } from "next-themes"
import { Sun, Moon } from "lucide-react"
export default function DarkModeSwitch() {
    const { theme, setTheme } = useTheme()
    return (
        <div className="flex items-center gap-2">
            <Sun/> <Switch checked={theme === "dark"} onCheckedChange={() => setTheme(theme === "dark" ? "light" : "dark")} /> <Moon/>
        </div>
    )
}


