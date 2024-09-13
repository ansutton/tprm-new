import { ArrowDownTrayIcon } from '@heroicons/react/24/outline';
import clsx from 'clsx';
import { LlmResponse } from '@/types';
import { getTimestamp, tw } from '@/utils';

interface ExportTableProps {
    llmResponse: LlmResponse;
    questionsData?: string[];
}

export function ExportTable({
    llmResponse,
    questionsData,
}: ExportTableProps): JSX.Element {
    // Function to escape CSV values (handling commas, newlines, double quotes)
    function escapeCSVValue(value: string | number | boolean): string {
        const stringValue = String(value); // Ensure all values are treated as strings
        if (
            stringValue.includes(',') ||
            stringValue.includes('\n') ||
            stringValue.includes('"')
        ) {
            return `"${stringValue.replace(/"/g, '""')}"`; // Escape double quotes and wrap in quotes if needed
        }
        return stringValue;
    }

    // Convert LlmResponse object to CSV format
    function convertToCSV(llmResponse: LlmResponse) {
        const csvRows: string[] = [];

        // Check that the analyses field exists in llmResponse
        if (!llmResponse || !llmResponse.analyses) {
            console.error('llmResponse or analyses are undefined');
            return '';
        }

        // Define CSV headers
        const headersTitles = [
            'Control Question',
            'Third Party Response',
            'AI Response',
            'Citation(s)',
            'Responses Align?',
        ];
        csvRows.push(headersTitles.join(',')); // Add headers to the CSV

        // Iterate through analyses in llmResponse
        Object.keys(llmResponse.analyses).forEach((analysisKey) => {
            const analysis = llmResponse.analyses[analysisKey];

            // Construct a row with proper CSV formatting
            const row = {
                question: escapeCSVValue(analysis?.question || ''),
                tp_response: escapeCSVValue(analysis?.tp_response || ''),
                ai_response: escapeCSVValue(analysis?.ai_analysis || ''),
                citations: analysis?.citations
                    ? escapeCSVValue(
                          analysis.citations
                              .map(
                                  (citation) =>
                                      `Page ${citation[0]}: ...${citation[1]}...`,
                              )
                              .join('\n\n'),
                      )
                    : '',
                answersAlign: escapeCSVValue(
                    analysis?.is_analysis_complete ? 'Yes' : 'No',
                ),
            };

            // Add the row to CSV
            csvRows.push(Object.values(row).join(','));
        });

        return csvRows.join('\n'); // Join rows with newline for CSV
    }

    // Function to trigger the download of the CSV file
    function downloadCSV() {
        const csvData = convertToCSV(llmResponse); // Get the CSV data

        if (!csvData) {
            const errorMessage = 'Data not ready for export';
            console.error(errorMessage);
            alert(errorMessage);
            return;
        }

        // Create a Blob from CSV data
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
