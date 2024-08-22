import { ReactNode } from 'react';
import { Card, Heading, ProgressBarBase } from '@/components';
import { LlmResponse } from '@/types';
import { tw } from '@/utils';

interface EvidenceAnalysisProps {
    llmResponse: LlmResponse;
    questionsData: string[];
    startIcon?: ReactNode;
}

export function EvidenceAnalysis({
    llmResponse,
    questionsData,
    startIcon = null,
}: EvidenceAnalysisProps): JSX.Element {
    return (
        <Card width='w-64' additionalClasses='  min-w-64'>
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
                    title='Scope-Matching Documents'
                    llmResponse={llmResponse}
                    progressPercentage={67}
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
                {`${Math.round(progressPercentage * 0.01 * 3)}/3`}
            </p>
            <ProgressBarBase
                progressPercentage={progressPercentage}
                twBgColor={twBgColor}
            />
        </div>
    );
}
