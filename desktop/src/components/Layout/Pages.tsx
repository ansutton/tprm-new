import { ArrowPathIcon } from '@heroicons/react/24/outline';
import clsx from 'clsx';
import { LlmResponse } from '@/types';
import { fadeOverlayStyling, tw } from '@/utils';

export function PagesPreview({
    index,
    llmResponse,
    prefix = '',
}: PagesFullProps): JSX.Element {
    return (
        <>
            {llmResponse?.analyses[`analysis_${index}`]?.pages ? (
                <div className='relative'>
                    <div className='flex w-40 gap-2 overflow-hidden'>
                        {prefix}
                        {llmResponse?.analyses[`analysis_${index}`]?.pages?.map(
                            (page, j) => (
                                <p key={j} className='flex'>
                                    <span className='select-none whitespace-nowrap'>
                                        {page}
                                    </span>
                                    {j + 1 !==
                                        llmResponse?.analyses[
                                            `analysis_${index}`
                                        ]?.pages?.length &&
                                        (llmResponse?.analyses[
                                            `analysis_${index}`
                                        ]?.pages?.length ?? 0) > 1 &&
                                        ', '}
                                </p>
                            ),
                        )}
                    </div>
                    <div
                        className={clsx([
                            tw`absolute inset-y-0 right-0 w-1/2`,
                            tw`bg-gradient-to-r from-transparent to-90%`,
                            tw`group-hover:transition-all group-hover:duration-200 group-hover:ease-out`,

                            // additionalStyling,
                        ])}
                    />
                </div>
            ) : (
                <ArrowPathIcon className='size-5 animate-spin stroke-2 text-indigo-800 dark:text-indigo-500' />
            )}
        </>
    );
}

interface PagesFullProps {
    fadeOverlayStyling?: () => any[];
    index: number;
    llmResponse: LlmResponse;
    prefix?: string;
}

export function PagesFull({
    index,
    llmResponse,
    prefix = '',
}: PagesFullProps): JSX.Element {
    return (
        <>
            {llmResponse?.analyses[`analysis_${index}`]?.pages ? (
                <>
                    <div className='flex w-10 flex-wrap gap-2'>
                        {prefix}
                        {llmResponse?.analyses[`analysis_${index}`]?.pages?.map(
                            (page, j) => (
                                <p key={j} className='flex'>
                                    <span className='select-none whitespace-nowrap'>
                                        {page}
                                    </span>
                                    {j + 1 !==
                                        llmResponse?.analyses[
                                            `analysis_${index}`
                                        ]?.pages?.length &&
                                        (llmResponse?.analyses[
                                            `analysis_${index}`
                                        ]?.pages?.length ?? 0) > 1 &&
                                        ', '}
                                </p>
                            ),
                        )}
                    </div>
                </>
            ) : (
                <ArrowPathIcon className='size-5 animate-spin stroke-2 text-indigo-800 dark:text-indigo-500' />
            )}
        </>
    );
}
/* {[4, 2].map((item, j)=> (
                            <div key={j}>
                                <span className="">{item}</span>
                                {(j + 1) !== [4, 2].length && (([4, 2]?.length ?? 0) > 1) && ', '}
                            </div>
                        ))} */
