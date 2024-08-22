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
                    <b>Name</b>: N/A
                </p>
                <p>
                    <b>Service Description</b>: N/A
                </p>
                <p>
                    <b>Summary</b>: The third party and the AI model provided
                    the same response for{' '}
                    <b>
                        {llmResponse?.responses.length || 0}/
                        {questionsData?.length} (
                        {Math.round(
                            ((llmResponse?.responses.length || 0) /
                                questionsData?.length) *
                                100,
                        )}
                        %)
                    </b>{' '}
                    of questions uploaded.
                </p>
            </div>
        </Card>
    );
}
