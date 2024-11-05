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
export function handleResetApp(): void {
    if (
        confirm(
            'Are you sure? This action will end the current process and start from the beginning.',
        )
    ) {
        window.location.reload();
    } else {
        return;
    }
}
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
export function handleAnswersAlign(
    tpResponsesData: any[][],
    field: DataItemField,
): 'Yes' | 'No' | 'N/A' | null {
    if (tpResponsesData.length === 0) {
        return 'N/A';
    } else if (field !== undefined && field !== null) {
        return field === true ? 'Yes' : 'No';
    } else {
        return null;
    }
}
export function countQuestionsAnalyzed(llmResponse: LlmResponse): number {
    if (llmResponse?.analyses) {
        const { analyses } = llmResponse;
        return Object.values(analyses).reduce((count, analysis) => {
            // Safely check if is_analysis_complete exists and is true
            return (analysis?.is_analysis_complete ?? false)
                ? count + 1
                : count;
        }, 0);
    }
    return 0;
}
export function countResponsesAlign(llmResponse: LlmResponse): {
    yesCount: number;
    noCount: number;
} {
    let yesCount = 0;
    let noCount = 0;
    if (llmResponse?.analyses) {
        Object.values(llmResponse.analyses).forEach((analysis) => {
            // Ensure analysis is valid and check answers_align
            if (analysis && analysis.answers_align !== undefined) {
                if (analysis.answers_align) {
                    yesCount += 1;
                } else {
                    noCount += 1;
                }
            } else {
                // If answers_align is missing or null, treat it as false by default
                noCount += 1;
            }
        });
    }
    return { yesCount, noCount };
}
export function countQuestionsAnsweredByEvidence(
    llmResponse: LlmResponse | undefined,
): number {
    let count = 0;
    if (llmResponse?.analyses) {
        const { analyses } = llmResponse;
        Object.values(analyses).forEach((analysis) => {
            if (analysis && analysis?.citations !== undefined) {
                count++;
            }
        });
    }
    return count;
}
export function truncate(
    field: number | string | null | undefined,
    maxLength: number,
) {
    if (field && typeof field !== 'number') {
        return field?.length <= maxLength
            ? field
            : `${field?.slice(0, maxLength)}`;
    }
    return null;
}
export function fadeOverlayStyling(additionalStyling?: any) {
    return [
        tw`absolute inset-y-0 right-0 w-1/2`,
        tw`bg-gradient-to-r from-transparent to-90%`,
        tw`group-hover:transition-all group-hover:duration-200 group-hover:ease-out`,
        additionalStyling,
    ];
}

