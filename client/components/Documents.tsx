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
                <tr>
                    <td>fpsyg-09-01395.pdf</td>
                    <td>True</td>
                    <td>06-19-2024</td>
                    <td>
                        <DownloadButton disabled />
                    </td>
                </tr>

                <tr>
                    <td>state_of_the_union.txt</td>
                    <td>False</td>
                    <td>06-19-2024</td>
                    <td>
                        <DownloadButton />
                    </td>
                </tr>

                <tr>
                    <td>ZEPT_14_2240691.pdf</td>
                    <td>False</td>
                    <td>06-18-2024</td>
                    <td>
                        <DownloadButton />
                    </td>
                </tr>

                <tr>
                    <td>test2.txt</td>
                    <td>False</td>
                    <td>06-17-2024</td>
                    <td>
                        <DownloadButton />
                    </td>
                </tr>

                <tr>
                    <td>test1.txt</td>
                    <td>False</td>
                    <td>06-17-2024</td>
                    <td>
                        <DownloadButton />
                    </td>
                </tr>
            </tbody>
        </table>
    );
}
