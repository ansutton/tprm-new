import { ReactNode } from 'react';
import {
    ArrowLeftCircleIcon,
    ChartBarSquareIcon,
    ChevronLeftIcon,
    DocumentMagnifyingGlassIcon,
} from '@heroicons/react/24/outline';
import clsx from 'clsx';
import { Screen } from '@/types';
import { handleResetApp, tw } from '@/utils';

interface SidebarProps {
    isSidebarExpanded: boolean;
    setIsSidebarExpanded: React.Dispatch<React.SetStateAction<boolean>>;
    isSidebarFullyExpanded: boolean;
    setIsSidebarFullyExpanded: React.Dispatch<React.SetStateAction<boolean>>;
    screen: Screen;
    setScreen: React.Dispatch<React.SetStateAction<Screen>>;
}

export function Sidebar({
    isSidebarExpanded,
    setIsSidebarExpanded,
    isSidebarFullyExpanded,
    setIsSidebarFullyExpanded,
    screen,
    setScreen,
}: SidebarProps): JSX.Element {
    /**
     * Helper Functions
     */
    function toggleSidebar() {
        if (isSidebarExpanded) {
            setIsSidebarFullyExpanded(false); // Hide text before collapsing
            setTimeout(() => setIsSidebarExpanded(false), 0); // Collapse immediately
        } else {
            setIsSidebarExpanded(true); // Expand immediately
            setTimeout(() => setIsSidebarFullyExpanded(true), 200); // Delay showing text until after expansion
        }
    }

    /**
     * Constants
     */
    const iconClasses = clsx(
        tw`size-6 stroke-2`,
        tw`stroke-zinc-700`,
        tw`dark:stroke-zinc-200`,
    );

    /**
     * Return Statement
     */
    return (
        <div
            className={clsx(
                tw`z-10`,
                tw`fixed inset-y-0 left-0 rounded-lg px-3 pb-4 pt-20 transition-all duration-300 ease-in-out`,
                isSidebarExpanded ? 'w-64' : 'w-16',
                tw`bg-zinc-200 text-black`,
                tw`dark:bg-zinc-900 dark:text-white`,

                tw`shadow-[0_35px_35px_5px]`,
                tw`border-r border-indigo-200 shadow-lg shadow-indigo-200`,
                tw`dark:border-indigo-500/60 dark:shadow-indigo-900/40`,
            )}
        >
            <button
                className={clsx(
                    tw`rounded-lg p-2 transition-all duration-300`,
                    isSidebarExpanded ? tw`w-full` : tw`w-10`,
                    tw`hover:bg-zinc-300`,
                    tw`dark:hover:bg-zinc-700`,
                    'flex items-center justify-between',
                )}
                onClick={toggleSidebar}
            >
                <ChevronLeftIcon
                    className={clsx(
                        tw`w-6 transform stroke-2 transition-transform duration-300`,
                        isSidebarExpanded
                            ? tw`ml-auto translate-x-0 rotate-0`
                            : tw`translate-x-0 rotate-180`,
                        tw`stroke-zinc-700`,
                        tw`dark:stroke-zinc-200`,
                    )}
                />
            </button>

            <nav className='mt-6 space-y-2'>
                <SidebarMenuItem
                    title='File Selection'
                    additionalButtonClasses={tw``}
                    icon={<ArrowLeftCircleIcon className={iconClasses} />}
                    onClick={() => handleResetApp && handleResetApp()}
                    isSidebarExpanded={isSidebarExpanded}
                    isSidebarFullyExpanded={isSidebarFullyExpanded}
                    screen={screen}
                    screenAssignment='fileSelection'
                />

                <div className='px-2 py-2'>
                    <hr className='border-t-[1.5px] border-zinc-400/50 dark:border-zinc-600/60' />
                </div>

                <SidebarMenuItem
                    title='Overview'
                    additionalButtonClasses={tw``}
                    icon={<ChartBarSquareIcon className={iconClasses} />}
                    onClick={() => setScreen('overview')}
                    isSidebarExpanded={isSidebarExpanded}
                    isSidebarFullyExpanded={isSidebarFullyExpanded}
                    screen={screen}
                    screenAssignment='overview'
                />
                <SidebarMenuItem
                    title='Detailed Analysis'
                    additionalButtonClasses={tw``}
                    icon={
                        <DocumentMagnifyingGlassIcon className={iconClasses} />
                    }
                    onClick={() => setScreen('detailedAnalysis')}
                    isSidebarExpanded={isSidebarExpanded}
                    isSidebarFullyExpanded={isSidebarFullyExpanded}
                    screen={screen}
                    screenAssignment='detailedAnalysis'
                />
            </nav>
        </div>
    );
}

interface SidebarMenuItemProps {
    title: string;
    additionalButtonClasses?: string;
    icon: ReactNode;
    onClick: () => void;
    isSidebarExpanded: boolean;
    isSidebarFullyExpanded: boolean;
    screen: Screen;
    screenAssignment: Screen;
}

function SidebarMenuItem({
    title,
    additionalButtonClasses,
    screen,
    isSidebarExpanded,
    isSidebarFullyExpanded,
    icon,
    onClick,
    screenAssignment,
}: SidebarMenuItemProps): JSX.Element {
    return (
        <button
            onClick={onClick}
            className={clsx(
                additionalButtonClasses,
                screen === screenAssignment && tw`bg-zinc-300 dark:bg-zinc-700`,
                tw`flex items-center rounded-lg p-2`,
                tw`transition-all duration-300`,
                tw`hover:bg-zinc-300`,
                tw`dark:hover:bg-zinc-700`,
            )}
            style={{
                width: isSidebarExpanded ? '100%' : 'fit',
                transition: 'width 0.3s ease',
            }}
        >
            {icon}
            {isSidebarFullyExpanded && (
                <span
                    className={clsx(
                        tw`ml-2.5 transition-opacity duration-300`,
                        isSidebarFullyExpanded
                            ? tw`opacity-100`
                            : tw`opacity-0`,
                    )}
                >
                    {title}
                </span>
            )}
        </button>
    );
}
