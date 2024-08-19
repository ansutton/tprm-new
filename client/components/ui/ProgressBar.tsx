import { ReactNode } from 'react';
import { Card } from '@/components';

interface ProgressBarBaseProps {
    progressPercentage: number;
    twBgColor?: string;
}

export function ProgressBarBase({
    progressPercentage,
    twBgColor = 'bg-emerald-400',
}: ProgressBarBaseProps): JSX.Element {
    return (
        <div className='h-4 w-full rounded-full bg-zinc-200 dark:bg-zinc-400/50'>
            <div
                className={`h-4 rounded-full ${twBgColor} transition-all duration-300`}
                style={{ width: `${progressPercentage}%` }}
            ></div>
        </div>
    );
}

interface ProgressBarProps extends ProgressBarBaseProps {
    startIcon?: ReactNode;
    title: string;
}

export function ProgressBar({
    progressPercentage,
    startIcon = null,
    title,
    twBgColor,
}: ProgressBarProps): JSX.Element {
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
