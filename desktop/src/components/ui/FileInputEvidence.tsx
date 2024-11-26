import { ChangeEvent, useRef } from 'react';
import { Button } from '@/components';
import { Accept, EvidenceFile, EvidenceFiles, Mode } from '@/types';
import { initialEvidenceType } from '@/utils';

interface FileInputEvidenceProps {
    accept?: Accept;
    buttonText: string;
    setFileInputState: React.Dispatch<React.SetStateAction<EvidenceFiles>>;
    mode: Mode;
}

export function FileInputEvidence({
    accept = '',
    buttonText = 'Select File',
    setFileInputState,
    mode,
}: FileInputEvidenceProps): JSX.Element {
    const fileInputRef = useRef<HTMLInputElement | null>(null);

    function handleChange(e: ChangeEvent<HTMLInputElement>) {
        const files = e.target.files;

        if (files && files.length > 0) {
            setFileInputState((prevState) => {
                const updatedState = Array.isArray(prevState)
                    ? [...prevState]
                    : [];
                const existingFilesCount = updatedState.length;

                Array.from(files).forEach((file, batchIndex) => {
                    const newFile: EvidenceFile = {
                        file,
                        evidenceType: initialEvidenceType(
                            mode,
                            existingFilesCount + batchIndex,
                        ),
                    };

                    const isDuplicate = updatedState.some(
                        (evidenceFile) =>
                            evidenceFile?.file.name === newFile.file.name,
                    );

                    if (isDuplicate) {
                        confirm(
                            `A file with the name "${newFile.file.name}" has already been included. Please choose a file with a different name.`,
                        );
                    } else {
                        updatedState.push(newFile);
                    }
                });

                return updatedState;
            });

            e.target.value = '';
        }
    }

    return (
        <div className='relative'>
            <input
                type='file'
                multiple
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

