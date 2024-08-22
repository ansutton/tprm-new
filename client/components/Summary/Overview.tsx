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
                <Card>
                    <Heading
                        level={4}
                        additionalClasses={tw`mb-4 opacity-80`}
                        fontSize='text-lg'
                    >
                        <b>Third Party Name</b>: N/A
                    </Heading>
                    <p className={clsx(tw`opacity-70`)}>
                        <b>Service Description</b>: N/A
                    </p>
                    <p className={clsx(tw`mt-1 opacity-70`)}>
                        <b>Summary</b>: N/A
                    </p>
                </Card>

                <ConfidenceScore
                    llmResponse={llmResponse}
                    questionsData={questionsData}
                />

                <Card>
                    <Heading
                        level={4}
                        additionalClasses={tw`mb-4 opacity-80`}
                        fontSize='text-lg'
                    >
                        Summary
                    </Heading>
                    <p className='w-full text-lg'>
                        The third party and the AI model provided the same
                        response for{' '}
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
