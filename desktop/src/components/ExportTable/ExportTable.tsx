import { useState } from 'react';
import * as XLSX from 'xlsx';
import { getTimestamp } from '@/utils';

interface ExportTableProps {
    table: any;
}

export function ExportTable({ table }: ExportTableProps): JSX.Element {
    const [rowsState, setRowsState] = useState<any>(null);

    function handleExportTable() {
        // Manually set column titles
        const columnTitles = [
            'Control Question',
            'Third Party Response',
            'AI Response',
            'Answers Align',
            'Similarity Score',
            'AI Confidence Score',
            'Third Party Confidence Score',
            'Citation(s)',
        ];
        // Extract data from the table
        const rows = table.getRowModel().rows.map((row: any) => row.original);
        setRowsState(rows);
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
        <>
            <>ExportTable</>
        </>
    );
}
