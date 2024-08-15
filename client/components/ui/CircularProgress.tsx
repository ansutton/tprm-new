import { CircularProgressbar } from 'react-circular-progressbar';
import { Card } from '@/components';

interface CircularProgressProps {
    title: string;
    value: number;
    minValue?: number | undefined;
    maxValue?: number | undefined;
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
    text,
    twFontSize = 'text-3xl',
}: CircularProgressProps): JSX.Element {
    return (
        <div className='flex w-60 min-w-60'>
            <Card>
                <h4 className='mb-4 w-full text-center text-lg font-bold'>
                    {title}
                </h4>
                <div className='mx-auto h-40 w-40'>
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
