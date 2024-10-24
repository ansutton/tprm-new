import {
    ChangeEvent,
    Dispatch,
    ReactNode,
    SetStateAction,
    useState,
} from 'react';
import {
    Combobox,
    ComboboxButton,
    ComboboxInput,
    ComboboxOption,
    ComboboxOptions,
    Menu,
    MenuButton,
    MenuItem,
    MenuItems,
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
    FileSelectionTooltip,
    MenuItemButton,
} from '@/components';
import { confirmDeletionMessage } from '@/constants';
import { useTheme } from '@/hooks';
import {
    Accept,
    EvidenceFile,
    EvidenceFiles,
    EvidenceType,
    Mode,
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
}

function SectionEvidence({
    accept,
    heading,
    buttonText,
    fileInputState,
    setFileInputState,
    startIcon,
    isAlertDisplayed,
}: SectionEvidenceProps): JSX.Element {
    function handleDeleteFile(
        fileName: string | undefined,
        setFileInputState: Dispatch<SetStateAction<EvidenceFiles>>,
    ) {
        if (confirm(confirmDeletionMessage)) {
            setFileInputState((prevState) =>
                Array.isArray(prevState)
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
                    'flex space-x-4',
                    fileInputState?.length === 1 ? 'items-center' : null,
                )}
            >
                <FileInputEvidence
                    accept={accept}
                    setFileInputState={setFileInputState}
                    buttonText={buttonText}
                />

                {fileInputState && (
                    <div className='flex w-full flex-col space-y-3'>
                        <div className='flex w-full space-x-4 font-bold'>
                            <span className='w-1/2'>File Name</span>
                            <span className='w-1/2'>Evidence Type</span>
                        </div>
                        {fileInputState?.map((fileObj, index) => (
                            <div key={index} className='flex gap-4'>
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
        EvidenceType.Unspecified,
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

    // Headless UI Example
    //
    type Person = { id: number; name: string };
    type People = Person[];
    const people: People = [
        { id: 1, name: 'Tom Cook' },
        { id: 2, name: 'Wade Cooper' },
        { id: 3, name: 'Tanya Fox' },
        { id: 4, name: 'Arlene Mccoy' },
        { id: 5, name: 'Devon Webb' },
    ];

    const [queryExample, setQueryExample] = useState('');
    const [selectedExample, setSelectedExample] = useState(people[1]);

    const filteredPeople =
        query === ''
            ? people
            : people.filter((person) => {
                  return person.name
                      .toLowerCase()
                      .includes(queryExample.toLowerCase());
              });

    /**
     * Return Statement
     */
    return (
        <>
            {/* Headless UI Example */}
            <div className='mx-auto h-screen w-52 pt-20'>
                <Combobox
                    value={selectedExample}
                    onChange={(value: Person) => setSelectedExample(value)}
                    onClose={() => setQuery('')}
                >
                    <div className='relative'>
                        <ComboboxInput
                            className={clsx(
                                'w-full rounded-lg border-none bg-white/5 py-1.5 pl-3 pr-8 text-sm/6 text-white',
                                'focus:outline-none data-[focus]:outline-2 data-[focus]:-outline-offset-2 data-[focus]:outline-white/25',
                            )}
                            displayValue={(person: Person) => person?.name}
                            onChange={(event) => setQuery(event.target.value)}
                        />
                        <ComboboxButton className='group absolute inset-y-0 right-0 px-2.5'>
                            <ChevronDownIcon className='size-4 fill-white/60 group-data-[hover]:fill-white' />
                        </ComboboxButton>
                    </div>

                    <ComboboxOptions
                        anchor='bottom'
                        transition
                        className={clsx(
                            'w-[var(--input-width)] rounded-xl border border-white/5 bg-white/5 p-1 [--anchor-gap:var(--spacing-1)] empty:invisible',
                            'transition duration-100 ease-in data-[leave]:data-[closed]:opacity-0',
                        )}
                    >
                        {filteredPeople.map((person) => (
                            <ComboboxOption
                                key={person.id}
                                value={person}
                                className='group flex cursor-default select-none items-center gap-2 rounded-lg px-3 py-1.5 data-[focus]:bg-white/10'
                            >
                                <CheckIcon className='invisible size-4 fill-white group-data-[selected]:visible' />
                                <div className='text-sm/6 text-white'>
                                    {person.name}
                                </div>
                            </ComboboxOption>
                        ))}
                    </ComboboxOptions>
                </Combobox>
            </div>

            {/* Starting from Headless UI Example */}
            <div className=''>
                <Combobox
                    value={selectedType}
                    onChange={(value) =>
                        handleEvidenceTypeChange(
                            value ?? EvidenceType.Unspecified,
                        )
                    }
                    onClose={() => setQuery('')}
                >
                    <div className='relative'>
                        <ComboboxInput
                            className={clsx(
                                'w-full rounded-lg border-none bg-white/5 py-1.5 pl-3 pr-8 text-sm/6 text-white',
                                'focus:outline-none data-[focus]:outline-2 data-[focus]:-outline-offset-2 data-[focus]:outline-white/25',
                            )}
                            displayValue={(type: EvidenceType) => type}
                            onChange={(e) => setQuery(e.target.value)}
                        />
                        <ComboboxButton className='group absolute inset-y-0 right-0 px-2.5'>
                            <ChevronDownIcon className='size-4 fill-white/60 group-data-[hover]:fill-white' />
                        </ComboboxButton>
                    </div>

                    <ComboboxOptions
                        anchor='bottom'
                        transition
                        className={clsx(
                            'w-[var(--input-width)] rounded-xl border border-white/5 bg-white/5 p-1 [--anchor-gap:var(--spacing-1)] empty:invisible',
                            'transition duration-100 ease-in data-[leave]:data-[closed]:opacity-0',
                        )}
                    >
                        {filteredTypes.map((type) => (
                            <ComboboxOption
                                key={type}
                                value={type}
                                className='group flex cursor-default select-none items-center gap-2 rounded-lg px-3 py-1.5 data-[focus]:bg-white/10'
                            >
                                <CheckIcon className='invisible size-4 fill-white group-data-[selected]:visible' />
                                <div className='text-sm/6 text-white'>
                                    {type}
                                </div>
                            </ComboboxOption>
                        ))}
                    </ComboboxOptions>
                </Combobox>
            </div>

            <div className='hidden'>
                <Combobox
                    value={selectedType}
                    onChange={(value) =>
                        setSelectedType(value ?? EvidenceType.Unspecified)
                    }
                    onClose={() => setQuery('')}
                >
                    <div className='relative'>
                        <ComboboxInput
                            aria-label='Evidence Type'
                            displayValue={(type: EvidenceType) => type}
                            onChange={(e) => setQuery(e.target.value)}
                            className='text-black'
                        />
                        <ComboboxButton>
                            <ChevronDownIcon className='size-4' />
                        </ComboboxButton>
                    </div>

                    <ComboboxOptions anchor='bottom' className=''>
                        {filteredTypes?.map((type) => (
                            <ComboboxOption
                                key={type}
                                value={type}
                                className=''
                            >
                                {type}
                            </ComboboxOption>
                        ))}
                    </ComboboxOptions>
                </Combobox>
            </div>

            <div className='hidden'>
                <Menu>
                    <MenuButton
                        className={clsx(
                            'w-1/2 rounded-lg p-2 text-left shadow-lg ring-1 ring-zinc-800/10',
                            'bg-zinc-200 dark:bg-purple-500',
                        )}
                    >
                        {selectedType}
                    </MenuButton>

                    <MenuItems
                        transition
                        anchor='bottom end'
                        className={clsx(
                            'mt-4 flex w-fit flex-col rounded-lg py-1 text-sm font-bold shadow-lg',
                            theme === 'light' &&
                                'stroke-700 bg-zinc-100 text-zinc-700 ring-1 ring-zinc-900/10',
                            theme === 'dark' &&
                                'bg-zinc-800 stroke-zinc-300 text-zinc-300 ring-0',
                        )}
                    >
                        {Object.values(EvidenceType).map((type) => (
                            <MenuItem key={type}>
                                <MenuItemButton
                                    additionalClasses={clsx(
                                        theme === 'light' &&
                                            'stroke-indigo-600 text-indigo-600',
                                    )}
                                    onClick={() =>
                                        handleEvidenceTypeChange(type)
                                    }
                                >
                                    {type}
                                </MenuItemButton>
                            </MenuItem>
                        ))}
                    </MenuItems>
                </Menu>
            </div>

            {/* <select
                className={clsx(
                    'w-1/2 rounded-lg border p-1',
                    'border-indigo-400 bg-zinc-100',
                    'dark:border-indigo-400/50 dark:bg-zinc-700/70 dark:text-white',
                )}
                onChange={handleEvidenceTypeChange0}
            >
                <option
                    value=''
                    className='bg-zinc-100 text-zinc-300/80 dark:bg-zinc-700'
                >
                    Select document type
                </option>
                {Object.values(EvidenceType).map((type) => (
                    <option
                        key={type}
                        value={type}
                        className={clsx(
                            'bg-zinc-100 hover:bg-pink-500/90 dark:bg-zinc-700',
                            // type === 'Unspecified' && 'hidden',
                        )}
                    >
                        {type}
                    </option>
                ))}
            </select> */}
        </>
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
            className='group flex w-1/2 items-center space-x-3'
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
