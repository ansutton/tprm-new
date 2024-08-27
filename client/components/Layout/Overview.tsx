import clsx from 'clsx';
import { useMediaQuery } from 'react-responsive';
import {
    ConfidenceScore,
    EvidenceAnalysis,
    EvidenceProvided,
    EvidenceUnanswered,
    QuestionsAnalyzed,
    SecurityDomains,
    Summary,
    ThirdPartyInfo,
} from '@/components';
import { LlmResponse } from '@/types';
import { tw } from '@/utils';
interface OverviewProps {
    excelData: any[][];
    isSidebarExpanded: boolean;
    llmResponse: LlmResponse;
    questionsData: string[];
}

export function Overview({
    excelData,
    llmResponse,
    isSidebarExpanded,
    questionsData,
}: OverviewProps): JSX.Element {
    const iconStrokeClasses = clsx(
        tw`stroke-indigo-600 stroke-2`,
        tw`dark:stroke-indigo-500`,
    );

    const sidebarExpandedMediaQuery = useMediaQuery({
        query: '(min-width: 1440px)',
    });
    const sidebarContractedMediaQuery = useMediaQuery({
        query: '(min-width: 1280px)',
    });

    const isOverviewWide = isSidebarExpanded
        ? sidebarExpandedMediaQuery
        : sidebarContractedMediaQuery;

    return (
        <div className='space-y-4'>
            <div className='flex gap-4'>
                <ThirdPartyInfo
                    llmResponse={llmResponse}
                    questionsData={questionsData}
                />
                <ConfidenceScore
                    llmResponse={llmResponse}
                    questionsData={questionsData}
                />
                <Summary
                    llmResponse={llmResponse}
                    questionsData={questionsData}
                />
            </div>

            <SecurityDomains
                llmResponse={llmResponse}
                questionsData={questionsData}
            />

            {isOverviewWide ? (
                <div className='space-y-4'>
                    <div className='flex gap-4'>
                        <EvidenceAnalysis
                            isOverviewWide={isOverviewWide}
                            llmResponse={llmResponse}
                            questionsData={questionsData}
                        />
                        <EvidenceProvided
                            isOverviewWide={isOverviewWide}
                        />
                        <QuestionsAnalyzed
                            llmResponse={llmResponse}
                            questionsData={questionsData}
                        />
                    </div>

                    <EvidenceUnanswered
                        title='Questions Unanswered by Evidence'
                        progressPercentage={40}
                        twBgColor='bg-rose-400'
                    />
                </div>
            ) : (
                <div className='space-y-4'>
                    <div className='flex gap-4'>
                        <EvidenceAnalysis
                            isOverviewWide={isOverviewWide}
                            llmResponse={llmResponse}
                            questionsData={questionsData}
                        />
                        <QuestionsAnalyzed
                            llmResponse={llmResponse}
                            questionsData={questionsData}
                        />
                    </div>

                    <div className='space-y-4'>
                        <EvidenceProvided
                            isOverviewWide={isOverviewWide}
                        />
                        <EvidenceUnanswered
                            title='Questions Unanswered by Evidence'
                            progressPercentage={40}
                            twBgColor='bg-cyan-400'
                        />
                    </div>
                </div>
            )}
        </div>
    );
}
