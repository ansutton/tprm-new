import { ReactNode, useState } from 'react';
import {
    ChartBarSquareIcon,
    ChevronLeftIcon,
    DocumentMagnifyingGlassIcon,
} from '@heroicons/react/24/outline';
import clsx from 'clsx';
import { tw } from '@/utils';

export function Sidebar(): JSX.Element {
    /**
     * State Hooks
     */
    const [isExpanded, setIsExpanded] = useState(true);

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
            icon: <ChartBarSquareIcon className={iconClasses} />,
            onClick: () => null,
            title: 'Assessment Detail',
        },
        {
            icon: <DocumentMagnifyingGlassIcon className={iconClasses} />,
            onClick: () => null,
            title: 'Assessment Overview',
        },
    ];

    /**
     * Helper Functions
     */
    function toggleSidebar() {
        setIsExpanded((prevState) => !prevState);
    }

    /**
     * Return Statement
     */
    return (
        <div
            className={clsx(
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

            <nav className='mt-6 space-y-3'>
                {navItemContent.map(({ icon, onClick, title }, index) => (
                    <>
                        <button
                            onClick={onClick}
                            className={clsx(
                                tw`flex items-center rounded-lg p-2`,
                                tw`transition-all duration-300`,
                                isExpanded ? tw`w-[232px]` : tw`w-fit`,
                                tw`hover:bg-zinc-300`,
                                tw`dark:hover:bg-zinc-700`,
                            )}
                        >
                            {icon}
                            <div
                                className={clsx(
                                    tw`transition-opacity duration-300`,
                                    tw`text-sm`,
                                    isExpanded
                                        ? tw`ml-2.5 opacity-100`
                                        : tw`opacity-0`,
                                )}
                            >
                                {isExpanded ? 'Assessment Overview' : null}
                            </div>
                        </button>
                    </>
                ))}
            </nav>
        </div>
    );
}
