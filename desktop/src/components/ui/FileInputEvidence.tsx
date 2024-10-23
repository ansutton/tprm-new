import { useRef } from 'react';
import { Button } from '@/components';
import { EvidenceFile, EvidenceFiles, EvidenceType } from '@/types';

interface FileInputEvidenceProps {
    accept?: string;
    setFileInputState: React.Dispatch<React.SetStateAction<EvidenceFiles>>;
    buttonText: string;
}

export function FileInputEvidence({
    setFileInputState,
    buttonText = 'Select File',
    accept = '',
}: FileInputEvidenceProps): JSX.Element {
    const fileInputRef = useRef<HTMLInputElement | null>(null);

    function handleChange(e: React.ChangeEvent<HTMLInputElement>) {
        const files = e.target.files;
        if (files && files[0]) {
            const newFile: EvidenceFile = {
                file: files[0],
                evidenceType: EvidenceType.Unspecified,
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
