import { Inter } from 'next/font/google';
import Documents from '@/components/Documents';
import Chat from '@/components/Chat';

const inter = Inter({ subsets: ['latin'] });

export default function Home() {
    return (
        <main>
            <Documents />
            <Chat />
        </main>
    );
}
