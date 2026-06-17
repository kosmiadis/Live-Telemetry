'use client';
import { createContext, Dispatch, ReactNode, SetStateAction, useContext, useState } from "react";
import { twMerge } from "tailwind-merge";

export type ThemeType = 'light' | 'dark';

interface ThemeI {
    theme: ThemeType;
    setTheme: Dispatch<SetStateAction<ThemeType>>;
}

const ThemeCtx = createContext<ThemeI>({
    theme: 'light',
    setTheme: () => {},
})

export default function ThemeProvider ({ children }: { children: ReactNode }) {
    const [theme, setTheme] = useState<ThemeType>('light');

    return <ThemeCtx.Provider value={{ theme, setTheme }}>
        <div className={twMerge(theme, 'grid grid-cols-[auto_1fr] min-w-full')}>
            {children}
        </div>
    </ThemeCtx.Provider>
}

export const useTheme = () => {
    const context = useContext(ThemeCtx);
    //check if application is wrapper with ThemeProvider, throw error if not
    if (!context) throw new Error('useTheme hook must be used withing a ThemeProvider');

    return { ...context };
}