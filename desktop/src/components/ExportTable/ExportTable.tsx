import { useState } from 'react';
import { ArrowDownTrayIcon } from '@heroicons/react/24/outline';
import clsx from 'clsx';
import * as XLSX from 'xlsx';
import { getTimestamp, tw } from '@/utils';

interface ExportTableProps {
    appLevelTableData: React.Dispatch<React.SetStateAction<any>>;
}

// TODO: Only show when table is ready for export.
export function ExportTable({
    appLevelTableData,
}: ExportTableProps): JSX.Element {
    // const [rowsState, setRowsState] = useState<any>(appLevelTableData.getRowModel().rows.map((row: any) => row.original);

    function handleExportTable() {
        // Manually set column titles
        const columnTitles = [
            'Control Question',
            'Third Party Response',
            'AI Response',
            'Responses Align',
            'Similarity Score',
            'AI Confidence Score',
            'Third Party Confidence Score',
            'Citation(s)',
        ];
        // Extract data from the table
        // const rows = table.getRowModel().rows.map((row: any) => row.original);
        // setRowsState(rows);
        /*if (rows.length === 0) {
        console.error('No data available for export.');
        return;
    }
    // Prepare data rows under column titles using the "full" fields
    const worksheetData = [
        columnTitles,
        ...rows.map((row: any) => [
            row.question,
            row.tpResponseFull,
            row.aiAnalysisFull,
            row.answersAlignment,
            row.similarityScore,
            row.aiConfidenceScore,
            row.tpConfidenceScore,
            row.citationsFull,
        ]),
    ];
    // Create worksheet and workbook
    const worksheet = XLSX.utils.aoa_to_sheet(worksheetData);
    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, worksheet, 'Sheet1');
    // Generate filename with timestamp and export
    const timestamp = getTimestamp();
    const fullFilename = `tprm-detailed-analysis-${timestamp}.xlsx`;
    XLSX.writeFile(workbook, fullFilename);
    console.log('Export button clicked');
    */
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
