import { ReactNode } from 'react';
import { Card, ProgressBar } from '@/components';
import { LlmResponse } from '@/types';

interface EvidenceDocumentsAnalyzedProps {
    llmResponse: LlmResponse;
    questionsData: string[];
    startIcon?: ReactNode;
}

export function EvidenceDocumentsAnalyzed({
    llmResponse,
    questionsData,
    startIcon = null,
}: EvidenceDocumentsAnalyzedProps): JSX.Element {
    // const numberOfQuestions = questionsData?.length;
    // const numberOfResponses = llmResponse?.responses.length || 0;
    // const progressPercentage = (numberOfResponses / numberOfQuestions) * 100;
    const progressPercentage = 75;

    return (
        <Card>
            <div className='flex items-center gap-3'>
                {startIcon}
                <h4 className='mb-4 w-full text-lg font-bold'>
                    Evidence Documents Analyzed
                </h4>
            </div>
            <ProgressBar progressPercentage={progressPercentage} />
        </Card>
    );
}
