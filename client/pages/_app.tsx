import type { AppProps } from 'next/app';
import Head from 'next/head';
import { ThemeProvider } from 'next-themes';
import { Layout } from '@/components';
import '@/styles/globals.css';

export default function App({ Component, pageProps }: AppProps) {
    return (
        <>
            <Head>
                <title>Neuron | Accelerate.AI</title>
                <meta
                    name='description'
                    content='A Deloitte Third-Party Risk Management application'
                />
                <link rel='icon' href='/images/favicon.png' />
            </Head>

            <ThemeProvider>
                <Layout>
                    <Component {...pageProps} />
                </Layout>
            </ThemeProvider>
        </>
    );
}
