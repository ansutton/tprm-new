/**
 * Dev Import Statement
 */
import { summarySample } from '@/components/Summary';

import { localPythonServerConnectionString } from '@/utils/connections';
import {
    PollResponse,
    PythonAppState,
    SubmitRequestParams,
} from '@/types/globals';

export async function submit(params: SubmitRequestParams): Promise<void> {
    try {
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
        console.log(await response.json());
    } catch (err) {
        console.log(err);
    }
}

/**
 * Dev Functions
 */
const responseData: PythonAppState = {
    number_of_questions: 2,
    questions: [
        summarySample[0].controlQuestion,
        summarySample[1].controlQuestion,
    ],
    responses: [],
};
export async function poll(): Promise<PythonAppState> {
    return {
        number_of_questions: responseData.number_of_questions,
        questions: responseData.questions,
        responses: responseData.responses,
    };
}
export function emulatePopulateResponses() {
    setTimeout(() => {
        responseData.responses.push(summarySample[0].aiAnswer);
    }, 5000);
    setTimeout(() => {
        responseData.responses.push(summarySample[1].aiAnswer);
    }, 10000);
}

/**
 * Demo Functions (Actual Back End API Call)
 */
// export async function poll(): Promise<PythonAppState> {
//     const response = await fetch(`${localPythonServerConnectionString}/poll`, {
//         method: 'GET',
//         headers: {
//             'Content-Type': 'application/json',
//         },
//     });
//     const responseData = await response.json();
//     return JSON.parse(responseData.message);
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
