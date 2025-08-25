import { useCallback, useEffect, useState } from "react"

const DisplayWidget: React.FC = () => {
    const [darkMode, setDarkMode] = useState<boolean>()
    const [highContrastMode, setHighContrastMode] = useState<boolean>()
    const root = document.documentElement;

    useEffect(() => {
        setDarkMode(root.getAttribute("data-bs-theme") === "dark" ? true : false)
        setHighContrastMode(root.getAttribute("data-bs-theme") === "contrast" ? true : false)
    }, [])

    const toggleDarkMode = useCallback(() => {
        const currentTheme = root.getAttribute("data-bs-theme");
        root.setAttribute("data-bs-theme", currentTheme === "light" ? "dark" : "light");
        setDarkMode(oldValue => !oldValue)
    }, [])

    const toggleHighContrast = useCallback(() => {
        root.setAttribute("data-bs-theme",
            root.getAttribute("data-bs-theme") === "contrast" ? "light" : "contrast"
        );
        setHighContrastMode(oldValue => !oldValue)
    }, [])

    return (
        <>
            <div className="d-flex flex-column justify-content-center align-items-center gap-4">
                <div className="d-flex justify-content-between">
                    <div className="form-check form-switch">
                        <div className=" d-flex align-items-center gap-3">
                            <input className="form-check-input" type="checkbox" role="switch" id="darkModeInput" onChange={toggleDarkMode} checked={darkMode} />
                            <label className="form-check-label" htmlFor="darkModeInput" >Dark Mode</label>
                        </div>
                        <div className=" d-flex align-items-center gap-3 mt-3">
                            <input className="form-check-input" type="checkbox" role="switch" id="darkModeInput" onChange={toggleHighContrast} checked={highContrastMode} />
                            <label className="form-check-label" htmlFor="darkModeInput">High contrast Mode</label>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

export default DisplayWidget