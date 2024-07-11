import { Chat, Documents, FileUpload, Navbar } from '@/components';

export default function Home() {
    return (
        <div className='mx-auto w-full flex-col items-center'>
            <Navbar />
            <div className='container'>
                <FileUpload />
                <Documents />
                <Chat />
            </div>
        </div>
    );
}
