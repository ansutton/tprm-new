import { ReactNode } from 'react';
import Link from 'next/link';
import { ChevronDownIcon } from '@heroicons/react/16/solid';
import {
    ArrowPathIcon,
    BoltIcon,
    DocumentChartBarIcon,
    DocumentCheckIcon,
    DocumentTextIcon,
    NewspaperIcon,
    TableCellsIcon,
} from '@heroicons/react/24/outline';
import {
    Disclosure,
    DisclosureButton,
    DisclosurePanel,
} from '@headlessui/react';
import clsx from 'clsx';
import { Card, Heading, ProgressBar, QuestionsAnalyzed } from '@/components';
import { LlmResponse } from '@/types';
import { tw } from '@/utils';

interface SummaryProps {
    excelData: any[][];
    llmResponse: LlmResponse;
    questionsData: string[];
}

export function Summary({
    excelData,
    llmResponse,
    questionsData,
}: SummaryProps): JSX.Element {
    const headingIconClasses = clsx(
        tw`stroke-indigo-600 stroke-2`,
        tw`dark:stroke-indigo-500`,
    );

    return (
        <>
            <div className='flex flex-col gap-4'>
                <Card>
                    <Heading
                        level={4}
                        additionalClasses='mb-4'
                        startIcon={
                            <DocumentChartBarIcon
                                className={clsx(headingIconClasses, 'mb-4 w-9')}
                            />
                        }
                    >
                        Summary
                    </Heading>
                    <p className='w-full text-lg'>
                        The third party and the AI model provided the same
                        response for{' '}
                        <span className='font-bold'>
                            {llmResponse?.responses.length || 0}/
                            {questionsData?.length} (
                            {Math.round(
                                ((llmResponse?.responses.length || 0) /
                                    questionsData?.length) *
                                    100,
                            )}
                            %)
                        </span>{' '}
                        of questions uploaded.
                    </p>
                </Card>

                <div className='flex w-full justify-end gap-4'>
                    <div className='flex w-full flex-col gap-4'>
                        <ProgressBar
                            title='Evidence Documents Analyzed'
                            progressPercentage={75}
                            startIcon={
                                <DocumentCheckIcon
                                    className={clsx(
                                        headingIconClasses,
                                        'mb-3 w-7',
                                    )}
                                />
                            }
                        />

                        <ProgressBar
                            title='Questions Unanswered by Evidence'
                            progressPercentage={40}
                            startIcon={
                                <NewspaperIcon
                                    className={clsx(
                                        headingIconClasses,
                                        'mb-3 w-7',
                                    )}
                                />
                            }
                            twBgColor='bg-rose-400'
                        />
                    </div>

                    <QuestionsAnalyzed
                        llmResponse={llmResponse}
                        questionsData={questionsData}
                        startIcon={
                            <BoltIcon
                                className={clsx(headingIconClasses, 'mb-4 w-7')}
                            />
                        }
                    />
                </div>

                <Card>
                    <Heading
                        level={4}
                        additionalClasses='mb-4'
                        startIcon={
                            <TableCellsIcon
                                className={clsx(headingIconClasses, 'mb-4 w-9')}
                            />
                        }
                    >
                        Results Table
                    </Heading>

                    <Table>
                        <thead>
                            <tr>
                                <TableItem variant='head'>
                                    Control Question
                                </TableItem>
                                <TableItem variant='head' centered>
                                    TP Response
                                </TableItem>
                                <TableItem variant='head' centered>
                                    AI&apos;s Answer
                                </TableItem>
                                <TableItem variant='head' centered>
                                    Answers Match?
                                </TableItem>
                                <TableItem variant='head'>Citation</TableItem>
                            </tr>
                        </thead>

                        <tbody>
                            {questionsData.map((question, index) => (
                                <tr
                                    key={index}
                                    className='odd:bg-indigo-50 dark:odd:bg-zinc-950 dark:even:bg-zinc-900'
                                >
                                    <TableItem variant='cell'>
                                        {question}
                                    </TableItem>
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
                                            {llmResponse?.responses[index] ? (
                                                `Answer ${index + 1}`
                                            ) : (
                                                <ArrowPathIcon className='mx-auto size-5 animate-spin stroke-2 text-indigo-800 dark:text-indigo-500' />
                                            )}
                                        </Link>
                                    </TableItem>
                                    <TableItem variant='cell' centered>
                                        N/A
                                    </TableItem>
                                    <TableItem variant='cell' centered>
                                        N/A
                                    </TableItem>
                                </tr>
                            ))}
                        </tbody>
                    </Table>
                </Card>

                <Card>
                    <Heading
                        level={4}
                        additionalClasses='mb-4'
                        startIcon={
                            <DocumentTextIcon
                                className={clsx(headingIconClasses, 'mb-4 w-9')}
                            />
                        }
                    >
                        Results Details
                    </Heading>
                    <div className='w-full divide-y dark:divide-zinc-600'>
                        {questionsData.map((question, index) => (
                            <div key={index} className='py-2'>
                                <SummaryItem
                                    title={`Control Question ${index + 1}`}
                                    content={question}
                                    defaultOpen
                                    id={`control-question-${index + 1}`}
                                />
                                <SummaryItem
                                    title={`Third Party Response ${index + 1}`}
                                    content={excelData[index + 1][2]}
                                    defaultOpen
                                    id={`third-party-response-${index + 1}`}
                                />
                                <SummaryItem
                                    title={`AI Answer ${index + 1}`}
                                    content={
                                        llmResponse?.responses[index] ? (
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
                                    content={'N/A'}
                                    defaultOpen
                                    id={`answers-match-${index + 1}`}
                                />
                                <SummaryItem
                                    title={`Citation`}
                                    content={'N/A'}
                                    defaultOpen
                                    id={`citaton-${index + 1}`}
                                />
                            </div>
                        ))}
                    </div>
                </Card>
            </div>
        </>
    );
}

interface TableProps {
    children: ReactNode;
}

function Table({ children }: TableProps): JSX.Element {
    return (
        <table className='w-full table-auto border border-zinc-200 bg-zinc-50 drop-shadow-md dark:border-zinc-700 dark:bg-zinc-900'>
            {children}
        </table>
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
