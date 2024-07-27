import type { Config } from 'tailwindcss';

const config: Config = {
    content: [
        './pages/**/*.{js,ts,jsx,tsx,mdx}',
        './components/**/*.{js,ts,jsx,tsx,mdx}',
        './app/**/*.{js,ts,jsx,tsx,mdx}',
    ],
    darkMode: 'class',
    theme: {
        container: { center: true, padding: '1rem' },
        extend: {
            colors: {
                'd-green': 'hsl(81, 67%, 44%)',
                'tprm-blue-light': 'hsl(218,52%,52%)',
                'tprm-blue-medium': 'hsl(218,53%,39%)',
                'tprm-blue-dark': 'hsl(218,100%,19%)',
            },
        },
        fontFamily: { sans: ['"Noto Sans"'] },
    },
    plugins: [],
};
export default config;
