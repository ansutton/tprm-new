import { ProgressBar } from '@/components';
import { LlmResponse } from '@/types';

interface NotAnsweredByEvidenceProps {
    llmResponse: LlmResponse;
    questionsData: string[];
}

export function NotAnsweredByEvidence({
    llmResponse,
    questionsData,
}: NotAnsweredByEvidenceProps): JSX.Element {
    // const progress = 50;
    const numberOfQuestions = questionsData?.length;
    const numberOfResponses = llmResponse?.responses.length || 0;
    const progressPercentage = (numberOfResponses / numberOfQuestions) * 100;

    return (
        <>
            <div>Not Answered by Evidence</div>
            <ProgressBar progressPercentage={progressPercentage} />
        </>
    );
}
