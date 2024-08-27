import { Fragment, ReactNode, useState } from 'react';
import { ChevronDownIcon } from '@heroicons/react/24/outline';
import {
    createColumnHelper,
    flexRender,
    getCoreRowModel,
    getExpandedRowModel,
    Row,
    useReactTable,
} from '@tanstack/react-table';
import clsx from 'clsx';
import { Button, Tooltip } from '@/components';
import { LlmResponse } from '@/types';
import { truncate, tw } from '@/utils';

type DataItem = {
    questionNumber: number;
    question: string;
    thirdPartyResponsePreview: string;
    evidenceAnalysisPreview: string;
    answersAlign: string;
    confidenceScore: string;
    similarityScore: string;
    citationPreview: string;
    thirdPartyResponseFull: string;
    evidenceAnalysisFull: string;
    citationFull: string;
};

interface TableHeaderProps {
    headerContent: string;
    infoContent: ReactNode;
}

function TableHeader({
    headerContent,
    infoContent,
}: TableHeaderProps): JSX.Element {
    return (
        <div className='flex items-center gap-1.5'>
            <span>{headerContent}</span>
            <Tooltip>{infoContent}</Tooltip>
        </div>
    );
}

const iconClasses = clsx(
    tw`size-5 stroke-2`,
    tw`stroke-zinc-600 dark:stroke-zinc-400`,
    tw`transform transition-transform duration-200`,
);

const columnHelper = createColumnHelper<DataItem>();

const columns = [
    columnHelper.display({
        id: 'expander',
        header: ({ table }) => (
            <button
                onClick={() => table.toggleAllRowsExpanded()}
                className={clsx(
                    tw`w-fit rounded-full p-2 transition-all`,
                    tw`hover:bg-zinc-200 dark:hover:bg-zinc-800`,
                )}
            >
                {table.getIsAllRowsExpanded() ? (
                    <ChevronDownIcon
                        className={clsx(
                            tw`size-5 stroke-2`,
                            tw`stroke-indigo-600 dark:stroke-indigo-400`,
                            tw`transform transition-transform duration-200`,
                        )}
                        title='Contract All'
                    />
                ) : (
                    <ChevronDownIcon
                        className={clsx(
                            tw`-rotate-90`,
                            tw`size-5 stroke-2`,
                            tw`stroke-indigo-600 dark:stroke-indigo-400`,
                            tw`transform transition-transform duration-200`,
                        )}
                        title='Expand All'
                    />
                )}
            </button>
        ),
        cell: ({ row }) => (
            <button
                className={clsx(
                    tw`rounded-full p-2 transition-all`,
                    tw`group-hover:bg-zinc-300 dark:group-hover:bg-zinc-800`,
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
        header: () => (
            <TableHeader
                headerContent='Control Question'
                infoContent='Lorem ipsum dolor sit amet consectetur adipisicing elit.
                Adipisci eos eius veniam quibusdam corporis eum quae explicabo
                dicta non! Obcaecati.'
            />
        ),
        cell: ({ getValue }) => getValue(),
    }),
    columnHelper.accessor('thirdPartyResponsePreview', {
        header: () => (
            <TableHeader
                headerContent='Third Party Response'
                infoContent='Lorem ipsum dolor sit amet consectetur adipisicing elit.
                Adipisci eos eius veniam quibusdam corporis eum quae explicabo
                dicta non! Obcaecati.'
            />
        ),
        cell: ({ getValue }) => getValue(),
    }),
    columnHelper.accessor('evidenceAnalysisPreview', {
        header: () => (
            <TableHeader
                headerContent='Evidence Analysis'
                infoContent='Lorem ipsum dolor sit amet consectetur adipisicing elit.
                Adipisci eos eius veniam quibusdam corporis eum quae explicabo
                dicta non! Obcaecati.'
            />
        ),
        cell: ({ getValue }) => getValue(),
    }),
    columnHelper.accessor('answersAlign', {
        header: () => (
            <TableHeader
                headerContent='Answers Align'
                infoContent='Lorem ipsum dolor sit amet consectetur adipisicing elit.
                Adipisci eos eius veniam quibusdam corporis eum quae explicabo
                dicta non! Obcaecati.'
            />
        ),
        cell: ({ getValue }) => getValue(),
    }),
    columnHelper.accessor('confidenceScore', {
        header: () => (
            <TableHeader
                headerContent='Confidence Score'
                infoContent='Lorem ipsum dolor sit amet consectetur adipisicing elit.
                Adipisci eos eius veniam quibusdam corporis eum quae explicabo
                dicta non! Obcaecati.'
            />
        ),
        cell: ({ getValue }) => getValue(),
    }),
    columnHelper.accessor('similarityScore', {
        header: () => (
            <TableHeader
                headerContent='Similarity Score'
                infoContent='Lorem ipsum dolor sit amet consectetur adipisicing elit.
                Adipisci eos eius veniam quibusdam corporis eum quae explicabo
                dicta non! Obcaecati.'
            />
        ),
        cell: ({ getValue }) => getValue(),
    }),
    columnHelper.accessor('citationPreview', {
        header: () => (
            <TableHeader
                headerContent='Citation'
                infoContent='Lorem ipsum dolor sit amet consectetur adipisicing elit.
                Adipisci eos eius veniam quibusdam corporis eum quae explicabo
                dicta non! Obcaecati.'
            />
        ),
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
            confidenceScore: 'N/A',
            similarityScore: 'N/A',
            citationPreview: 'N/A',
            thirdPartyResponseFull: excelData[index + 1][2],
            evidenceAnalysisFull: 'N/A',
            answersAlign: 'N/A',
            citationFull: 'N/A',
        })),
    );

    const table = useReactTable({
        data,
        columns,
        getCoreRowModel: getCoreRowModel(),
        getExpandedRowModel: getExpandedRowModel(),
    });

    return (
        <div
            className={clsx(
                tw`overflow-x-auto`,
                tw`bg-zinc-100 dark:bg-zinc-950`,
                tw`rounded-lg border border-zinc-300 dark:border-zinc-600`,
                tw`drop-shadow-md`,
            )}
        >
            <table className='w-full dark:text-zinc-100'>
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
                                        header.id === 'citationPreview' &&
                                            tw`w-1/12`,
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
                                    <ExpandedRow
                                        content={row.original.citationFull}
                                        row={row}
                                        title={'Citation'}
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
        <tr
            className={clsx(
                borderClasses,
                tw`bg-zinc-200 dark:bg-zinc-900`,
                tw`text-zinc-900 dark:text-zinc-200/80`,
            )}
        >
            <td colSpan={3} className='py-3 pl-[100px] pr-3 align-top text-sm'>
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
