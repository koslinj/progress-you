import { ReactElement, createContext, useContext, useState } from "react"

type Colors = 'bg-red-700' | 'bg-blue-700' | 'bg-slate-500' | 'bg-green-700'

const initState = 'bg-slate-500'

const useThemeContext = () => {
    const [color, setColor] = useState<Colors>(initState)

    return {color, setColor}
}

type valueType = ReturnType<typeof useThemeContext>

const ThemeContext = createContext<valueType | null>(null)

type PropsType = {
    children: ReactElement | ReactElement[]
}

export const ThemeProvider = ({children}: PropsType) => {
    return (
        <ThemeContext.Provider value={useThemeContext()}>
            {children}
        </ThemeContext.Provider>
    )
}

export const useTheme = () => {
    const context = useContext(ThemeContext)

    if(context == null){
        throw new Error('There is no provider for ThemeContext')
    }

    return context
}