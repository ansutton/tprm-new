import { ReactNode } from 'react';
import { CircularProgress } from '@/components';
import { LlmResponse } from '@/types';

interface ConfidenceScoreProps {
    llmResponse: LlmResponse;
    questionsData: string[];
    startIcon?: ReactNode;
    title: string;
    tooltipContent: string;
    subtitle?: string;
}

export function ConfidenceScore({
    llmResponse,
    questionsData,
    startIcon = null,
    title,
    subtitle = '',
    tooltipContent = '',
}: ConfidenceScoreProps): JSX.Element {
    const pathColor = 'hsl(292, 91%, 73%)'; // fuchsia-400

    return (
        <CircularProgress
            title={title}
            subtitle={subtitle}
            startIcon={startIcon}
            tooltipContent={tooltipContent}
            value={90}
            minValue={0}
            maxValue={100}
            pathColor={pathColor}
            text='90%'
            textFontSize='text-2xl'
        />
    );
}
