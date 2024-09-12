import { DataItemField } from '@/types';

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
export function handleAnswersAlign(field: DataItemField): 'Yes' | 'No' | null {
    if (field !== undefined && field !== null) {
        return field === true ? 'Yes' : 'No';
    }
    return null;
}
