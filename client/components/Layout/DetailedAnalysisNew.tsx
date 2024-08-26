import { Fragment, useState } from 'react';
import { ChevronDownIcon } from '@heroicons/react/16/solid';
import {
    createColumnHelper,
    flexRender,
    getCoreRowModel,
    getExpandedRowModel,
    Row,
    useReactTable,
} from '@tanstack/react-table';
import clsx from 'clsx';
import { Card, Heading, Tooltip } from '@/components';
import { LlmResponse } from '@/types';
import { truncate, tw } from '@/utils';

type DataItem = {
    questionNumber: number;
    question: string;
    thirdPartyResponsePreview: string;
    evidenceAnalysisPreview: string;
    thirdPartyResponseFull: string;
    evidenceAnalysisFull: string;
    answersAlign: string;
    confidenceScore: string;
    similarityScore: string;
    citation: string;
};

const columnHelper = createColumnHelper<DataItem>();

const iconClasses = clsx(
    tw`size-6 stroke-0`,
    tw`text-zinc-600`,
    tw`dark:text-zinc-400`,
    tw`transform transition-transform duration-200`,
);

const columns = [
    columnHelper.display({
        id: 'expander',
        header: () => null,
        cell: ({ row }) => (
            <button
                onClick={() => row.toggleExpanded()}
                className={clsx(
                    tw`rounded-lg p-1 transition-all`,
                    tw`hover:bg-zinc-200`,
                    tw`dark:hover:bg-zinc-800`,
                )}
            >
                {row.getIsExpanded() ? (
                    <ChevronDownIcon className={clsx(iconClasses)} />
                ) : (
                    <ChevronDownIcon
                        className={clsx(tw`-rotate-90`, iconClasses)}
                    />
                )}
            </button>
        ),
    }),

    columnHelper.accessor('questionNumber', {
        header: () => null,
        cell: ({ getValue }) => getValue(),
    }),
    columnHelper.accessor('question', {
        header: 'Control Question',
        cell: ({ getValue }) => getValue(),
    }),
    columnHelper.accessor('thirdPartyResponsePreview', {
        header: 'Third Party Response',
        cell: ({ getValue }) => getValue(),
    }),
    columnHelper.accessor('evidenceAnalysisPreview', {
        header: 'Evidence Analysis',
        cell: ({ getValue }) => getValue(),
    }),
    columnHelper.accessor('answersAlign', {
        header: 'Answers Align',
        cell: ({ getValue }) => getValue(),
    }),
    columnHelper.accessor('confidenceScore', {
        header: 'Confidence Score',
        cell: ({ getValue }) => getValue(),
    }),
    columnHelper.accessor('similarityScore', {
        header: 'Similarity Score',
        cell: ({ getValue }) => getValue(),
    }),
    columnHelper.accessor('citation', {
        header: 'Citation',
        cell: ({ getValue }) => getValue(),
    }),
];

interface DetailedAnalysisNewProps {
    excelData: any[][];
    llmResponse: LlmResponse;
    questionsData: string[];
}

export function DetailedAnalysisNew({
    excelData,
    llmResponse,
    questionsData,
}: DetailedAnalysisNewProps): JSX.Element {
    const [data, _setData] = useState(() =>
        questionsData.map((question, index) => ({
            questionNumber: index + 1,
            question: question,
            thirdPartyResponsePreview: truncate(excelData[index + 1][2], 20),
            evidenceAnalysisPreview: 'N/A',
            thirdPartyResponseFull: excelData[index + 1][2],
            evidenceAnalysisFull: 'N/A',
            answersAlign: 'N/A',
            confidenceScore: 'N/A',
            similarityScore: 'N/A',
            citation: 'N/A',
        })),
    );

    const table = useReactTable({
        data,
        columns,
        getCoreRowModel: getCoreRowModel(),
        getExpandedRowModel: getExpandedRowModel(),
    });

    return (
        <div className='rounded-lg border border-zinc-300 dark:border-zinc-600'>
            <table>
                <thead>
                    {table.getHeaderGroups().map((headerGroup) => (
                        <tr key={headerGroup.id}>
                            {headerGroup.headers.map((header) => (
                                <th
                                    key={header.id}
                                    className={clsx(
                                        tw`w-fit whitespace-nowrap p-3 text-left text-sm`,
                                        tw`border-b border-zinc-300 dark:border-zinc-600`,
                                    )}
                                >
                                    {header.isPlaceholder
                                        ? null
                                        : flexRender(
                                              header.column.columnDef.header,
                                              header.getContext(),
                                          )}
                                </th>
                            ))}
                        </tr>
                    ))}
                </thead>

                <tbody
                    className={clsx(
                        tw`divide-y divide-zinc-300 dark:divide-zinc-600`,
                    )}
                >
                    {table.getRowModel().rows.map((row) => (
                        <Fragment key={row.id}>
                            <tr>
                                {row.getVisibleCells().map((cell) => (
                                    <td key={cell.id} className='p-3 text-sm'>
                                        {flexRender(
                                            cell.column.columnDef.cell,
                                            cell.getContext(),
                                        )}
                                    </td>
                                ))}
                            </tr>
                            {row.getIsExpanded() && (
                                <>
                                    <ExpandedRow
                                        content={
                                            row.original.thirdPartyResponseFull
                                        }
                                        row={row}
                                        title={'Third Party Response'}
                                    />
                                    <ExpandedRow
                                        content={
                                            row.original.evidenceAnalysisFull
                                        }
                                        row={row}
                                        title={'Evidence Analysis'}
                                    />
                                </>
                            )}
                        </Fragment>
                    ))}
                </tbody>
            </table>
        </div>
    );
}

interface ExpandedRowProps {
    content: string;
    row: Row<DataItem>;
    title: string;
}

function ExpandedRow({ content, row, title }: ExpandedRowProps): JSX.Element {
    return (
        <tr className='border-none'>
            <td colSpan={2} className='pl-5 text-sm'>
                {title}
            </td>
            <td colSpan={row.getVisibleCells().length - 2} className='text-sm'>
                {content}
            </td>
        </tr>
    );
}
