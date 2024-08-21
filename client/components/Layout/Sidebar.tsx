import { useState } from 'react';
import { BoltIcon } from '@heroicons/react/24/outline';
import clsx from 'clsx';
import { tw } from '@/utils';

interface SidebarProps {
    isSidebarExpanded: boolean;
    setIsSidebarExpanded: React.Dispatch<React.SetStateAction<boolean>>;
}

export function Sidebar({
    isSidebarExpanded,
    setIsSidebarExpanded,
}: SidebarProps): JSX.Element {
    const [isExpanded, setIsExpanded] = useState(true);

    function toggleSidebar() {
        setIsExpanded(!isExpanded);
    }

    return (
        <div className='flex'>
            <div
                className={clsx(
                    tw`absolute inset-y-0 left-0 space-y-6 p-4 transition-all duration-300 ease-in-out`,
                    tw`text-white dark:bg-zinc-800`,
                    isExpanded ? 'w-64' : 'w-20',
                )}
            >
                <button
                    className='text-white focus:outline-none'
                    onClick={toggleSidebar}
                >
                    {isExpanded ? 'Collapse' : 'Expand'}
                </button>
                <nav className='mt-10'>
                    <button
                        onClick={() => null}
                        className={clsx(
                            tw`flex items-center rounded px-4 py-2.5 transition duration-200`,
                            tw`dark:hover:bg-zinc-700`,
                        )}
                    >
                        <BoltIcon className='h-6 w-6' />
                        {isExpanded ? <span className='ml-4'>Home</span> : null}
                    </button>
                </nav>
            </div>

            {/* Main Content */}
            <div className='flex-1 p-10 text-2xl font-bold'>
                <button
                    className='text-gray-800 focus:outline-none'
                    onClick={toggleSidebar}
                >
                    {isExpanded ? 'Hide Sidebar' : 'Show Sidebar'}
                </button>
                <h1>Main Content</h1>
                <p>Your main content goes here.</p>
            </div>
        </div>
    );
}
