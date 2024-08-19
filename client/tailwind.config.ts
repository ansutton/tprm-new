import type { Config } from 'tailwindcss';

const config: Config = {
    content: [
        './app/**/*.{js,ts,jsx,tsx,mdx}',
        './components/**/*.{js,ts,jsx,tsx,mdx}',
        './pages/**/*.{js,ts,jsx,tsx,mdx}',
    ],
    darkMode: 'class',
    theme: {
        container: { center: true, padding: '1rem' },
        extend: {
            colors: {
                'd-green': 'hsl(81, 67%, 44%)',
            },
        },
        fontFamily: { sans: ['"Noto Sans"'] },
    },
    plugins: [],
};
export default config;
