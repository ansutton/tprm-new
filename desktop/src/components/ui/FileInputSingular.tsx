import { useRef } from 'react';
import { Button } from '@/components';

interface FileInputSingularProps {
    accept?: string;
    setFileInputState: React.Dispatch<React.SetStateAction<File | null>>;
    buttonText: string;
}

export function FileInputSingular({
    setFileInputState,
    buttonText = 'Select File',
    accept = '',
}: FileInputSingularProps): JSX.Element {
    const fileInputRef = useRef<HTMLInputElement | null>(null);

    function handleChange(e: React.ChangeEvent<HTMLInputElement>) {
        const files = e.target.files;
        if (files && files[0]) {
            setFileInputState(files[0]);
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
