import { ReactNode } from 'react';
import { Card, Heading } from '@/components';
import { LlmResponse } from '@/types';

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
            <div className='space-y-2 opacity-80'>
                <Heading
                    level={4}
                    additionalClasses='mb-4'
                    fontSize='text-lg'
                    startIcon={startIcon}
                >
                    Summary
                </Heading>
                <p>
                    The third party and the AI model provided the same response.
                </p>
            </div>
        </Card>
    );
}
