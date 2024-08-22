import { ReactNode } from 'react';
import { CircularProgress } from '@/components';
import { LlmResponse } from '@/types';

interface ConfidenceScoreProps {
    llmResponse: LlmResponse;
    questionsData: string[];
    startIcon?: ReactNode;
}

export function ConfidenceScore({
    llmResponse,
    questionsData,
    startIcon = null,
}: ConfidenceScoreProps): JSX.Element {
    const numberOfQuestions = questionsData?.length;
    const questionsAnalyzed = llmResponse?.responses.length || 0;

    return (
        <CircularProgress
            title='Confidence Score'
            startIcon={startIcon}
            value={questionsAnalyzed}
            minValue={0}
            maxValue={numberOfQuestions}
            text='N/A'
            textFontSize='text-2xl'
        />
    );
}
