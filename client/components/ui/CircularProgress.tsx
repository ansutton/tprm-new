import { ReactNode } from 'react';
import { CircularProgressbar } from 'react-circular-progressbar';
import { Card } from '@/components';

interface CircularProgressProps {
    title: string;
    value: number;
    minValue?: number | undefined;
    maxValue?: number | undefined;
    startIcon?: ReactNode;
    text?: string | undefined;
    twFontSize?:
        | 'text-xs'
        | 'text-sm'
        | 'text-base'
        | 'text-lg'
        | 'text-xl'
        | 'text-2xl'
        | 'text-3xl'
        | 'text-4xl'
        | 'text-5xl'
        | 'text-6xl'
        | 'text-7xl'
        | 'text-8xl'
        | 'text-9xl';
}

export function CircularProgress({
    title,
    value,
    minValue,
    maxValue,
    startIcon = null,
    text,
    twFontSize = 'text-3xl',
}: CircularProgressProps): JSX.Element {
    return (
        <div className='flex w-64 min-w-64'>
            <Card>
                <div className='flex items-center gap-2'>
                    {startIcon}
                    <h4 className='mb-4 w-full font-bold opacity-80'>
                        {title}
                    </h4>
                </div>
                <div className='mx-auto h-48 w-48'>
                    <CircularProgressbar
                        className={`${twFontSize}`}
                        value={value}
                        minValue={minValue}
                        maxValue={maxValue}
                        text={text}
                    />
                </div>
            </Card>
        </div>
    );
}
