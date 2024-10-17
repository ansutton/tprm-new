import { useState } from 'react';
import {
    Card,
    FileInputMultiple,
    FileInputSingular,
    Heading,
} from '@/components';

// TODO: extract to three FileInput components, and put them all in here.
export function FileSelection(): JSX.Element {
    const [questionsFile, setQuestionsFile] = useState<File | null>(null);
    const [evidenceFiles, setEvidenceFiles] = useState<File[] | null>(null);
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
            <div className='flex items-center gap-3'>
                <FileInputSingular
                    accept={accept}
                    setFileInputState={setFileInputState}
                    buttonText={buttonText}
                />
                {fileInputState && <div>{fileInputState.name}</div>}
            </div>
        </>
    );
}

interface SectionEvidenceProps {
    accept: string;
    heading: string;
    buttonText: string;
    fileInputState: File[] | null;
    setFileInputState: React.Dispatch<React.SetStateAction<File[] | null>>;
}

function SectionEvidence({
    accept,
    heading,
    buttonText,
    fileInputState,
    setFileInputState,
}: SectionEvidenceProps): JSX.Element {
    return (
        <>
            <Heading level={4}>{heading}</Heading>
            <div className='flex items-center gap-3'>
                <FileInputMultiple
                    accept={accept}
                    setFileInputState={setFileInputState}
                    buttonText={buttonText}
                />
                {fileInputState &&
                    fileInputState?.map((file, index) => (
                        <div key={index}>{file.name}</div>
                    ))}
            </div>
        </>
    );
}
