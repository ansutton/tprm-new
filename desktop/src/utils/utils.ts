import { DataItemField, LlmResponse } from '@/types';

/**
 * Score
 */
export function primitiveScoreFormula(score: number): number {
    return Math.round(((score + 1) / 2) * 100);
}
export function calculateScore(score: any): number | null {
    const scoreResult = Number(score);
    if (
        scoreResult &&
        typeof scoreResult === 'number' &&
        scoreResult === scoreResult
    ) {
        return primitiveScoreFormula(scoreResult);
    }
    return null;
}
export function displayScore(score: DataItemField): string | null {
    return calculateScore(score)
        ? `${calculateScore(score)?.toString()}%`
        : null;
}

/**
 * Tailwind CSS
 */
export const tw = (
    strings: readonly string[] | ArrayLike<string>,
    ...values: string[]
) => String.raw({ raw: strings }, ...values);

/**
 * Misc
 */
export function getTimestamp() {
    const now = new Date();
    const year = now.getFullYear();
    const month = String(now.getMonth() + 1).padStart(2, '0'); // Months are 0-indexed
    const day = String(now.getDate()).padStart(2, '0');
    const hours = String(now.getHours()).padStart(2, '0');
    const minutes = String(now.getMinutes()).padStart(2, '0');
    const seconds = String(now.getSeconds()).padStart(2, '0');
    return `${year}-${month}-${day}-${hours}${minutes}${seconds}`;
}
export function handleAnswersAlign(field: DataItemField): 'Yes' | 'No' | null {
    if (field !== undefined && field !== null) {
        return field === true ? 'Yes' : 'No';
    }
    return null;
}
export function countQuestionsAnalyzed(llmResponse: LlmResponse): number {
    const { analyses } = llmResponse;
    return Object.values(analyses).reduce((count, analysis) => {
        return analysis.is_analysis_complete ? count + 1 : count;
    }, 0);
}

export function truncate(
    field: number | string | null | undefined,
    maxLength: number,
) {
    if (field && typeof field !== 'number') {
        return field?.length <= maxLength
            ? field
            : `${field?.slice(0, maxLength)}...`;
    }
    return null;
}
