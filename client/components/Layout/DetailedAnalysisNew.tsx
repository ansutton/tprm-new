import clsx from 'clsx';
import { DataTable } from 'primereact/datatable';
import { Column } from 'primereact/column';
import { Card, Heading, Tooltip } from '@/components';
import { LlmResponse } from '@/types';
import { tw } from '@/utils';

interface DataTableItem {
    questionNumber: string;
    question: string | undefined;
    tpResponse: string | undefined;
}

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
    const dataTableItems: DataTableItem[] = questionsData?.map(
        (question, index) => ({
            questionNumber: (index + 1).toString(),
            question: question,
            tpResponse: llmResponse?.responses[index],
        }),
    );
    const columns = [
        {
            field: 'questionNumber',
            header: 'Question Number',
        },
        {
            field: 'question',
            header: 'Control Question',
        },
        {
            field: 'tpResponse',
            header: 'TP Response',
        },
    ];

    return (
        <>
            <div>DetailedAnalysisNew</div>
            <div>PrimeReactExample</div>
            <Card>
                <DataTable
                    className={clsx(tw``)}
                    value={dataTableItems}
                    removableSort
                    stripedRows
                >
                    {columns.map(({ field, header }, index) => (
                        <Column
                            key={index}
                            field={field}
                            header={header}
                            sortable
                            className={clsx(tw`cursor-pointer`)}
                        />
                    ))}
                </DataTable>
            </Card>
        </>
    );
}
