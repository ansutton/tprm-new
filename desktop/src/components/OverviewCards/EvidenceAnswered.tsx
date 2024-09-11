import { ReactNode } from 'react';
import { Card, ProgressBarBase, Tooltip } from '@/components';
import { ProgressBarBaseProps } from '@/types';

interface EvidenceAnsweredProps extends ProgressBarBaseProps {
    startIcon?: ReactNode;
    title: string;
}

export function EvidenceAnswered({
    progressPercentage,
    startIcon = null,
    title,
    twBgColor,
}: EvidenceAnsweredProps): JSX.Element {
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
            <p className='mb-1 text-3xl font-bold'>{progressPercentage}%</p>
            <ProgressBarBase
                progressPercentage={progressPercentage}
                twBgColor={twBgColor}
            />
        </Card>
    );
}
