import { Fragment, useState } from 'react';
import {
    createColumnHelper,
    flexRender,
    getCoreRowModel,
    getExpandedRowModel,
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

const columns = [
    columnHelper.display({
        id: 'expandContract',
        header: () => null,
        cell: ({ row }) => (
            <button onClick={() => row.toggleExpanded()}>
                {row.getIsExpanded() ? 'Contract' : 'Expand'}
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
        <table>
            <thead>
                {table.getHeaderGroups().map((headerGroup) => (
                    <tr key={headerGroup.id}>
                        {headerGroup.headers.map((header) => (
                            <th key={header.id}>
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

            <tbody>
                {table.getRowModel().rows.map((row) => (
                    <Fragment key={row.id}>
                        <tr>
                            {row.getVisibleCells().map((cell) => (
                                <td key={cell.id}>
                                    {flexRender(
                                        cell.column.columnDef.cell,
                                        cell.getContext(),
                                    )}
                                </td>
                            ))}
                        </tr>
                        {row.getIsExpanded() && (
                            <>
                                <tr>
                                    <td
                                        colSpan={row.getVisibleCells().length}
                                        className='pl-4'
                                    >
                                        <p>Third Party Response</p>
                                        <p>
                                            {
                                                row.original
                                                    .thirdPartyResponseFull
                                            }
                                        </p>
                                    </td>
                                </tr>
                                <tr>
                                    <td
                                        colSpan={row.getVisibleCells().length}
                                        className='pl-4'
                                    >
                                        <p>Evidence Analysis</p>
                                        <p>
                                            {row.original.evidenceAnalysisFull}
                                        </p>
                                    </td>
                                </tr>
                            </>
                        )}
                    </Fragment>
                ))}
            </tbody>
        </table>
    );
}
