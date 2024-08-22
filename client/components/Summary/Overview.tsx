import {
    BoltIcon,
    DocumentChartBarIcon,
    DocumentCheckIcon,
    NewspaperIcon,
} from '@heroicons/react/24/outline';
import clsx from 'clsx';
import {
    Card,
    ConfidenceScore,
    Heading,
    ProgressBar,
    QuestionsAnalyzed,
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
            <Card>
                <Heading
                    level={4}
                    additionalClasses={tw`mb-4 opacity-80`}
                    twFontSize='text-lg'
                    startIcon={
                        <DocumentChartBarIcon
                            className={clsx(iconStrokeClasses, 'mb-4 w-7')}
                        />
                    }
                >
                    Summary
                </Heading>
                <p className='w-full text-lg'>
                    The third party and the AI model provided the same response
                    for{' '}
                    <span className='font-bold'>
                        {llmResponse?.responses.length || 0}/
                        {questionsData?.length} (
                        {Math.round(
                            ((llmResponse?.responses.length || 0) /
                                questionsData?.length) *
                                100,
                        )}
                        %)
                    </span>{' '}
                    of questions uploaded.
                </p>
            </Card>

            <div className='flex w-full justify-end gap-4'>
                <div className='flex w-full flex-col gap-4'>
                    <ProgressBar
                        title='Evidence Documents Analyzed'
                        progressPercentage={75}
                        startIcon={
                            <DocumentCheckIcon
                                className={clsx(iconStrokeClasses, 'mb-3 w-7')}
                            />
                        }
                    />

                    <ProgressBar
                        title='Questions Unanswered by Evidence'
                        progressPercentage={40}
                        startIcon={
                            <NewspaperIcon
                                className={clsx(iconStrokeClasses, 'mb-3 w-7')}
                            />
                        }
                        twBgColor='bg-rose-400'
                    />
                </div>

                <QuestionsAnalyzed
                    llmResponse={llmResponse}
                    questionsData={questionsData}
                    startIcon={
                        <BoltIcon
                            className={clsx(iconStrokeClasses, 'mb-4 w-7')}
                        />
                    }
                />
            </div>

            <ConfidenceScore
                llmResponse={llmResponse}
                questionsData={questionsData}
            />
        </>
    );
}
