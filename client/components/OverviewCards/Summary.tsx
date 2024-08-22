import { ReactNode } from 'react';
import { Card, Heading, ProgressBarBase } from '@/components';
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
            <div className='space-y-4 text-sm font-bold opacity-80'>
                <SummaryItem
                    title='Questions Passed'
                    llmResponse={llmResponse}
                    progressPercentage={90}
                    questionsData={questionsData}
                    twBgColor='bg-emerald-400'
                />
                <SummaryItem
                    title='Questions Failed'
                    llmResponse={llmResponse}
                    progressPercentage={20}
                    questionsData={questionsData}
                    twBgColor='bg-rose-400'
                />
            </div>
        </Card>
    );
}

interface SummaryItemsProps extends SummaryProps {
    progressPercentage: number;
    title: string;
    twBgColor: string;
}

function SummaryItem({
    questionsData,
    progressPercentage,
    title,
    twBgColor,
}: SummaryItemsProps): JSX.Element {
    return (
        <div>
            <p className='mb-2 text-base'>{title}</p>
            <p className='mb-1 text-2xl font-bold'>
                {`${Math.round(progressPercentage * 0.01 * questionsData?.length)}/${questionsData?.length}`}
            </p>
            <ProgressBarBase
                progressPercentage={progressPercentage}
                twBgColor={twBgColor}
            />
        </div>
    );
}
