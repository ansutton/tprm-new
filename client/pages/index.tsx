import { Chat, Documents, FileUpload } from '@/components';

export default function Home() {
    return (
        <div className='container mx-auto w-full flex-col items-center'>
            <h1 className='py-8 text-center text-4xl font-bold italic text-black'>
                TPRM Accelerator
            </h1>
            <FileUpload />
            <Documents />
            <Chat />
        </div>
    );
}
