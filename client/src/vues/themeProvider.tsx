import { useEffect } from "react"

const ThemeProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
    useEffect(() => {
        const theme = localStorage.getItem("theme")
        document.documentElement.setAttribute("data-bs-theme", theme)
      }, [])

    return children;
}

export default ThemeProvider;