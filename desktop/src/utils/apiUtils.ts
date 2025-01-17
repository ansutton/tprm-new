import { LlmResponse, SubmitRequestParams } from '@/types';

/**
 * Connections
 */
const localPythonServerConnectionString = 'http://localhost:8001';

/**
 * Utils
 */
export async function submit(params: SubmitRequestParams): Promise<void> {
    try {
        const data = {
            questionsCsvFileBuffer: params.csvFileBuffer,
            pdfFiles: params.pdfFiles,
            parsedExcelFile: params.parsedExcelFile,
        };
        console.log('🚀 ~ submit ~ data:', data);
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

export async function poll(): Promise<LlmResponse> {
    const response = await fetch(`${localPythonServerConnectionString}/poll`, {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
        },
    });
    const responseData = await response.json();
    return JSON.parse(responseData.message);
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
