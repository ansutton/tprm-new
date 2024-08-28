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
export interface PythonAppState {
    number_of_questions: number;
    questions: Array<string>;
    responses: Array<string>;
}

export interface SubmitRequestParams {
    csvFileBuffer: string;
    pdfFileBuffer: string;
    // xlsxFileBuffer: string,
}

/**
 * Types
 */
export type LlmResponse = PythonAppState | null;
export type Mode = 'demo' | 'llm';
export type ModeAction = { type: 'set_demo' } | { type: 'set_llm' };
export type Screen = 'fileUpload' | 'loading' | 'detailedAnalysis' | 'overview';
