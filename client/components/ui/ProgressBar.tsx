import { ReactNode } from 'react';
import { Card } from '@/components';
import { LlmResponse } from '@/types';

interface ProgressBarBaseProps {
    progressPercentage: number;
}

export function ProgressBarBase({
    progressPercentage,
}: ProgressBarBaseProps): JSX.Element {
    return (
        <div className='h-4 w-full rounded-full bg-gray-200'>
            <div
                className='h-4 rounded-full bg-indigo-600 transition-all duration-300'
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
}: ProgressBarProps): JSX.Element {
    return (
        <Card>
            <div className='flex items-center gap-3'>
                {startIcon}
                <h4 className='mb-4 w-full text-lg font-bold'>{title}</h4>
            </div>
            <ProgressBarBase progressPercentage={progressPercentage} />
        </Card>
    );
}
