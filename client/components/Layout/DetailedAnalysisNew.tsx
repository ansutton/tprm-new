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
                className={clsx(
                    tw`transition-all`,
                    tw`rounded-lg p-1 transition-all`,
                    tw`group-hover:bg-zinc-200`,
                    tw`dark:group-hover:bg-zinc-800`,
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
            thirdPartyResponsePreview: truncate(excelData[index + 1][2], 30),
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
            <table className='w-full'>
                <thead>
                    {table.getHeaderGroups().map((headerGroup) => (
                        <tr key={headerGroup.id}>
                            {headerGroup.headers.map((header) => (
                                <th
                                    key={header.id}
                                    className={clsx(
                                        tw`whitespace-nowrap p-3 text-left text-sm`,
                                        tw`border-b border-zinc-300 dark:border-zinc-600`,
                                        header.id === 'expander' && tw`w-5`,
                                        header.id === 'questionNumber' &&
                                            tw`w-5`,
                                        header.id === 'question' && tw`w-fit`,
                                        header.id ===
                                            'thirdPartyResponsePreview' &&
                                            tw`w-1/6`,
                                        header.id ===
                                            'evidenceAnalysisPreview' &&
                                            tw`w-1/6`,
                                        header.id === 'answersAlign' &&
                                            tw`w-1/12`,
                                        header.id === 'confidenceScore' &&
                                            tw`w-1/12`,
                                        header.id === 'similarityScore' &&
                                            tw`w-1/12`,
                                        header.id === 'citation' && tw`w-1/12`,
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
                            <tr
                                onClick={() => row.toggleExpanded()}
                                className={clsx(
                                    tw`group`,
                                    tw`transition-all duration-200 ease-out`,
                                    tw`hover:cursor-pointer hover:bg-zinc-200 dark:hover:bg-zinc-900`,
                                    row.getIsExpanded() &&
                                        tw`bg-zinc-200 dark:bg-zinc-900`,
                                )}
                            >
                                {row.getVisibleCells().map((cell) => (
                                    <td
                                        key={cell.id}
                                        className={clsx(
                                            tw`p-3 text-sm`,
                                            (cell.column.id ===
                                                'thirdPartyResponsePreview' ||
                                                cell.column.id ===
                                                    'evidenceAnalysisPreview') &&
                                                tw`select-none`,
                                        )}
                                    >
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
    borderClasses?: string;
    content: string;
    row: Row<DataItem>;
    title: string;
}

function ExpandedRow({
    borderClasses = 'border-none',
    content,
    row,
    title,
}: ExpandedRowProps): JSX.Element {
    return (
        <tr className={clsx(borderClasses, tw`bg-zinc-200 dark:bg-zinc-900`)}>
            <td colSpan={3} className='py-3 pl-12 pr-3 align-top text-sm'>
                {title}:
            </td>
            <td
                colSpan={row.getVisibleCells().length - 3}
                className='p-3 text-sm'
            >
                {content}
            </td>
        </tr>
    );
}
