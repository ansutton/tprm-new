/**
 * Interfaces
 */
export interface ProgressBarBaseProps {
    progressPercentage: number;
    twBgColor?: string;
}
export interface PollResponse {
    message: PythonAppState;
}
// export interface PythonAppState {
//     number_of_questions: number;
//     questions: Array<string>;
//     responses: Array<string>;
// }
interface PythonAnalysis {
    question?: string;
    tp_response?: string;
    ai_analysis?: string;
    citation?: string;
    pages?: string;
    tp_confidence_score?: number;
    ai_confidence_score?: number;
    tp_similarity_score?: number;
    ai_similarity_score?: number;
}
export interface PythonAppState {
    number_of_questions: number;
    analyses: Record<string, PythonAnalysis>;
}
export interface SubmitRequestParams {
    csvFileBuffer: string;
    pdfFileBuffer: string;
    parsedExcelFile: any[][];
    // xlsxFileBuffer: string,
}

/**
 * Types
 */
export type LlmResponse = PythonAppState | null;
export type Mode = 'demo' | 'llm';
export type ModeAction = { type: 'set_demo' } | { type: 'set_llm' };
export type Screen = 'fileUpload' | 'loading' | 'detailedAnalysis' | 'overview';
