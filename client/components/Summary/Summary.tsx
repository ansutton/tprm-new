import { ReactNode } from 'react';
import Link from 'next/link';
import { ChevronDownIcon } from '@heroicons/react/16/solid';
import { ArrowPathIcon } from '@heroicons/react/24/outline';
import {
    Disclosure,
    DisclosureButton,
    DisclosurePanel,
} from '@headlessui/react';
import { LlmResponse } from '@/types/globals';
import { summarySample } from '@/components/Summary';

interface SummaryProps {
    llmResponse: LlmResponse;
}

export function Summary({ llmResponse }: SummaryProps): JSX.Element {
    return (
        <>
            <p>
                The third party and the AI model provided the same response for{' '}
                <span className='font-bold text-indigo-700 dark:text-indigo-400'>
                    1/2 (50%)
                </span>{' '}
                of questions uploaded.
            </p>

            <table className='w-full table-auto border border-zinc-200 bg-zinc-50 drop-shadow-md dark:border-zinc-700 dark:bg-zinc-900'>
                <thead>
                    <tr>
                        <TableItem variant='head'>Control Question</TableItem>
                        <TableItem variant='head'>TP Response</TableItem>
                        <TableItem variant='head'>AI&apos;s Answer</TableItem>
                        <TableItem variant='head'>Answers Match?</TableItem>
                        <TableItem variant='head'>Citation</TableItem>
                    </tr>
                </thead>

                <tbody>
                    {llmResponse?.questions.map((question, index) => (
                        <tr
                            key={index}
                            className='odd:bg-indigo-50 dark:odd:bg-zinc-950 dark:even:bg-zinc-900'
                        >
                            <TableItem variant='cell'>{question}</TableItem>
                            <TableItem variant='cell' centered>
                                <Link
                                    href={`#third-party-response-${index + 1}`}
                                    className='text-indigo-800 hover:text-indigo-500 dark:text-indigo-400 dark:hover:text-indigo-200'
                                >
                                    Response {index + 1}
                                </Link>
                            </TableItem>
                            <TableItem variant='cell' centered>
                                <Link
                                    href={`#ai-answer-${index + 1}`}
                                    className='text-indigo-800 hover:text-indigo-500 dark:text-indigo-400 dark:hover:text-indigo-200'
                                >
                                    {index ===
                                    llmResponse?.responses.indexOf(
                                        llmResponse?.responses[index],
                                    ) ? (
                                        `Answer ${index + 1}`
                                    ) : (
                                        <ArrowPathIcon className='mx-auto size-5 animate-spin stroke-2 text-indigo-800 dark:text-indigo-500' />
                                    )}
                                </Link>
                            </TableItem>
                            <TableItem variant='cell' centered>
                                {summarySample[index].answersMatch}
                            </TableItem>
                            <TableItem variant='cell'>
                                {summarySample[index].citation}
                            </TableItem>
                        </tr>
                    ))}
                </tbody>
            </table>

            <div className='w-full divide-y dark:divide-zinc-600'>
                {llmResponse?.questions.map((question, index) => (
                    <div key={index} className='py-2'>
                        <SummaryItem
                            title={`Control Question ${index + 1}`}
                            content={question}
                            defaultOpen
                            id={`control-question-${index + 1}`}
                        />
                        <SummaryItem
                            title={`Third Party Response ${index + 1}`}
                            content={summarySample[index].tpResponse}
                            defaultOpen
                            id={`third-party-response-${index + 1}`}
                        />
                        <SummaryItem
                            title={`AI Answer ${index + 1}`}
                            content={
                                index ===
                                llmResponse?.responses.indexOf(
                                    llmResponse?.responses[index],
                                ) ? (
                                    `${llmResponse?.responses[index]}`
                                ) : (
                                    <ArrowPathIcon className='size-6 animate-spin stroke-2 text-indigo-800 dark:text-indigo-500' />
                                )
                            }
                            defaultOpen
                            id={`ai-answer-${index + 1}`}
                        />
                        <SummaryItem
                            title={`Answers Match?`}
                            content={summarySample[index].answersMatch}
                            defaultOpen
                            id={`answers-match-${index + 1}`}
                        />
                        <SummaryItem
                            title={`Citation`}
                            content={summarySample[index].citation}
                            defaultOpen
                            id={`citaton-${index + 1}`}
                        />
                    </div>
                ))}
            </div>
        </>
    );
}

interface TableItemProps {
    centered?: boolean;
    children: ReactNode;
    variant: 'head' | 'cell';
}

function TableItem({
    centered = false,
    children,
    variant,
}: TableItemProps): JSX.Element {
    const centeredClassName = centered ? 'text-center' : 'text-left';
    const finalClasses = `${centeredClassName} p-3 text-sm`;

    if (variant === 'head') {
        return (
            <th className={`${finalClasses} md:whitespace-nowrap`}>
                {children}
            </th>
        );
    }
    return <td className={finalClasses}>{children}</td>;
}

interface SummaryItemProps {
    content: string | JSX.Element;
    defaultOpen?: boolean;
    id: string;
    title: string;
}

function SummaryItem({
    content,
    defaultOpen = false,
    id,
    title,
}: SummaryItemProps): JSX.Element {
    return (
        <div id={id}>
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
        </div>
    );
}
