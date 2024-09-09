import { Menu, MenuButton, MenuItem, MenuItems } from '@headlessui/react';
import clsx from 'clsx';
import { MenuItemButton } from '@/components';
import { useTheme } from '@/hooks';
import { Mode } from '@/types';
import { tw } from '@/utils';

interface ModeMenuProps {
    mode: Mode;
    setMode: React.Dispatch<React.SetStateAction<Mode>>;
}

export function ModeMenu({ mode, setMode }: ModeMenuProps): JSX.Element {
    const { theme } = useTheme();

    return (
        <div
            className={clsx(
                tw`rounded-lg p-1 text-sm font-bold`,
                tw`focus:outline-none`,
                theme === 'light' && tw`hover:bg-zinc-200`,
                theme === 'dark' && tw`hover:bg-zinc-800`,
            )}
        >
            <Menu>
                <MenuButton
                    className={clsx(
                        tw`flex gap-1 p-1`,
                        theme === 'light' &&
                            tw`text-zinc-600 hover:bg-zinc-200`,
                        theme === 'dark' && tw`text-zinc-300 hover:bg-zinc-800`,
                    )}
                >
                    Mode:
                    <span
                        className={clsx(
                            theme === 'light' && tw`text-indigo-600`,
                            theme === 'dark' && tw`text-indigo-400`,
                            tw`relative`,
                        )}
                    >
                        <span
                            className={clsx(
                                tw`absolute`,
                                mode === 'demo' && tw`invisible`,
                            )}
                        >
                            LLM
                        </span>
                        <span className={clsx(mode === 'llm' && tw`invisible`)}>
                            Demo
                        </span>
                    </span>
                </MenuButton>

                <MenuItems
                    anchor='bottom'
                    className={clsx(
                        tw`mt-6 flex w-36 flex-col rounded-lg py-1 text-sm font-bold shadow-lg`,
                        theme === 'light' &&
                            tw`bg-zinc-100 text-zinc-700 ring-1 ring-zinc-900/10`,
                        theme === 'dark' &&
                            tw`bg-zinc-800 stroke-zinc-300 text-zinc-300 ring-0`,
                    )}
                    transition
                >
                    <MenuItem>
                        <MenuItemButton
                            additionalClasses={clsx(
                                mode === 'demo' &&
                                    theme === 'light' &&
                                    tw`text-indigo-600`,
                                mode === 'demo' &&
                                    theme === 'dark' &&
                                    tw`text-indigo-400`,
                            )}
                            onClick={() => setMode('demo')}
                        >
                            Demo
                        </MenuItemButton>
                    </MenuItem>
                    <MenuItem>
                        <MenuItemButton
                            additionalClasses={clsx(
                                mode === 'llm' &&
                                    theme === 'light' &&
                                    tw`text-indigo-600`,
                                mode === 'llm' &&
                                    theme === 'dark' &&
                                    tw`text-indigo-400`,
                            )}
                            onClick={() => setMode('llm')}
                        >
                            LLM
                        </MenuItemButton>
                    </MenuItem>
                </MenuItems>
            </Menu>
        </div>
    );
}
