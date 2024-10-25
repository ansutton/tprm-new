import clsx from 'clsx';
import { ReactNode } from 'react';
import { buildStyles, CircularProgressbar } from 'react-circular-progressbar';
import { Card, Tooltip } from '@/components';
import { tw } from '@/utils';

interface CircularProgressProps {
    title: string;
    titleFontSize?: string;
    tooltipContent?: string;
    subtitle?: string;
    value: number;
    minValue: number | undefined;
    maxValue: number | undefined;
    pathColor?: string;
    startIcon?: ReactNode;
    text: string | undefined;
    textFontSize?: string;
}

export function CircularProgress({
    title,
    titleFontSize = 'text-lg',
    tooltipContent = '',
    subtitle = '',
    value,
    minValue,
    maxValue,
    pathColor = '',
    startIcon = null,
    text,
    textFontSize = 'text-3xl',
}: CircularProgressProps): JSX.Element {
    return (
        <div className='flex w-64 min-w-64'>
            <Card>
                <div className='flex items-center gap-2'>
                    {startIcon}
                    <div className='mb-4 flex w-full items-center gap-1.5 font-bold opacity-80'>
                        <h4 className={clsx(titleFontSize)}>{title}</h4>
                        {tooltipContent && <Tooltip>{tooltipContent}</Tooltip>}
                    </div>
                </div>
                {subtitle && (
                    <p className='mb-3 font-bold opacity-80'>{subtitle}</p>
                )}
                <div className='mx-auto h-48 w-48'>
                    <CircularProgressbar
                        className={`${textFontSize}`}
                        value={value}
                        minValue={minValue}
                        maxValue={maxValue}
                        styles={buildStyles({ pathColor: pathColor })}
                        text={text}
                    />
                </div>
            </Card>
        </div>
    );
}
