import { ReactNode } from 'react';
import { Popover, PopoverButton, PopoverPanel } from '@headlessui/react';
import { InformationCircleIcon } from '@heroicons/react/24/outline';
import clsx from 'clsx';
import { useTheme } from '@/hooks';
import { tw } from '@/utils';

interface TooltipProps {
    children: ReactNode;
}

export function Tooltip({ children }: TooltipProps): JSX.Element {
    const { theme } = useTheme();

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
                    theme === 'light' && tw`border-indigo-400 bg-zinc-50`,
                    theme === 'dark' &&
                        tw`border-indigo-500 bg-zinc-900 text-zinc-100`,
                    tw`border`,
                    tw`mb-10 w-64 p-2.5`,
                )}
            >
                {children}
            </PopoverPanel>
        </Popover>
    );
}
