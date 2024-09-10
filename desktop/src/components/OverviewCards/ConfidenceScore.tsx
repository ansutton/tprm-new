import { ReactNode } from 'react';
import { CircularProgress } from '@/components';
import { LlmResponse } from '@/types';

interface ConfidenceScoreProps {
    llmResponse: LlmResponse;
    questionsData: string[];
    startIcon?: ReactNode;
}

export function ConfidenceScore({
    llmResponse,
    questionsData,
    startIcon = null,
}: ConfidenceScoreProps): JSX.Element {
    const pathColor = 'hsl(292, 91%, 73%)'; // fuchsia-400

    return (
        <CircularProgress
            title='AI Confidence Score'
            startIcon={startIcon}
            value={90}
            minValue={0}
            maxValue={100}
            pathColor={pathColor}
            text='90%'
            textFontSize='text-2xl'
        />
    );
}
