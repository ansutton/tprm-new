import clsx from 'clsx';
import { buildStyles, CircularProgressbar } from 'react-circular-progressbar';
import { Card, Heading } from '@/components';
import { tw } from '@/utils';

interface EvidenceProvidedProps {
    doesOverviewUnwrap: boolean;
}

export function EvidenceProvided({
    doesOverviewUnwrap,
}: EvidenceProvidedProps): JSX.Element {
    const data = [
        {
            title: 'Attestations',
            pathColor: 'hsl(351, 95%, 71%)', // rose-400
            percentage: 68,
        },
        {
            title: 'Policies/Procedures',
            pathColor: 'hsl(43, 96%, 56%)', // amber-400
            percentage: 82,
        },
        {
            title: 'Others',
            pathColor: 'hsl(188, 86%, 53%)', // cyan-400
            percentage: 34,
        },
    ];

    return (
        <Card>
            <Heading
                level={4}
                additionalClasses={tw`mb-4 opacity-80`}
                fontSize='text-lg'
            >
                Evidence Provided
            </Heading>
            <div
                className={clsx(
                    tw`flex justify-around gap-4`,
                    // doesOverviewUnwrap ? tw`` : tw`flex-col`,
                )}
            >
                {data.map(({ title, pathColor, percentage }, index) => (
                    <div key={index}>
                        <p className='mb-3 text-center font-bold opacity-80'>
                            {title}
                        </p>
                        <div className='mx-auto h-44 w-44'>
                            <CircularProgressbar
                                className='text-3xl'
                                value={percentage}
                                minValue={0}
                                maxValue={100}
                                text={`${percentage.toString()}%`}
                                styles={buildStyles({ pathColor: pathColor })}
                            />
                        </div>
                    </div>
                ))}
            </div>
        </Card>
    );
}
