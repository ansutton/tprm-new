import { ReactNode } from 'react';
import { Card, Heading, ProgressBarBase } from '@/components';
import { LlmResponse } from '@/types';
import { tw } from '@/utils';

interface AnswersAlignProps {
    llmResponse: LlmResponse;
    questionsData: string[];
    startIcon?: ReactNode;
}

export function AnswersAlign({
    llmResponse,
    questionsData,
    startIcon = null,
}: AnswersAlignProps): JSX.Element {
    return (
        <Card>
            <Heading
                level={4}
                additionalClasses={tw`mb-4 opacity-80`}
                fontSize='text-lg'
            >
                AI and Third Party Responses Align?
            </Heading>
            <div className='space-y-4 text-sm font-bold'>
                <AnswersAlignItem
                    title='Yes'
                    llmResponse={llmResponse}
                    progressPercentage={90}
                    questionsData={questionsData}
                    twBgColor='bg-emerald-400'
                />
                <AnswersAlignItem
                    title='No'
                    llmResponse={llmResponse}
                    progressPercentage={20}
                    questionsData={questionsData}
                    twBgColor='bg-cyan-400'
                />
            </div>
        </Card>
    );
}

interface AnswersAlignItemProps extends AnswersAlignProps {
    progressPercentage: number;
    title: string;
    twBgColor: string;
}

function AnswersAlignItem({
    questionsData,
    progressPercentage,
    title,
    twBgColor,
}: AnswersAlignItemProps): JSX.Element {
    return (
        <div className=''>
            <p className='mb-2 text-base opacity-80'>{title}</p>
            <p className='mb-1 text-2xl font-bold'>
                {`${Math.round(progressPercentage * 0.01 * questionsData?.length)}/${questionsData?.length}`}
            </p>
            <ProgressBarBase
                progressPercentage={progressPercentage}
                twBgColor={twBgColor}
            />
        </div>
    );
}
