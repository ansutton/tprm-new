import { createContext, ReactNode, useState } from 'react';
import { Theme } from '@/types';

interface ThemeContextProps {
    theme: Theme;
    setTheme: React.Dispatch<React.SetStateAction<Theme>>;
}

export const ThemeContext = createContext<ThemeContextProps>({
    theme: 'dark',
} as ThemeContextProps);

interface ThemeProviderProps {
    children: ReactNode;
}

export function ThemeProvider({ children }: ThemeProviderProps): JSX.Element {
    const [theme, setTheme] = useState<Theme>('dark');

    return (
        <ThemeContext.Provider value={{ theme, setTheme }}>
            {children}
        </ThemeContext.Provider>
    );
}
