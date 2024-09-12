import { ReactNode } from 'react';
import clsx from 'clsx';
import { Card, Heading, ProgressBarBase } from '@/components';
import { LlmResponse } from '@/types';
import { tw } from '@/utils';

interface EvidenceAnalysisProps {
    isOverviewWide?: boolean;
    llmResponse: LlmResponse;
    questionsData: string[];
    startIcon?: ReactNode;
}

export function EvidenceAnalysis({
    isOverviewWide,
    llmResponse,
    questionsData,
    startIcon = null,
}: EvidenceAnalysisProps): JSX.Element {
    return (
        <Card
            width={clsx(isOverviewWide ? tw`w-64` : tw`w-full`)}
            additionalClasses={tw`min-w-64`}
        >
            <Heading
                level={4}
                additionalClasses={tw`mb-4 opacity-80`}
                fontSize='text-lg'
            >
                Evidence Analysis
            </Heading>
            <div className='space-y-4 text-sm font-bold'>
                <EvidenceAnalysisItem
                    title='Documents Uploaded'
                    llmResponse={llmResponse}
                    progressPercentage={100}
                    questionsData={questionsData}
                    twBgColor='bg-cyan-400'
                />
                <EvidenceAnalysisItem
                    title='Documents Matching Engagement Scope'
                    llmResponse={llmResponse}
                    progressPercentage={100}
                    questionsData={questionsData}
                    twBgColor='bg-emerald-400'
                />
            </div>
        </Card>
    );
}

interface EvidenceAnalysisItemsProps extends EvidenceAnalysisProps {
    progressPercentage: number;
    title: string;
    twBgColor: string;
}

function EvidenceAnalysisItem({
    questionsData,
    progressPercentage,
    title,
    twBgColor,
}: EvidenceAnalysisItemsProps): JSX.Element {
    return (
        <div className=''>
            <p className='mb-2 text-base opacity-80'>{title}</p>
            <p className='mb-1 text-2xl font-bold'>
                {`${Math.round(progressPercentage * 0.01)}/1`}
            </p>
            <ProgressBarBase
                progressPercentage={progressPercentage}
                twBgColor={twBgColor}
            />
        </div>
    );
}
