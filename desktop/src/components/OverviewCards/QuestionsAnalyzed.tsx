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
    const questionsAnalyzed = questionsData.reduce(
        (count, index) =>
            llmResponse?.analyses[`analysis_${index}`] ? count + 1 : count,
        0,
    );

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
