import { ArrowDownTrayIcon } from '@heroicons/react/24/outline';
import clsx from 'clsx';
import { tableFootnoteText } from '@/constants';
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

    function handleCitationText(value: string | number | boolean): string {
        const stringValue = String(value); // Ensure all values are treated as strings
        if (
            stringValue.includes(',') ||
            stringValue.includes('\n') ||
            stringValue.includes('"')
        ) {
            return `"${stringValue.replace(/"/g, '""').replace(/\n/g, ' ')}"`; // Escape double quotes and wrap in quotes if needed
        }
        return stringValue;
    }

    function convertToCSV(llmResponse: LlmResponse) {
        const csvRows: string[] = [`${tableFootnoteText}\n`];

        // Check that the analyses field exists in llmResponse
        if (!llmResponse || !llmResponse.analyses) {
            console.error('llmResponse or analyses are undefined');
            return '';
        }

        const headersTitles = [
            'Control Question',
            'Third Party Response',
            'AI Response*',
            'Citation(s)*',
            'Responses Align?',
        ];
        csvRows.push(headersTitles.join(','));

        Object.keys(llmResponse.analyses).forEach((analysisKey) => {
            const analysis = llmResponse.analyses[analysisKey];

            const row = {
                question: escapeCSVValue(analysis?.question || ''),
                tp_response: escapeCSVValue(analysis?.tp_response || ''),
                ai_response: escapeCSVValue(analysis?.ai_analysis || ''),
                citations: analysis?.citations
                    ? escapeCSVValue(
                          analysis.citations
                              .map(
                                  (citation) =>
                                      `${citation[0]} (${citation[3]}) Page ${citation[1]}: ...${handleCitationText(citation[2])}...`,
                              )
                              .join('\n\n'),
                      )
                    : '',
                answersAlign: escapeCSVValue(
                    analysis?.answers_align ? 'Yes' : 'No',
                ),
            };

            csvRows.push(Object.values(row).join(','));
        });

        return csvRows.join('\n');
    }

    function downloadCSV() {
        const csvData = convertToCSV(llmResponse);

        if (!csvData) {
            const errorMessage = 'Data not ready for export';
            console.error(errorMessage);
            alert(errorMessage);
            return;
        }

        const blob = new Blob([csvData], { type: 'text/csv' });
        const url = window.URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.setAttribute('hidden', '');
        a.setAttribute('href', url);
        a.setAttribute(
            'download',
            `tprm-accelerator-detailed-analysis-${getTimestamp()}.csv`,
        );
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

