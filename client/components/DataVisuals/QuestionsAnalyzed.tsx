import { ReactNode } from 'react';
import { CircularProgress } from '@/components';
import { LlmResponse } from '@/types';

interface QuestionsAnsweredProps {
    llmResponse: LlmResponse;
    questionsData: string[];
    startIcon?: ReactNode;
}

export function QuestionsAnalyzed({
    llmResponse,
    questionsData,
    startIcon = null,
}: QuestionsAnsweredProps): JSX.Element {
    const numberOfQuestions = questionsData?.length;
    const questionsAnalyzed = llmResponse?.responses.length || 0;

    return (
        <CircularProgress
            title='Questions Analyzed'
            twFontSize='text-2xl'
            startIcon={startIcon}
            value={questionsAnalyzed}
            minValue={0}
            maxValue={numberOfQuestions}
            text={`${questionsAnalyzed}/${numberOfQuestions}`}
        />
    );
}
