import { ReactNode } from 'react';
import { Card } from '@/components';
import { ProgressBarBaseProps } from '@/types';

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
