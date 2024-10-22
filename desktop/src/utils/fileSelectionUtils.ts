import { Dispatch, SetStateAction } from 'react';
import * as XLSX from 'xlsx';
import { sampleData } from '@/data';

/**
 * File Reading
 */
export async function readFileAsText(file: File): Promise<string> {
    return new Promise((resolve) => {
        const fileReader = new FileReader();
        fileReader.onload = () => resolve(fileReader.result as string);
        fileReader.readAsText(file);
    });
}
// TODO: revisit base64 encoding; revisit file passing from front end to back end
export async function readFileAsDataUrl(file: File): Promise<string> {
    return new Promise((resolve) => {
        const fileReader = new FileReader();
        fileReader.onload = () => resolve(fileReader.result as string);
        fileReader.readAsDataURL(file);
    });
}
export async function parseExcelFile(file: File): Promise<any[][]> {
    return new Promise((resolve, reject) => {
        const reader = new FileReader();
        reader.onload = (e) => {
            const arrayBuffer = e.target?.result;
            if (arrayBuffer) {
                const workbook = XLSX.read(arrayBuffer, { type: 'array' });
                const sheetName = workbook.SheetNames[0];
                const worksheet = workbook.Sheets[sheetName];
                const jsonData = XLSX.utils.sheet_to_json(worksheet, {
                    header: 1,
                });
                resolve(jsonData as any[][]);
            } else {
                return [];
                // reject('Error reading file');
            }
        };
        reader.readAsArrayBuffer(file);
    });
}

/**
 * Handling Questions
 */
export async function handleSetQuestionsDataState(
    questionsFile: File | null,
    setQuestionsData: Dispatch<SetStateAction<string[]>>,
) {
    if (questionsFile) {
        const csvTextFile = await readFileAsText(questionsFile);
        const questionsArray = csvTextFile
            .split('\r\n')
            .filter((question) => question !== '' && question !== 'Questions');
        setQuestionsData(questionsArray);
    } else {
        console.log(
            `No questions file found; questionsData state was not modified.`,
        );
    }
}

/**
 * Handling Evidence
 */

/**
 * Handling TP Responses
 */

/**
 * Validation
 */

/**
 * Submission
 */
interface handleSampleDataProps {
    setLlmResponse: React.Dispatch<React.SetStateAction<any>>;
    setQuestionsData: React.Dispatch<React.SetStateAction<string[]>>;
}
export function handleSampleData({
    setLlmResponse,
    setQuestionsData,
}: handleSampleDataProps) {
    const analyses = Object.values(sampleData.analyses);
    const questionsArray = analyses.map((analysis) => analysis.question || '');
    setQuestionsData(questionsArray);
    // Recursive function to update each analysis with a delay
    function updateAnalysis(index: number) {
        if (index < analyses.length) {
            setLlmResponse((prevResponse: any) => {
                // Create a new analyses object that includes all previous ones and the new one
                const updatedAnalyses = {
                    ...prevResponse?.analyses,
                    [`analysis_${index}`]: analyses[index], // Add the next analysis
                };
                // Return the updated LlmResponse with the new analyses
                return {
                    ...prevResponse,
                    analyses: updatedAnalyses,
                };
            });
            // Recursively call updateAnalysis with a timeout
            setTimeout(() => updateAnalysis(index + 1), 3000);
        } else {
            // Once all analyses are processed, mark is_complete as true
            setLlmResponse((prevResponse: any) => ({
                ...prevResponse,
                is_complete: true,
            }));
        }
    }
    // Start the recursive update process
    updateAnalysis(0);
}
