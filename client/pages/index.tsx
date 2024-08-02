import {
    Dispatch,
    ReactNode,
    SetStateAction,
    useEffect,
    useState,
} from 'react';
import {
    ArrowPathIcon,
    ChartBarSquareIcon,
    ChatBubbleBottomCenterTextIcon,
    DocumentTextIcon,
    QuestionMarkCircleIcon,
} from '@heroicons/react/24/outline';
import clsx from 'clsx';
import { Button, Card, Sidebar, Summary, Topbar } from '@/components';
import { helloWorld, poll, submit } from '@/utils/api-utils';
import {
    LlmResponse,
    PollResponse,
    PythonAppState,
    SubmitRequestParams,
} from '@/types/globals';

/**
 * Dev Import Statement
 */
import { emulatePopulateResponses } from '@/utils/api-utils';

export default function Home(): JSX.Element {
    /**
     * State Hooks
     */
    const [screen, setScreen] = useState<'fileUpload' | 'loading' | 'summary'>(
        'fileUpload',
    );
    const [questionsFile, setQuestionsFile] = useState<File | null>(null);
    const [evidenceFile, setEvidenceFile] = useState<File | null>(null);
    const [responsesFile, setResponsesFile] = useState<File | null>(null);
    const [llmResponse, setLlmResponse] = useState<LlmResponse>(null);

    /**
     * Constants Derived from State
     *
     */
    const isQuestionsFileValid: boolean = questionsFile?.type === 'text/csv';
    const isEvidenceFileValid: boolean =
        evidenceFile?.type === 'application/pdf';
    const areAllFilesValid: boolean =
        isQuestionsFileValid && isEvidenceFileValid;

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
    /**
     * Dev-Only Helper Functions
     */
    async function readFileAsText(file: File): Promise<string> {
        return new Promise((resolve) => {
            const fileReader = new FileReader();
            fileReader.onload = () => resolve(fileReader.result as string);
            fileReader.readAsText(file);
        });
    }
    async function onSubmit() {
        if (areAllFilesValid) {
            setScreen('loading');
            // setInterval(() => {
            //     setScreen('loading');
            // }, 5000);
            setInterval(async () => {
                setScreen('summary');
                const pollResponse = await poll();
                console.log(pollResponse);
                pollResponse?.questions
                    ? setScreen('summary')
                    : setScreen('loading');
                setLlmResponse(pollResponse);
            }, 2000);
            emulatePopulateResponses();
        }
        return;
    }
    /**
     * Demo-Only Helper Functions
     */
    // TODO: revisit base64 encoding
    // async function readFileAsDataUrl(file: File): Promise<string> {
    //     return new Promise((resolve) => {
    //         const fileReader = new FileReader();
    //         fileReader.onload = () => resolve(fileReader.result as string);
    //         fileReader.readAsDataURL(file);
    //     });
    // }
    // async function onSubmit() {
    //     if (questionsFile && evidenceFile) {
    //         const csvFileBuffer = await readFileAsDataUrl(questionsFile);
    //         // console.log(csvFileBuffer)
    //         const pdfFileBuffer = await readFileAsDataUrl(evidenceFile);
    //         // console.log(pdfFileBuffer)
    //         setScreen('summary');
    //         submit({ csvFileBuffer, pdfFileBuffer });
    //         setInterval(async () => {
    //             const pollResponse = await poll();
    //             console.log(pollResponse);
    //             setLlmResponse(pollResponse);
    //             // pollResponse?.responses?.length === 0
    //             //     ? setScreen('loading')
    //             //     : setScreen('summary');
    //         }, 5000);
    //     } else {
    //         alert('Please upload all files');
    //     }
    // }

    /**
     * Components
     */
    function IncorrectQuestionsFileMessage(): JSX.Element {
        if (questionsFile && !isQuestionsFileValid) {
            return (
                <p className='text-orange-600 dark:text-orange-500'>
                    Please choose a <b>csv</b> file type before proceeding
                </p>
            );
        } else {
            return <></>;
        }
    }
    function IncorrectEvidenceFileMessage(): JSX.Element {
        if (evidenceFile && !isEvidenceFileValid) {
            return (
                <p className='text-orange-600 dark:text-orange-500'>
                    Please choose a <b>pdf</b> file type before proceeding
                </p>
            );
        } else {
            return <></>;
        }
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
                            <form
                                className='flex flex-col gap-6'
                                onSubmit={onSubmit}
                            >
                                <p>
                                    File type: <b>csv</b>
                                </p>
                                <input
                                    accept='.csv'
                                    className='w-[450px] file:mr-4 file:cursor-pointer'
                                    id='file'
                                    onChange={(e) =>
                                        onFileChange(e, setQuestionsFile)
                                    }
                                    required
                                    type='file'
                                />
                                <IncorrectQuestionsFileMessage />

                                <div className='flex items-center gap-3'>
                                    <ChartBarSquareIcon
                                        className={clsx(
                                            'w-10 stroke-indigo-600 stroke-2',
                                            'dark:stroke-indigo-500',
                                        )}
                                    />
                                    <H4>Third Party Evidence Provided</H4>
                                </div>
                                <p>
                                    File type: <b>pdf</b>
                                </p>
                                <input
                                    accept='.pdf'
                                    className='w-[450px] file:mr-4 file:cursor-pointer'
                                    id='file'
                                    onChange={(e) =>
                                        onFileChange(e, setEvidenceFile)
                                    }
                                    required
                                    type='file'
                                />
                                <IncorrectEvidenceFileMessage />

                                <div className='flex items-center gap-3'>
                                    <ChatBubbleBottomCenterTextIcon
                                        className={clsx(
                                            'w-10 stroke-indigo-600 stroke-2',
                                            'dark:stroke-indigo-500',
                                        )}
                                    />
                                    <H4>Third Party Responses</H4>
                                </div>
                                <p>
                                    File type: <b>xlsx</b>
                                </p>
                                <input
                                    accept='.xlsx'
                                    className='file:mr-4 file:cursor-pointer'
                                    id='file'
                                    onChange={(e) =>
                                        onFileChange(e, setResponsesFile)
                                    }
                                    type='file'
                                />
                                <Button
                                    variant={
                                        areAllFilesValid ? 'solid' : 'disabled'
                                    }
                                >
                                    <input
                                        className={
                                            areAllFilesValid
                                                ? 'hover:cursor-pointer'
                                                : ''
                                        }
                                        readOnly={areAllFilesValid}
                                        type='submit'
                                        value='Submit'
                                    />
                                </Button>
                            </form>
                        </>
                    ) : null}

                    {screen === 'loading' ? (
                        <>
                            <H4 additionalClasses='text-center'>
                                Hang tight. This process can take a while.
                            </H4>
                            <p className='text-center font-medium text-zinc-600 dark:text-zinc-400'>
                                When finished loading, the summary will be
                                displayed on the next screen.
                            </p>
                            <ArrowPathIcon className='stroke-1.5 mx-auto size-14 animate-spin text-indigo-800 dark:text-indigo-500' />
                        </>
                    ) : null}

                    {screen === 'summary' ? (
                        <>
                            <div className='flex items-center gap-3'>
                                <DocumentTextIcon
                                    className={clsx(
                                        'w-10 stroke-indigo-600 stroke-2',
                                        'dark:stroke-indigo-500',
                                    )}
                                />
                                <H4>Neuron RAG-Injested Documents</H4>
                            </div>

                            <Summary llmResponse={llmResponse} />

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
    additionalClasses?: string;
    children: ReactNode;
}

function H3({ children }: HeadingProps): JSX.Element {
    return (
        <h3 className='mb-3 w-full text-center text-3xl font-bold text-indigo-600 dark:text-indigo-500'>
            {children}
        </h3>
    );
}

function H4({ additionalClasses = '', children }: HeadingProps): JSX.Element {
    return (
        <h4 className={`${additionalClasses} w-full text-2xl font-bold`}>
            {children}
        </h4>
    );
}
