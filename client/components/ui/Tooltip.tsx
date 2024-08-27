import { ReactNode } from 'react';
import { Popover, PopoverButton, PopoverPanel } from '@headlessui/react';
import { InformationCircleIcon } from '@heroicons/react/24/outline';
import clsx from 'clsx';
import { tw } from '@/utils';

interface TooltipProps {
    children: ReactNode;
}

export function Tooltip({ children }: TooltipProps): JSX.Element {
    return (
        <Popover className='flex'>
            <PopoverButton>
                <InformationCircleIcon className={clsx('w-5')} />
            </PopoverButton>
            <PopoverPanel
                transition
                anchor={{ to: 'top', gap: 22 }}
                className={clsx(
                    tw`z-30`,
                    tw`rounded-xl text-xs transition duration-200 ease-in-out data-[closed]:translate-y-1 data-[closed]:opacity-0`,
                    tw`border border-indigo-400 dark:border-indigo-500`,
                    tw`mb-10 w-64 p-2.5`,
                    tw`bg-zinc-50`,
                    tw`dark:bg-zinc-900`,
                )}
            >
                {children}
            </PopoverPanel>
        </Popover>
    );
}
