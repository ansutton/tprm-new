import { ReactNode, useState } from 'react';
import {
    Popover,
    PopoverButton,
    PopoverPanel,
    Transition,
} from '@headlessui/react';
import { InformationCircleIcon } from '@heroicons/react/24/outline';
import clsx from 'clsx';
import { useTheme } from '@/hooks';
import { tw } from '@/utils';

interface TooltipProps {
    children: ReactNode;
    icon?: ReactNode;
}

export function Tooltip({
    children,
    icon = <InformationCircleIcon className='size-5 stroke-2' />,
}: TooltipProps): JSX.Element {
    const { theme } = useTheme();

    const [isShowing, setIsShowing] = useState(false);

    return (
        <Popover
            className='flex'
            onMouseEnter={() => setIsShowing(true)}
            onMouseLeave={() => setIsShowing(false)}
        >
            <PopoverButton>{icon}</PopoverButton>
            <Transition show={isShowing}>
                <PopoverPanel
                    transition
                    anchor={{ to: 'top', gap: 22 }}
                    className={clsx(
                        tw`z-30`,
                        tw`rounded-xl text-xs transition duration-300 ease-in-out data-[closed]:translate-y-1 data-[closed]:opacity-0`,
                        theme === 'light' && tw`border-indigo-400 bg-zinc-100`,
                        theme === 'dark' &&
                            tw`border-indigo-500 bg-zinc-900 text-zinc-100`,
                        tw`border`,
                        tw`mb-10 w-64 p-2.5`,
                    )}
                >
                    {children}
                </PopoverPanel>
            </Transition>
        </Popover>
    );
}

interface FileSelectionTooltipProps extends TooltipProps {
    onClick: () => void;
    poppoverButtonClasses: string;
}

export function FileSelectionTooltip({
    children,
    icon = <InformationCircleIcon className='size-5 stroke-2' />,
    onClick,
    poppoverButtonClasses,
}: FileSelectionTooltipProps): JSX.Element {
    const { theme } = useTheme();

    const [isShowing, setIsShowing] = useState(false);

    return (
        <Popover
            className='flex'
            onMouseEnter={() => setIsShowing(true)}
            onMouseLeave={() => setIsShowing(false)}
        >
            <PopoverButton
                className={clsx(poppoverButtonClasses)}
                onClick={onClick}
            >
                {icon}
            </PopoverButton>
            <Transition show={isShowing}>
                <PopoverPanel
                    transition
                    anchor={{ to: 'top', gap: 24 }}
                    className={clsx(
                        tw`rounded-xl border text-xs`,
                        tw`w-fit p-2.5 opacity-75`,
                        tw`transition delay-700 duration-300 ease-in data-[closed]:opacity-0`,
                        theme === 'light' && tw`border-indigo-400 bg-zinc-100`,
                        theme === 'dark' &&
                            tw`border-indigo-500 bg-zinc-900 text-zinc-100`,
                    )}
                >
                    {children}
                </PopoverPanel>
            </Transition>
        </Popover>
    );
}
