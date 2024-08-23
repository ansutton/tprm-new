import type { AppProps } from 'next/app';
import Head from 'next/head';
import { ThemeProvider } from 'next-themes';
import { PrimeReactProvider } from 'primereact/api';
import Tailwind from 'primereact/passthrough/tailwind';
import { twMerge } from 'tailwind-merge';
import { Layout } from '@/components';
import '@/styles/globals.css';

export default function App({ Component, pageProps }: AppProps) {
    return (
        <>
            <Head>
                <title>TPRM Accelerator | Accelerate.AI</title>
                <meta
                    name='description'
                    content='A Deloitte Third-Party Risk Management application'
                />
                <link rel='icon' href='/images/favicon.png' />
            </Head>

            {/* <PrimeReactProvider value={{ unstyled: true, pt: Tailwind }}> */}
            <PrimeReactProvider
                value={{
                    unstyled: true,
                    ptOptions: {
                        mergeSections: true,
                        mergeProps: true,
                        classNameMergeFunction: twMerge,
                    },
                }}
            >
                <ThemeProvider attribute='class'>
                    <Layout>
                        <Component {...pageProps} />
                    </Layout>
                </ThemeProvider>
            </PrimeReactProvider>
        </>
    );
}
