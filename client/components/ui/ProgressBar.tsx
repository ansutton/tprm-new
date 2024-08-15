import { ReactNode } from 'react';
import { Card } from '@/components';
import { tw } from '@/utils';

interface ProgressBarBaseProps {
    progressPercentage: number;
    twBgColor?: string;
}

export function ProgressBarBase({
    progressPercentage,
    twBgColor = 'emerald',
}: ProgressBarBaseProps): JSX.Element {
    return (
        <div className='h-4 w-full rounded-full bg-zinc-200 dark:bg-zinc-400/50'>
            <div
                className={tw`h-4 rounded-full bg-${twBgColor}-400 transition-all duration-300`}
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
            <div className='flex items-center gap-3'>
                {startIcon}
                <h4 className='mb-3 w-full font-bold opacity-80'>{title}</h4>
            </div>
            <p className='mb-1 text-3xl font-bold'>{progressPercentage}%</p>
            <ProgressBarBase
                progressPercentage={progressPercentage}
                twBgColor={twBgColor}
            />
        </Card>
    );
}
