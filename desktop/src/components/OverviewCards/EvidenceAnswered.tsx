import { ReactNode } from 'react';
import clsx from 'clsx';
import { Card, ProgressBarBase, Tooltip } from '@/components';
import { LlmResponse, ProgressBarBaseProps } from '@/types';
import { countQuestionsAnsweredByEvidence, tw } from '@/utils';

interface EvidenceAnsweredProps extends ProgressBarBaseProps {
    llmResponse?: LlmResponse;
    questionsData?: string[];
    startIcon?: ReactNode;
    title: string;
}

export function EvidenceAnswered({
    llmResponse,
    questionsData,
    startIcon = null,
    title,
    twBgColor,
}: EvidenceAnsweredProps): JSX.Element {
    const numberOfQuestions = questionsData?.length;
    const questionsAnsweredByEvidence =
        countQuestionsAnsweredByEvidence(llmResponse);
    const progressPercentage = Math.round(
        (questionsAnsweredByEvidence / (numberOfQuestions ?? 0)) * 100,
    );
    const isComplete = llmResponse?.is_complete;

    return (
        <Card>
            <div className='flex items-center gap-2'>
                {startIcon}
                <h4 className='mb-4 inline w-full text-lg font-bold opacity-80'>
                    {title}
                    <span className='relative ml-1.5 inline-flex'>
                        <span className='absolute -top-4'>
                            <Tooltip twStroke='stroke-2'>{`% of questions analyzed where the AI was able to reference a citation justifying its response`}</Tooltip>
                        </span>
                    </span>
                </h4>
            </div>
            <div className='relative'>
                <p
                    className={clsx(
                        tw`mb-1 text-3xl font-bold`,
                        !isComplete && tw`invisible`,
                        // tw`invisible`,
                    )}
                >{`${questionsAnsweredByEvidence}/${numberOfQuestions}`}</p>
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
                        tw`animate-pulse text-lg italic`,
                        tw`absolute top-0`,
                        isComplete && tw`invisible`,
                    )}
                >
                    Analyzing...
                </p>
            </div>
        </Card>
    );
}
