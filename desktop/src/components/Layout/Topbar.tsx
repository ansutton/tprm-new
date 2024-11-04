// TODO: Refactor commented system theme preferences implementation code with next-themes.
import { useEffect, useState } from 'react';
import { Menu, MenuButton, MenuItem, MenuItems } from '@headlessui/react';
import {
    ComputerDesktopIcon,
    DevicePhoneMobileIcon,
    MoonIcon,
    SunIcon,
} from '@heroicons/react/24/outline';
import clsx from 'clsx';
import { ExportTable, MenuItemButton, ModeMenu } from '@/components';
import { useTheme } from '@/hooks';
import { LlmResponse, Mode, Screen } from '@/types';
import { tw } from '@/utils';

interface TopbarProps {
    appLevelTableData: any[];
    llmResponse: LlmResponse;
    mode: Mode;
    setMode: React.Dispatch<React.SetStateAction<Mode>>;
    screen: Screen;
}

export function Topbar({
    appLevelTableData,
    llmResponse,
    mode,
    setMode,
    screen,
}: TopbarProps): JSX.Element {
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
            <div className='flex w-full cursor-default items-center justify-between bg-zinc-50 px-4 py-2 dark:bg-black'>
                <div className='flex w-full items-center gap-2'>
                    <div className='ml-2 flex font-["Open_Sans"]'>
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
                    </div>

                    <Pipe />

                    <h2 className='group text-lg'>
                        <span className='font-bold text-zinc-700 dark:text-zinc-300'>
                            Cyber{' '}
                        </span>
                        <span
                            className={clsx(
                                tw`bg-gradient-to-r from-indigo-500 to-pink-500 bg-clip-text font-bold text-transparent`,
                                tw`group-hover:bg-gradient-to-l group-hover:from-indigo-500 group-hover:to-pink-500`,
                            )}
                        >
                            AI
                        </span>
                    </h2>

                    <Pipe />

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
                </div>

                {screen === 'detailedAnalysis' && llmResponse?.is_complete && (
                    <ExportTable llmResponse={llmResponse} />
                )}

                <ModeMenu mode={mode} setMode={setMode} screen={screen} />

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
    // const { theme, resolvedTheme, setTheme } = useTheme();
    const { theme, setTheme } = useTheme();

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
    // function systemSelectedClasses(): string {
    //     if (theme === 'system') {
    //         if (resolvedTheme === 'light') {
    //             return tw`stroke-indigo-600 text-indigo-600`;
    //         }
    //         return tw`stroke-indigo-400 text-indigo-400`;
    //     }
    //     return '';
    // }

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
            <MenuButton
                className={clsx(
                    tw`rounded-lg p-2`,
                    theme === 'light' && tw`hover:bg-zinc-200`,
                    theme === 'dark' && tw`hover:bg-zinc-800`,
                )}
            >
                {theme === 'light' && <SunIcon className={iconClassesBase} />}
                {theme === 'dark' && (
                    <MoonIcon
                        className={`${iconClassesBase} stroke-zinc-300`}
                    />
                )}
                {/* {theme === 'system' && (
                    <IconSystem additionalClasses='dark:stroke-zinc-300' />
                )} */}
            </MenuButton>

            <MenuItems
                transition
                anchor='bottom end'
                className={clsx(
                    tw`mt-6 flex w-36 flex-col rounded-lg border py-1 text-sm font-bold shadow-lg`,
                    theme === 'light' &&
                        tw`stroke-700 border-zinc-900/10 bg-zinc-100 text-zinc-700`,
                    theme === 'dark' &&
                        tw`border-zinc-600/80 bg-zinc-800 stroke-zinc-300 text-zinc-300`,
                )}
            >
                <MenuItem>
                    <MenuItemButton
                        additionalClasses={
                            theme === 'light' &&
                            tw`stroke-indigo-600 text-indigo-600`
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
                            theme === 'dark' &&
                            tw`stroke-indigo-400 text-indigo-400`
                        }
                        onClick={() => setTheme('dark')}
                    >
                        <MoonIcon className={`${iconClassesBase}`} />
                        Dark
                    </MenuItemButton>
                </MenuItem>
                {/* <MenuItem>
                    <MenuItemButton
                        additionalClasses={systemSelectedClasses()}
                        onClick={() => setTheme('system')}
                    >
                        <IconSystem /> System
                    </MenuItemButton>
                </MenuItem> */}
            </MenuItems>
        </Menu>
    );
}
