import { localPythonServerConnectionString } from '@/utils/connections';
import {
    PollResponse,
    PythonAppState,
    SubmitRequestParams,
} from '@/utils/interfaces';

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

/**
 * Dev Functions
 */
const responseData: PythonAppState = {
    number_of_questions: 2,
    responses: ['response 1'],
};

export async function poll(): Promise<PythonAppState> {
    return {
        number_of_questions: responseData.number_of_questions,
        responses: responseData.responses,
    };
}

export function emulatePopulateResponses() {
    setTimeout(() => {
        responseData.responses.push('response 2');
    }, 15000);
}

/**
 * Actual Back End API Call
 */
// export async function poll(): Promise<PythonAppState> {
//     const response = await fetch(`${localPythonServerConnectionString}/poll`, {
//         method: 'GET',
//         headers: {
//             'Content-Type': 'application/json',
//         },
//     });

//     const responseData: PollResponse = await response.json();
//     return responseData.message;
// }

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
