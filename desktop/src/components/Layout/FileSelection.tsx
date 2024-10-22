import { Dispatch, ReactNode, SetStateAction, useState } from 'react';
import {
    DocumentIcon,
    DocumentMagnifyingGlassIcon,
    DocumentTextIcon,
    EllipsisHorizontalIcon,
    XMarkIcon,
} from '@heroicons/react/24/outline';
import clsx from 'clsx';
import {
    Button,
    Card,
    FileInputMultiple,
    FileInputSingular,
    Heading,
    FileSelectionTooltip,
} from '@/components';
import { confirmDeletionMessage } from '@/constants';
import { EvidenceFile, EvidenceFiles, Mode, PdfFiles, Screen } from '@/types';
import {
    handlePoll,
    handleSampleData,
    handleSetQuestionsDataState,
    isFilesPopulated,
    isFileValid,
    parseExcelFile,
    readFileAsDataUrl,
    submit,
} from '@/utils';

interface FileSelectionProps {
    setIsSidebarExpanded: Dispatch<SetStateAction<boolean>>;
    setIsSidebarFullyExpanded: Dispatch<SetStateAction<boolean>>;
    setLlmResponse: Dispatch<any>;
    setQuestionsData: Dispatch<SetStateAction<string[]>>;
    setTpResponsesData: Dispatch<SetStateAction<any>>;
    mode: Mode;
    setScreen: Dispatch<SetStateAction<Screen>>;
}

export function FileSelection({
    setIsSidebarExpanded,
    setIsSidebarFullyExpanded,
    setLlmResponse,
    setQuestionsData,
    setTpResponsesData,
    mode,
    setScreen,
}: FileSelectionProps): JSX.Element {
    /**
     * State Hooks
     */
    const [questionsFile, setQuestionsFile] = useState<File | null>(null);
    const [evidenceFiles, setEvidenceFiles] = useState<EvidenceFiles>(null);
    const [tpResponsesFile, setTpResponsesFile] = useState<File | null>(null);

    /**
     * Constants - Questions Validation
     */
    const isPopulatedQuestionsValid = isFileValid(questionsFile, 'text/csv');
    const isQuestionsPopulatedAndValid =
        isFilesPopulated(questionsFile) && isPopulatedQuestionsValid;
    const isQuestionsSubmissionReady = isQuestionsPopulatedAndValid;
    const isQuestionsAlertDisplayed =
        isFilesPopulated(questionsFile) && !isPopulatedQuestionsValid;

    /**
     * Constants - Evidence Validation
     */
    const arePopulatedEvidenceValid =
        evidenceFiles?.every((evidenceFile: EvidenceFile) =>
            isFileValid(
                evidenceFile ? evidenceFile?.file : null,
                'application/pdf',
            ),
        ) ?? false;
    const areEvidencePopulatedAndValid =
        isFilesPopulated(evidenceFiles) && arePopulatedEvidenceValid;
    const areEvidenceSubmissionReady = areEvidencePopulatedAndValid;
    const isEvidenceAlertDisplayed =
        isFilesPopulated(evidenceFiles) && !arePopulatedEvidenceValid;

    /**
     * Constants - TP Responses Validation
     */
    const isPopulatedTpResponsesValid = isFileValid(
        tpResponsesFile,
        'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
    );
    // const isTpResponsesPopulatedAndValid =
    //     isFilesPopulated(tpResponsesFile) && isPopulatedTpResponsesValid;
    const isTpResponsesSubmissionReady: boolean = isFilesPopulated(
        tpResponsesFile,
    )
        ? isPopulatedTpResponsesValid
        : true;
    const isTpResponsesAlertDisplayed =
        isFilesPopulated(tpResponsesFile) && !isPopulatedTpResponsesValid;

    /**
     * Constants - All Files Submission-ready Validation
     */
    const areAllFilesSubmissionReady =
        isQuestionsSubmissionReady &&
        areEvidenceSubmissionReady &&
        isTpResponsesSubmissionReady;

    /**
     * Helper Functions - Submission
     */
    function handleResetStates(): void {
        setIsSidebarExpanded(true);
        setIsSidebarFullyExpanded(true);
        setQuestionsFile(null);
        setEvidenceFiles(null);
        setTpResponsesFile(null);
    }
    async function handleSubmit() {
        setScreen('detailedAnalysis');

        switch (mode) {
            case 'demo':
                handleSampleData({ setLlmResponse, setQuestionsData });
                break;
            case 'llm':
                // Handle Questions
                handleSetQuestionsDataState(questionsFile, setQuestionsData);
                let csvFileBuffer: string = '';
                if (questionsFile) {
                    csvFileBuffer = await readFileAsDataUrl(questionsFile);
                }

                // Handle Evidence
                let pdfFiles: PdfFiles = [];
                if (evidenceFiles) {
                    pdfFiles = evidenceFiles.map(async (evidenceFile) => ({
                        pdfFileBuffer: evidenceFile
                            ? await readFileAsDataUrl(evidenceFile.file)
                            : null,
                        evidenceType: evidenceFile?.evidenceType,
                    }));
                }

                // Handle TP Responses
                let parsedExcelFile: any[][] = [];
                if (tpResponsesFile) {
                    parsedExcelFile = await parseExcelFile(tpResponsesFile);
                    setTpResponsesData(parsedExcelFile);
                }

                // Submit
                submit({ csvFileBuffer, pdfFiles, parsedExcelFile });

                // Poll
                handlePoll(setLlmResponse);
                break;
        }

        // Clean up
        handleResetStates();
    }

    /**
     * Components
     */
    function AlertQuestionsFile(): JSX.Element {
        if (isQuestionsAlertDisplayed) {
            return (
                <p className='text-orange-600 dark:text-orange-500'>
                    Please choose file type <b>csv</b> before proceeding
                </p>
            );
        } else {
            return <></>;
        }
    }
    function AlertEvidenceFiles(): JSX.Element {
        if (isEvidenceAlertDisplayed) {
            return (
                <p className='text-orange-600 dark:text-orange-500'>
                    Please choose file type <b>pdf</b> before proceeding
                </p>
            );
        } else {
            return <></>;
        }
    }
    function AlertTpResponsesFile(): JSX.Element {
        if (isTpResponsesAlertDisplayed) {
            return (
                <p className='text-orange-600 dark:text-orange-500'>
                    Please choose file type <b>xlsx</b> before proceeding
                </p>
            );
        } else {
            return <></>;
        }
    }

    return (
        <Card additionalClasses='mx-auto max-w-2xl space-y-6'>
            <SectionSingular
                heading='Blank Question Set'
                startIcon={
                    <DocumentIcon
                        className={clsx(
                            'size-8 stroke-indigo-600 stroke-2',
                            'dark:stroke-indigo-500',
                        )}
                    />
                }
                accept='.csv'
                fileInputState={questionsFile}
                setFileInputState={setQuestionsFile}
                buttonText='Select File'
            />
            <AlertQuestionsFile />

            <SectionEvidence
                heading='Third Party Evidence Provided'
                startIcon={
                    <DocumentMagnifyingGlassIcon
                        className={clsx(
                            'size-8 stroke-indigo-600 stroke-2',
                            'dark:stroke-indigo-500',
                        )}
                    />
                }
                accept='.pdf'
                fileInputState={evidenceFiles}
                setFileInputState={setEvidenceFiles}
                buttonText='Select File(s)'
            />
            <AlertEvidenceFiles />

            <SectionSingular
                heading='Third Party Responses'
                startIcon={
                    <DocumentTextIcon
                        className={clsx(
                            'size-8 stroke-indigo-600 stroke-2',
                            'dark:stroke-indigo-500',
                        )}
                    />
                }
                accept='.xlsx'
                fileInputState={tpResponsesFile}
                setFileInputState={setTpResponsesFile}
                buttonText='Select File'
            />
            <AlertTpResponsesFile />

            <div className='w-full text-center'>
                <Button
                    variant={
                        areAllFilesSubmissionReady ? 'solid' : 'disabledSolid'
                    }
                    additionalClasses='mx-auto'
                    onClick={handleSubmit}
                >
                    Analyze
                </Button>
            </div>
        </Card>
    );
}

interface SectionSingularProps {
    accept: string;
    heading: string;
    buttonText: string;
    fileInputState: File | null;
    setFileInputState: React.Dispatch<React.SetStateAction<File | null>>;
    startIcon?: ReactNode;
}

function SectionSingular({
    accept,
    heading,
    buttonText,
    fileInputState,
    setFileInputState,
    startIcon,
}: SectionSingularProps): JSX.Element {
    function handleDeleteFile(
        setFileInputState: React.Dispatch<React.SetStateAction<File | null>>,
    ) {
        if (confirm(confirmDeletionMessage)) {
            setFileInputState(null);
        } else {
            return;
        }
    }

    return (
        <>
            <Heading level={4} startIcon={startIcon}>
                {heading}
            </Heading>
            <div className='flex items-center'>
                <div className='w-40'>
                    <FileInputSingular
                        accept={accept}
                        setFileInputState={setFileInputState}
                        buttonText={buttonText}
                    />
                </div>
                {fileInputState && (
                    <FileName
                        fileName={fileInputState.name}
                        handleDeleteFile={() =>
                            handleDeleteFile(setFileInputState)
                        }
                    />
                )}
            </div>
        </>
    );
}

interface SectionEvidenceProps {
    accept: string;
    heading: string;
    buttonText: string;
    fileInputState: EvidenceFiles;
    setFileInputState: React.Dispatch<React.SetStateAction<EvidenceFiles>>;
    startIcon?: ReactNode;
}

function SectionEvidence({
    accept,
    heading,
    buttonText,
    fileInputState,
    setFileInputState,
    startIcon,
}: SectionEvidenceProps): JSX.Element {
    function handleDeleteFile(
        fileName: string | undefined,
        setFileInputState: React.Dispatch<React.SetStateAction<EvidenceFiles>>,
    ) {
        if (confirm(confirmDeletionMessage)) {
            setFileInputState((prevFiles) =>
                Array.isArray(prevFiles)
                    ? prevFiles?.filter(
                          (fileObj) => fileObj?.file.name !== fileName,
                      )
                    : null,
            );
        } else {
            return;
        }
    }

    return (
        <>
            <Heading level={4} startIcon={startIcon}>
                {heading}
            </Heading>
            <div
                className={clsx(
                    'flex',
                    fileInputState?.length === 1 ? 'items-center' : null,
                )}
            >
                <div className='w-40'>
                    <FileInputMultiple
                        accept={accept}
                        setFileInputState={setFileInputState}
                        buttonText={buttonText}
                    />
                </div>
                <div className='space-y-2'>
                    {fileInputState &&
                        fileInputState?.map((fileObj, index) => (
                            <FileName
                                key={index}
                                fileName={fileObj?.file.name}
                                handleDeleteFile={() =>
                                    handleDeleteFile(
                                        fileObj?.file.name,
                                        setFileInputState,
                                    )
                                }
                            />
                        ))}
                </div>
            </div>
        </>
    );
}

interface FileNameProps {
    handleDeleteFile: () => void;
    fileName: string | undefined;
}

function FileName({
    fileName,
    handleDeleteFile,
    ...props
}: FileNameProps): JSX.Element {
    const [isXShowing, setIsXShowing] = useState(false);

    return (
        <div
            {...props}
            className='group flex items-center space-x-3'
            onMouseEnter={() => setIsXShowing(true)}
            onMouseLeave={() => setIsXShowing(false)}
        >
            <span className='cursor-default'>{fileName}</span>
            <FileSelectionTooltip
                poppoverButtonClasses='relative flex h-5 flex-col items-center'
                onClick={handleDeleteFile}
                icon={
                    <>
                        <EllipsisHorizontalIcon
                            className={clsx(
                                'absolute size-5 cursor-pointer stroke-2',
                                'stroke-zinc-500',
                                'dark:stroke-zinc-300',
                                'transition-opacity',
                                isXShowing
                                    ? 'opacity-0 duration-300'
                                    : 'duration-500',
                            )}
                        />
                        <XMarkIcon
                            className={clsx(
                                'size-5 cursor-pointer stroke-2',
                                'stroke-rose-500/75',
                                'dark:stroke-rose-400/95',
                                'transition-opacity',
                                !isXShowing
                                    ? 'opacity-0 duration-300'
                                    : 'duration-500',
                            )}
                        />
                    </>
                }
            >
                Remove File
            </FileSelectionTooltip>
        </div>
    );
}
