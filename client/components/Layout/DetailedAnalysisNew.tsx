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
import { tw } from '@/utils';

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

// TODO: change from Array to Object.
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
    // columnHelper.display({
    //     id: 'expandContract',
    //     cell: () => <button>Expand/Contract</button>,
    // }),

    columnHelper.accessor('questionNumber', {
        header: 'Question Number',
        cell: () => <div>1</div>,
    }),
    columnHelper.accessor('question', {
        header: 'Question',
        cell: () => <div>What is his name?</div>,
    }),
    columnHelper.accessor('thirdPartyResponsePreview', {
        header: 'Third Party Response',
        cell: () => <div>His name...</div>,
    }),
    columnHelper.accessor('evidenceAnalysisPreview', {
        header: 'Evidence Analysis',
        cell: () => <div>John is...</div>,
    }),
    columnHelper.accessor('answersAlign', {
        header: 'Answers Align',
        cell: () => <div>N/A</div>,
    }),
    columnHelper.accessor('confidenceScore', {
        header: 'Confidence Score',
        cell: () => <div>N/A</div>,
    }),
    columnHelper.accessor('similarityScore', {
        header: 'Similarity Score',
        cell: () => <div>N/A</div>,
    }),
    columnHelper.accessor('citation', {
        header: 'Citation',
        cell: () => <div>N/A</div>,
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
    const [data, _setData] = useState(() => [...defaultData]);

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
            </table>
        </>
    );
}
