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
                        'z-30',
                        'rounded-xl text-xs transition delay-200 duration-300 ease-in-out data-[closed]:translate-y-1 data-[closed]:opacity-0',
                        theme === 'light' && 'border-indigo-400 bg-zinc-100',
                        theme === 'dark' &&
                            'border-indigo-500 bg-zinc-900 text-zinc-100',
                        'border',
                        'mb-10 w-64 p-2.5',
                    )}
                >
                    {children}
                </PopoverPanel>
            </Transition>
        </Popover>
    );
}

interface TooltipEvidenceFilenameProps extends TooltipProps {
    anchorTo?:
        | 'top'
        | 'right'
        | 'bottom'
        | 'left'
        | 'top end'
        | 'top start'
        | 'right end'
        | 'right start'
        | 'bottom end'
        | 'bottom start'
        | 'left end'
        | 'left start'
        | undefined; // copied from Headless UI type defs
    anchorGap?: number;
    poppoverButtonChildren?: ReactNode;
    poppoverButtonClasses?: string;
}

export function TooltipEvidenceFilename({
    children,
    anchorTo = 'top',
    anchorGap = 22,
    poppoverButtonChildren = (
        <InformationCircleIcon className='size-5 stroke-2' />
    ),
    poppoverButtonClasses = '',
}: TooltipEvidenceFilenameProps): JSX.Element {
    const { theme } = useTheme();

    const [isShowing, setIsShowing] = useState(false);

    return (
        <Popover
            className='flex'
            onMouseEnter={() => setIsShowing(true)}
            onMouseLeave={() => setIsShowing(false)}
        >
            <PopoverButton className={clsx(poppoverButtonClasses)}>
                {poppoverButtonChildren}
            </PopoverButton>
            <Transition show={isShowing}>
                <PopoverPanel
                    transition
                    anchor={{ to: anchorTo, gap: anchorGap }}
                    className={clsx(
                        'rounded-lg text-xs',
                        'w-fit p-2.5',
                        'transition delay-700 duration-300 ease-in data-[closed]:opacity-0',
                        theme === 'light' && 'bg-zinc-200 text-black',
                        theme === 'dark' && 'bg-zinc-900 text-zinc-100',
                    )}
                >
                    {children}
                </PopoverPanel>
            </Transition>
        </Popover>
    );
}

interface TooltipEvidenceDeletionProps extends TooltipEvidenceFilenameProps {
    onClick: () => void;
}

export function TooltipEvidenceDeletion({
    children,
    icon = null,
    onClick,
    poppoverButtonClasses = '',
}: TooltipEvidenceDeletionProps): JSX.Element {
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
                    anchor={{ to: 'left', gap: 24 }}
                    className={clsx(
                        'rounded-lg text-xs',
                        'w-fit p-2.5',
                        'transition delay-700 duration-300 ease-in data-[closed]:opacity-0',
                        theme === 'light' && 'bg-zinc-200 text-black',
                        theme === 'dark' && 'bg-zinc-900 text-zinc-100',
                    )}
                >
                    {children}
                </PopoverPanel>
            </Transition>
        </Popover>
    );
}

