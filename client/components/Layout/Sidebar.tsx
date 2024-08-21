import { useState } from 'react';
import { BoltIcon } from '@heroicons/react/24/outline';
import clsx from 'clsx';
import { tw } from '@/utils';

export function Sidebar(): JSX.Element {
    const [isSidebarExpanded, setIsSidebarExpanded] = useState(true);

    function toggleSidebar() {
        setIsSidebarExpanded(!isSidebarExpanded);
    }

    return (
        <div className='flex'>
            <div
                className={clsx(
                    tw`absolute inset-y-0 left-0 space-y-6 px-4 pb-4 pt-20 transition-all duration-300 ease-in-out`,
                    tw`bg-zinc-200 text-black`,
                    tw`dark:bg-zinc-900 dark:text-white`,
                    isSidebarExpanded ? 'w-64' : 'w-20',
                )}
            >
                <button className='focus:outline-none' onClick={toggleSidebar}>
                    {isSidebarExpanded ? 'Collapse' : 'Expand'}
                </button>
                <nav className='mt-10'>
                    <button
                        onClick={() => null}
                        className={clsx(
                            tw`flex items-center rounded-lg px-4 py-2.5`,
                            tw`hover:bg-zinc-300`,
                            tw`dark:hover:bg-zinc-700`,
                        )}
                    >
                        <BoltIcon className='h-6 w-6' />
                        <div
                            className={clsx(
                                tw`delay-2000 transition-opacity duration-500`,
                                isSidebarExpanded ? 'opacity-100' : 'opacity-0',
                            )}
                        >
                            {isSidebarExpanded ? (
                                <span className={clsx(tw`ml-4`)}>Home</span>
                            ) : null}
                        </div>
                    </button>
                </nav>
            </div>

            {/* Main Content */}
            <div className='flex-1 p-10 text-2xl font-bold'>
                <button
                    className='text-gray-800 focus:outline-none'
                    onClick={toggleSidebar}
                >
                    {isSidebarExpanded ? 'Hide Sidebar' : 'Show Sidebar'}
                </button>
                <h1>Main Content</h1>
                <p>Your main content goes here.</p>
            </div>
        </div>
    );
}
