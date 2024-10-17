import { useState } from 'react';
import { FileInputSingular } from '@/components';

// TODO: extract to three FileInput components, and put them all in here.
export function FileSelection(): JSX.Element {
    const [tpResponsesFile, setTpResponsesFile] = useState<File | null>(null);

    return (
        <>
            <FileInputSingular
                fileInputState={tpResponsesFile}
                setFileInputState={setTpResponsesFile}
                buttonText='Select File'
            />
            {tpResponsesFile && <div>{tpResponsesFile.name}</div>}
        </>
    );
}
