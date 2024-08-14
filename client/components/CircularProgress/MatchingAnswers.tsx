import {} from '@heroicons/react/24/outline';
import { CircularProgress } from '@/components';
import { LlmResponse } from '@/types';

interface MatchingAnswersProps {
    llmResponse: LlmResponse;
}

export function MatchingAnswers({
    llmResponse,
}: MatchingAnswersProps): JSX.Element {
    const questionsAnalyzed = llmResponse?.responses.length;
    const matchingAnswers = 'N/A';

    return (
        <CircularProgress
            twFontSize='text-xl'
            title='Matching Answers'
            // value={matchingAnswers}
            value={0}
            minValue={0}
            maxValue={questionsAnalyzed}
            text={`${matchingAnswers}/${questionsAnalyzed}`}
        />
    );
}
