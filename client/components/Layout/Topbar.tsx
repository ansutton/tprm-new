import { useEffect, useState } from 'react';
import Link from 'next/link';
import { Menu, MenuButton, MenuItem, MenuItems } from '@headlessui/react';
import {
    ComputerDesktopIcon,
    DevicePhoneMobileIcon,
    MoonIcon,
    SunIcon,
    PrinterIcon,
} from '@heroicons/react/24/outline';
import clsx from 'clsx';
import { useTheme } from 'next-themes';
import { MenuItemButton, ModeMenu } from '@/components';
import { Mode, Screen } from '@/types';
import { tw } from '@/utils';

interface TopbarProps {
    mode: Mode;
    setMode: React.Dispatch<React.SetStateAction<Mode>>;
    screen: Screen;
}

export function Topbar({ mode, setMode, screen }: TopbarProps): JSX.Element {
    return (
        <div
            className={clsx(
                'fixed z-20 mb-10 flex w-full justify-around bg-gradient-to-r pb-0.5 shadow-sm',
                'from-d-green via-indigo-400 to-d-green',
                'dark:from-d-green/50 dark:via-indigo-950 dark:to-d-green/50',
                'shadow-indigo-400/80',
                'dark:shadow-indigo-500/50',
            )}
        >
            <div className='flex w-full items-center justify-between bg-zinc-50 px-4 py-2 dark:bg-black'>
                <div className='flex w-full items-center gap-2'>
                    <Link href='/' className='ml-2 flex font-["Open_Sans"]'>
                        <span
                            className={clsx(
                                'bg-clip-text text-lg font-extrabold text-transparent',
                                'bg-gradient-to-b from-black via-zinc-700 to-zinc-400',
                                'hover:from-zinc-400 hover:via-zinc-700 hover:to-black',
                                'dark:from-white dark:via-zinc-400 dark:to-zinc-900 dark:text-transparent',
                                'dark:hover:from-zinc-900 dark:hover:via-zinc-400 dark:hover:to-white',
                            )}
                        >
                            Deloitte
                        </span>
                        <span className='flex self-end'>
                            <svg
                                className='mb-[7px] ml-[1px] h-1.5 w-1.5 fill-d-green dark:fill-d-green/90'
                                viewBox='0 0 100 100'
                                xmlns='http://www.w3.org/2000/svg'
                                fill='currentColor'
                            >
                                <circle cx='50' cy='50' r='50' />
                            </svg>
                        </span>
                    </Link>

                    <Pipe />

                    <Link href='/'>
                        <h1
                            className={clsx(
                                'bg-gradient-to-b bg-clip-text text-lg font-bold text-transparent',
                                'from-indigo-800 via-indigo-500 to-zinc-400/50',
                                'hover:from-zinc-400/50 hover:via-indigo-500 hover:to-indigo-800',
                                'dark:from-zinc-600 dark:via-indigo-500 dark:to-zinc-400',
                                'dark:hover:from-zinc-400 dark:hover:via-indigo-500 dark:hover:to-zinc-700',
                            )}
                        >
                            TPRM Accelerator
                        </h1>
                    </Link>

                    <Pipe />

                    <h2 className='select-none text-lg hover:cursor-pointer'>
                        <span className='font-bold text-zinc-700 dark:text-zinc-300'>
                            Accelerate
                        </span>
                        <span className='bg-gradient-to-r from-indigo-500 to-pink-500 bg-clip-text font-bold text-transparent'>
                            .AI
                        </span>
                    </h2>
                </div>

                {(screen === 'overview' || screen === 'detailedAnalysis') && (
                    <PrintResultsButton />
                )}

                <ModeMenu mode={mode} setMode={setMode} />

                <ThemeMenu />
            </div>
        </div>
    );
}

function Pipe(): JSX.Element {
    return (
        <p className='cursor-default bg-gradient-to-t from-zinc-800 via-zinc-400 to-zinc-800 bg-clip-text text-2xl font-extrabold text-transparent'>
            |
        </p>
    );
}

function ThemeMenu(): JSX.Element {
    /**
     * Constants
     */
    const iconClassesBase = tw`size-5 stroke-2`;

    /**
     * Custom Hooks
     */
    const { theme, resolvedTheme, setTheme } = useTheme();

    /**
     * State Hooks
     */
    const [mounted, setMounted] = useState(false);

    /**
     * Effect Hooks
     */
    useEffect(() => {
        setMounted(true);
    }, []);

    /**
     * Helper Functions
     */
    function systemSelectedClasses(): string {
        if (theme === 'system') {
            if (resolvedTheme === 'light') {
                return tw`stroke-indigo-600 text-indigo-600`;
            }
            return tw`stroke-indigo-400 text-indigo-400`;
        }
        return '';
    }

    /**
     * Components
     */
    interface IconSystemProps {
        additionalClasses?: string;
    }
    function IconSystem({ additionalClasses }: IconSystemProps): JSX.Element {
        return (
            <>
                <ComputerDesktopIcon
                    className={`${iconClassesBase} ${additionalClasses} hidden md:block`}
                />
                <DevicePhoneMobileIcon
                    className={`${iconClassesBase} ${additionalClasses} md:hidden`}
                />
            </>
        );
    }

    /**
     * Return Statements
     */
    if (!mounted) {
        return <></>;
    }

    return (
        <Menu>
            <MenuButton className='rounded-lg p-2 hover:bg-zinc-200 dark:hover:bg-zinc-800'>
                {theme === 'light' && <SunIcon className={iconClassesBase} />}
                {theme === 'dark' && (
                    <MoonIcon
                        className={`${iconClassesBase} stroke-zinc-300`}
                    />
                )}
                {theme === 'system' && (
                    <IconSystem additionalClasses='dark:stroke-zinc-300' />
                )}
            </MenuButton>

            <MenuItems
                transition
                anchor='bottom end'
                className={clsx(
                    'mt-6 flex w-36 flex-col rounded-lg bg-zinc-100 py-1 text-sm font-bold shadow-lg',
                    'stroke-700 text-zinc-700',
                    'dark:bg-zinc-800 dark:stroke-zinc-300 dark:text-zinc-300',
                    'ring-1 ring-zinc-900/10',
                    'dark:ring-0',
                )}
            >
                <MenuItem>
                    <MenuItemButton
                        additionalClasses={
                            theme === 'light'
                                ? 'text-indigo-600 stroke-indigo-600'
                                : ''
                        }
                        onClick={() => setTheme('light')}
                    >
                        <SunIcon className={`${iconClassesBase}`} />
                        Light
                    </MenuItemButton>
                </MenuItem>
                <MenuItem>
                    <MenuItemButton
                        additionalClasses={
                            theme === 'dark'
                                ? 'text-indigo-400 stroke-indigo-400'
                                : ''
                        }
                        onClick={() => setTheme('dark')}
                    >
                        <MoonIcon className={`${iconClassesBase}`} />
                        Dark
                    </MenuItemButton>
                </MenuItem>
                <MenuItem>
                    <MenuItemButton
                        additionalClasses={systemSelectedClasses()}
                        onClick={() => setTheme('system')}
                    >
                        <IconSystem /> System
                    </MenuItemButton>
                </MenuItem>
            </MenuItems>
        </Menu>
    );
}

function PrintResultsButton(): JSX.Element {
    return (
        <button
            onClick={() => window.print()}
            className={clsx(
                tw`w-fit whitespace-nowrap rounded-lg p-2`,
                tw`hover:cursor-pointer hover:bg-zinc-200 dark:hover:bg-zinc-800`,
                tw`flex items-center gap-1.5`,
            )}
        >
            <PrinterIcon
                className={clsx(
                    tw`size-4`,
                    tw`stroke-indigo-600 stroke-2`,
                    tw`dark:stroke-indigo-400`,
                )}
            />
            <span
                className={clsx(
                    tw`float-right text-sm`,
                    tw`font-bold`,
                    tw`text-indigo-600`,
                    tw`dark:text-indigo-400`,
                )}
            >
                Print Results
            </span>
        </button>
    );
}
