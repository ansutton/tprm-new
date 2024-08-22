import { ReactNode } from 'react';
import { CircularProgressbar } from 'react-circular-progressbar';
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
                Control Questions Summary
            </Heading>
            <div className='space-y-4 text-sm font-bold opacity-80'>
                <SummaryItem
                    title='Passed'
                    llmResponse={llmResponse}
                    questionsData={questionsData}
                />
                <SummaryItem
                    title='Failed'
                    llmResponse={llmResponse}
                    questionsData={questionsData}
                />
            </div>
        </Card>
    );
}

interface SummaryItemsProps extends SummaryProps {
    title: string;
}

function SummaryItem({ questionsData, title }: SummaryItemsProps): JSX.Element {
    return (
        <div className='flex items-center justify-evenly gap-4'>
            <p className='w-1/3 text-xl'>{title}</p>
            <div className='w-1/3'>
                <div className='mx-auto h-16 w-16'>
                    <CircularProgressbar
                        value={0}
                        minValue={0}
                        maxValue={questionsData?.length}
                        text='N/A'
                        className='text-3xl'
                    />
                </div>
            </div>
        </div>
    );
}
