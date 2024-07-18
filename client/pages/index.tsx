import { Dispatch, SetStateAction, useState } from 'react';
import { Button, Card, Sidebar, Summary, Topbar } from '@/components';

export default function Home(): JSX.Element {
    /**
     * State Hooks
     */
    const [screen, setScreen] = useState<'fileUpload' | 'loading' | 'summary'>(
        'fileUpload',
    );
    const [questionsFile, setQuestionsFile] = useState<File | null>(null);
    const [responsesFile, setResponsesFile] = useState<File | null>(null);
    const [evidenceFile, setEvidenceFile] = useState<File | null>(null);

    /**
     * Helper Functions
     */
    function onFileChange(
        e: React.ChangeEvent<HTMLInputElement>,
        setState: Dispatch<SetStateAction<File | null>>,
    ) {
        if (e.target.files) {
            setState(e.target.files[0]);
        }
    }

    return (
        <div className='mx-auto w-full flex-col items-center'>
            <Topbar />
            <Sidebar />

            <div className='container mx-auto pb-5 pt-10'>
                <Card variant={screen === 'summary' ? 'wide' : 'default'}>
                    {screen === 'fileUpload' ? (
                        <>
                            <h3 className='w-full bg-tprm-blue-dark py-3 text-center text-2xl font-bold text-white shadow-md shadow-tprm-blue-dark/80'>
                                GenAI Evidence Reviewer
                            </h3>
                            <h4 className='w-full bg-tprm-blue-medium py-2 text-center text-lg font-bold text-white shadow-md shadow-tprm-blue-medium/80'>
                                Blank Question Set
                            </h4>
                            <input
                                type='file'
                                id='file'
                                onChange={(e) =>
                                    onFileChange(e, setQuestionsFile)
                                }
                                className='text-zinc-600 file:mr-4 file:border-none file:bg-white file:px-4 file:py-1.5 file:font-bold file:text-tprm-blue-dark file:duration-200 hover:file:cursor-pointer hover:file:bg-tprm-blue-dark hover:file:text-white hover:file:ease-out'
                            />

                            <h4 className='w-full bg-tprm-blue-medium py-2 text-center text-lg font-bold text-white shadow-md shadow-tprm-blue-medium/80'>
                                Third Party Responses
                            </h4>
                            <input
                                type='file'
                                id='file'
                                onChange={(e) =>
                                    onFileChange(e, setResponsesFile)
                                }
                                className='text-zinc-600 file:mr-4 file:border-none file:bg-white file:px-4 file:py-1.5 file:font-bold file:text-tprm-blue-dark file:duration-200 hover:file:cursor-pointer hover:file:bg-tprm-blue-dark hover:file:text-white hover:file:ease-out'
                            />

                            <h4 className='w-full bg-tprm-blue-medium py-2 text-center text-lg font-bold text-white shadow-md shadow-tprm-blue-medium/80'>
                                Third Party Evidence Provided
                            </h4>
                            <input
                                type='file'
                                id='file'
                                onChange={(e) =>
                                    onFileChange(e, setEvidenceFile)
                                }
                                className='text-zinc-600 file:mr-4 file:border-none file:bg-white file:px-4 file:py-1.5 file:font-bold file:text-tprm-blue-dark file:duration-200 hover:file:cursor-pointer hover:file:bg-tprm-blue-dark hover:file:text-white hover:file:ease-out'
                            />

                            <Button
                                variant='outlined'
                                onClick={() => setScreen('loading')}
                            >
                                Submit
                            </Button>
                        </>
                    ) : null}

                    {screen === 'loading' ? (
                        <>
                            <h3 className='w-full bg-tprm-blue-dark py-3 text-center text-2xl font-bold text-white shadow-md shadow-tprm-blue-dark/80'>
                                Processing File
                            </h3>
                            <h4 className='w-full bg-tprm-blue-medium py-2 text-center text-lg font-bold text-white shadow-md shadow-tprm-blue-medium/80'>
                                Hang tight. This process can take up to 10
                                minutes.
                            </h4>
                            <p className='text-center font-medium text-zinc-600'>
                                When finished loading, the summary will be
                                displayed on the next screen.
                            </p>
                            <svg
                                xmlns='http://www.w3.org/2000/svg'
                                fill='none'
                                viewBox='0 0 24 24'
                                strokeWidth={1.5}
                                stroke='currentColor'
                                className='mx-auto size-14 animate-spin text-tprm-blue-dark'
                            >
                                <path
                                    strokeLinecap='round'
                                    strokeLinejoin='round'
                                    d='M16.023 9.348h4.992v-.001M2.985 19.644v-4.992m0 0h4.992m-4.993 0 3.181 3.183a8.25 8.25 0 0 0 13.803-3.7M4.031 9.865a8.25 8.25 0 0 1 13.803-3.7l3.181 3.182m0-4.991v4.99'
                                />
                            </svg>
                            <Button
                                variant='outlined'
                                onClick={() => setScreen('summary')}
                            >
                                See Summary
                            </Button>
                        </>
                    ) : null}

                    {screen === 'summary' ? (
                        <>
                            <h3 className='w-full bg-tprm-blue-dark py-3 text-center text-2xl font-bold text-white shadow-md shadow-tprm-blue-dark/80'>
                                Summary
                            </h3>
                            <h4 className='w-full bg-tprm-blue-medium py-2 text-center text-lg font-bold text-white shadow-md shadow-tprm-blue-medium/80'>
                                Neuron RAG-Injested Documents
                            </h4>
                            <Summary />
                            <Button
                                variant='outlined'
                                onClick={() => setScreen('fileUpload')}
                            >
                                Back to File Upload
                            </Button>
                        </>
                    ) : null}
                </Card>
            </div>
        </div>
    );
}
