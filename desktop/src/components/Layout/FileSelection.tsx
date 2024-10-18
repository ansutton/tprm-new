import { useState } from 'react';
import { XMarkIcon } from '@heroicons/react/24/outline';
import clsx from 'clsx';
import {
    Card,
    FileInputMultiple,
    FileInputSingular,
    Heading,
} from '@/components';
import { tw } from '@/utils';
import { EvidenceFiles } from '@/types';

export function FileSelection(): JSX.Element {
    const [questionsFile, setQuestionsFile] = useState<File | null>(null);
    const [evidenceFiles, setEvidenceFiles] = useState<EvidenceFiles>(null);
    const [tpResponsesFile, setTpResponsesFile] = useState<File | null>(null);

    return (
        <Card additionalClasses='mx-auto max-w-2xl space-y-6'>
            <SectionSingular
                heading='Blank Question Set'
                accept='.csv'
                fileInputState={questionsFile}
                setFileInputState={setQuestionsFile}
                buttonText='Select File'
            />

            <SectionEvidence
                heading='Third Party Evidence Provided'
                accept='.pdf'
                fileInputState={evidenceFiles}
                setFileInputState={setEvidenceFiles}
                buttonText='Select File(s)'
            />

            <SectionSingular
                heading='Third Party Responses'
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
}

function SectionSingular({
    accept,
    heading,
    buttonText,
    fileInputState,
    setFileInputState,
}: SectionSingularProps): JSX.Element {
    return (
        <>
            <Heading level={4}>{heading}</Heading>
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
}

function SectionEvidence({
    accept,
    heading,
    buttonText,
    fileInputState,
    setFileInputState,
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
            <Heading level={4}>{heading}</Heading>
            <div
                className={clsx(
                    tw`flex`,
                    fileInputState?.length === 1 ? tw`items-center` : null,
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
    return (
        <div {...props} className='flex items-center space-x-2'>
            <XMarkIcon
                onClick={handleDeleteFile}
                className='size-5 cursor-pointer stroke-pink-500/85 stroke-2 dark:stroke-pink-500'
            />
            <span>{fileName}</span>
        </div>
    );
}
