import clsx from 'clsx';
import { buildStyles, CircularProgressbar } from 'react-circular-progressbar';
import { Card, Heading } from '@/components';
import { tw } from '@/utils';

interface EvidenceProvidedProps {
    isOverviewWide: boolean;
}

export function EvidenceProvided({
    isOverviewWide,
}: EvidenceProvidedProps): JSX.Element {
    const data = [
        {
            title: 'SOC 2 Type 2 Reports',
            pathColor: 'hsl(188, 86%, 53%)', // cyan-400
            count: 1,
        },
        {
            title: 'Policies',
            pathColor: 'hsl(43, 96%, 56%)', // amber-400
            count: 0,
        },
        {
            title: 'Others',
            pathColor: 'hsl(351, 95%, 71%)', // rose-400
            count: 0,
        },
    ];

    const totalCount = data.reduce((acc, item) => acc + item.count, 0);

    return (
        <Card>
            <Heading
                level={4}
                additionalClasses={tw`mb-4 opacity-80`}
                fontSize='text-lg'
            >
                Types of Third Party Evidence Uploaded
            </Heading>
            <div
                className={clsx(
                    tw`flex justify-around gap-4`,
                    // isOverviewWide ? tw`` : tw`flex-col`,
                )}
            >
                {data.map(({ title, pathColor, count }, index) => (
                    <div key={index}>
                        <p className='mb-3 text-center font-bold opacity-80'>
                            {title}
                        </p>
                        <div className='mx-auto h-44 w-44'>
                            <CircularProgressbar
                                className='text-3xl'
                                value={count}
                                minValue={0}
                                maxValue={totalCount}
                                text={`${count.toString()}`}
                                styles={buildStyles({ pathColor: pathColor })}
                            />
                        </div>
                    </div>
                ))}
            </div>
        </Card>
    );
}
