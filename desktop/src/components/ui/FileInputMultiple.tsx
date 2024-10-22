import { useRef } from 'react';
import { Button } from '@/components';
import { EvidenceFile, EvidenceFiles } from '@/types';

interface FileInputMultipleProps {
    accept?: string;
    setFileInputState: React.Dispatch<React.SetStateAction<EvidenceFiles>>;
    buttonText: string;
}

export function FileInputMultiple({
    setFileInputState,
    buttonText = 'Select File',
    accept = '',
}: FileInputMultipleProps): JSX.Element {
    const fileInputRef = useRef<HTMLInputElement | null>(null);

    function handleChange(e: React.ChangeEvent<HTMLInputElement>) {
        const files = e.target.files;
        if (files && files[0]) {
            const newFile: EvidenceFile = {
                file: files[0],
                evidenceType: 'unspecified',
            };
            setFileInputState((prevState) =>
                Array.isArray(prevState) ? [...prevState, newFile] : [newFile],
            );
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
            <Button onClick={() => fileInputRef.current?.click()}>
                {buttonText}
            </Button>
        </div>
    );
}
