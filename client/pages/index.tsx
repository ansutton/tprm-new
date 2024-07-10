import Documents from '@/components/Documents/Documents';
import Chat from '@/components/Chat';

export default function Home() {
    return (
        <main className='container mx-auto w-full flex-col items-center'>
            <h1 className='py-8 text-center text-4xl font-bold italic text-black'>
                TPRM Accelerator
            </h1>
            <Documents />
            <Chat />
        </main>
    );
}
