import { ReactNode } from 'react';
import { Card, Heading } from '@/components';
import { LlmResponse } from '@/types';
import { tw } from '@/utils';

interface SummaryProps {
    llmResponse: LlmResponse;
    questionsData: string[];
    startIcon?: ReactNode;
}

export function Summary({
    llmResponse,
    questionsData,
    startIcon = null,
}: SummaryProps): JSX.Element {
    return (
        <Card>
            <Heading
                level={4}
                additionalClasses={tw`mb-4 opacity-80`}
                fontSize='text-lg'
            >
                Summary
            </Heading>
        </Card>
    );
}
