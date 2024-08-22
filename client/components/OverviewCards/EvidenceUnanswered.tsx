import { ReactNode } from 'react';
import { Card, ProgressBarBase } from '@/components';
import { ProgressBarBaseProps } from '@/types';

interface EvidenceUnansweredProps extends ProgressBarBaseProps {
    startIcon?: ReactNode;
    title: string;
}

export function EvidenceUnanswered({
    progressPercentage,
    startIcon = null,
    title,
    twBgColor,
}: EvidenceUnansweredProps): JSX.Element {
    return (
        <Card>
            <div className='flex items-center gap-2'>
                {startIcon}
                <h4 className='mb-3 w-full text-lg font-bold opacity-80'>
                    {title}
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
