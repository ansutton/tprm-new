import { useState } from 'react';
import { ArrowDownTrayIcon } from '@heroicons/react/24/outline';
import clsx from 'clsx';
import * as XLSX from 'xlsx';
import { getTimestamp, tw } from '@/utils';

interface ExportTableProps {
    appLevelTableData: any[];
}

// TODO: Only show when table is ready for export.
export function ExportTable({
    appLevelTableData,
}: ExportTableProps): JSX.Element {
    const [worksheetDataState, setWorksheetDataState] = useState<any[]>([]);

    function handleExportTable() {
        const tableHeaderRow = [
            '#',
            'Control Question',
            'Third Party Response',
            'AI Response',
            'Responses Align',
            'Similarity Score',
            'AI Confidence Score',
            'Third Party Confidence Score',
            'Citation(s)',
            'Page(s)',
        ];
        const tableBodyRows = appLevelTableData.map((row) => [
            // row.questionNumber.toString(),
            // row.question.toString(),
            // row.tpResponseFull.toString(),
            // row.aiResponseFull.toString(),
            // row.answersAlign.toString(),
            // row.similarityScore.toString(),
            // row.aiConfidenceScore.toString(),
            // row.tpConfidenceScore.toString(),
            // row.citationsFull.toString(),
            // row.pageNumbers.toString(),
            row.questionNumber.toString(),
            row.question,
            row.tpResponseFull,
            row.aiResponseFull,
            row.answersAlign,
            row.similarityScore,
            row.aiConfidenceScore,
            row.tpConfidenceScore,
            row.citationsFull,
            row.pageNumbers,
        ]);
        // const tableRows = [
        //     [...tableHeaderRow],
        //     // ['1', '2', '3', '4', '5', '6', '7', '8', '9', '10'],
        //     ['a', 'b', 'c', 'd', 'e', 'f', 'g', 'h', 'i', 'j'],
        // ];
        const data = [
            ['Alice', '30', 'New York'],
            ['Bob', '25', 'London'],
            ['Charlie', '35', 'Paris'],
        ];
        const tableRows = [
            { name: 'Alice', age: 30, city: 'New York' },
            { name: 'Bob', age: 25, city: 'London' },
            { name: 'Charlie', age: 35, city: 'Paris' },
        ];

        //   const exportToExcel = () => {
        //     const worksheet = XLSX.utils.book_new();
        //     const ws = XLSX.utils.aoa_to_sheet(data);
        //     XLSX.utils.book_append_sheet(worksheet, ws, 'Sheet1');
        //     XLSX.writeFile(worksheet, 'exported-data.xlsx');
        //   };
        if (tableRows.length === 0) {
            console.error('No data available for export.');
            return;
        }
        const worksheetData = [tableRows];
        setWorksheetDataState(tableRows);
        console.log('🚀 ~ handleExportTable ~ worksheetData:', worksheetData);
        const worksheet = XLSX.utils.aoa_to_sheet(worksheetData);
        const workbook = XLSX.utils.book_new();
        XLSX.utils.book_append_sheet(workbook, worksheet, 'Sheet1');
        // Generate filename with timestamp and export
        const timestamp = getTimestamp();
        const fullFilename = `tprm-detailed-analysis-${timestamp}.xlsx`;
        XLSX.writeFile(workbook, fullFilename);
        console.log('Export button clicked');
    }
    return (
        <button
            onClick={handleExportTable}
            className={clsx(
                tw`w-fit whitespace-nowrap rounded-lg p-2`,
                tw`hover:cursor-pointer hover:bg-zinc-200 dark:hover:bg-zinc-800`,
                tw`flex items-center gap-1.5`,
                tw`focus:outline-none`,
            )}
        >
            <span
                className={clsx(
                    tw`float-right text-sm`,
                    tw`font-bold`,
                    tw`text-indigo-600`,
                    tw`dark:text-indigo-400`,
                )}
            >
                Export Table
            </span>
            <ArrowDownTrayIcon
                className={clsx(
                    tw`size-4`,
                    tw`stroke-indigo-600 stroke-2`,
                    tw`dark:stroke-indigo-400`,
                )}
            />
        </button>
    );
}
