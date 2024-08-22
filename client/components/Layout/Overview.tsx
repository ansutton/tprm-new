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
    llmResponse: LlmResponse;
    questionsData: string[];
}

export function Overview({
    excelData,
    llmResponse,
    questionsData,
}: OverviewProps): JSX.Element {
    const iconStrokeClasses = clsx(
        tw`stroke-indigo-600 stroke-2`,
        tw`dark:stroke-indigo-500`,
    );

    const isXlScreen = useMediaQuery({ query: '(min-width: 1280px)' });

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

            {isXlScreen ? (
                <div className='space-y-4'>
                    <div className='flex gap-4'>
                        <EvidenceAnalysis
                            isXlScreen={isXlScreen}
                            llmResponse={llmResponse}
                            questionsData={questionsData}
                        />

                        <EvidenceProvided isXlScreen={isXlScreen} />
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
                            isXlScreen={isXlScreen}
                            llmResponse={llmResponse}
                            questionsData={questionsData}
                        />
                        <QuestionsAnalyzed
                            llmResponse={llmResponse}
                            questionsData={questionsData}
                        />
                    </div>

                    <div className='space-y-4'>
                        <EvidenceUnanswered
                            title='Questions Unanswered by Evidence'
                            progressPercentage={40}
                            twBgColor='bg-rose-400'
                        />
                        <EvidenceProvided isXlScreen={isXlScreen} />
                    </div>
                </div>
            )}
        </div>
    );
}
