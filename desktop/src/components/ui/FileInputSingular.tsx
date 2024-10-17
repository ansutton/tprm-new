import { useRef } from 'react';
import { Button } from '@/components';

interface FileInputSingularProps {
    fileInputState: File | null;
    setFileInputState: React.Dispatch<React.SetStateAction<File | null>>;
    buttonText: string;
}

export function FileInputSingular({
    fileInputState,
    setFileInputState,
    buttonText = 'Select File',
    ...props
}: FileInputSingularProps): JSX.Element {
    const fileInputRef = useRef<HTMLInputElement | null>(null);

    function handleChange(e: React.ChangeEvent<HTMLInputElement>) {
        const files = e.target.files;
        if (files?.length === 1) {
            setFileInputState(files[0]);
        }
    }

    return (
        <div className='relative'>
            <input
                type='file'
                className='absolute h-0 w-0 opacity-0'
                ref={fileInputRef}
                onChange={(e) => handleChange(e)}
            />
            <Button {...props} onClick={() => fileInputRef.current?.click()}>
                {buttonText}
            </Button>
        </div>
    );
}
