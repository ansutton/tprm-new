import { Menu, MenuButton, MenuItem, MenuItems } from '@headlessui/react';
import clsx from 'clsx';
import { MenuItemButton } from '@/components';
import { useTheme } from '@/hooks';
import { Mode, Screen } from '@/types';

interface ModeMenuProps {
    mode: Mode;
    setMode: React.Dispatch<React.SetStateAction<Mode>>;
    screen: Screen;
}

export function ModeMenu({
    mode,
    setMode,
    screen,
}: ModeMenuProps): JSX.Element {
    const { theme } = useTheme();

    return (
        <div
            className={clsx(
                'rounded-lg p-1 text-sm font-bold',
                screen === 'fileSelection'
                    ? [
                          theme === 'light' && 'hover:bg-zinc-200',
                          theme === 'dark' && 'hover:bg-zinc-800',
                      ]
                    : 'cursor-default hover:bg-inherit',
            )}
        >
            <Menu>
                <MenuButton
                    className={clsx(
                        'flex gap-1 p-1',
                        screen === 'fileSelection'
                            ? [
                                  theme === 'light' &&
                                      'text-zinc-600 hover:bg-zinc-200',
                                  theme === 'dark' &&
                                      'text-zinc-300 hover:bg-zinc-800',
                              ]
                            : 'hover:bg-inherit',
                    )}
                    disabled={screen !== 'fileSelection'}
                >
                    Mode:
                    <span
                        className={clsx(
                            theme === 'light' && 'text-indigo-600',
                            theme === 'dark' && 'text-indigo-400',
                            'relative',
                        )}
                    >
                        <span
                            className={clsx(
                                'absolute',
                                mode === 'demo' && 'invisible',
                            )}
                        >
                            LLM
                        </span>
                        <span className={clsx(mode === 'llm' && 'invisible')}>
                            Demo
                        </span>
                    </span>
                </MenuButton>

                <MenuItems
                    anchor='bottom'
                    className={clsx(
                        'mt-6 flex w-36 flex-col rounded-lg py-1 text-sm font-bold shadow-lg',
                        theme === 'light' &&
                            'bg-zinc-100 text-zinc-700 ring-1 ring-zinc-900/10',
                        theme === 'dark' &&
                            'bg-zinc-800 stroke-zinc-300 text-zinc-300 ring-0',
                    )}
                    transition
                >
                    <MenuItem>
                        <MenuItemButton
                            additionalClasses={clsx(
                                mode === 'demo' && [
                                    theme === 'light' && 'text-indigo-600',
                                    theme === 'dark' && 'text-indigo-400',
                                ],
                            )}
                            onClick={() => setMode('demo')}
                        >
                            Demo
                        </MenuItemButton>
                    </MenuItem>
                    <MenuItem>
                        <MenuItemButton
                            additionalClasses={clsx(
                                mode === 'llm' && [
                                    theme === 'light' && 'text-indigo-600',
                                    theme === 'dark' && 'text-indigo-400',
                                ],
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
