import { CircularProgressbar } from 'react-circular-progressbar';
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
        <div className='h-40 w-40'>
            <CircularProgressbar
                value={questionsAnswered}
                minValue={0}
                maxValue={numberOfQuestions}
                text={`${questionsAnswered}/${numberOfQuestions}`}
            />
        </div>
    );
}
