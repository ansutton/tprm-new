import { ArrowDownTrayIcon } from '@heroicons/react/24/outline';
import clsx from 'clsx';
import { LlmResponse } from '@/types';
import { getTimestamp, tw } from '@/utils';

interface ExportTableProps {
    llmResponse?: LlmResponse;
    questionsData?: string[];
}

export function ExportTable({ llmResponse, questionsData }: ExportTableProps): JSX.Element {
    const data = [
        { question: 'xyz', tp_response: 'abc', ai_response: 'def', citations: 'ghi', answersAlign: true },
        { question: 'xyz', tp_response: 'abc', ai_response: 'def', citations: 'ghi', answersAlign: true },
    ];

    function convertToCSV(data: { [key: string]: any }[]) {
        const csvRows: string[] = [];

        const headerKeys = Object.keys(data[0]);
        const headersTitles = ['Control Question', 'Third Party Response', 'AI Response', 'Citation(s)', 'Responses Align?'];
        csvRows.push(headersTitles.join(','));
        // console.log('🚀 ~ convertToCSV ~ csvRows:', csvRows);

        data.forEach((row) => {
            const values = headerKeys.map((headerKey) => {
                const escaped = ('' + row[headerKey]).replace(/"/g, '\\"');
                return `"${escaped}"`;
            });
            csvRows.push(values.join(','));
        });

        console.log("🚀 ~ convertToCSV ~ csvRows.join('\n'):", csvRows.join('\n'));
        return csvRows.join('\n');
    }

    function downloadCSV() {
        const csvData = convertToCSV(data);
        const blob = new Blob([csvData], { type: 'text/csv' });
        const url = window.URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.setAttribute('hidden', '');
        a.setAttribute('href', url);
        a.setAttribute('download', 'data.csv');
        document.body.appendChild(a);
        a.click();
        document.body.removeChild(a);
    }

    return (
        <button
            onClick={downloadCSV}
            className={clsx(tw`w-fit whitespace-nowrap rounded-lg p-2`, tw`hover:cursor-pointer hover:bg-zinc-200 dark:hover:bg-zinc-800`, tw`flex items-center gap-1.5`, tw`focus:outline-none`)}
        >
            <span className={clsx(tw`float-right text-sm`, tw`font-bold`, tw`text-indigo-600`, tw`dark:text-indigo-400`)}>Export Table</span>
            <ArrowDownTrayIcon className={clsx(tw`size-4`, tw`stroke-indigo-600 stroke-2`, tw`dark:stroke-indigo-400`)} />
        </button>
    );
}
