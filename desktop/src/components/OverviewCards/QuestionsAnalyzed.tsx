import { ReactNode } from 'react';
import { CircularProgress } from '@/components';
import { LlmResponse } from '@/types';
import { countQuestionsAnalyzed } from '@/utils';

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
    const questionsAnalyzed = countQuestionsAnalyzed(llmResponse);

    return (
        <CircularProgress
            title='Questions Analyzed'
            startIcon={startIcon}
            value={questionsAnalyzed}
            minValue={0}
            maxValue={numberOfQuestions}
            text={`${questionsAnalyzed}/${numberOfQuestions}`}
            textFontSize='text-2xl'
        />
    );
}
