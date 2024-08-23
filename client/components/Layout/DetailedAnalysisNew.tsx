import clsx from 'clsx';
import { Card, Heading, Tooltip } from '@/components';
import { LlmResponse } from '@/types';
import { tw } from '@/utils';

import React, { useState } from 'react';
import { DataTable } from 'primereact/datatable';
import { Column } from 'primereact/column';
import 'primereact/resources/themes/saga-blue/theme.css'; // Import theme
import 'primereact/resources/primereact.min.css'; // Core CSS
import 'primeicons/primeicons.css'; // Icons

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
    // Add more rows here...
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
    const [expandedRows, setExpandedRows] = useState<any>(null);

    const onRowToggle = (e: any) => {
        setExpandedRows(e.data);
    };

    const rowExpansionTemplate = (rowData: Data) => {
        return (
            <div className='p-3'>
                <h5>Expanded Content for {rowData.name}</h5>
                <p>Email: {rowData.email}</p>
                <p>Country: {rowData.country}</p>
            </div>
        );
    };

    return (
        <>
            <div>DetailedAnalysisNew</div>
            <div>PrimeReactExample</div>
            <DataTable
                value={data}
                expandedRows={expandedRows}
                onRowToggle={onRowToggle}
                rowExpansionTemplate={rowExpansionTemplate}
                dataKey='id' // Ensures unique row identification
                responsiveLayout='scroll'
            >
                <Column expander style={{ width: '3em' }} />
                <Column field='name' header='Name' />
                <Column field='age' header='Age' />
                <Column field='email' header='Email' />
                <Column field='country' header='Country' />
                <Column field='city' header='City' />
                <Column field='job' header='Job' />
            </DataTable>
        </>
    );
}
