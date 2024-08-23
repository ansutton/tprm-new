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

type Data = {
    questionNumber: number;
    questionPreview: string;
    tpResponsePreview: string;
    subRows: {
        questionFull: string;
        tpResponseFull: string;
    }[];
    answersAlign: string;
    confidenceScore: string;
    similarityScore: string;
    citation: string;
}[];

const defaultData: Data = [
    {
        questionNumber: 1,
        questionPreview: 'What is...',
        tpResponsePreview: 'My name...',
        subRows: [
            {
                questionFull: 'What is your name?',
                tpResponseFull: 'My name is John.',
            },
        ],
        answersAlign: 'N/A',
        confidenceScore: 'N/A',
        similarityScore: 'N/A',
        citation: 'N/A',
    },
];

const columnHelper = createColumnHelper<Data>();

const columns = [
    // columnHelper.display({
    //     id: 'expandContract',
    //     cell: () => <button>Expand/Contract</button>,
    // }),

    columnHelper.accessor('questionNumber', {
        header: 'Question Number',
        cell: () => <div>1</div>,
    }),
    columnHelper.accessor('questionPreview', {
        header: 'Question',
        cell: () => <div>What is...</div>,
    }),
    columnHelper.accessor('tpResponsePreview', {
        header: 'TP Response',
        cell: () => <div>My name...</div>,
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
            <div>PrimeReactExample</div>
            <table>
                <thead>
                    {table.getHeaderGroups().map(headerGroup => ()}
                </thead>
            </table>
        </>
    );
}
