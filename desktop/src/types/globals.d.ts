/**
 * Interfaces
 */
export interface ProgressBarBaseProps {
    progressPercentage: number;
    twBgColor?: string;
}
export interface PythonAnalysis {
    [key: string]: string | number | null | undefined;
}
export interface PythonAppState {
    number_of_questions: number;
    models_pulled: boolean;
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
