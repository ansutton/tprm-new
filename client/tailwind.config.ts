import type { Config } from 'tailwindcss';

const config: Config = {
    content: [
        './pages/**/*.{js,ts,jsx,tsx,mdx}',
        './components/**/*.{js,ts,jsx,tsx,mdx}',
        './app/**/*.{js,ts,jsx,tsx,mdx}',
    ],
    theme: {
        extend: {
            // backgroundImage: {
            //     'clipboard-pen': 'url("/public/images/clipboard-pen.jpg")', // TODO: fix this path according to https://github.com/tailwindlabs/tailwindcss/discussions/5504
            // },
            colors: {
                'd-green': 'hsl(81, 67%, 44%)',
                'tprm-light-blue': 'hsl(218, 52%, 52%)',
                'tprm-medium-blue': 'hsl(218, 53%, 39%)',
                'tprm-dark-blue': 'hsl(218, 100%, 19%)',
            },
        },
    },
    plugins: [],
};
export default config;
