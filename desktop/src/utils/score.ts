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
export function handleAnswersAlignment(score: any): 'Yes' | 'No' | null {
    if (calculateScore(score)) {
        return primitiveScoreFormula(score) >= 88 ? 'Yes' : 'No';
    }
    return null;
}
