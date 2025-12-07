import { useCallback, useEffect, useState } from "react"

const DisplayWidget: React.FC = () => {
    const [darkMode, setDarkMode] = useState<boolean>()
    const [highContrastMode, setHighContrastMode] = useState<boolean>()
    const [currentTheme, setCurrentTheme] = useState<string>()
    const root = document.documentElement;

    useEffect(() => {
        try {
            const theme = localStorage.getItem("theme")
            setCurrentTheme(theme)
            setDarkMode(theme === "dark")
            setHighContrastMode(theme === "contrast")
        } catch (error) {
            setCurrentTheme("light")
            setDarkMode(false)
            setHighContrastMode(false)
        }
    }, [])

    const toggleDarkMode = useCallback(() => {
        if (currentTheme !== "dark") {
            setCurrentTheme("dark")
            root.setAttribute("data-bs-theme", "dark");
            setDarkMode(true)
            localStorage.setItem("theme", "dark")
        }
        else {
            setCurrentTheme("light")
            root.setAttribute("data-bs-theme", "light");
            setDarkMode(false)
            localStorage.setItem("theme", "light")
        }
    }, [currentTheme])

    const toggleHighContrast = useCallback(() => {
        if (currentTheme !== "contrast") {
            setCurrentTheme("contrast")
            root.setAttribute("data-bs-theme", "contrast")
            setHighContrastMode(true)
            localStorage.setItem("theme", "contrast")
        }
        else {
            setCurrentTheme("light")
            root.setAttribute("data-bs-theme", "light");
            setHighContrastMode(false)
            localStorage.setItem("theme", "light")
        }
    }, [currentTheme])

    return (
        <div className="d-flex flex-column justify-content-center align-items-center gap-4">
            <div className="d-flex justify-content-between">
                <div className="form-check form-switch">
                    <div className=" d-flex align-items-center gap-3">
                        <input className="form-check-input" type="checkbox" role="switch" id="darkModeInput"
                            onChange={toggleDarkMode}
                            checked={darkMode}
                            disabled={currentTheme === "contrast"}
                        />
                        <label className="form-check-label" htmlFor="darkModeInput" >Dark Mode</label>
                    </div>
                    <div className=" d-flex align-items-center gap-3 mt-3">
                        <input className="form-check-input" type="checkbox" role="switch" id="highContrastInput"
                            onChange={toggleHighContrast}
                            checked={highContrastMode}
                            disabled={currentTheme === "dark"}
                        />
                        <label className="form-check-label" htmlFor="darkModeInput">High contrast Mode</label>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default DisplayWidget