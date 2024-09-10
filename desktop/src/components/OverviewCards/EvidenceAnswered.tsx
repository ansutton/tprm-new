import { ReactNode } from 'react';
import { Card, ProgressBarBase } from '@/components';
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
