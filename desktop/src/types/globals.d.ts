/**
 * Interfaces
 */
export interface ProgressBarBaseProps {
    progressPercentage?: number;
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
    is_analysis_complete?: boolean;
    ai_analysis?: string;
    citations?: any[]; // Expecting an array of tuples [number, string]
    pages?: any[]; // Expecting an array of numbers
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
    embeddings_count: number;
    embeddings_total: number;
    is_complete: boolean;
    models_pulled: boolean;
    number_of_questions: number;
}
export interface TableHeaderProps {
    additionalClasses?: string;
    headerContent: ReactNode;
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
    citationsPreview: DataItemField;
    answersAlign: DataItemField; // Yes/No (Yes if sim score >=88%, else No)
    // similarityScore: DataItemField;
    // aiConfidenceScore: DataItemField;
    // tpConfidenceScore: DataItemField;
    tpResponseFull: DataItemField;
    aiAnalysisFull: DataItemField;
    citationsFull: DataItemField; // array of tuples (tuple shape: [number, string])
    // pageNumbers: DataItemField; // array of numbers
};
export type DataItemField =
    | ReactNode
    | boolean
    | string
    | number
    | null
    | undefined;
export type Mode = 'demo' | 'llm';
export type ModeAction = { type: 'set_demo' } | { type: 'set_llm' };
export type Screen =
    | 'fileSelection'
    | 'loading'
    | 'detailedAnalysis'
    | 'overview';

