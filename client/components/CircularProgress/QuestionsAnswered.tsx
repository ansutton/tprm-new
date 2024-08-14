import { QuestionMarkCircleIcon } from '@heroicons/react/24/outline';
import { CircularProgress } from '@/components';
import { LlmResponse } from '@/types';

interface QuestionsAnsweredProps {
    llmResponse: LlmResponse;
    questionsData: string[];
}

export function QuestionsAnswered({
    llmResponse,
    questionsData,
}: QuestionsAnsweredProps): JSX.Element {
    const numberOfQuestions = questionsData?.length;
    const questionsAnswered = llmResponse?.responses.length || 0;

    return (
        <CircularProgress
            title='Questions Answered'
            value={questionsAnswered}
            minValue={0}
            maxValue={numberOfQuestions}
            text={`${questionsAnswered}/${numberOfQuestions}`}
        />
    );
}
