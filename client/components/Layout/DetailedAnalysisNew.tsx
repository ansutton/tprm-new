import clsx from 'clsx';
import { DataTable } from 'primereact/datatable';
import { Column } from 'primereact/column';
import { Card, Heading, Tooltip } from '@/components';
import { LlmResponse } from '@/types';
import { tw } from '@/utils';

interface Product {
    id: string;
    name: string;
    category: string;
    quantity: number;
}

const products = [
    {
        id: '1',
        name: 'Shirt',
        category: 'Clothing',
        quantity: 5,
    },
    {
        id: '2',
        name: 'Watch',
        category: 'Accessories',
        quantity: 6,
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
    return (
        <>
            <div>DetailedAnalysisNew</div>
            <div>PrimeReactExample</div>
            <DataTable value={products} tableStyle={{ minWidth: '50rem' }}>
                <Column field='name' header='Name' />
                <Column field='category' header='Category' />
                <Column field='quantity' header='Quantity' />
            </DataTable>
        </>
    );
}
