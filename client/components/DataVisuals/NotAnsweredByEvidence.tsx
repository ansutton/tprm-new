import { NewspaperIcon } from '@heroicons/react/24/outline';
import clsx from 'clsx';
import { ProgressBar } from '@/components';
import { LlmResponse } from '@/types';
import { tw } from '@/utils';

interface NotAnsweredByEvidenceProps {
    llmResponse: LlmResponse;
    questionsData: string[];
}

export function NotAnsweredByEvidence({
    llmResponse,
    questionsData,
}: NotAnsweredByEvidenceProps): JSX.Element {
    // const numberOfQuestions = questionsData?.length;
    // const numberOfResponses = llmResponse?.responses.length || 0;
    // const progressPercentage = (numberOfResponses / numberOfQuestions) * 100;
    const progressPercentage = 75;

    const headingIconClasses = clsx(
        tw`mb-4 w-10 stroke-indigo-600 stroke-2`,
        tw`dark:stroke-indigo-500`,
    );

    return (
        <>
            <div className='flex items-center gap-3'>
                <NewspaperIcon className={headingIconClasses} />
                <h4 className='mb-4 w-full text-lg font-bold'>
                    Not Answered by Evidence
                </h4>
            </div>
            <ProgressBar progressPercentage={progressPercentage} />
        </>
    );
}
