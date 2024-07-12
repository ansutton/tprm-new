import { useState } from 'react';
import { Chat, Documents, Navbar } from '@/components';

export default function Home(): JSX.Element {
    /**
     * useStates
     */
    const [screen, setScreen] = useState<'fileUpload' | 'loading' | 'summary'>(
        'fileUpload',
    );
    const [file, setFile] = useState<File | null>(null);

    /**
     * Helper Functions
     */
    function onFileChange(e: React.ChangeEvent<HTMLInputElement>) {
        if (e.target.files) {
            setFile(e.target.files[0]);
        }
    }

    return (
        <div className='mx-auto w-full flex-col items-center'>
            <Navbar />

            <div className='container mx-auto pb-5 pt-10'>
                {screen === 'fileUpload' ? (
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
                                className='text-tprm-blue-dark hover:bg-tprm-blue-dark border-tprm-blue-dark mx-auto w-fit border px-4 py-1.5 font-bold shadow-md hover:text-white'
                                onClick={() => setScreen('loading')}
                            >
                                Submit
                            </button>
                        ) : null}
                    </div>
                ) : null}

                {screen === 'loading' ? (
                    <div className='shadow-tprm-blue-light/60 mx-auto flex w-full max-w-2xl flex-col gap-6 bg-white p-4 shadow-lg'>
                        <h3 className='bg-tprm-blue-dark shadow-tprm-blue-dark/80 w-full py-3 text-center text-2xl font-bold text-white shadow-md'>
                            Processing File
                        </h3>
                        <p className='bg-tprm-blue-medium shadow-tprm-blue-medium/80 w-full py-2 text-center text-lg font-bold text-white shadow-md'>
                            Hang tight. This process can take up to 10 minutes.
                        </p>
                        <p className='text-center font-medium text-zinc-600'>
                            When finished loading, the summary will be displayed
                            on the next screen.
                        </p>
                        <svg
                            xmlns='http://www.w3.org/2000/svg'
                            fill='none'
                            viewBox='0 0 24 24'
                            strokeWidth={1.5}
                            stroke='currentColor'
                            className='text-tprm-blue-dark mx-auto size-14 animate-spin'
                        >
                            <path
                                strokeLinecap='round'
                                strokeLinejoin='round'
                                d='M16.023 9.348h4.992v-.001M2.985 19.644v-4.992m0 0h4.992m-4.993 0 3.181 3.183a8.25 8.25 0 0 0 13.803-3.7M4.031 9.865a8.25 8.25 0 0 1 13.803-3.7l3.181 3.182m0-4.991v4.99'
                            />
                        </svg>
                        <button
                            className='text-tprm-blue-dark hover:bg-tprm-blue-dark border-tprm-blue-dark mx-auto w-fit border px-4 py-1.5 font-bold shadow-md hover:text-white'
                            onClick={() => setScreen('summary')}
                        >
                            See Summary
                        </button>
                    </div>
                ) : null}

                {screen === 'summary' ? (
                    <div className='shadow-tprm-blue-light/60 mx-auto flex w-full max-w-2xl flex-col gap-6 bg-white p-4 shadow-lg'>
                        <h3 className='bg-tprm-blue-dark shadow-tprm-blue-dark/80 w-full py-3 text-center text-2xl font-bold text-white shadow-md'>
                            Summary
                        </h3>
                        <p className='bg-tprm-blue-medium shadow-tprm-blue-medium/80 w-full py-2 text-center text-lg font-bold text-white shadow-md'>
                            Neuron RAG-Injested Documents
                        </p>
                        <Documents />
                        <button
                            className='text-tprm-blue-dark hover:bg-tprm-blue-dark border-tprm-blue-dark mx-auto flex w-fit items-center justify-center gap-1.5 border px-4 py-1.5 font-bold shadow-md hover:text-white'
                            onClick={() => setScreen('fileUpload')}
                        >
                            <svg
                                xmlns='http://www.w3.org/2000/svg'
                                fill='none'
                                viewBox='0 0 24 24'
                                strokeWidth={2.5}
                                stroke='currentColor'
                                className='size-4'
                            >
                                <path
                                    strokeLinecap='round'
                                    strokeLinejoin='round'
                                    d='M15.75 19.5 8.25 12l7.5-7.5'
                                />
                            </svg>
                            <span>Back to File Upload</span>
                        </button>
                    </div>
                ) : null}
            </div>
        </div>
    );
}
