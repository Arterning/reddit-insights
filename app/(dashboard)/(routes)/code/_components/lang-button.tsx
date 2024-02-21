'use client'

import { Button } from "@/components/ui/button"

interface LangButtonProps {
    language: string
    count: number
}



export const LangButton = ({ language, count }: LangButtonProps) => {

    const handleClick = () => {
        if ("All" === language) {
            window.location.href = `/code`
        } else {
            window.location.href = `/code?language=${language}`
        }
    }
    
    return (
        <Button key={language || "Unknown"} variant="outline"
              onClick={handleClick}>
              {language || "Unknown"} {count}
        </Button>
    )
}