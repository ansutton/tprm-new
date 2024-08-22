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
                    <div className='space-y-2 opacity-80'>
                        <Heading
                            level={4}
                            additionalClasses='mb-4'
                            fontSize='text-lg'
                        >
                            Third Party Information
                        </Heading>
                        <p>
                            <b>Name</b>: N/A
                        </p>
                        <p>
                            <b>Service Description</b>: N/A
                        </p>
                        <p>
                            <b>Summary</b>: The third party and the AI model
                            provided the same response for{' '}
                            <b>
                                {llmResponse?.responses.length || 0}/
                                {questionsData?.length} (
                                {Math.round(
                                    ((llmResponse?.responses.length || 0) /
                                        questionsData?.length) *
                                        100,
                                )}
                                %)
                            </b>{' '}
                            of questions uploaded.
                        </p>
                    </div>
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
