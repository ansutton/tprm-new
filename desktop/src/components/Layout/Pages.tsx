import { ArrowPathIcon } from '@heroicons/react/24/outline';
import { LlmResponse } from '@/types';

interface PagesProps {
    index: number;
    llmResponse: LlmResponse;
    prefix?: string;
}

export function Pages({
    index,
    llmResponse,
    prefix = '',
}: PagesProps): JSX.Element {
    return (
        <>
            {llmResponse?.analyses[`analysis_${index}`]?.pages ? (
                <div className='flex gap-2'>
                    {prefix}
                    {llmResponse?.analyses[`analysis_${index}`]?.pages?.map(
                        (pageNumber, j) => (
                            <p key={j} className='flex'>
                                <span>{pageNumber}</span>
                                {j + 1 !==
                                    llmResponse?.analyses[`analysis_${index}`]
                                        ?.pages?.length &&
                                    (llmResponse?.analyses[`analysis_${index}`]
                                        ?.pages?.length ?? 0) > 1 &&
                                    ', '}
                            </p>
                        ),
                    )}
                </div>
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