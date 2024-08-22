import { ReactNode } from 'react';
import Link from 'next/link';
import { ChevronDownIcon } from '@heroicons/react/16/solid';
import { ArrowPathIcon, PrinterIcon } from '@heroicons/react/24/outline';
import {
    Disclosure,
    DisclosureButton,
    DisclosurePanel,
} from '@headlessui/react';
import clsx from 'clsx';
import { Card, Heading, Tooltip } from '@/components';
import { LlmResponse } from '@/types';
import { tw } from '@/utils';

interface AssessmentDetailProps {
    excelData: any[][];
    llmResponse: LlmResponse;
    questionsData: string[];
}

export function AssessmentDetail({
    excelData,
    llmResponse,
    questionsData,
}: AssessmentDetailProps): JSX.Element {
    return (
        <>
            <Card>
                <Heading level={4} additionalClasses='mb-4'>
                    Results Table
                </Heading>

                <Table>
                    <thead>
                        <tr>
                            {[
                                'Control Question',
                                'TP Response',
                                'Evidence Analysis',
                                'Answers Align',
                                'Confidence Score',
                                'Similarity Score',
                                'Citation',
                            ].map((heading, index) => (
                                <TableItem key={index} variant='head' centered>
                                    <div className='flex items-center gap-1.5'>
                                        <span>{heading}</span>
                                        <Tooltip>
                                            Lorem ipsum dolor sit amet
                                            consectetur adipisicing elit.
                                            Adipisci eos eius veniam quibusdam
                                            corporis eum quae explicabo dicta
                                            non! Obcaecati.
                                        </Tooltip>
                                    </div>
                                </TableItem>
                            ))}
                        </tr>
                    </thead>

                    <tbody>
                        {questionsData.map((question, index) => (
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
                                        href={`#evidence-analysis-${index + 1}`}
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
                <Heading level={4} additionalClasses='mb-4'>
                    Results Details
                </Heading>
                <div className='w-full divide-y dark:divide-zinc-600'>
                    {questionsData.map((question, index) => (
                        <div key={index} className='py-2'>
                            <AssessmentDetailItem
                                title={`Control Question ${index + 1}`}
                                content={question}
                                defaultOpen
                                id={`control-question-${index + 1}`}
                            />
                            <AssessmentDetailItem
                                title={`Third Party Response ${index + 1}`}
                                content={excelData[index + 1][2]}
                                defaultOpen
                                id={`third-party-response-${index + 1}`}
                            />
                            <AssessmentDetailItem
                                title={`AI Answer ${index + 1}`}
                                content={
                                    llmResponse?.responses[index] ? (
                                        `${llmResponse?.responses[index]}`
                                    ) : (
                                        <ArrowPathIcon className='size-6 animate-spin stroke-2 text-indigo-800 dark:text-indigo-500' />
                                    )
                                }
                                defaultOpen
                                id={`evidence-analysis-${index + 1}`}
                            />
                            <AssessmentDetailItem
                                title={`Answers Align`}
                                content={'N/A'}
                                defaultOpen
                                id={`answers-align-${index + 1}`}
                            />
                            <AssessmentDetailItem
                                title={`Confidence Score`}
                                content={'N/A'}
                                defaultOpen
                                id={`confidence-score-${index + 1}`}
                            />
                            <AssessmentDetailItem
                                title={`Similarity Score`}
                                content={'N/A'}
                                defaultOpen
                                id={`similarity-score-${index + 1}`}
                            />
                            <AssessmentDetailItem
                                title={`Citation`}
                                content={'N/A'}
                                defaultOpen
                                id={`citaton-${index + 1}`}
                            />
                        </div>
                    ))}
                </div>
            </Card>
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
    const finalClasses = tw`${centeredClassName} p-3 text-xs`;

    if (variant === 'head') {
        return <th className={clsx(finalClasses)}>{children}</th>;
    }
    return <td className={clsx(finalClasses)}>{children}</td>;
}

interface AssessmentDetailItemProps {
    content: string | JSX.Element;
    defaultOpen?: boolean;
    id: string;
    title: string;
}

function AssessmentDetailItem({
    content,
    defaultOpen = false,
    id,
    title,
}: AssessmentDetailItemProps): JSX.Element {
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
