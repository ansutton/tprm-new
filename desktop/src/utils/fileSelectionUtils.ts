import { Dispatch, SetStateAction } from 'react';
import * as XLSX from 'xlsx';
import { sampleData } from '@/data';
import {
    Accept,
    EvidenceFiles,
    EvidenceType,
    LlmResponse,
    Mode,
} from '@/types';
import { poll } from '@/utils';

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
        console.log('set questions state');
    } else {
        console.log(
            `No questions file found; questionsData state was not modified.`,
        );
    }
}

/**
 * Handling Evidence
 */
export function initialEvidenceType(mode: Mode, index: number): EvidenceType {
    if (mode === 'demo') {
        switch (index) {
            case 0:
                return EvidenceType.AccessControlPolicy;
                break;
            case 1:
                return EvidenceType.IncidentManagement;
                break;
            case 2:
                return EvidenceType.PenetrationTest;
                break;
            default:
                return EvidenceType.Unspecified;
                break;
        }
    }
    return EvidenceType.Unspecified;
}

/**
 * Handling TP Responses
 */

/**
 * Validation
 */
export function isFileValid(file: File | null, fileType: string): file is File {
    return file !== null && file?.type === fileType;
}
// const isFileValid = (file: File | null, fileType: string): file is File =>
//     file !== null && file?.type === fileType;
export function isFilesPopulated(files: File | EvidenceFiles | null): boolean {
    return files ? true : false;
}

/**
 * Polling
 */
export function handlePoll(
    setLlmResponse: Dispatch<SetStateAction<LlmResponse>>,
) {
    const interval = setInterval(async () => {
        const pollResponse = await poll();
        console.log('🚀 ~ setInterval ~ pollResponse:', pollResponse);
        setLlmResponse(pollResponse);
        if (pollResponse?.is_complete) {
            clearInterval(interval);
        }
    }, 10000);
}

/**
 * Submission
 */
interface handleSampleDataProps {
    setLlmResponse: Dispatch<SetStateAction<any>>;
    setQuestionsData: Dispatch<SetStateAction<string[]>>;
    setTpResponsesData: Dispatch<SetStateAction<any[][]>>;
}
export function handleSampleData({
    setLlmResponse,
    setQuestionsData,
    setTpResponsesData,
}: handleSampleDataProps) {
    const analyses = Object.values(sampleData.analyses);
    const questionsArray = analyses.map((analysis) => analysis.question || '');
    let tpResponsesArray: any[][] = [['', '', 'Response', '']];
    for (let i = 0; i < analyses.length; i++) {
        tpResponsesArray.push(['', '', analyses[i].tp_response || '', '']);
    }
    // Setting questions and TP Responses from sample data and not from questions selected
    setQuestionsData(questionsArray);
    setTpResponsesData(tpResponsesArray);
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

/**
 * Misc
 */
export function removeDot(accept: Accept) {
    return accept.slice(1, accept.length);
}

