import { ReactNode } from 'react';
import clsx from 'clsx';
import { Card, ProgressBarBase, Tooltip } from '@/components';
import { LlmResponse } from '@/types';
import { countResponsesAlign, tw } from '@/utils';

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
    const numberOfQuestions = questionsData.length;
    const yesCount = countResponsesAlign(llmResponse).yesCount;
    const noCount = countResponsesAlign(llmResponse).noCount;

    return (
        <Card>
            <h4 className='mb-4 text-lg font-bold opacity-80'>
                AI and Third Party Responses Align?
                <span className='relative ml-1.5 inline-flex'>
                    <span className='absolute -top-4'>
                        <Tooltip>{`Do the third party responses align with the AI generated responses?`}</Tooltip>
                    </span>
                </span>
            </h4>
            <div className='space-y-4 text-sm font-bold'>
                <ResponsesAlignItem
                    llmResponse={llmResponse}
                    numberOfQuestions={numberOfQuestions}
                    resultCount={yesCount}
                    title='Yes'
                    twBgColor='bg-emerald-400'
                />
                <ResponsesAlignItem
                    llmResponse={llmResponse}
                    numberOfQuestions={numberOfQuestions}
                    resultCount={noCount}
                    title='No'
                    twBgColor='bg-cyan-400'
                />
            </div>
        </Card>
    );
}

interface ResponsesAlignItemProps {
    llmResponse: LlmResponse;
    numberOfQuestions: number;
    resultCount: number;
    title: string;
    twBgColor: string;
}

function ResponsesAlignItem({
    llmResponse,
    numberOfQuestions,
    resultCount,
    title,
    twBgColor,
}: ResponsesAlignItemProps): JSX.Element {
    const isComplete = llmResponse?.is_complete;
    const progressPercentage = Math.round(
        (resultCount / numberOfQuestions) * 100,
    );
    return (
        <div>
            <p className='mb-2 text-base opacity-80'>{title}</p>
            <div className='relative'>
                <p
                    className={clsx(
                        tw`mb-1 text-2xl font-bold`,
                        !isComplete && tw`invisible`,
                        // tw`invisible`,
                    )}
                >
                    {`${resultCount}/${numberOfQuestions}`}
                </p>
                <div
                    className={clsx(
                        !isComplete && tw`invisible`,
                        // tw`invisible`,
                    )}
                >
                    <ProgressBarBase
                        progressPercentage={progressPercentage}
                        twBgColor={twBgColor}
                    />
                </div>
                <p
                    className={clsx(
                        tw`absolute top-0 animate-pulse text-lg font-normal italic`,
                        isComplete && tw`invisible`,
                    )}
                >
                    Analyzing...
                </p>
            </div>
        </div>
    );
}
