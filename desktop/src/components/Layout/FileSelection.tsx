import { useState, ReactNode } from 'react';
import {
    ChartBarSquareIcon,
    ChatBubbleBottomCenterTextIcon,
    EllipsisHorizontalIcon,
    QuestionMarkCircleIcon,
    XMarkIcon,
} from '@heroicons/react/24/outline';
import clsx from 'clsx';
import {
    Card,
    FileInputMultiple,
    FileInputSingular,
    Heading,
    Tooltip,
} from '@/components';
import { EvidenceFiles } from '@/types';

export function FileSelection(): JSX.Element {
    const [questionsFile, setQuestionsFile] = useState<File | null>(null);
    const [evidenceFiles, setEvidenceFiles] = useState<EvidenceFiles>(null);
    const [tpResponsesFile, setTpResponsesFile] = useState<File | null>(null);

    return (
        <Card additionalClasses='mx-auto max-w-2xl space-y-6'>
            <SectionSingular
                heading='Blank Question Set'
                startIcon={
                    <QuestionMarkCircleIcon
                        className={clsx(
                            'size-9 stroke-indigo-600 stroke-2',
                            'dark:stroke-indigo-500',
                        )}
                    />
                }
                accept='.csv'
                fileInputState={questionsFile}
                setFileInputState={setQuestionsFile}
                buttonText='Select File'
            />

            <SectionEvidence
                heading='Third Party Evidence Provided'
                startIcon={
                    <ChartBarSquareIcon
                        className={clsx(
                            'size-9 stroke-indigo-600 stroke-2',
                            'dark:stroke-indigo-500',
                        )}
                    />
                }
                accept='.pdf'
                fileInputState={evidenceFiles}
                setFileInputState={setEvidenceFiles}
                buttonText='Select File(s)'
            />

            <SectionSingular
                heading='Third Party Responses'
                startIcon={
                    <ChatBubbleBottomCenterTextIcon
                        className={clsx(
                            'size-9 stroke-indigo-600 stroke-2',
                            'dark:stroke-indigo-500',
                        )}
                    />
                }
                accept='.xlsx'
                fileInputState={tpResponsesFile}
                setFileInputState={setTpResponsesFile}
                buttonText='Select File'
            />
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
                        handleDeleteFile={() => setFileInputState(null)}
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
        setFileInputState((prevFiles) =>
            Array.isArray(prevFiles)
                ? prevFiles?.filter(
                      (fileObj) => fileObj?.file.name !== fileName,
                  )
                : null,
        );
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
            <div className='relative h-5'>
                <EllipsisHorizontalIcon
                    className={clsx(
                        'absolute size-5 cursor-pointer stroke-2',
                        'stroke-zinc-500',
                        'dark:stroke-zinc-300',
                        'transition-opacity',
                        isXShowing ? 'opacity-0 duration-200' : 'duration-300',
                    )}
                />
                <XMarkIcon
                    onClick={handleDeleteFile}
                    className={clsx(
                        'absolute size-5 cursor-pointer stroke-2',
                        'stroke-rose-500/85',
                        'dark:stroke-rose-400/95',
                        'transition-opacity',
                        !isXShowing ? 'opacity-0 duration-200' : 'duration-300',
                    )}
                    title='Remove File'
                />
            </div>
        </div>
    );
}
