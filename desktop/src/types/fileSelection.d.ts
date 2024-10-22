/**
 * Interfaces
 */
export interface SubmitRequestParams {
    csvFileBuffer: string;
    pdfFiles: PdfFiles;
    parsedExcelFile: any[][];
}

/**
 * Types
 */
export type EvidenceType =
    | 'soc'
    | 'pen'
    | 'vsr'
    | 'pri'
    | 'sec'
    | 'acc'
    | 'pas'
    | 'bus'
    | 'inc'
    | 'enc'
    | 'dat'
    | 'thi'
    | 'vmp'
    | 'isc'
    | 'iss'
    | 'sdl'
    | 'oth'
    | 'unspecified'
    | null
    | undefined;
export type EvidenceFile = {
    file: File;
    evidenceType: EvidenceType;
} | null;
export type EvidenceFiles = EvidenceFile[] | null;
export type PdfFile = Promise<{
    pdfFileBuffer: string | null;
    evidenceType: EvidenceType;
} | null>;

export type PdfFiles = PdfFile[];
