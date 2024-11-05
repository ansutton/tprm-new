import { useEffect, useState } from 'react';
import { ArrowPathIcon } from '@heroicons/react/24/outline';
import clsx from 'clsx';
import {
    DetailedAnalysis,
    FileSelection,
    Heading,
    Overview,
    Sidebar,
    Topbar,
} from '@/components';
import { tableFootnoteText } from '@/constants';
import { countResponsesAlign, tw } from '@/utils';
import { EvidenceFiles, Mode, Screen } from '@/types';

export default function Home(): JSX.Element {
    /**
     * State Hooks
     */
    const [screen, setScreen] = useState<Screen>('fileSelection');
    const [isSidebarExpanded, setIsSidebarExpanded] = useState<boolean>(true);
    const [isSidebarFullyExpanded, setIsSidebarFullyExpanded] =
        useState<boolean>(true);
    const [evidenceFiles, setEvidenceFiles] = useState<EvidenceFiles>(null);
    const [llmResponse, setLlmResponse] = useState<any>(null);
    const [tpResponsesData, setTpResponsesData] = useState<any[][]>([]);
    const [questionsData, setQuestionsData] = useState<string[]>([]);
    const [mode, setMode] = useState<Mode>(() => {
        return (localStorage.getItem('app-mode') as Mode) ?? 'llm';
    });
    const [appLevelTableData, setAppLevelTableData] = useState<any[]>([]); // TODO: refactor to global state (currently prop drilling)

    /**
     * Effect Hook
     */
    useEffect(() => {
        localStorage.setItem('app-mode', mode);
    }, [mode]);

    /**
     * Return Statement
     */
    return (
        <div className='w-full selection:bg-pink-500/90 selection:text-white dark:text-zinc-50'>
            <Topbar
                llmResponse={llmResponse}
                mode={mode}
                setMode={setMode}
                screen={screen}
                appLevelTableData={appLevelTableData}
            />

            {screen !== 'fileSelection' && (
                <Sidebar
                    isSidebarExpanded={isSidebarExpanded}
                    setIsSidebarExpanded={setIsSidebarExpanded}
                    isSidebarFullyExpanded={isSidebarFullyExpanded}
                    setIsSidebarFullyExpanded={setIsSidebarFullyExpanded}
                    screen={screen}
                    setScreen={setScreen}
                />
            )}

            <div
                className={clsx(
                    tw`pt-[87px]`,
                    tw`flex-1 transition-all duration-300 ease-in-out`,
                    screen === 'fileSelection' ? tw`px-16` : null,
                    screen !== 'fileSelection' && isSidebarExpanded
                        ? tw`pl-64`
                        : tw`pl-16`,
                )}
            >
                {screen === 'fileSelection' && (
                    <Heading level={3}>AI Evidence Reviewer</Heading>
                )}
                {screen === 'loading' && (
                    <Heading level={3}>Processing File</Heading>
                )}

                <div className='container mx-auto pb-5 pt-5'>
                    {screen === 'fileSelection' && (
                        <FileSelection
                            evidenceFiles={evidenceFiles}
                            setEvidenceFiles={setEvidenceFiles}
                            setIsSidebarExpanded={setIsSidebarExpanded}
                            setIsSidebarFullyExpanded={
                                setIsSidebarFullyExpanded
                            }
                            setLlmResponse={setLlmResponse}
                            setQuestionsData={setQuestionsData}
                            setTpResponsesData={setTpResponsesData}
                            mode={mode}
                            setScreen={setScreen}
                        />
                    )}

                    {screen === 'loading' && (
                        <>
                            <Heading level={4} additionalClasses='text-center'>
                                Hang tight. This process can take a while.
                            </Heading>
                            <p className='text-center font-medium text-zinc-600 dark:text-zinc-400'>
                                When finished loading, the Detailed Analysis
                                will be displayed on the next screen.
                            </p>
                            <ArrowPathIcon className='stroke-1.5 mx-auto size-14 animate-spin text-indigo-800 dark:text-indigo-500' />
                        </>
                    )}

                    {(screen === 'detailedAnalysis' ||
                        screen === 'overview') && (
                        <div className='flex flex-col gap-6'>
                            <div className='flex flex-col gap-4'>
                                {screen === 'detailedAnalysis' && (
                                    <div className='text-sm'>
                                        <p>
                                            {llmResponse?.is_complete ? (
                                                `The third party responses and AI model response align on ${countResponsesAlign(llmResponse)?.yesCount}/${questionsData?.length} questions uploaded.`
                                            ) : (
                                                <i className='animate-pulse'>
                                                    Analyzing...
                                                </i>
                                            )}
                                        </p>
                                        <p className='mb-2.5 mt-1.5 italic text-indigo-600 dark:text-indigo-400'>
                                            {tableFootnoteText}
                                        </p>
                                        <DetailedAnalysis
                                            tpResponsesData={tpResponsesData}
                                            llmResponse={llmResponse}
                                            questionsData={questionsData}
                                            setAppLevelTableData={
                                                setAppLevelTableData
                                            }
                                        />
                                    </div>
                                )}
                                {screen === 'overview' && (
                                    <Overview
                                        evidenceFiles={evidenceFiles}
                                        tpResponsesData={tpResponsesData}
                                        isSidebarExpanded={isSidebarExpanded}
                                        llmResponse={llmResponse}
                                        questionsData={questionsData}
                                    />
                                )}
                            </div>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
}
