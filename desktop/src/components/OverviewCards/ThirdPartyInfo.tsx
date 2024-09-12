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
                    <b>Name</b>: Google LLC
                </p>
                <p>
                    <b>Engagement Scope</b>: The third party is providing their
                    Google Cloud Platform (GCP) which we use to host external
                    (consumer-facing) and internal cloud-based applications.
                </p>
            </div>
        </Card>
    );
}
