import {
    BoltIcon,
    DocumentChartBarIcon,
    DocumentCheckIcon,
    DocumentIcon,
    DocumentTextIcon,
    NewspaperIcon,
} from '@heroicons/react/24/outline';
import clsx from 'clsx';
import {
    Card,
    ConfidenceScore,
    Heading,
    ProgressBar,
    QuestionsAnalyzed,
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

    return (
        <>
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

            <div className='flex w-full justify-end gap-4'>
                <div className='flex w-full flex-col gap-4'>
                    <ProgressBar
                        title='Evidence Documents Analyzed'
                        progressPercentage={75}
                    />

                    <ProgressBar
                        title='Questions Unanswered by Evidence'
                        progressPercentage={40}
                        twBgColor='bg-rose-400'
                    />
                </div>

                <QuestionsAnalyzed
                    llmResponse={llmResponse}
                    questionsData={questionsData}
                />
            </div>

            <ConfidenceScore
                llmResponse={llmResponse}
                questionsData={questionsData}
            />
        </>
    );
}
