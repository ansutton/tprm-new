import { CircularProgressbar } from 'react-circular-progressbar';
import { Card, H4 } from '@/components';
import { LlmResponse } from '@/types';
import { tw } from '@/utils';

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
        <div className='flex'>
            <Card additionalClasses={tw``}>
                <h4 className='mb-3 w-full text-xl font-bold'>
                    Questions Answered
                </h4>
                <div className='mx-auto h-40 w-40'>
                    <CircularProgressbar
                        value={questionsAnswered}
                        minValue={0}
                        maxValue={numberOfQuestions}
                        text={`${questionsAnswered}/${numberOfQuestions}`}
                    />
                </div>
            </Card>
        </div>
    );
}
