import * as XLSX from 'xlsx';
import { getTimestamp } from '@/utils';

export function handleExportXlsx(table?: any) {
    // Extract data from the table
    // const data = table.getRowModel().rows.map((row: any) => row.original);
    // if (data.length === 0) {
    //     console.error('No data available for export.');
    //     return;
    // }
    // Define column titles for the export
    const columnTitles = [
        'Control Question',
        'Third Party Response',
        'AI Response',
        'Answers Align',
        'Similarity Score',
        'Evidence Analysis Confidence Score',
        'Third Party Confidence Score',
        'Citation(s)',
    ];
    // Prepare data rows under column titles using the "full" fields
    const worksheetData = [
        columnTitles,
        ...data.map((row: any) => [
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
}
