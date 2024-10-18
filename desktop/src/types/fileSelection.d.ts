export type EvidenceFile = {
    file: File;
    evidenceType:
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
        | 'unspecified';
} | null;

export type EvidenceFiles = EvidenceFile[] | null;
