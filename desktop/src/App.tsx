import { Dispatch, SetStateAction, useState } from 'react';
import {
    ArrowPathIcon,
    ChartBarSquareIcon,
    ChatBubbleBottomCenterTextIcon,
    QuestionMarkCircleIcon,
} from '@heroicons/react/24/outline';
import clsx from 'clsx';
import * as XLSX from 'xlsx';
import {
    DetailedAnalysis,
    Overview,
    Button,
    Card,
    Heading,
    Sidebar,
    Topbar,
} from '@/components';
import {
    countResponsesAlign,
    handleSampleData,
    poll,
    submit,
    tw,
} from '@/utils';
import { Mode, Screen } from '@/types';

/**
 * Configuration and Constants
 */
// dotenv.config();
// const mode = process.env...;
// const mode: Mode = 'llm';

export default function Home(): JSX.Element {
    /**
     * State Hooks
     */
    const [screen, setScreen] = useState<Screen>('fileUpload');
    const [isSidebarExpanded, setIsSidebarExpanded] = useState<boolean>(true);
    const [isSidebarFullyExpanded, setIsSidebarFullyExpanded] =
        useState<boolean>(true);
    const [questionsFile, setQuestionsFile] = useState<File | null>(null);
    const [evidenceFile, setEvidenceFile] = useState<File | null>(null);
    const [responsesFile, setResponsesFile] = useState<File | null>(null);
    const [llmResponse, setLlmResponse] = useState<any>(null);
    const [excelData, setExcelData] = useState<any[][]>([]);
    const [questionsData, setQuestionsData] = useState<string[]>([]);
    const [mode, setMode] = useState<Mode>('llm');
    const [appLevelTableData, setAppLevelTableData] = useState<any[]>([]); // TODO: refactor to global state (currently prop drilling)

    /**
     * Helper Functions
     */
    function handleResetApp(): void {
        if (
            confirm(
                'Are you sure? This action will end the current process and start from the beginning.',
            )
        ) {
            setScreen('fileUpload');
            setQuestionsFile(null);
            setEvidenceFile(null);
            setResponsesFile(null);
            setLlmResponse(null);
            setExcelData([]);
            setQuestionsData([]);
            setAppLevelTableData([]);
        } else {
            return;
        }
    }

    const isFileValid = (file: File | null, fileType: string): file is File =>
        file !== null && file?.type === fileType;
    const isQuestionsFileValid = isFileValid(questionsFile, 'text/csv');
    const isEvidenceFileValid = isFileValid(evidenceFile, 'application/pdf');
    const isResponsesFileValid = isFileValid(
        responsesFile,
        'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
    );
    const areAllFilesValid: boolean =
        isQuestionsFileValid && isEvidenceFileValid && isResponsesFileValid;
    function onFileChange(
        e: React.ChangeEvent<HTMLInputElement>,
        setState: Dispatch<SetStateAction<File | null>>,
    ) {
        if (e.target.files) {
            setState(e.target.files[0]);
        }
    }
    async function parseExcelFile(file: File): Promise<any[][]> {
        return new Promise((resolve, reject) => {
            const reader = new FileReader();
            reader.onload = (e) => {
                const arrayBuffer = e.target?.result;
                if (arrayBuffer) {
                    const workbook = XLSX.read(arrayBuffer, { type: 'array' });
                    const sheetName = workbook.SheetNames[0];
                    const worksheet = workbook.Sheets[sheetName];
                    const jsonData = XLSX.utils.sheet_to_json(worksheet, {
                        header: 1,
                    });
                    resolve(jsonData as any[][]);
                } else {
                    reject('Error reading file');
                }
            };
            reader.readAsArrayBuffer(file);
        });
    }
    async function readFileAsText(file: File): Promise<string> {
        return new Promise((resolve) => {
            const fileReader = new FileReader();
            fileReader.onload = () => resolve(fileReader.result as string);
            fileReader.readAsText(file);
        });
    }
    // TODO: revisit base64 encoding; revisit file passing from front end to back end
    async function readFileAsDataUrl(file: File): Promise<string> {
        return new Promise((resolve) => {
            const fileReader = new FileReader();
            fileReader.onload = () => resolve(fileReader.result as string);
            fileReader.readAsDataURL(file);
        });
    }
    async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
        e.preventDefault();
        if (questionsFile && evidenceFile && responsesFile) {
            const parsedExcelFile = await parseExcelFile(responsesFile);
            setExcelData(parsedExcelFile);
            const csvTextFile = await readFileAsText(questionsFile);
            const questionsArray = csvTextFile
                .split('\r\n')
                .filter(
                    (question) => question !== '' && question !== 'Questions',
                );
            setQuestionsData(questionsArray);
            setScreen('detailedAnalysis');
            console.log('🚀 ~ handleSubmit ~ mode:', mode);
            switch (mode) {
                case 'demo':
                    handleSampleData({ setLlmResponse });
                case 'llm':
                    const csvFileBuffer =
                        await readFileAsDataUrl(questionsFile);
                    const pdfFileBuffer = await readFileAsDataUrl(evidenceFile);
                    // const xlsxFileBuffer = await readFileAsDataUrl(responsesFile)
                    submit({ csvFileBuffer, pdfFileBuffer, parsedExcelFile }); // xlsxFileBuffer});
                    const interval = setInterval(async () => {
                        const pollResponse = await poll();
                        console.log(
                            '🚀 ~ setInterval ~ pollResponse:',
                            pollResponse,
                        );
                        setLlmResponse(pollResponse);
                        // Clear interval when response is complete
                        if (pollResponse?.is_complete) {
                            clearInterval(interval);
                        }
                    }, 10000);
                    break;
            }
            setIsSidebarExpanded(true);
            setIsSidebarFullyExpanded(true);
            setQuestionsFile(null);
            setEvidenceFile(null);
            setResponsesFile(null);
        }
    }

    /**
     * Components
     */
    function AlertQuestionsFile(): JSX.Element {
        if (questionsFile && !isQuestionsFileValid) {
            return (
                <p className='text-orange-600 dark:text-orange-500'>
                    Please choose file type <b>csv</b> before proceeding
                </p>
            );
        } else {
            return <></>;
        }
    }
    function AlertEvidenceFile(): JSX.Element {
        if (evidenceFile && !isEvidenceFileValid) {
            return (
                <p className='text-orange-600 dark:text-orange-500'>
                    Please choose file type <b>pdf</b> before proceeding
                </p>
            );
        } else {
            return <></>;
        }
    }
    function AlertResponsesFile(): JSX.Element {
        if (responsesFile && !isResponsesFileValid) {
            return (
                <p className='text-orange-600 dark:text-orange-500'>
                    Please choose file type <b>xlsx</b> before proceeding
                </p>
            );
        } else {
            return <></>;
        }
    }

    /**
     * Return Statement
     */
    return (
        <div className='w-full dark:text-zinc-50'>
            <Topbar
                llmResponse={llmResponse}
                mode={mode}
                setMode={setMode}
                screen={screen}
                appLevelTableData={appLevelTableData}
            />

            {screen !== 'fileUpload' && (
                <Sidebar
                    isSidebarExpanded={isSidebarExpanded}
                    setIsSidebarExpanded={setIsSidebarExpanded}
                    isSidebarFullyExpanded={isSidebarFullyExpanded}
                    setIsSidebarFullyExpanded={setIsSidebarFullyExpanded}
                    screen={screen}
                    setScreen={setScreen}
                    handleResetApp={handleResetApp}
                />
            )}

            <div
                className={clsx(
                    tw`pt-[87px]`,
                    tw`flex-1 transition-all duration-300 ease-in-out`,
                    screen === 'fileUpload' ? tw`px-16` : null,
                    screen !== 'fileUpload' && isSidebarExpanded
                        ? tw`pl-64`
                        : tw`pl-16`,
                )}
            >
                {screen === 'fileUpload' && (
                    <Heading level={3}>AI Evidence Reviewer</Heading>
                )}
                {screen === 'loading' && (
                    <Heading level={3}>Processing File</Heading>
                )}

                <div className='container mx-auto pb-5 pt-5'>
                    {screen === 'fileUpload' && (
                        <Card additionalClasses={tw`mx-auto max-w-2xl`}>
                            <div className='mx-auto flex flex-col gap-6'>
                                <div className='flex items-center gap-3'>
                                    <Heading
                                        level={4}
                                        startIcon={
                                            <QuestionMarkCircleIcon
                                                className={clsx(
                                                    'w-10 stroke-indigo-600 stroke-2',
                                                    'dark:stroke-indigo-500',
                                                )}
                                            />
                                        }
                                    >
                                        Blank Question Set
                                    </Heading>
                                </div>
                                <form
                                    className='flex flex-col gap-6'
                                    onSubmit={handleSubmit}
                                >
                                    <p>
                                        Accepts file type: <b>csv</b>
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
                                    <AlertQuestionsFile />

                                    <Heading
                                        level={4}
                                        startIcon={
                                            <ChartBarSquareIcon
                                                className={clsx(
                                                    'w-10 stroke-indigo-600 stroke-2',
                                                    'dark:stroke-indigo-500',
                                                )}
                                            />
                                        }
                                    >
                                        Third Party Evidence Provided
                                    </Heading>
                                    <p>
                                        Accepts file type: <b>pdf</b>
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
                                    <AlertEvidenceFile />

                                    <div className='flex items-center gap-3'>
                                        <Heading
                                            level={4}
                                            startIcon={
                                                <ChatBubbleBottomCenterTextIcon
                                                    className={clsx(
                                                        'w-10 stroke-indigo-600 stroke-2',
                                                        'dark:stroke-indigo-500',
                                                    )}
                                                />
                                            }
                                        >
                                            Third Party Responses
                                        </Heading>
                                    </div>
                                    <p>
                                        Accepts file type: <b>xlsx</b>
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
                                    <AlertResponsesFile />

                                    <Button
                                        variant={
                                            areAllFilesValid
                                                ? 'solid'
                                                : 'disabledSolid'
                                        }
                                        additionalClasses='mx-auto'
                                    >
                                        <input
                                            className={
                                                areAllFilesValid
                                                    ? 'hover:cursor-pointer'
                                                    : ''
                                            }
                                            disabled={!areAllFilesValid}
                                            type='submit'
                                            value='Submit'
                                        />
                                    </Button>
                                </form>
                            </div>
                        </Card>
                    )}

                    {screen === 'loading' && (
                        <>
                            <Heading level={4} additionalClasses='text-center'>
                                Hang tight. This process can take a while.
                            </Heading>
                            <p className='text-center font-medium text-zinc-600 dark:text-zinc-400'>
                                When finished loading, the Detailed Analysis
                                will be displayed on the next screen.
                            </p>
                            <ArrowPathIcon className='stroke-1.5 mx-auto size-14 animate-spin text-indigo-800 dark:text-indigo-500' />
                        </>
                    )}

                    {(screen === 'detailedAnalysis' ||
                        screen === 'overview') && (
                        <div className='flex flex-col gap-6'>
                            <div className='flex flex-col gap-4'>
                                {screen === 'detailedAnalysis' && (
                                    <div>
                                        <p className='mb-3 text-sm'>
                                            {llmResponse?.is_complete ? (
                                                `The third party and the AI model provided the same response for ${countResponsesAlign(llmResponse)?.yesCount}/${questionsData?.length} questions uploaded.`
                                            ) : (
                                                <i>Analyzing...</i>
                                            )}
                                        </p>
                                        <DetailedAnalysis
                                            excelData={excelData}
                                            llmResponse={llmResponse}
                                            questionsData={questionsData}
                                            setAppLevelTableData={
                                                setAppLevelTableData
                                            }
                                        />
                                    </div>
                                )}
                                {screen === 'overview' && (
                                    <Overview
                                        excelData={excelData}
                                        isSidebarExpanded={isSidebarExpanded}
                                        llmResponse={llmResponse}
                                        questionsData={questionsData}
                                    />
                                )}
                            </div>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
}
