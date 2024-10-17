import { useRef } from 'react';
import { Button } from '@/components';

interface FileInputMultipleProps {
    accept?: string;
    setFileInputState: React.Dispatch<React.SetStateAction<File[] | null>>;
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
        if (files) {
            const newFiles = Array.from(files);
            setFileInputState((prevState) =>
                Array.isArray(prevState)
                    ? [...prevState, ...newFiles]
                    : newFiles,
            );
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
