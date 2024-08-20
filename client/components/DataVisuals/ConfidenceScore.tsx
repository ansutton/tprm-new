import clsx from 'clsx';
import { CircularProgressbar } from 'react-circular-progressbar';
import { Card, Heading } from '@/components';
import { LlmResponse } from '@/types';
import { tw } from '@/utils';

interface ConfidenceScoreProps {
    questionsData: string[];
    llmResponse: LlmResponse;
}

export function ConfidenceScore({
    questionsData,
    llmResponse,
}: ConfidenceScoreProps): JSX.Element {
    return (
        <div className='relative mx-auto flex w-[500px] min-w-64'>
            <Card>
                <Heading level={4}>Confidence Score</Heading>
                <p className={clsx(tw`mb-8 mt-0.5 opacity-70`)}>
                    From all questions
                </p>
                <div className='mx-auto h-56 w-56'>
                    <CircularProgressbar
                        className={clsx(tw`text-3xl`)}
                        value={9}
                        minValue={0}
                        maxValue={10}
                    />
                </div>
            </Card>

            <div
                className={clsx(
                    tw`absolute inset-x-0 bottom-0`,
                    tw`w-full px-10 pb-6 text-center text-2xl`,
                )}
            >
                <div
                    className={clsx(
                        tw`bg-zinc-200 p-3 opacity-95 dark:bg-zinc-700`,
                        tw`flex flex-col items-center justify-center rounded-lg`,
                    )}
                >
                    <div
                        className={clsx(
                            tw`flex w-full justify-between text-base`,
                        )}
                    >
                        <span>0%</span>
                        <span>100%</span>
                    </div>
                    <span className={clsx(tw`mb-0.5 text-5xl font-bold`)}>
                        90%
                    </span>
                    <p className={clsx(tw`text-base opacity-80`)}>
                        Based on model
                    </p>
                </div>
            </div>
        </div>
    );
}
