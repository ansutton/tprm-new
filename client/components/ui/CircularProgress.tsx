import { CircularProgressbar } from 'react-circular-progressbar';
import { Card } from '@/components';

interface CircularProgressProps {
    title: string;
    value: number;
    minValue?: number | undefined;
    maxValue?: number | undefined;
    text?: string | undefined;
}

export function CircularProgress({
    title,
    value,
    minValue,
    maxValue,
    text,
}: CircularProgressProps): JSX.Element {
    return (
        <div className='flex'>
            <Card>
                <h4 className='mb-4 w-full text-lg font-bold'>{title}</h4>
                <div className='mx-auto h-40 w-40'>
                    <CircularProgressbar
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
