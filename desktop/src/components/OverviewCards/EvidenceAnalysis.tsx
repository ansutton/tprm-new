import { ReactNode } from 'react';
import clsx from 'clsx';
import { Card, Heading, ProgressBarBase } from '@/components';
import { EvidenceFiles, EvidenceType, LlmResponse } from '@/types';
import { tw } from '@/utils';

interface EvidenceAnalysisProps {
    evidenceFiles: EvidenceFiles;
    isOverviewWide?: boolean;
    llmResponse: LlmResponse;
    questionsData: string[];
    startIcon?: ReactNode;
}

export function EvidenceAnalysis({
    evidenceFiles,
    isOverviewWide,
    llmResponse,
    questionsData,
    startIcon = null,
}: EvidenceAnalysisProps): JSX.Element {
    return (
        <Card
            twWidth={clsx(isOverviewWide ? tw`w-64` : tw`w-full`)}
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
                    evidenceFiles={evidenceFiles}
                    title='Documents Selected'
                    llmResponse={llmResponse}
                    questionsData={questionsData}
                    twBgColor='bg-cyan-400'
                />
                <EvidenceAnalysisItem
                    evidenceFiles={evidenceFiles}
                    title='Documents Matching Engagement Scope'
                    llmResponse={llmResponse}
                    questionsData={questionsData}
                    twBgColor='bg-emerald-400'
                />
            </div>
        </Card>
    );
}

interface EvidenceAnalysisItemProps extends EvidenceAnalysisProps {
    title: string;
    twBgColor: string;
}

function EvidenceAnalysisItem({
    evidenceFiles,
    questionsData,
    title,
    twBgColor,
}: EvidenceAnalysisItemProps): JSX.Element {
    const evidenceFilesCount: number = evidenceFiles?.length ?? 0;
    // Math.round(evidenceFilesCount * 0.01)}/1

    return (
        <div className=''>
            <p className='mb-2 text-base opacity-80'>{title}</p>
            <p className='mb-1 text-2xl font-bold'>
                {evidenceFilesCount}/{evidenceFilesCount}
            </p>
            <ProgressBarBase progressPercentage={100} twBgColor={twBgColor} />
        </div>
    );
}

