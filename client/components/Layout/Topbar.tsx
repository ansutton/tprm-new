import { ReactNode, useEffect, useState } from 'react';
import Link from 'next/link';
import { Menu, MenuButton, MenuItem, MenuItems } from '@headlessui/react';
import {
    ComputerDesktopIcon,
    DevicePhoneMobileIcon,
    MoonIcon,
    SunIcon,
} from '@heroicons/react/24/outline';
import clsx from 'clsx';
import { useTheme } from 'next-themes';
import { tw } from '@/utils';

export function Topbar(): JSX.Element {
    return (
        <div
            className={clsx(
                'flex w-full justify-around bg-gradient-to-r pb-0.5 shadow-sm',
                'from-d-green via-indigo-400 to-d-green',
                'dark:from-d-green/50 dark:via-indigo-950 dark:to-d-green/50',
                'shadow-indigo-400/80',
                'dark:shadow-indigo-500/50',
            )}
        >
            <div className='flex w-full items-center justify-between bg-zinc-50 px-4 py-3 dark:bg-black'>
                <div className='flex w-full items-center gap-2'>
                    <Link href='/' className='flex font-["Open_Sans"]'>
                        <span className='text-lg font-extrabold dark:text-white'>
                            Deloitte
                        </span>
                        <span className='flex self-end'>
                            <svg
                                className='mb-[7px] ml-[1px] h-1.5 w-1.5 fill-d-green/90'
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
                                'bg-gradient-to-r from-indigo-500 to-zinc-500',
                                'dark:to-zinc-400',
                                'bg-clip-text text-lg font-bold text-transparent',
                                'hover:from-indigo-500 hover:to-indigo-500',
                                'dark:hover:from-indigo-500 dark:hover:to-indigo-500',
                            )}
                        >
                            Neuron
                        </h1>
                    </Link>

                    <Pipe />

                    <h2 className='text-lg text-white'>
                        <span className='font-bold text-d-green dark:text-d-green/90'>
                            Accelerate
                        </span>
                        <span className='bg-gradient-to-r from-indigo-500 to-pink-500 bg-clip-text font-bold text-transparent'>
                            .AI
                        </span>
                    </h2>
                </div>

                <ThemeMenu />
            </div>
        </div>
    );
}

function Pipe(): JSX.Element {
    return (
        <p className='bg-gradient-to-t from-zinc-800 via-zinc-400 to-zinc-800 bg-clip-text text-2xl font-extrabold text-transparent'>
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
    interface ThemeButtonProps {
        additionalClasses?: string;
        children: ReactNode;
        onClick: (event: React.MouseEvent<HTMLButtonElement>) => void;
    }
    function ThemeButton({
        additionalClasses,
        children,
        onClick,
    }: ThemeButtonProps): JSX.Element {
        return (
            <button
                onClick={onClick}
                className={`${additionalClasses} flex items-center gap-2 px-2 py-1.5 hover:bg-zinc-200 dark:hover:bg-zinc-700/55`}
            >
                {children}
            </button>
        );
    }
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
            <MenuButton className='rounded-lg p-1 hover:bg-zinc-200 dark:hover:bg-zinc-800'>
                {theme === 'dark' ? (
                    <MoonIcon
                        className={`${iconClassesBase} stroke-zinc-300`}
                    />
                ) : null}
                {theme === 'light' ? (
                    <SunIcon className={iconClassesBase} />
                ) : null}
                {theme === 'system' ? (
                    <IconSystem additionalClasses='dark:stroke-zinc-300' />
                ) : null}
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
                    <ThemeButton
                        additionalClasses={
                            theme === 'dark'
                                ? 'text-indigo-400 stroke-indigo-400'
                                : ''
                        }
                        onClick={() => setTheme('dark')}
                    >
                        <MoonIcon className={`${iconClassesBase}`} />
                        Dark
                    </ThemeButton>
                </MenuItem>
                <MenuItem>
                    <ThemeButton
                        additionalClasses={
                            theme === 'light'
                                ? 'text-indigo-600 stroke-indigo-600'
                                : ''
                        }
                        onClick={() => setTheme('light')}
                    >
                        <SunIcon className={`${iconClassesBase}`} />
                        Light
                    </ThemeButton>
                </MenuItem>
                <MenuItem>
                    <ThemeButton
                        additionalClasses={systemSelectedClasses()}
                        onClick={() => setTheme('system')}
                    >
                        <IconSystem /> System
                    </ThemeButton>
                </MenuItem>
            </MenuItems>
        </Menu>
    );
}