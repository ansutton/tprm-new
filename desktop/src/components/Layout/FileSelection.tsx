import { useRef, useState } from 'react';

// TODO: extract to three FileInput components, and put them all in here.
export function FileSelection(): JSX.Element {
    const [fileSelection, setFileSelection] = useState<File | null>(null);
    const [filesSelection, setFilesSelection] = useState<File[] | null>(null);

    const fileInputRef = useRef<HTMLInputElement | null>(null);

    const buttonText = `Select File${filesSelection ? 's' : ''}`;

    function handleChange(
        e: React.ChangeEvent<HTMLInputElement>,
        singleOrMultiple: 'single' | 'multiple',
    ) {
        const files = e.target.files;
        if (files) {
            if (singleOrMultiple === 'single') {
                setFileSelection(files[0]);
            } else if (singleOrMultiple === 'multiple') {
                setFilesSelection([...files]);
            }
        }
    }

    return (
        <div className='relative'>
            <input
                type='file'
                className='absolute h-0 w-0 opacity-0'
                ref={fileInputRef}
                onChange={(e) => handleChange(e, 'multiple')}
            />
            <button className='' onClick={() => fileInputRef.current?.click()}>
                {buttonText}
            </button>
        </div>
    );
}
