import type { Config } from 'tailwindcss';

const config: Config = {
    content: ['./index.html', './src/**/*.{js,ts,jsx,tsx,mdx}'],
    darkMode: 'selector',
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

