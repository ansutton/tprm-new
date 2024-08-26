import { useState } from 'react';
import {
    createColumnHelper,
    flexRender,
    getCoreRowModel,
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
    subRows: {
        thirdPartyResponseFull: string;
        evidenceAnalysisFull: string;
    }[];
    answersAlign: string;
    confidenceScore: string;
    similarityScore: string;
    citation: string;
};

// TODO: Be prepared to take in Python Dictionary (and possibly convert put it into this Array, or convert this Array to an Object).
const defaultData: DataItem[] = [
    {
        questionNumber: 1,
        question: 'What is his name?',
        thirdPartyResponsePreview: 'His name...',
        evidenceAnalysisPreview: 'John is...',
        subRows: [
            {
                thirdPartyResponseFull: 'His name is John.',
                evidenceAnalysisFull: 'John is his name.',
            },
        ],
        answersAlign: 'N/A',
        confidenceScore: 'N/A',
        similarityScore: 'N/A',
        citation: 'N/A',
    },
];

const columnHelper = createColumnHelper<DataItem>();

const columns = [
    columnHelper.display({
        id: 'expandContract',
        header: () => null,
        cell: () => <button>Expand/ Contract</button>,
    }),

    columnHelper.accessor('questionNumber', {
        header: () => null,
        cell: ({ getValue }) => <div>{getValue()}</div>,
    }),
    columnHelper.accessor('question', {
        header: 'Control Question',
        cell: ({ getValue }) => <div>{getValue()}</div>,
    }),
    columnHelper.accessor('thirdPartyResponsePreview', {
        header: 'Third Party Response',
        cell: ({ getValue }) => <div>{getValue()}</div>,
    }),
    columnHelper.accessor('evidenceAnalysisPreview', {
        header: 'Evidence Analysis',
        cell: ({ getValue }) => <div>{getValue()}</div>,
    }),
    columnHelper.accessor('answersAlign', {
        header: 'Answers Align',
        cell: ({ getValue }) => <div>{getValue()}</div>,
    }),
    columnHelper.accessor('confidenceScore', {
        header: 'Confidence Score',
        cell: ({ getValue }) => <div>{getValue()}</div>,
    }),
    columnHelper.accessor('similarityScore', {
        header: 'Similarity Score',
        cell: ({ getValue }) => <div>{getValue()}</div>,
    }),
    columnHelper.accessor('citation', {
        header: 'Citation',
        cell: ({ getValue }) => <div>{getValue()}</div>,
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
            subRows: questionsData.map((question, index) => ({
                thirdPartyResponseFull: excelData[index + 1][2],
                evidenceAnalysisFull: 'N/A',
            })),
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
    });

    return (
        <>
            <div>DetailedAnalysisNew</div>
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
                        <tr key={row.id}>
                            {row.getVisibleCells().map((cell) => (
                                <td key={cell.id}>
                                    {flexRender(
                                        cell.column.columnDef.cell,
                                        cell.getContext(),
                                    )}
                                </td>
                            ))}
                        </tr>
                    ))}
                </tbody>
            </table>
        </>
    );
}
