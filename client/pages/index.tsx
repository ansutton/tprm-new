import { useState } from 'react';
import { Chat, Documents, Navbar } from '@/components';

export default function Home(): JSX.Element {
    /**
     * useStates
     */
    const [file, setFile] = useState<File | null>(null);
    const [loading, setLoading] = useState(false);

    /**
     * Helper Functions
     */
    function onFileChange(e: React.ChangeEvent<HTMLInputElement>) {
        if (e.target.files) {
            setFile(e.target.files[0]);
        }
    }
    function onSubmit() {
        setLoading(true);
    }

    return (
        <div className='mx-auto w-full flex-col items-center'>
            <Navbar />

            {!loading ? (
                <div className='container mx-auto pb-5 pt-10'>
                    <div className='shadow-tprm-blue-light/60 mx-auto flex w-full max-w-2xl flex-col gap-6 bg-white p-4 shadow-lg'>
                        <h3 className='bg-tprm-blue-dark shadow-tprm-blue-dark/80 w-full py-3 text-center text-2xl font-bold text-white shadow-md'>
                            GenAI Evidence Reviewer
                        </h3>
                        <p className='bg-tprm-blue-medium shadow-tprm-blue-medium/80 w-full py-2 text-center text-lg font-bold text-white shadow-md'>
                            Blank Question Set
                        </p>
                        <input
                            type='file'
                            id='file'
                            onChange={onFileChange}
                            className='file:border-tprm-blue-dark file:shadow-tprm-blue-dark/80 file:text-tprm-blue-dark hover:file:bg-tprm-blue-dark text-zinc-600 file:mr-4 file:border file:bg-white file:px-4 file:py-1.5 file:font-bold file:shadow-md file:duration-200 hover:file:cursor-pointer hover:file:text-white hover:file:ease-out'
                        />
                        {file ? (
                            <button
                                className='text-tprm-blue-dark hover:bg-tprm-blue-dark border-tprm-blue-dark w-fit border px-4 py-1.5 font-bold hover:text-white'
                                onClick={onSubmit}
                            >
                                Submit
                            </button>
                        ) : null}
                    </div>
                </div>
            ) : (
                <div>Loading</div>
            )}
        </div>
    );
}
