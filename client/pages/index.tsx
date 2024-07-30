import { Dispatch, ReactNode, SetStateAction, useState } from 'react';
import {
    ChartBarSquareIcon,
    ChatBubbleBottomCenterTextIcon,
    QuestionMarkCircleIcon,
} from '@heroicons/react/24/outline';
import clsx from 'clsx';
import { Button, Card, Sidebar, Summary, Topbar } from '@/components';
import { helloWorld, poll, submit } from '@/utils/api-utils';

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
    async function onFileChange(
        e: React.ChangeEvent<HTMLInputElement>,
        setState: Dispatch<SetStateAction<File | null>>,
    ) {
        if (e.target.files) {
            setState(e.target.files[0]);
        }
    }

    // Need to use base64 encoding instead of this? Or this is sufficient... since it is base64
    async function readFileAsDataUrl(file: File): Promise<string> {
        let result_buffer: string | ArrayBuffer | null = await new Promise(
            (resolve) => {
                let fileReader = new FileReader();
                fileReader.onload = (e) => resolve(fileReader.result);
                fileReader.readAsDataURL(file);
            },
        );

        return result_buffer as string;
    }

    async function onSubmit() {
        if (questionsFile && evidenceFile) {
            const csvFileBuffer = await readFileAsDataUrl(questionsFile);
            // console.log(csvFileBuffer)

            const pdfFileBuffer = await readFileAsDataUrl(evidenceFile);
            // console.log(pdfFileBuffer)

            setScreen('loading')
            submit({ csvFileBuffer, pdfFileBuffer })
        } else {
            alert('Please upload all files');
        }

        setInterval(async () => {
            console.log(await poll())
        }, 10000);
    }

    return (
        <div className='mx-auto w-full dark:text-zinc-50'>
            <Topbar />

            {/* <Sidebar /> */}

            {screen === 'fileUpload' ? <H3>AI Evidence Reviewer</H3> : null}
            {screen === 'loading' ? <H3>Processing File</H3> : null}
            {screen === 'summary' ? <H3>Summary</H3> : null}

            <div className='container mx-auto pb-5 pt-5'>
                <Card variant={screen === 'summary' ? 'wide' : 'default'}>
                    {screen === 'fileUpload' ? (
                        <>
                            <div className='flex items-center gap-3'>
                                <QuestionMarkCircleIcon
                                    className={clsx(
                                        'w-10 stroke-indigo-600 stroke-2',
                                        'dark:stroke-indigo-500',
                                    )}
                                />
                                <H4>Blank Question Set</H4>
                            </div>
                            <input
                                type='file'
                                id='file'
                                accept='.csv'
                                onChange={(e) =>
                                    onFileChange(e, setQuestionsFile)
                                }
                                className='file:mr-4 file:cursor-pointer'
                            />

                            <div className='flex items-center gap-3'>
                                <ChartBarSquareIcon
                                    className={clsx(
                                        'w-10 stroke-indigo-600 stroke-2',
                                        'dark:stroke-indigo-500',
                                    )}
                                />
                                <H4>Third Party Evidence Provided</H4>
                            </div>
                            <input
                                type='file'
                                id='file'
                                accept='.pdf'
                                onChange={(e) =>
                                    onFileChange(e, setEvidenceFile)
                                }
                                className='file:mr-4 file:cursor-pointer'
                            />

                            <div className='flex items-center gap-3'>
                                <ChatBubbleBottomCenterTextIcon
                                    className={clsx(
                                        'w-10 stroke-indigo-600 stroke-2',
                                        'dark:stroke-indigo-500',
                                    )}
                                />
                                <H4>Third Party Responses</H4>
                            </div>
                            <input
                                type='file'
                                id='file'
                                accept='.xlsx'
                                onChange={(e) =>
                                    onFileChange(e, setResponsesFile)
                                }
                                className='file:mr-4 file:cursor-pointer'
                            />

                            <Button variant='solid' onClick={() => onSubmit()}>
                                Submit
                            </Button>
                        </>
                    ) : null}

                    {screen === 'loading' ? (
                        <>
                            <H4>
                                Hang tight. This process can take up to 10
                                minutes.
                            </H4>
                            <p className='text-center font-medium text-zinc-600 dark:text-zinc-400'>
                                When finished loading, the summary will be
                                displayed on the next screen.
                            </p>
                            <svg
                                xmlns='http://www.w3.org/2000/svg'
                                fill='none'
                                viewBox='0 0 24 24'
                                strokeWidth={1.5}
                                stroke='currentColor'
                                className='mx-auto size-14 animate-spin text-indigo-800 dark:text-indigo-500'
                            >
                                <path
                                    strokeLinecap='round'
                                    strokeLinejoin='round'
                                    d='M16.023 9.348h4.992v-.001M2.985 19.644v-4.992m0 0h4.992m-4.993 0 3.181 3.183a8.25 8.25 0 0 0 13.803-3.7M4.031 9.865a8.25 8.25 0 0 1 13.803-3.7l3.181 3.182m0-4.991v4.99'
                                />
                            </svg>

                            <Button
                                variant='solid'
                                onClick={() => setScreen('summary')}
                            >
                                See Summary
                            </Button>
                        </>
                    ) : null}

                    {screen === 'summary' ? (
                        <>
                            <H4>Neuron RAG-Injested Documents</H4>

                            <Summary />

                            <Button
                                variant='solid'
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

interface HeadingProps {
    children: ReactNode;
}

function H3({ children }: HeadingProps): JSX.Element {
    return (
        <h3 className='mb-3 w-full text-center text-3xl font-bold text-indigo-600 dark:text-indigo-500'>
            {children}
        </h3>
    );
}

function H4({ children }: HeadingProps): JSX.Element {
    return <h4 className='w-full text-2xl font-bold'>{children}</h4>;
}

interface HeadingsProps {
    h3Text: string;
    h4Text: string;
}

function Headings({ h3Text, h4Text }: HeadingsProps): JSX.Element {
    return (
        <div>
            <H3>{h3Text}</H3>
            <H4>{h4Text}</H4>
        </div>
    );
}
