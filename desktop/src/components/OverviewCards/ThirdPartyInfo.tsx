import { ReactNode } from 'react';
import { Card, Heading } from '@/components';
import { LlmResponse } from '@/types';

interface ThirdPartyInfoProps {
    llmResponse: LlmResponse;
    questionsData: string[];
    startIcon?: ReactNode;
}

export function ThirdPartyInfo({
    llmResponse,
    questionsData,
    startIcon = null,
}: ThirdPartyInfoProps): JSX.Element {
    return (
        <Card>
            <div className='space-y-2 opacity-80'>
                <Heading
                    level={4}
                    additionalClasses='mb-4'
                    fontSize='text-lg'
                    startIcon={startIcon}
                >
                    Third Party Information
                </Heading>
                <p>
                    <b>Name</b>: ABC Inc.
                </p>
                <p>
                    <b>Engagement Scope</b>
                    {`: ABC is a large Software as a Service (SaaS) company based in California, US, specializing in data protection and management. ABC provides a "Fast Backup" solution to deliver high performance, secure backup, long-term retention, and automated compliance of Parent Company's data.`}
                </p>
            </div>
        </Card>
    );
}

