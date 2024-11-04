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
export const EvidenceColors = [
    [EvidenceType.SOC2TypeII, '#22d3ee'],
    [EvidenceType.PenetrationTest, '#60a5fa'],
    [EvidenceType.VulnerabilityScan, '#a78bfa'],
    [EvidenceType.PrivacyPolicy, '#e879f9'],
    [EvidenceType.SecurityPolicyGeneral, '#fb923d'],
    [EvidenceType.AccessControlPolicy, '#facc15'],
    [EvidenceType.PasswordManagement, '#34d399'],
    [EvidenceType.BusinessContinuity, '#22d3ee'],
    [EvidenceType.IncidentManagement, '#60a5fa'],
    [EvidenceType.EncryptionPolicy, '#a78bfa'],
    [EvidenceType.DataRetention, '#e879f9'],
    [EvidenceType.ThirdPartyRiskManagement, '#fb923d'],
    [EvidenceType.VulnerabilityManagement, '#facc15'],
    [EvidenceType.ISO27001Certificate, '#34d399'],
    [EvidenceType.ISO27001StatementOfApplicability, '#22d3ee'],
    [EvidenceType.SDLCDocumentation, '#60a5fa'],
    [EvidenceType.Other, '#a78bfa'],
    [EvidenceType.Unspecified, '#e879f9'],
];
export type EvidenceFile = {
    file: File;
    evidenceType: EvidenceType;
} | null;
export type EvidenceFiles = EvidenceFile[] | null;
export interface PdfFile {
    pdfFileBuffer: string | null;
    evidenceType: EvidenceType | undefined;
}
export type PdfFiles = PdfFile[];
