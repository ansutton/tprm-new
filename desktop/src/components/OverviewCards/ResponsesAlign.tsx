import { ReactNode } from 'react';
import { Card, ProgressBarBase, Tooltip } from '@/components';
import { LlmResponse } from '@/types';
import { tw } from '@/utils';

interface ResponsesAlignProps {
    llmResponse: LlmResponse;
    questionsData: string[];
    startIcon?: ReactNode;
}

export function ResponsesAlign({
    llmResponse,
    questionsData,
    startIcon = null,
}: ResponsesAlignProps): JSX.Element {
    return (
        <Card>
            <h4 className='mb-4 text-lg font-bold opacity-80'>
                AI and Third Party Responses Align?
                <span className='relative ml-1.5 inline-flex'>
                    <span className='absolute -top-4'>
                        <Tooltip twStroke='stroke-2'>{`Do the third party responses align with the AI generated responses?`}</Tooltip>
                    </span>
                </span>
            </h4>
            <div className='space-y-4 text-sm font-bold'>
                <ResponsesAlignItem
                    title='Yes'
                    llmResponse={llmResponse}
                    progressPercentage={90}
                    questionsData={questionsData}
                    twBgColor='bg-emerald-400'
                />
                <ResponsesAlignItem
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

interface ResponsesAlignItemProps extends ResponsesAlignProps {
    progressPercentage: number;
    title: string;
    twBgColor: string;
}

function ResponsesAlignItem({
    questionsData,
    progressPercentage,
    title,
    twBgColor,
}: ResponsesAlignItemProps): JSX.Element {
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
