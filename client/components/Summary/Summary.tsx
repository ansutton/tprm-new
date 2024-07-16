import { Fragment } from 'react';
import { ChevronDownIcon } from '@heroicons/react/16/solid';
import {
    Disclosure,
    DisclosureButton,
    DisclosurePanel,
} from '@headlessui/react';
import { summarySample } from './summarySample';

export function Summary(): JSX.Element {
    return (
        <div className='w-full divide-y'>
            {summarySample.map(
                (
                    {
                        controlQuestion,
                        tpResponse,
                        aiAnswer,
                        answersMatch,
                        citation,
                    },
                    index,
                ) => (
                    <div key={index} className='py-2'>
                        <SummaryItem
                            title={`Control Question ${index + 1}`}
                            content={controlQuestion}
                            defaultOpen={true}
                        />
                        <SummaryItem
                            title={`Third Party Response`}
                            content={tpResponse}
                        />
                        <SummaryItem title={`AI Answer`} content={aiAnswer} />
                        <SummaryItem
                            title={`Answers Match?`}
                            content={answersMatch}
                            defaultOpen={true}
                        />
                        <SummaryItem title={`Citation`} content={citation} />
                    </div>
                ),
            )}
        </div>
    );
}

interface SummaryItemProps {
    content: string | JSX.Element;
    defaultOpen?: boolean;
    title: string;
}

function SummaryItem({
    content,
    defaultOpen = false,
    title,
}: SummaryItemProps): JSX.Element {
    return (
        <Disclosure defaultOpen={defaultOpen}>
            {({ open }) => (
                <>
                    <DisclosureButton className='flex w-full items-center justify-between font-bold'>
                        <h5 className='py-2'>{title}</h5>
                        <ChevronDownIcon
                            className={`${open ? 'rotate-180' : ''} w-5`}
                        />
                    </DisclosureButton>
                    <DisclosurePanel className='px-2'>
                        {content}
                    </DisclosurePanel>
                </>
            )}
        </Disclosure>
    );
}
