/**
 * Interfaces
 */
export interface ProgressBarBaseProps {
    progressPercentage: number;
    twBgColor?: string;
}
// export interface PythonAnalysis {
//     [key: string]: string | number | null | undefined;
// }
// export interface PythonAnalyses {
//     analyses: Record<string, PythonAnalysis>;
//     models_pulled: boolean;
//     number_of_questions: number;
// }
export interface Analysis {
    question?: string;
    tp_response?: string;
    ai_analysis?: string;
    citations?: Array<[number, string]>; // Expecting an array of tuples [number, string]
    pages?: number[]; // Expecting an array of numbers
    [key: string]:
        | string
        | number
        | null
        | undefined
        | Array<[number, string]>
        | number[]; // Catch-all for other keys
}
export interface LlmResponse {
    analyses: Record<string, Analysis>;
    models_pulled: boolean;
    number_of_questions: number;
}
export interface SubmitRequestParams {
    csvFileBuffer: string;
    pdfFileBuffer: string;
    parsedExcelFile: any[][];
    // xlsxFileBuffer: string,
}
export interface TableHeaderProps {
    headerContent: string;
    infoContent?: ReactNode;
}

/**
 * Types
 */
// export type LlmResponse = PythonAppState | null;
// export type LlmResponse = any;
export type DataItem = {
    questionNumber: number;
    question: string;
    tpResponsePreview: DataItemField;
    aiAnalysisPreview: DataItemField;
    answersAlignment: DataItemField; // Yes/No (Yes if sim score >=88%, else No)
    similarityScore: DataItemField;
    aiConfidenceScore: DataItemField;
    tpConfidenceScore: DataItemField;
    citationsPreview: DataItemField;
    tpResponseFull: DataItemField;
    aiAnalysisFull: DataItemField;
    citationsFull: DataItemField; // array of tuples (tuple shape: [number, string])
    pageNumbers: DataItemField; // array of numbers
};
export type DataItemField = ReactNode | string | number | null | undefined;
export type Mode = 'demo' | 'llm';
export type ModeAction = { type: 'set_demo' } | { type: 'set_llm' };
export type Screen = 'fileUpload' | 'loading' | 'detailedAnalysis' | 'overview';
