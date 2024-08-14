import {} from '@heroicons/react/24/outline';
import { CircularProgress } from '@/components';

interface MatchingAnswersProps {
    questionsData: string[];
}

export function MatchingAnswers({
    questionsData,
}: MatchingAnswersProps): JSX.Element {
    const questionsAnswered = questionsData?.length;
    const matchingAnswers = 'N/A';

    return (
        <CircularProgress
            twFontSize='text-xl'
            title='Matching Answers'
            // value={matchingAnswers}
            value={0}
            minValue={0}
            maxValue={questionsAnswered}
            text={`${matchingAnswers}/${questionsAnswered}`}
        />
    );
}
