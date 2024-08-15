import {} from '@heroicons/react/24/outline';
import { CircularProgress } from '@/components';
import { LlmResponse } from '@/types';

interface Props {
    llmResponse: LlmResponse;
}

export function MatchingAnswers({ llmResponse }: Props): JSX.Element {
    const questionsAnalyzed = llmResponse?.responses.length;
    const matchingAnswers = 'N/A';

    return (
        <CircularProgress
            twFontSize='text-xl'
            title='Matching Answers'
            // value={matchingAnswers}
            value={0}
            minValue={0}
            maxValue={questionsAnalyzed || 100}
            text={`${matchingAnswers}/${questionsAnalyzed}`}
        />
    );
}

export function NonMatchingAnswers({ llmResponse }: Props): JSX.Element {
    const questionsAnalyzed = llmResponse?.responses.length;
    const nonMatchingAnswers = 'N/A';

    return (
        <CircularProgress
            twFontSize='text-xl'
            title='Non-matching Answers'
            // value={matchingAnswers}
            value={0}
            minValue={0}
            maxValue={questionsAnalyzed || 100}
            text={`${nonMatchingAnswers}/${questionsAnalyzed}`}
        />
    );
}
