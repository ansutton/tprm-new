import clsx from 'clsx';
import { Card, Heading, Tooltip } from '@/components';
import { LlmResponse } from '@/types';
import { tw } from '@/utils';

import React, { useMemo, useState } from 'react';
import {
    useTable,
    useExpanded,
    ColumnDef,
    TableInstance,
} from '@tanstack/react-table';
import 'tailwindcss/tailwind.css'; // Ensure Tailwind is set up

type Data = {
    id: number;
    name: string;
    age: number;
    email: string;
    country: string;
    city: string;
    job: string;
};

const data: Data[] = [
    {
        id: 1,
        name: 'John Doe',
        age: 28,
        email: 'john@example.com',
        country: 'USA',
        city: 'New York',
        job: 'Developer',
    },
    {
        id: 2,
        name: 'Jane Smith',
        age: 32,
        email: 'jane@example.com',
        country: 'Canada',
        city: 'Toronto',
        job: 'Designer',
    },
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
    const [expandedRows, setExpandedRows] = useState<number[]>([]);

    const columns: ColumnDef<Data>[] = useMemo(
        () => [
            {
                id: 'expander',
                header: () => null,
                cell: ({ row }) => (
                    <button onClick={() => row.toggleExpanded()}>
                        {row.getIsExpanded() ? '−' : '+'}
                    </button>
                ),
            },
            { accessorKey: 'name', header: 'Name' },
            { accessorKey: 'age', header: 'Age' },
            { accessorKey: 'email', header: 'Email' },
            { accessorKey: 'country', header: 'Country' },
            { accessorKey: 'city', header: 'City' },
            { accessorKey: 'job', header: 'Job' },
        ],
        [],
    );

    const table = useTable({
        data,
        columns,
        getRowCanExpand: () => true, // Enables row expansion
        state: {
            expanded: expandedRows.reduce(
                (prev, curr) => {
                    prev[curr] = true;
                    return prev;
                },
                {} as Record<number, boolean>,
            ),
        },
        onExpandedChange: (expanded) => {
            const newExpandedRows = Object.keys(expanded)
                .filter((key) => expanded[Number(key)])
                .map(Number);
            setExpandedRows(newExpandedRows);
        },
    });

    const toggleAllRows = () => {
        if (expandedRows.length === data.length) {
            setExpandedRows([]); // Contract all rows
        } else {
            setExpandedRows(data.map((row) => row.id)); // Expand all rows
        }
    };

    return (
        <>
            <div>DetailedAnalysisNew</div>
            <div>TanStack Table Example</div>
            <button
                onClick={toggleAllRows}
                className='mb-3 rounded bg-blue-500 px-3 py-1 text-white'
            >
                {expandedRows.length === data.length
                    ? 'Contract All'
                    : 'Expand All'}
            </button>
            <table className='min-w-full border-collapse'>
                <thead>
                    {table.getHeaderGroups().map((headerGroup) => (
                        <tr key={headerGroup.id}>
                            {headerGroup.headers.map((header) => (
                                <th key={header.id} className='border p-2'>
                                    {header.isPlaceholder
                                        ? null
                                        : header.renderHeader()}
                                </th>
                            ))}
                        </tr>
                    ))}
                </thead>
                <tbody>
                    {table.getRowModel().rows.map((row) => (
                        <React.Fragment key={row.id}>
                            <tr>
                                {row.getVisibleCells().map((cell) => (
                                    <td key={cell.id} className='border p-2'>
                                        {cell.renderCell()}
                                    </td>
                                ))}
                            </tr>
                            {row.getIsExpanded() && (
                                <tr>
                                    <td
                                        colSpan={columns.length}
                                        className='border p-2'
                                    >
                                        <div className='p-3'>
                                            <h5>
                                                Expanded Content for{' '}
                                                {row.original.name}
                                            </h5>
                                            <p>Email: {row.original.email}</p>
                                            <p>
                                                Country: {row.original.country}
                                            </p>
                                        </div>
                                    </td>
                                </tr>
                            )}
                        </React.Fragment>
                    ))}
                </tbody>
            </table>
        </>
    );
}
