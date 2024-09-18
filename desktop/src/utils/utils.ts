import { DataItemField, LlmResponse } from '@/types';
import { sampleData } from '@/data';

/**
 * Demo Mode Portion of `handleSubmit` in `App.tsx`
 */
interface handleSampleDataProps {
    setLlmResponse: React.Dispatch<React.SetStateAction<any>>;
}
export function handleSampleData({ setLlmResponse }: handleSampleDataProps) {
    const analyses = Object.values(sampleData.analyses);
    let index = 0;
    const interval = setInterval(() => {
        if (index < analyses.length) {
            setLlmResponse((prevResponse) => {
                // Create a new analyses object that includes all previous ones and the new one
                const updatedAnalyses = {
                    ...prevResponse?.analyses,
                    [`analysis_${index}`]: analyses[index], // Add the next analysis
                };
                // Return the updated LlmResponse with the new analyses
                return {
                    ...prevResponse,
                    analyses: updatedAnalyses,
                };
            });
            index++;
        } else {
            clearInterval(interval);
            setLlmResponse((prevResponse) => ({
                ...prevResponse,
                is_complete: true, // Mark the process as complete
            }));
        }
    }, 3000);
}

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
            : `${field?.slice(0, maxLength)}...`;
    }
    return null;
}
