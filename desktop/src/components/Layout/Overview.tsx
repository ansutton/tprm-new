import clsx from 'clsx';
import { useMediaQuery } from 'react-responsive';
import {
    ConfidenceScore,
    EvidenceAnalysis,
    EvidenceProvided,
    EvidenceAnswered,
    QuestionsAnalyzed,
    ResponsesAlign,
    // SecurityDomains,
    Summary,
    ThirdPartyInfo,
} from '@/components';
import { EvidenceFiles, LlmResponse } from '@/types';
import { tw } from '@/utils';
interface OverviewProps {
    evidenceFiles: EvidenceFiles;
    tpResponsesData: any[][];
    isSidebarExpanded: boolean;
    llmResponse: LlmResponse;
    questionsData: string[];
}

export function Overview({
    evidenceFiles,
    tpResponsesData,
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
            <ThirdPartyInfo
                llmResponse={llmResponse}
                questionsData={questionsData}
            />
            {/* <Summary
                    llmResponse={llmResponse}
                    questionsData={questionsData}
                /> */}
            {/* <ConfidenceScore
                    llmResponse={llmResponse}
                    questionsData={questionsData}
                    title='AI Confidence Score'
                    tooltipContent={`How confident is the AI is when determining whether its responses align with the third party responses? (0-100%, aggregated)`}
                    subtitle='Aggregate'
                /> */}

            <ResponsesAlign
                llmResponse={llmResponse}
                questionsData={questionsData}
                tpResponsesData={tpResponsesData}
            />

            {/* <SecurityDomains
                llmResponse={llmResponse}
                questionsData={questionsData}
            /> */}

            {isOverviewWide ? (
                <div className='space-y-4'>
                    <div className='flex gap-4'>
                        <EvidenceAnalysis
                            evidenceFiles={evidenceFiles}
                            isOverviewWide={isOverviewWide}
                            llmResponse={llmResponse}
                            questionsData={questionsData}
                        />
                        <EvidenceProvided
                            evidenceFiles={evidenceFiles}
                            isOverviewWide={isOverviewWide}
                        />
                        <QuestionsAnalyzed
                            llmResponse={llmResponse}
                            questionsData={questionsData}
                        />
                    </div>

                    <EvidenceAnswered
                        llmResponse={llmResponse}
                        questionsData={questionsData}
                        title='Questions Answered by Evidence'
                        twBgColor='bg-emerald-400'
                    />
                </div>
            ) : (
                <div className='space-y-4'>
                    <div className='flex gap-4'>
                        <EvidenceAnalysis
                            evidenceFiles={evidenceFiles}
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
                            evidenceFiles={evidenceFiles}
                            isOverviewWide={isOverviewWide}
                        />
                        <EvidenceAnswered
                            llmResponse={llmResponse}
                            questionsData={questionsData}
                            title='Questions Answered by Evidence'
                            progressPercentage={100}
                            twBgColor='bg-emerald-400'
                        />
                    </div>
                </div>
            )}
        </div>
    );
}

