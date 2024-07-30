export interface PollResponse {
    message: PythonAppState;
}

export interface PythonAppState {
    number_of_questions: Number;
    responses: Array<String>;
}

export interface SubmitRequestParams {
    csvFileBuffer: string;
    pdfFileBuffer: string;
    // xlsxFileBuffer: string,
}
