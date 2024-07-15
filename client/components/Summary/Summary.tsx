import { ReactNode } from 'react';
import { summarySample } from './summarySample';

export function Summary(): JSX.Element {
    return (
        <div className='w-full'>
            <table className='w-full table-auto bg-gray-50 drop-shadow-md'>
                <thead className='bg-gray-100'>
                    <tr>
                        <TableHead>Control Question</TableHead>
                        <TableHead>TP Response</TableHead>
                        <TableHead>AI&apos;s Answer</TableHead>
                        <TableHead>Answers Match?</TableHead>
                        <TableHead>Citation</TableHead>
                    </tr>
                </thead>

                <tbody>
                    {summarySample.map(
                        (
                            {
                                controlQuestion,
                                tpResponse,
                                aiAnswer,
                                answersMatch,
                                citation,
                            },
                            index,
                        ) => (
                            <tr key={index} className='odd:bg-blue-50'>
                                <TableCell>{controlQuestion}</TableCell>
                                <TableCell>{tpResponse}</TableCell>
                                <TableCell>{aiAnswer}</TableCell>
                                <TableCell centered>{answersMatch}</TableCell>
                                <TableCell>{citation}</TableCell>
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
