import { useState } from 'react';
import { BoltIcon, ChevronLeftIcon } from '@heroicons/react/24/outline';
import clsx from 'clsx';
import { tw } from '@/utils';

export function Sidebar(): JSX.Element {
    const [isExpanded, setIsExpanded] = useState(true);

    function toggleSidebar() {
        setIsExpanded((prevState) => !prevState);
    }

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
                        tw`w-6 transform transition-transform duration-300`,
                        isExpanded
                            ? tw`ml-auto translate-x-0 rotate-0`
                            : tw`translate-x-0 rotate-180`,
                        tw`stroke-zinc-700`,
                        tw`dark:stroke-zinc-200`,
                    )}
                />
            </button>

            <nav className='mt-6'>
                <button
                    onClick={() => null}
                    className={clsx(
                        tw`flex items-center rounded-lg p-2`,
                        tw`transition-all duration-300`,
                        isExpanded ? tw`w-[232px]` : tw`w-fit`,
                        tw`hover:bg-zinc-300`,
                        tw`dark:hover:bg-zinc-700`,
                    )}
                >
                    <BoltIcon
                        className={clsx(
                            tw`w-6`,
                            tw`stroke-zinc-700`,
                            tw`dark:stroke-zinc-200`,
                        )}
                    />
                    <div
                        className={clsx(
                            tw`transition-opacity duration-300`,
                            isExpanded ? tw`ml-2 opacity-100` : tw`opacity-0`,
                        )}
                    >
                        {isExpanded ? 'Home' : null}
                    </div>
                </button>
            </nav>
        </div>
    );
}
