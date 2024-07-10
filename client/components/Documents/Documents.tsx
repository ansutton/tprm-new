import { ReactNode } from 'react';
import { tableContent } from '@/components/Documents/tableContent';

export default function Documents(): JSX.Element {
    return (
        <div className='w-full'>
            <table className='mx-auto table-auto bg-gray-50'>
                <thead>
                    <tr>
                        <TableHead>Document</TableHead>
                        <TableHead>RAG Ingested</TableHead>
                        <TableHead>Date Uploaded</TableHead>
                        <TableHead>Download</TableHead>
                    </tr>
                </thead>

                <tbody>
                    {tableContent.map(
                        ({ filename, ragInjested, date, isActive }) => (
                            <tr key={filename} className='odd:bg-blue-50'>
                                <TableCell>{filename}</TableCell>
                                <TableCell centered>{ragInjested}</TableCell>
                                <TableCell>{date}</TableCell>
                                <TableCell>
                                    <DownloadButton isDisabled={!isActive} />
                                </TableCell>
                            </tr>
                        ),
                    )}
                </tbody>
            </table>
        </div>
    );
}

interface TableItemProps {
    children: ReactNode;
}

function TableHead({ children }: TableItemProps): JSX.Element {
    return <th className='p-3 text-left'>{children}</th>;
}

interface TableCellProps extends TableItemProps {
    centered?: boolean;
}

function TableCell({
    centered = false,
    children,
}: TableCellProps): JSX.Element {
    return (
        <td className={`${centered ? 'text-center' : ''} p-3`}>{children}</td>
    );
}

interface DownloadButtonProps {
    isDisabled?: boolean;
}

function DownloadButton({
    isDisabled = false,
}: DownloadButtonProps): JSX.Element {
    return (
        <button
            disabled={isDisabled}
            className={`${isDisabled ? 'bg-tprm-dark-blue px-4 py-1.5 text-zinc-100 opacity-60 shadow-md shadow-tprm-dark-blue' : 'border border-tprm-dark-blue bg-tprm-dark-blue px-4 py-1.5 text-white shadow-md shadow-tprm-dark-blue duration-200 hover:bg-white hover:text-tprm-dark-blue hover:ease-out'}`}
        >
            Download
        </button>
    );
}
