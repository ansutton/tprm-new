import { Fragment, ReactNode, useEffect, useState } from 'react';
import { ArrowPathIcon, ChevronDownIcon } from '@heroicons/react/24/outline';
import {
    createColumnHelper,
    flexRender,
    getCoreRowModel,
    getExpandedRowModel,
    Row,
    useReactTable,
} from '@tanstack/react-table';
import clsx from 'clsx';
import * as XLSX from 'xlsx';
import { Pages, Tooltip } from '@/components';
import {
    DataItem,
    DataItemField,
    LlmResponse,
    TableHeaderProps,
} from '@/types';
import {
    displayScore,
    handleExportXlsx,
    getTimestamp,
    handleAnswersAlignment,
    truncate,
    tw,
} from '@/utils';

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
                infoContent={`Question concerning the security controls and practices of the organization being assessed.`}
            />
        ),
        cell: ({ getValue }) => getValue(),
    }),
    columnHelper.accessor('tpResponsePreview', {
        header: () => (
            <TableHeader
                headerContent='Third Party Response'
                infoContent={`The response to the question given by the third party. The response is not necessarily tied to the context of the evidence document`}
            />
        ),
        cell: ({ getValue }) => getValue(),
    }),
    columnHelper.accessor('aiAnalysisPreview', {
        header: () => (
            <TableHeader
                headerContent='AI Response'
                infoContent={`Measures how accurate the app's response is to the evidence documentation taking the related question into account, with higher scores indicating stronger accuracy. Accuracy is based on the content of the response up against the relevant sections used to answer the response.`}
            />
        ),
        cell: ({ getValue }) => getValue(),
    }),
    columnHelper.accessor('answersAlignment', {
        header: () => (
            <TableHeader
                headerContent='Answers Align'
                infoContent={`How aligned the app's generated response is to the third-party's response. Based on a similarity score percentage with higher scores indicating stronger similarity with a threshold of 88% defining an aligned output.`}
            />
        ),
        cell: ({ getValue }) => getValue(),
    }),
    columnHelper.accessor('similarityScore', {
        header: () => (
            <TableHeader
                headerContent='Similarity Score'
                infoContent={`Measures how similar the app's response is to the third-party response, with higher scores indicating stronger similarity. Similarity is based on the meaning and context of the responses, rather than exact wording.`}
            />
        ),
        cell: ({ getValue }) => getValue(),
    }),
    columnHelper.accessor('aiConfidenceScore', {
        header: () => (
            <TableHeader
                headerContent='AI Confidence Score'
                infoContent={`Measures how accurate the app's response is to the evidence documentation taking the related question into account, with higher scores indicating stronger accuracy. Accuracy is based on the content of the response up against the relevant sections used to answer the response.`}
            />
        ),
        cell: ({ getValue }) => getValue(),
    }),
    columnHelper.accessor('tpConfidenceScore', {
        header: () => (
            <TableHeader
                headerContent='Third Party Confidence Score'
                infoContent={`Measures how accurate the Third Party's response is to the evidence documentation taking the related question into account, with higher scores indicating stronger accuracy. Accuracy is based on the content of the response up against the relevant sections.`}
            />
        ),
        cell: ({ getValue }) => getValue(),
    }),
    columnHelper.accessor('citationsPreview', {
        header: () => (
            <TableHeader
                headerContent='Citation(s)'
                infoContent={`"The relevant section(s) from the evidence document that the app has referenced in response to the question.`}
            />
        ),
        cell: ({ getValue }) => getValue(),
    }),
];

interface DetailedAnalysisProps {
    excelData: any[][];
    llmResponse: LlmResponse;
    questionsData: string[];
}

export function DetailedAnalysis({
    excelData,
    llmResponse,
    questionsData,
}: DetailedAnalysisProps): JSX.Element {
    /**
     * State Hook
     */
    const [data, setData] = useState(handleData());

    /**
     * Helper Function: Data Handler
     */
    function handleData() {
        return () =>
            questionsData.map((question, index) => ({
                questionNumber: index + 1,
                question: question,
                tpResponsePreview: truncate(excelData[index + 1][2], 30),
                aiAnalysisPreview: handleSpinner(
                    truncate(
                        llmResponse?.analyses[`analysis_${index}`]?.ai_analysis,
                        30,
                    ),
                ),
                answersAlignment: handleSpinner(
                    handleAnswersAlignment(
                        llmResponse?.analyses[`analysis_${index}`]
                            ?.similarity_score,
                    ),
                ),
                similarityScore: handleSpinner(
                    displayScore(
                        llmResponse?.analyses[`analysis_${index}`]
                            ?.similarity_score,
                    ),
                ),
                aiConfidenceScore: handleSpinner(
                    displayScore(
                        llmResponse?.analyses[`analysis_${index}`]
                            ?.ai_confidence_score,
                    ),
                ),
                tpConfidenceScore: handleSpinner(
                    displayScore(
                        llmResponse?.analyses[`analysis_${index}`]
                            ?.tp_confidence_score,
                    ),
                ),
                citationsPreview: (
                    <Pages
                        index={index}
                        llmResponse={llmResponse}
                        prefix='Page(s):'
                    />
                ),
                // 'N/A',
                tpResponseFull: excelData[index + 1][2],
                aiAnalysisFull: handleSpinner(
                    llmResponse?.analyses[`analysis_${index}`]?.ai_analysis,
                ),
                citationsFull: (
                    <div className='space-y-4'>
                        {handleSpinner(
                            llmResponse?.analyses[
                                `analysis_${index}`
                            ]?.citations?.map((citation, index) => (
                                <div key={index} className='flex gap-4'>
                                    <span className='whitespace-nowrap'>
                                        Page {citation[0]}:
                                    </span>
                                    <span>...{citation[1]}...</span>
                                </div>
                            )),
                        )}
                    </div>
                ),
                pageNumbers: <Pages index={index} llmResponse={llmResponse} />,
            }));
    }
    /**
     * Helper Functions: Utilities
     */
    function handleSpinner(field: DataItemField): ReactNode {
        return field ? (
            field
        ) : (
            <ArrowPathIcon className='size-5 animate-spin stroke-2 text-indigo-800 dark:text-indigo-500' />
        );
    }

    /**
     * Helper Functions: Export Table
     */
    function handleExportXlsx() {
        return;
    }

    /**
     * Effect Hook
     */
    useEffect(() => {
        setData(handleData());
        // console.log('🚀 ~ llmResponse:', llmResponse);
    }, [llmResponse]);

    /**
     * React Table Hook
     */
    const table = useReactTable({
        data,
        columns,
        getCoreRowModel: getCoreRowModel(),
        getExpandedRowModel: getExpandedRowModel(),
    });

    /**
     * Return Statement
     */
    return (
        <div
            className={clsx(
                tw`overflow-x-auto`,
                tw`bg-zinc-100 dark:bg-zinc-950`,
                tw`rounded-lg border border-zinc-300 dark:border-zinc-600`,
                tw`drop-shadow-md`,
            )}
        >
            <button onClick={handleExportXlsx}>Export to XLSX</button>
            <table className='w-full dark:text-zinc-100'>
                <thead>
                    {table.getHeaderGroups().map((headerGroup) => (
                        <tr key={headerGroup.id}>
                            {headerGroup.headers.map((header) => (
                                <th
                                    key={header.id}
                                    className={clsx(
                                        tw`p-3 text-left text-sm`,
                                        tw`border-b border-zinc-300 dark:border-zinc-600`,
                                        header.id === 'expander' && tw`w-5`,
                                        header.id === 'questionNumber' &&
                                            tw`w-3`,
                                        header.id === 'question' && tw`w-fit`,
                                        header.id === 'tpResponsePreview' &&
                                            tw`w-1/6`,
                                        header.id === 'aiAnalysisPreview' &&
                                            tw`w-1/6`,
                                        header.id === 'answersAlignment' &&
                                            tw`w-1/12`,
                                        header.id === 'similarityScore' &&
                                            tw`w-1/12`,
                                        header.id === 'aiConfidenceScore' &&
                                            tw`w-1/12`,
                                        header.id === 'tpConfidenceScore' &&
                                            tw`w-1/12`,
                                        header.id === 'citationsPreview' &&
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
                                                'tpResponsePreview' ||
                                                cell.column.id ===
                                                    'aiAnalysisPreview') &&
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
                                        content={row.original.tpResponseFull}
                                        row={row}
                                        title={'Third Party Response'}
                                    />
                                    <ExpandedRow
                                        content={row.original.aiAnalysisFull}
                                        row={row}
                                        title={'AI Response'}
                                    />
                                    <ExpandedRow
                                        content={row.original.citationsFull}
                                        row={row}
                                        title={`Citation(s)`}
                                    />
                                    <ExpandedRow
                                        content={row.original.pageNumbers}
                                        row={row}
                                        title={'Page(s)'}
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
    content: ReactNode | string | number | null | undefined;
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
