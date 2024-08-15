import { QuestionMarkCircleIcon } from '@heroicons/react/24/outline';
import { CircularProgress } from '@/components';
import { LlmResponse } from '@/types';

interface QuestionsAnsweredProps {
    llmResponse: LlmResponse;
    questionsData: string[];
}

export function QuestionsAnalyzed({
    llmResponse,
    questionsData,
}: QuestionsAnsweredProps): JSX.Element {
    const numberOfQuestions = questionsData?.length;
    const questionsAnalyzed = llmResponse?.responses.length || 0;

    return (
        <CircularProgress
            title='Questions Analyzed'
            twFontSize='text-2xl'
            // value={questionsAnalyzed}
            value={2}
            minValue={0}
            maxValue={numberOfQuestions}
            text={`${questionsAnalyzed}/${numberOfQuestions}`}
        />
    );
}
