import { useState } from 'react';
import {
    ArrowUpCircleIcon,
    ChartBarSquareIcon,
    ChevronLeftIcon,
    DocumentMagnifyingGlassIcon,
} from '@heroicons/react/24/outline';
import clsx from 'clsx';
import { Screen } from '@/types';
import { tw } from '@/utils';

interface SidebarProps {
    screen: Screen;
    setScreen: React.Dispatch<React.SetStateAction<Screen>>;
}

export function Sidebar({ screen, setScreen }: SidebarProps): JSX.Element {
    /**
     * State Hooks
     */
    const [isExpanded, setIsExpanded] = useState(true);
    const [isFullyExpanded, setIsFullyExpanded] = useState(true); // Handle when sidebar is fully expanded

    /**
     * Helper Functions
     */
    function toggleSidebar() {
        if (isExpanded) {
            setIsFullyExpanded(false); // Hide text before collapsing
            setTimeout(() => setIsExpanded(false), 0); // Collapse immediately
        } else {
            setIsExpanded(true); // Expand immediately
            setTimeout(() => setIsFullyExpanded(true), 200); // Delay showing text until after expansion
        }
    }

    /**
     * Constants
     */
    const iconClasses = clsx(
        tw`w-6 stroke-2`,
        tw`stroke-zinc-700`,
        tw`dark:stroke-zinc-200`,
    );
    const navItemContent = [
        {
            additionalButtonClasses: tw`mb-8`,
            icon: <ArrowUpCircleIcon className={iconClasses} />,
            onClick: function () {
                if (
                    confirm(
                        'Are you sure? This action will end the current process and start over.',
                    )
                ) {
                    setScreen('fileUpload');
                } else {
                    return null;
                }
            },
            screenTypeAssignment: 'fileUpload',
            title: 'File Upload',
        },
        {
            additionalButtonClasses: tw``,
            icon: <ChartBarSquareIcon className={iconClasses} />,
            onClick: () => null,
            screenTypeAssignment: 'summary', // TODO: refactor to assessmentOverview
            title: 'Assessment Overview',
        },
        {
            additionalButtonClasses: tw``,
            icon: <DocumentMagnifyingGlassIcon className={iconClasses} />,
            onClick: () => null,
            screenTypeAssignment: 'summary', // TODO: refactor to assessmentDetail
            title: 'Assessment Detail',
        },
    ];

    /**
     * Return Statement
     */
    return (
        <div
            className={clsx(
                tw`z-10`,
                tw`absolute inset-y-0 left-0 rounded-lg px-3 pb-4 pt-20 transition-all duration-300 ease-in-out`,
                tw`bg-zinc-200 text-black`,
                tw`dark:bg-zinc-900 dark:text-white`,
                isExpanded ? 'w-64' : 'w-16',
            )}
        >
            <button
                className={clsx(
                    tw`rounded-lg p-2 transition-all duration-300`,
                    isExpanded ? tw`w-full` : tw`w-10`,
                    tw`hover:bg-zinc-300`,
                    tw`dark:hover:bg-zinc-700`,
                    'flex items-center justify-between',
                )}
                onClick={toggleSidebar}
            >
                <ChevronLeftIcon
                    className={clsx(
                        tw`w-6 transform stroke-2 transition-transform duration-300`,
                        isExpanded
                            ? tw`ml-auto translate-x-0 rotate-0`
                            : tw`translate-x-0 rotate-180`,
                        tw`stroke-zinc-700`,
                        tw`dark:stroke-zinc-200`,
                    )}
                />
            </button>

            <nav className='mt-6 space-y-2'>
                {navItemContent.map(
                    (
                        {
                            additionalButtonClasses,
                            icon,
                            onClick,
                            screenTypeAssignment,
                            title,
                        },
                        index,
                    ) => (
                        <button
                            key={index}
                            onClick={onClick}
                            className={clsx(
                                additionalButtonClasses,
                                screen === screenTypeAssignment
                                    ? tw`bg-zinc-300 dark:bg-zinc-700`
                                    : '',
                                tw`flex items-center rounded-lg p-2`,
                                tw`transition-all duration-300`,
                                tw`hover:bg-zinc-300`,
                                tw`dark:hover:bg-zinc-700`,
                            )}
                            style={{
                                width: isExpanded ? '100%' : 'fit',
                                transition: 'width 0.3s ease',
                            }}
                        >
                            {icon}
                            {isFullyExpanded && (
                                <span
                                    className={clsx(
                                        tw`ml-2.5 transition-opacity duration-300`,
                                        isFullyExpanded
                                            ? tw`opacity-100`
                                            : tw`opacity-0`,
                                    )}
                                >
                                    {title}
                                </span>
                            )}
                        </button>
                    ),
                )}
            </nav>
        </div>
    );
}
