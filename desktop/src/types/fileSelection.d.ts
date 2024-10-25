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
export type Accept = '.csv' | '.pdf' | '.xlsx' | '';
export enum EvidenceType {
    SOC2TypeII = 'SOC 2 Type II Audit Report',
    PenetrationTest = 'Penetration Test Report',
    VulnerabilityScan = 'Vulnerability Scan Report',
    PrivacyPolicy = 'Privacy Policy',
    SecurityPolicyGeneral = 'Security Policy (General)',
    AccessControlPolicy = 'Access Control Policy',
    PasswordManagement = 'Password Management Policy',
    BusinessContinuity = 'Business Continuity Management and/or Disaster Recovery Policy',
    IncidentManagement = 'Incident Management Policy',
    EncryptionPolicy = 'Encryption Policy',
    DataRetention = 'Data Retention and Destruction Policy',
    ThirdPartyRiskManagement = 'Third Party Risk Management Policy',
    VulnerabilityManagement = 'Vulnerability Management Policy',
    ISO27001Certificate = 'ISO 27001 Certificate',
    ISO27001StatementOfApplicability = 'ISO 27001 Statement of Applicability',
    SDLCDocumentation = 'SDLC Documentation',
    Other = 'Other',
    Unspecified = 'Unspecified',
}
export type EvidenceFile = {
    file: File;
    evidenceType: EvidenceType;
} | null;
export type EvidenceFiles = EvidenceFile[] | null;
export interface PdfFile {
    pdfFileBuffer: string | null;
    evidenceType: EvidenceType | undefined;
};
export type PdfFiles = PdfFile[];
