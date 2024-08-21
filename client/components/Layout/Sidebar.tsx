import { useState } from 'react';
import { BoltIcon, ChevronLeftIcon } from '@heroicons/react/24/outline';
import clsx from 'clsx';
import { tw } from '@/utils';

export function Sidebar(): JSX.Element {
    const [isExpanded, setIsExpanded] = useState(true);

    function toggleSidebar() {
        setIsExpanded(!isExpanded);
    }

    return (
        <div className='flex'>
            <div
                className={clsx(
                    tw`absolute inset-y-0 left-0 space-y-6 px-4 pb-4 pt-20 transition-all duration-300 ease-in-out`,
                    tw`bg-zinc-200 text-black`,
                    tw`dark:bg-zinc-900 dark:text-white`,
                    isExpanded ? 'w-64' : 'w-20',
                )}
            >
                <button
                    className={clsx(
                        tw`rounded-lg p-2 transition-all duration-300`,
                        isExpanded ? tw`w-full` : tw`w-fit`,
                        tw`hover:bg-zinc-300`,
                        tw`dark:hover:bg-zinc-700`,
                    )}
                    onClick={toggleSidebar}
                >
                    <ChevronLeftIcon
                        className={clsx(
                            tw`w-6 transform transition-transform duration-300`,
                            isExpanded ? tw`ml-auto` : tw`rotate-180`,
                            tw`stroke-zinc-700`,
                            tw`dark:stroke-zinc-200`,
                        )}
                    />
                </button>
                <nav className='mt-10'>
                    <button
                        onClick={() => null}
                        className={clsx(
                            tw`flex items-center rounded-lg px-4 py-2.5`,
                            tw`transition-all duration-300`,
                            tw`hover:bg-zinc-300`,
                            tw`dark:hover:bg-zinc-700`,
                        )}
                    >
                        <BoltIcon className='h-6 w-6' />
                        <div
                            className={clsx(
                                tw`delay-2000 transition-opacity duration-500`,
                                isExpanded ? 'opacity-100' : 'opacity-0',
                            )}
                        >
                            {isExpanded ? (
                                <span className={clsx(tw`ml-4`)}>Home</span>
                            ) : null}
                        </div>
                    </button>
                </nav>
            </div>
        </div>
    );
}
