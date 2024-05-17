import { createContext, useContext, useState } from 'react'

export const ThemeMode = createContext()

export const useThemeMode = () => {
    return useContext(ThemeMode)
}

export const ThemeModeProvider = ({ children }) => {
    const [themeMode, setThemeMode] = useState('light')
    const toggleThemeMode = () => {
        setThemeMode((prev) => (prev === 'light' ? 'dark-experimental' : 'light'))
    }

    return (
        <ThemeMode.Provider
            value={{
                themeMode,
                toggleThemeMode,
            }}
        >
            {children}
        </ThemeMode.Provider>
    )
}
