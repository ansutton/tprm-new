import clsx from 'clsx';
import {
    ConfidenceScore,
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

            <div className='flex w-full justify-end gap-4'>
                <EvidenceUnanswered
                    title='Questions Unanswered by Evidence'
                    progressPercentage={40}
                    twBgColor='bg-rose-400'
                />
                <QuestionsAnalyzed
                    llmResponse={llmResponse}
                    questionsData={questionsData}
                />
            </div>
        </div>
    );
}
