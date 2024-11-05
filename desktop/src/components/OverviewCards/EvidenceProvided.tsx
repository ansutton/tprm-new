import clsx from 'clsx';
import { buildStyles, CircularProgressbar } from 'react-circular-progressbar';
import { Card, Heading } from '@/components';
import { tw } from '@/utils';
import { EvidenceFile, EvidenceFiles, EvidenceColors } from '@/types';

type EvidenceData = {
    title: string;
    color: string;
    count: number;
};
interface EvidenceProvidedProps {
    evidenceFiles: EvidenceFiles;
    isOverviewWide: boolean;
}

export function EvidenceProvided({
    evidenceFiles,
    isOverviewWide,
}: EvidenceProvidedProps): JSX.Element {
    const totalCount = evidenceFiles!.length;

    function getColor(evidenceFile: EvidenceFile): string {
        for (let i = 0; i < EvidenceColors.length; i++) {
            if (EvidenceColors[i][0] === evidenceFile?.evidenceType) {
                return EvidenceColors[i][1];
            }
        }
        return '';
    }

    const uniqueEvidence = evidenceFiles?.reduce(
        (acc, evidence: EvidenceFile) => {
            const found = acc.find(
                (item) => item.title === evidence!.evidenceType,
            );
            if (found) {
                found.count++;
            } else {
                acc.push({
                    title: evidence!.evidenceType,
                    color: getColor(evidence),
                    count: 1,
                });
            }
            return acc;
        },
        [] as EvidenceData[],
    );

    return (
        <Card>
            <Heading
                level={4}
                additionalClasses={tw`mb-4 opacity-80`}
                fontSize='text-lg'
            >
                Types of Third Party Evidence Selected
            </Heading>
            <div
                className={clsx(
                    tw`flex flex-wrap justify-around gap-4`,
                    // isOverviewWide ? tw`` : tw`flex-col`,
                )}
            >
                {uniqueEvidence?.map(({ title, color, count }, index) => (
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
                                styles={buildStyles({
                                    pathColor: color,
                                })}
                            />
                        </div>
                    </div>
                ))}
            </div>
        </Card>
    );
}
