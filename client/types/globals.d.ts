/**
 * Interfaces
 */
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
