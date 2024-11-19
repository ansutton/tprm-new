import { Dispatch, ReactNode, SetStateAction, useState } from 'react';
import {
    Combobox,
    ComboboxButton,
    ComboboxInput,
    ComboboxOption,
    ComboboxOptions,
} from '@headlessui/react';
import { CheckIcon, ChevronDownIcon } from '@heroicons/react/20/solid';
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
    Heading,
    FileInputEvidence,
    FileInputSingular,
    TooltipEvidenceDeletion,
    TooltipEvidenceFilename,
} from '@/components';
import { confirmDeletionMessage } from '@/constants';
import { useTheme } from '@/hooks';
import {
    Accept,
    EvidenceFile,
    EvidenceFiles,
    EvidenceType,
    Mode,
    PdfFile,
    PdfFiles,
    Screen,
} from '@/types';
import {
    handlePoll,
    handleSampleData,
    handleSetQuestionsDataState,
    isFilesPopulated,
    isFileValid,
    parseExcelFile,
    readFileAsDataUrl,
    removeDot,
    submit,
} from '@/utils';

interface FileSelectionProps {
    evidenceFiles: EvidenceFiles;
    setEvidenceFiles: Dispatch<SetStateAction<EvidenceFiles>>;
    setIsSidebarExpanded: Dispatch<SetStateAction<boolean>>;
    setIsSidebarFullyExpanded: Dispatch<SetStateAction<boolean>>;
    setLlmResponse: Dispatch<any>;
    setQuestionsData: Dispatch<SetStateAction<string[]>>;
    setTpResponsesData: Dispatch<SetStateAction<any[][]>>;
    mode: Mode;
    setScreen: Dispatch<SetStateAction<Screen>>;
}

export function FileSelection({
    evidenceFiles,
    setEvidenceFiles,
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
    async function handleSubmit() {
        setScreen('detailedAnalysis');

        switch (mode) {
            case 'demo':
                handleSampleData({
                    setLlmResponse,
                    setQuestionsData,
                    setTpResponsesData,
                });
                break;
            case 'llm':
                // Handle Questions
                handleSetQuestionsDataState(questionsFile, setQuestionsData);
                let csvFileBuffer: string = '';
                if (questionsFile) {
                    csvFileBuffer = await readFileAsDataUrl(questionsFile);
                }

                // Handle Evidence documents
                const pdfFiles: PdfFiles = [];
                if (evidenceFiles) {
                    for await (const evidenceDoc of evidenceFiles) {
                        const pdfFile: PdfFile = {
                            pdfFileBuffer: null,
                            evidenceType: undefined,
                            filename: null,
                        };

                        if (evidenceDoc?.file) {
                            pdfFile.pdfFileBuffer = await readFileAsDataUrl(
                                evidenceDoc.file,
                            );
                            pdfFile.filename = evidenceDoc.file.name;
                        }

                        if (evidenceDoc?.evidenceType) {
                            pdfFile.evidenceType = evidenceDoc.evidenceType;
                        }

                        pdfFiles.push(pdfFile);
                    }
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
    }

    return (
        <Card additionalClasses='mx-auto space-y-6'>
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
                isAlertDisplayed={isQuestionsAlertDisplayed}
            />

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
                isAlertDisplayed={isEvidenceAlertDisplayed}
                mode={mode}
            />

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
                isAlertDisplayed={isTpResponsesAlertDisplayed}
            />

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

interface SectionProps {
    accept: Accept;
    heading: string;
    buttonText: string;
    startIcon?: ReactNode;
    isAlertDisplayed: boolean;
}

interface SectionSingularProps extends SectionProps {
    fileInputState: File | null;
    setFileInputState: Dispatch<SetStateAction<File | null>>;
}

function SectionSingular({
    accept,
    heading,
    buttonText,
    fileInputState,
    setFileInputState,
    startIcon,
    isAlertDisplayed,
}: SectionSingularProps): JSX.Element {
    function handleDeleteFile(
        setFileInputState: Dispatch<SetStateAction<File | null>>,
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
            <p>
                Accepts file type <b>{removeDot(accept)}</b>
            </p>
            <div className='flex items-center'>
                <div className='w-40'>
                    <FileInputSingular
                        accept={accept}
                        setFileInputState={setFileInputState}
                        buttonText={buttonText}
                    />
                </div>
                {fileInputState && (
                    <File
                        fileName={fileInputState.name}
                        handleDeleteFile={() =>
                            handleDeleteFile(setFileInputState)
                        }
                    />
                )}
            </div>
            <Alert accept={accept} isDisplayed={isAlertDisplayed} />
        </>
    );
}

interface SectionEvidenceProps extends SectionProps {
    fileInputState: EvidenceFiles;
    setFileInputState: Dispatch<SetStateAction<EvidenceFiles>>;
    mode: Mode;
}

function SectionEvidence({
    accept,
    heading,
    buttonText,
    fileInputState,
    setFileInputState,
    startIcon,
    isAlertDisplayed,
    mode,
}: SectionEvidenceProps): JSX.Element {
    function handleDeleteFile(
        fileName: string | undefined,
        setFileInputState: Dispatch<SetStateAction<EvidenceFiles>>,
    ) {
        if (confirm(confirmDeletionMessage)) {
            setFileInputState((prevState) =>
                Array.isArray(prevState) && prevState.length > 0
                    ? prevState?.filter(
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
            <p>
                Accepts files type <b>{removeDot(accept)}</b>
            </p>
            <div
                className={clsx(
                    'flex space-x-6',
                    fileInputState?.length === 1 ? 'items-center' : null,
                )}
            >
                <FileInputEvidence
                    accept={accept}
                    buttonText={buttonText}
                    fileInputState={fileInputState}
                    setFileInputState={setFileInputState}
                    mode={mode}
                />

                {fileInputState && fileInputState?.length > 0 && (
                    <div className='flex w-full flex-col space-y-3'>
                        <div className='flex w-full font-bold'>
                            <span className='w-1/2'>File Name</span>
                            <span className='w-1/2'>Evidence Type</span>
                        </div>
                        {fileInputState?.map((fileObj, index) => (
                            <div key={index} className='flex'>
                                <File
                                    fileName={fileObj?.file.name}
                                    handleDeleteFile={() =>
                                        handleDeleteFile(
                                            fileObj?.file.name,
                                            setFileInputState,
                                        )
                                    }
                                />
                                <EvidenceSelect
                                    evidenceIndex={index}
                                    fileInputState={fileInputState}
                                    setFileInputState={setFileInputState}
                                />
                            </div>
                        ))}
                    </div>
                )}
            </div>
            <Alert
                accept={accept}
                isDisplayed={isAlertDisplayed}
                customMessage='for all files'
            />
        </>
    );
}

interface EvidenceSelectProps {
    evidenceIndex: number;
    fileInputState: EvidenceFiles;
    setFileInputState: Dispatch<SetStateAction<EvidenceFiles>>;
}

function EvidenceSelect({
    evidenceIndex,
    fileInputState,
    setFileInputState,
}: EvidenceSelectProps): JSX.Element {
    /**
     * Custom Hooks
     */
    const { theme } = useTheme();

    /**
     * State Hooks
     */
    const [selectedType, setSelectedType] = useState<EvidenceType>(
        fileInputState
            ? (fileInputState[evidenceIndex]?.evidenceType ??
                  EvidenceType.Unspecified)
            : EvidenceType.Unspecified,
    );
    const [query, setQuery] = useState<string>('');

    /**
     * Constants
     */
    const evidenceTypes: EvidenceType[] = Object.values(EvidenceType);
    const filteredTypes =
        query === ''
            ? evidenceTypes
            : evidenceTypes.filter((value) => {
                  return value.toLowerCase().includes(query.toLowerCase());
              });

    /**
     * Helper Functions
     */
    function updateFileInputState(
        prevState: EvidenceFiles,
        evidenceIndex: number,
        newEvidenceType: EvidenceType,
    ): EvidenceFiles {
        if (!prevState) return prevState;
        return prevState.map((fileObj, index) => {
            if (fileObj === null) return fileObj;
            return index === evidenceIndex
                ? { ...fileObj, evidenceType: newEvidenceType }
                : fileObj;
        });
    }
    function handleEvidenceTypeChange(newType: EvidenceType) {
        setSelectedType(newType);
        setFileInputState((prevState) =>
            updateFileInputState(prevState, evidenceIndex, newType),
        );
    }

    /**
     * Return Statement
     */
    return (
        <Combobox
            value={selectedType}
            onChange={(value) =>
                handleEvidenceTypeChange(value || EvidenceType.Unspecified)
            }
            onClose={() => setQuery('')}
        >
            <div className='relative flex w-1/2 bg-zinc-50 text-sm dark:bg-zinc-800'>
                <ComboboxInput
                    className={clsx(
                        'w-full rounded-lg border-none py-1.5 pl-3 pr-8 ring-[0.5px]',
                        'dark:text-zinc-100',
                        'ring-indigo-400 dark:ring-indigo-400/50',
                        'bg-zinc-100 dark:bg-zinc-700/75',
                        'focus:outline-none data-[focus]:ring-[1.5px] data-[focus]:ring-pink-400',
                    )}
                    displayValue={(type: EvidenceType) => type}
                    onChange={(e) => setQuery(e.target.value)}
                />
                <ComboboxButton className='group absolute inset-y-0 right-0 px-2.5'>
                    <ChevronDownIcon
                        className={clsx(
                            'size-5 fill-indigo-600',
                            'group-data-[hover]:fill-pink-500',
                            'dark:fill-indigo-400 dark:group-data-[hover]:fill-pink-400',
                        )}
                    />
                </ComboboxButton>
            </div>

            <ComboboxOptions
                anchor={{ to: 'bottom', padding: '1rem' }}
                transition
                className={clsx(
                    'mt-1.5 w-[var(--input-width)] rounded-lg border p-1 [--anchor-gap:var(--spacing-1)] empty:invisible',
                    theme === 'light' && 'border-zinc-300/70 bg-zinc-100',
                    theme === 'dark' && 'border-zinc-700 bg-zinc-900',
                    'transition duration-100 ease-in data-[leave]:data-[closed]:opacity-0',
                    'z-20',
                )}
            >
                {filteredTypes.map((type) => (
                    <ComboboxOption
                        key={type}
                        value={type}
                        className={clsx(
                            'group flex select-none items-center gap-2 rounded-lg px-1 py-1.5',
                            theme === 'light' && 'data-[focus]:bg-zinc-200/50',
                            theme === 'dark' && 'data-[focus]:bg-zinc-800',
                        )}
                    >
                        <CheckIcon
                            className={clsx(
                                'invisible size-4 stroke-2 group-data-[selected]:visible',
                                theme === 'light' && 'fill-indigo-500',
                                theme === 'dark' && 'fill-indigo-400',
                            )}
                        />
                        <span
                            className={clsx(
                                'text-sm/6',
                                theme === 'light' && 'text-black',
                                theme === 'dark' && 'text-white',
                            )}
                        >
                            {type}
                        </span>
                    </ComboboxOption>
                ))}
            </ComboboxOptions>
        </Combobox>
    );
}
interface FileProps {
    handleDeleteFile: () => void;
    fileName: string | undefined;
}

function File({
    fileName,
    handleDeleteFile,
    ...props
}: FileProps): JSX.Element {
    const [isXShowing, setIsXShowing] = useState(false);

    return (
        <div
            {...props}
            className='relative flex w-1/2 items-center'
            onMouseEnter={() => setIsXShowing(true)}
            onMouseLeave={() => setIsXShowing(false)}
        >
            <TooltipEvidenceDeletion
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
            </TooltipEvidenceDeletion>

            <TooltipEvidenceFilename
                anchorTo='left'
                anchorGap={24}
                poppoverButtonChildren={
                    <span className='ml-1.5 cursor-default whitespace-nowrap text-sm'>
                        {fileName}
                    </span>
                }
            >
                {fileName}
            </TooltipEvidenceFilename>
            <div
                className={clsx(
                    'absolute right-0 ml-auto h-full w-20',
                    'bg-gradient-to-r from-transparent',
                    'via-zinc-50/95 to-zinc-50',
                    'dark:via-zinc-800/95 dark:to-zinc-800',
                )}
            />
        </div>
    );
}

interface AlertProps {
    isDisplayed: boolean;
    accept: Accept;
    customMessage?: string;
}

function Alert({
    isDisplayed,
    accept,
    customMessage = '',
}: AlertProps): JSX.Element {
    if (isDisplayed) {
        return (
            <p className='text-orange-600 dark:text-orange-500'>
                Please choose file type <b>{removeDot(accept)}</b>{' '}
                {customMessage} before proceeding
            </p>
        );
    } else {
        return <></>;
    }
}

