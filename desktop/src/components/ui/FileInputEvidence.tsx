import { ChangeEvent, useRef } from 'react';
import { Button } from '@/components';
import { Accept, EvidenceFile, EvidenceFiles, Mode } from '@/types';
import { initialEvidenceType } from '@/utils';

interface FileInputEvidenceProps {
    accept?: Accept;
    buttonText: string;
    fileInputState: EvidenceFiles;
    setFileInputState: React.Dispatch<React.SetStateAction<EvidenceFiles>>;
    mode: Mode;
}

export function FileInputEvidence({
    accept = '',
    buttonText = 'Select File',
    fileInputState,
    setFileInputState,
    mode,
}: FileInputEvidenceProps): JSX.Element {
    const fileInputRef = useRef<HTMLInputElement | null>(null);
    const evidenceFileIndex = fileInputState ? fileInputState?.length : 0;

    function handleChange(e: ChangeEvent<HTMLInputElement>) {
        console.log(`fileInputState.length: ${fileInputState?.length}`);
        const files = e.target.files;
        if (files && files[0]) {
            const newFile: EvidenceFile = {
                file: files[0],
                // evidenceType: EvidenceType.Unspecified,
                evidenceType: initialEvidenceType(mode, evidenceFileIndex),
            };
            setFileInputState((prevState) => {
                const isDuplicate = prevState?.some(
                    (evidenceFile) =>
                        evidenceFile?.file.name === newFile?.file.name,
                );

                if (isDuplicate) {
                    confirm(
                        'A file with this name has already been included. Please choose a file with a different name.',
                    );
                    return prevState;
                } else {
                    return Array.isArray(prevState)
                        ? [...prevState, newFile]
                        : [newFile];
                }
            });

            e.target.value = '';
        }
    }

    return (
        <div className='relative'>
            <input
                type='file'
                accept={accept}
                className='absolute h-0 w-0 opacity-0'
                ref={fileInputRef}
                onChange={(e) => handleChange(e)}
            />
            <Button
                onClick={() => fileInputRef.current?.click()}
                additionalClasses='whitespace-nowrap'
            >
                {buttonText}
            </Button>
        </div>
    );
}

