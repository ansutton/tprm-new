import { localPythonServerConnectionString } from './connections';

interface SubmitRequestParams {
    csvFileBuffer: string;
    pdfFileBuffer: string;
    // xlsxFileBuffer: string,
}

export async function submit(params: SubmitRequestParams): Promise<string> {
    const data = {
        questionsCsvFileBuffer: params.csvFileBuffer,
        evidencePdfFileBuffer: params.pdfFileBuffer,
        // responsesXlsxFileBuffer: params.xlsxFileBuffer,
    };
    const response = await fetch(
        `${localPythonServerConnectionString}/submit`,
        {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(data),
        },
    );

    const responseData = await response.json();
    return JSON.stringify(responseData);
}

interface PollResponse {
    message: PythonAppState;
}

interface PythonAppState {
    number_of_questions: Number;
    responses: Array<String>;
}

export async function poll(): Promise<PythonAppState> {
    const response = await fetch(`${localPythonServerConnectionString}/poll`, {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
        },
    });

    const responseData: PollResponse = await response.json();
    return responseData.message;
}

export async function helloWorld(): Promise<string> {
    const response = await fetch(
        `${localPythonServerConnectionString}/hello_world`,
        {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                //   "Access-Control-Allow-Origin": "*",
                //   "Access-Control-Allow-Methods": "DELETE, POST, GET, OPTIONS",
                //   "Access-Control-Allow-Headers": "Content-Type, Authorization, X-Requested-With"
            },
        },
    );

    const hello = await response.json();
    return JSON.stringify(hello);
}
