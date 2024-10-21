import * as XLSX from 'xlsx';

/**
 * File Parsing
 */
export async function parseExcelFile(file: File): Promise<any[][]> {
    return new Promise((resolve, reject) => {
        const reader = new FileReader();
        reader.onload = (e) => {
            const arrayBuffer = e.target?.result;
            if (arrayBuffer) {
                const workbook = XLSX.read(arrayBuffer, { type: 'array' });
                const sheetName = workbook.SheetNames[0];
                const worksheet = workbook.Sheets[sheetName];
                const jsonData = XLSX.utils.sheet_to_json(worksheet, {
                    header: 1,
                });
                resolve(jsonData as any[][]);
            } else {
                return [];
                // reject('Error reading file');
            }
        };
        reader.readAsArrayBuffer(file);
    });
}
export async function readFileAsText(file: File): Promise<string> {
    return new Promise((resolve) => {
        const fileReader = new FileReader();
        fileReader.onload = () => resolve(fileReader.result as string);
        fileReader.readAsText(file);
    });
}
// TODO: revisit base64 encoding; revisit file passing from front end to back end
export async function readFileAsDataUrl(file: File): Promise<string> {
    return new Promise((resolve) => {
        const fileReader = new FileReader();
        fileReader.onload = () => resolve(fileReader.result as string);
        fileReader.readAsDataURL(file);
    });
}

/**
 * Validation
 */

/**
 * Submission
 */
