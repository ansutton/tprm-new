import { Fragment, ReactNode, useEffect, useRef, useState } from 'react';
import { ArrowPathIcon, ChevronDownIcon } from '@heroicons/react/24/outline';
import {
    Column,
    ColumnFiltersState,
    createColumnHelper,
    flexRender,
    getCoreRowModel,
    getExpandedRowModel,
    getFilteredRowModel,
    Header,
    Row,
    useReactTable,
} from '@tanstack/react-table';
import clsx from 'clsx';
import * as XLSX from 'xlsx';
import { DebouncedInput, Pages, Tooltip } from '@/components';
import {
    DataItem,
    DataItemField,
    LlmResponse,
    TableHeaderProps,
} from '@/types';
import { displayScore, handleAnswersAlign, truncate, tw } from '@/utils';

/**
 * Constants
 */
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
        enableColumnFilter: false,
    }),

    columnHelper.accessor('questionNumber', {
        header: () => (
            <TableHeader headerContent='#' additionalClasses='invisible' />
        ),
        cell: ({ getValue }) => getValue(),
    }),
    columnHelper.accessor('question', {
        header: () => <TableHeader headerContent='Control Question' />,
        cell: ({ getValue }) => getValue(),
    }),
    columnHelper.accessor('tpResponsePreview', {
        header: () => (
            <TableHeader
                headerContent='Third Party Response'
                infoContent={`The third party's response to the question`}
            />
        ),
        cell: ({ getValue }) => getValue(),
    }),
    columnHelper.accessor('aiAnalysisPreview', {
        header: () => (
            <TableHeader
                headerContent={
                    <>
                        <span>AI Response</span>
                        <Asterisk />
                    </>
                }
                infoContent={`The AI's response to the question`}
            />
        ),
        cell: ({ getValue }) => getValue(),
    }),
    columnHelper.accessor('citationsPreview', {
        header: () => (
            <TableHeader
                headerContent={
                    <>
                        <span>Citation(s)</span>
                        <Asterisk />
                    </>
                }
                infoContent={`Page #(s) with relevant excerpt(s) from the provided evidence document(s) used to generate the AI's response`}
            />
        ),
        cell: ({ getValue }) => getValue(),
    }),
    columnHelper.accessor('answersAlign', {
        header: () => (
            <TableHeader
                headerContent='Responses Align?'
                infoContent={`Does the third party response align with the AI generated response?`}
            />
        ),
        cell: ({ getValue }) => getValue(),
    }),
    // columnHelper.accessor('similarityScore', {
    //     header: () => (
    //         <TableHeader
    //             headerContent='Similarity Score'
    //             infoContent={`Measures how similar the app's response is to the third-party response, with higher scores indicating stronger similarity. Similarity is based on the meaning and context of the responses, rather than exact wording.`}
    //         />
    //     ),
    //     cell: ({ getValue }) => getValue(),
    // }),
    // columnHelper.accessor('aiConfidenceScore', {
    //     header: () => (
    //         <TableHeader
    //             headerContent='AI Confidence Score'
    //             infoContent={`How confident is the AI when determining whether its response aligns with the third party response? (0-100%)`}
    //         />
    //     ),
    //     cell: ({ getValue }) => getValue(),
    // }),
    // columnHelper.accessor('tpConfidenceScore', {
    //     header: () => (
    //         <TableHeader
    //             headerContent='Third Party Confidence Score'
    //             infoContent={`Measures how accurate the Third Party's response is to the evidence documentation taking the related question into account, with higher scores indicating stronger accuracy. Accuracy is based on the content of the response up against the relevant sections.`}
    //         />
    //     ),
    //     cell: ({ getValue }) => getValue(),
    // }),
];

/**
 * Components
 */
function TableHeader({
    additionalClasses = '',
    headerContent,
    infoContent,
}: TableHeaderProps): JSX.Element {
    return (
        <div className={clsx(additionalClasses, tw`flex items-center gap-1.5`)}>
            <span>{headerContent}</span>
            {infoContent && <Tooltip>{infoContent}</Tooltip>}
        </div>
    );
}

function Asterisk(): JSX.Element {
    return <span className='text-indigo-500/85 dark:text-indigo-400'>*</span>;
}
interface DetailedAnalysisProps {
    tpResponsesFile: File | null;
    tpResponsesData: any[][];
    llmResponse: LlmResponse;
    questionsData: string[];
    setAppLevelTableData: React.Dispatch<React.SetStateAction<any>>;
}

export function DetailedAnalysis({
    tpResponsesFile,
    tpResponsesData,
    llmResponse,
    questionsData,
    setAppLevelTableData,
}: DetailedAnalysisProps): JSX.Element {
    /**
     * State Hooks
     */
    const [data, setData] = useState(handleData());
    const [columnFilters, setColumnFilters] = useState<ColumnFiltersState>([]);

    /**
     * Ref Hook and Export
     */
    const tableRef = useRef<HTMLTableElement>(null);
    function handleExportTable() {
        if (!tableRef.current) {
            console.error('Table element not found');
            return;
        }
        const workbook = XLSX.utils.table_to_book(tableRef.current);
        XLSX.writeFile(workbook, 'test.xlsx');
    }

    /**
     * Helper Function: Data Handler
     */
    function handleData() {
        return () =>
            questionsData.map((question, index) => ({
                questionNumber: index + 1,
                question: question,
                tpResponsePreview:
                    tpResponsesData.length === 0
                        ? 'No Third Party Responses selected'
                        : truncate(tpResponsesData[index + 1][2], 40),
                aiAnalysisPreview: handleSpinner(
                    truncate(
                        llmResponse?.analyses[`analysis_${index}`]?.ai_analysis,
                        40,
                    ),
                ),
                citationsPreview: (
                    <>
                        {llmResponse?.analyses[`analysis_${index}`]
                            ?.citations ? (
                            <>
                                {llmResponse?.analyses[`analysis_${index}`]
                                    ?.citations?.length === 0
                                    ? 'Not found.'
                                    : llmResponse?.analyses[
                                          `analysis_${index}`
                                      ]?.citations?.map((citation, index) => (
                                          <Fragment key={index}>
                                              <span className='select-none whitespace-nowrap'>
                                                  {`${citation[0]} Page ${citation[1]}`}
                                              </span>
                                              {/* {index + 1 !==
                                            llmResponse?.analyses[
                                                `analysis_${index}`
                                            ]?.pages?.length &&
                                            (llmResponse?.analyses[
                                                `analysis_${index}`
                                            ]?.pages?.length ?? 0) > 1 &&
                                            ', '} */}
                                          </Fragment>
                                      ))}
                            </>
                        ) : (
                            <ArrowPathIcon className='size-5 animate-spin stroke-2 text-indigo-800 dark:text-indigo-500' />
                        )}
                    </>
                ),
                answersAlign: tpResponsesFile
                    ? handleSpinner(
                          handleAnswersAlign(
                              tpResponsesData,
                              llmResponse?.analyses[`analysis_${index}`]
                                  ?.answers_align,
                          ),
                      )
                    : 'N/A',
                // similarityScore: handleSpinner(
                //     displayScore(
                //         llmResponse?.analyses[`analysis_${index}`]
                //             ?.similarity_score,
                //     ),
                // ),
                // aiConfidenceScore: handleSpinner(
                //     displayScore(
                //         llmResponse?.analyses[`analysis_${index}`]
                //             ?.ai_confidence_score,
                //     ),
                // ),
                // tpConfidenceScore: handleSpinner(
                //     displayScore(
                //         llmResponse?.analyses[`analysis_${index}`]
                //             ?.tp_confidence_score,
                //     ),
                // ),
                // 'N/A',
                tpResponseFull:
                    tpResponsesData.length === 0
                        ? 'No Third Party Responses selected'
                        : tpResponsesData[index + 1][2],
                aiAnalysisFull: handleSpinner(
                    llmResponse?.analyses[`analysis_${index}`]?.ai_analysis,
                ),
                citationsFull: (
                    <div className='space-y-4'>
                        {handleSpinner(
                            llmResponse?.analyses[`analysis_${index}`]
                                ?.citations?.length === 0
                                ? 'Not found.'
                                : llmResponse?.analyses[
                                      `analysis_${index}`
                                  ]?.citations?.map((citation, index) => (
                                      <Fragment key={index}>
                                          <p>
                                              {`${citation[0]} (${citation[3]}) Page ${citation[1]}`}
                                          </p>
                                          <p>"...{citation[2]}..."</p>
                                      </Fragment>
                                  )),
                        )}
                    </div>
                ),
                // pageNumbers: <Pages index={index} llmResponse={llmResponse} />,
            }));
    }
    /**
     * Helper Functions: Utilities
     */
    // TODO: Refactor to a component (e.g. <SpinnerResolver field='...' />, return <>field</> if resolved).
    function handleSpinner(field: DataItemField): ReactNode {
        return field ? (
            field
        ) : (
            <ArrowPathIcon className='size-5 animate-spin stroke-2 text-indigo-800 dark:text-indigo-500' />
        );
    }

    /**
     * Effect Hook
     */
    useEffect(() => {
        setData(handleData());
        setAppLevelTableData(handleData());
        // console.log('🚀 ~ llmResponse:', llmResponse);
    }, [llmResponse]);

    /**
     * React Table Hook
     */
    const table = useReactTable({
        columns,
        data,
        state: {
            columnFilters,
        },
        onColumnFiltersChange: setColumnFilters,
        getCoreRowModel: getCoreRowModel(),
        getExpandedRowModel: getExpandedRowModel(),
        getFilteredRowModel: getFilteredRowModel(),
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
            <table ref={tableRef} className='w-full dark:text-zinc-100'>
                <thead>
                    {table.getHeaderGroups().map((headerGroup) => (
                        <tr key={headerGroup.id}>
                            {headerGroup.headers.map((header) => (
                                <th
                                    key={header.id}
                                    className={clsx(
                                        tw`space-y-2 whitespace-nowrap p-3 text-left text-sm`,
                                        tw`border-b border-zinc-300 dark:border-zinc-600`,
                                        header.id === 'expander'
                                            ? tw`align-center w-5`
                                            : tw`align-top`,
                                        header.id === 'questionNumber' &&
                                            tw`w-3`,
                                        header.id === 'question' && tw`w-fit`,
                                        header.id === 'tpResponsePreview' &&
                                            tw`w-1/6`,
                                        header.id === 'aiAnalysisPreview' &&
                                            tw`w-1/6`,
                                        header.id === 'citationsPreview' &&
                                            tw`w-1/6`,
                                        header.id === 'answersAlign' &&
                                            tw`w-1/6`,
                                        // header.id === 'similarityScore' &&
                                        // tw`w-1/12`,
                                        // header.id === 'aiConfidenceScore' &&
                                        // tw`w-1/12`,
                                        // header.id === 'tpConfidenceScore' &&
                                        // tw`w-1/12`,
                                    )}
                                >
                                    {header.isPlaceholder
                                        ? null
                                        : flexRender(
                                              header.column.columnDef.header,
                                              header.getContext(),
                                          )}
                                    <Filter
                                        additionalClasses={clsx(
                                            header.id === 'questionNumber' &&
                                                tw`hidden`,
                                            header.id === 'tpResponsePreview' &&
                                                tw`hidden`,
                                            header.id === 'aiAnalysisPreview' &&
                                                tw`hidden`,
                                            header.id === 'citationsPreview' &&
                                                tw`hidden`,
                                        )}
                                        column={header.column}
                                        header={header}
                                    />
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
                                    // tw`transition-all duration-200 ease-out`,
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
                                                    'aiAnalysisPreview' ||
                                                cell.column.id ===
                                                    'citationsPreview') && [
                                                tw`relative select-none overflow-hidden whitespace-nowrap`,
                                            ],
                                        )}
                                    >
                                        <div
                                            className={clsx(
                                                (cell.column.id ===
                                                    'tpResponsePreview' ||
                                                    cell.column.id ===
                                                        'aiAnalysisPreview' ||
                                                    cell.column.id ===
                                                        'citationsPreview') && [
                                                    tw`absolute inset-0 flex w-full items-center p-3`,
                                                ],
                                            )}
                                        >
                                            <div>
                                                {flexRender(
                                                    cell.column.columnDef.cell,
                                                    cell.getContext(),
                                                )}
                                            </div>
                                        </div>
                                        <div
                                            className={clsx(
                                                (cell.column.id ===
                                                    'tpResponsePreview' ||
                                                    cell.column.id ===
                                                        'aiAnalysisPreview' ||
                                                    cell.column.id ===
                                                        'citationsPreview') && [
                                                    tw`absolute inset-y-0 right-0 w-1/2`,
                                                    tw`bg-gradient-to-r from-transparent to-90%`,
                                                    tw`group-hover:transition-all group-hover:duration-200 group-hover:ease-out`,
                                                    row.getIsExpanded()
                                                        ? [
                                                              tw`to-zinc-200`,
                                                              tw`dark:to-zinc-900`,
                                                          ]
                                                        : [
                                                              tw`to-zinc-100 group-hover:to-zinc-200`,
                                                              tw`dark:to-zinc-950 dark:group-hover:to-zinc-900`,
                                                          ],
                                                ],
                                            )}
                                        />
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
                                    {/* <ExpandedRow
                                        content={row.original.pageNumbers}
                                        row={row}
                                        title={'Page(s)'}
                                    /> */}
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
            <td
                colSpan={3}
                className='py-3 pl-[103.5px] pr-3 align-top text-sm'
            >
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

function Filter({
    additionalClasses = '',
    column,
    header,
}: {
    additionalClasses?: string;
    column: Column<any, unknown>;
    header: Header<DataItem, unknown>;
}): JSX.Element {
    const columnFilterValue = column.getFilterValue();

    return (
        <DebouncedInput
            className={clsx(
                additionalClasses,
                tw`w-full rounded border p-1 font-normal`,
                tw`border-indigo-400 bg-zinc-50`,
                tw`dark:border-indigo-400/50 dark:bg-zinc-900 dark:text-zinc-100`,
                header.id === 'expander' && tw`hidden`,
                // header.id ===
                //     'questionNumber' &&
                //     tw`w-full`,
                // header.id === 'question' &&
                //     tw`w-full`,
                // header.id ===
                //     'tpResponsePreview' &&
                //     tw`w-full`,
                // header.id ===
                //     'aiAnalysisPreview' &&
                //     tw`w-w-full`,
                // header.id ===
                //     'citationsPreview' &&
                //     tw`w-full`,
                // header.id === 'answersAlign' &&
                //     tw`w-full`,
            )}
            debounce={400}
            onChange={(value) => column.setFilterValue(value)}
            placeholder='Search...'
            type='text'
            value={(columnFilterValue ?? '') as string}
        />
    );
}

