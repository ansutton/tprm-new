import React, { useMemo, useState } from 'react';
import {
    ColumnDef,
    ExpandedState,
    useReactTable,
    getCoreRowModel,
    getExpandedRowModel,
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
    llmResponse: any;
    questionsData: string[];
}

export function DetailedAnalysisNew({
    excelData,
    llmResponse,
    questionsData,
}: DetailedAnalysisNewProps): JSX.Element {
    const [expandedRows, setExpandedRows] = useState<ExpandedState>({});

    const columns = useMemo<ColumnDef<Data>[]>(
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

    const table = useReactTable({
        data,
        columns,
        state: {
            expanded: expandedRows,
        },
        getCoreRowModel: getCoreRowModel(),
        getExpandedRowModel: getExpandedRowModel(),
        onExpandedChange: setExpandedRows,
        getRowCanExpand: () => true,
    });

    const toggleAllRows = () => {
        const allExpanded = Object.keys(expandedRows).length === data.length;
        const newExpandedRows = allExpanded
            ? {}
            : data.reduce((acc, row) => {
                  acc[String(row.id)] = true; // Ensure row.id is a string
                  return acc;
              }, {} as ExpandedState);
        setExpandedRows(newExpandedRows);
    };

    return (
        <>
            <div>DetailedAnalysisNew</div>
            <div>TanStack Table Example</div>
            <button
                onClick={toggleAllRows}
                className='mb-3 rounded bg-blue-500 px-3 py-1 text-white'
            >
                {Object.keys(expandedRows).length === data.length
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
                                        : header.column.columnDef.header
                                          ? typeof header.column.columnDef
                                                .header === 'function'
                                              ? header.column.columnDef.header(
                                                    header.getContext(),
                                                )
                                              : null
                                          : null}
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
                                        {cell.column.columnDef.cell
                                            ? typeof cell.column.columnDef
                                                  .cell === 'function'
                                                ? cell.column.columnDef.cell(
                                                      cell.getContext(),
                                                  )
                                                : null
                                            : null}
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
