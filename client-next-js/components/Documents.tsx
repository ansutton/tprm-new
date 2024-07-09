function createData(
    model: string,
    active: boolean,
    tokensPerSecond: string,
    load: any,
) {
    return { model, active, tokensPerSecond, load };
}

const rows = [
    createData(
        'fpsyg-09-01395.pdf',
        true,
        '06-19-2024',
        <DownloadButton disabled />,
    ),
    createData(
        'state_of_the_union.txt',
        false,
        '06-19-2024',
        <DownloadButton />,
    ),
    createData('ZEPT_14_2240691.pdf', false, '06-18-2024', <DownloadButton />),
    createData('test2.txt', false, '06-17-2024', <DownloadButton />),
    createData('test1.txt', false, '06-17-2024', <DownloadButton />),
];

interface DownloadButtonProps {
    disabled?: boolean;
}

function DownloadButton({
    disabled = false,
}: DownloadButtonProps): JSX.Element {
    return (
        <button disabled={disabled} className={disabled ? 'text-gray-500' : ''}>
            Download
        </button>
    );
}

export default function Documents(): JSX.Element {
    return (
        <table className='table-auto'>
            <thead>
                <tr>
                    <th>Document</th>
                    <th>RAG Ingested</th>
                    <th>Date Uploaded</th>
                    <th>Download</th>
                </tr>
            </thead>

            <tbody>
                {rows.map((row) => (
                    <tr key={row.model}>
                        <td>{row.model}</td>
                        <td>{row.active ? 'True' : 'False'}</td>
                        <td>{row.tokensPerSecond}</td>
                        <td>{row.load}</td>
                    </tr>
                ))}
            </tbody>
        </table>
    );
}
