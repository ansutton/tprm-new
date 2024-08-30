import { Menu, MenuButton, MenuItem, MenuItems } from '@headlessui/react';
import clsx from 'clsx';
import { MenuItemButton } from '@/components';
import { Mode } from '@/types';

interface ModeMenuProps {
    mode: Mode;
    setMode: React.Dispatch<React.SetStateAction<Mode>>;
}

export function ModeMenu({ mode, setMode }: ModeMenuProps): JSX.Element {
    return (
        <div className='rounded-lg p-1 text-sm font-bold hover:bg-zinc-200 dark:hover:bg-zinc-800'>
            <Menu>
                <MenuButton
                    className={clsx(
                        'flex gap-1 p-1 text-zinc-600',
                        'hover:bg-zinc-200',
                        'dark:text-zinc-300',
                        'dark:hover:bg-zinc-800',
                    )}
                >
                    Mode:
                    <span className='relative text-indigo-600 dark:text-indigo-400'>
                        <span
                            className={clsx(
                                'absolute',
                                mode === 'demo' ? 'invisible' : '',
                            )}
                        >
                            LLM
                        </span>
                        <span
                            className={clsx(
                                '',
                                mode === 'llm' ? 'invisible' : '',
                            )}
                        >
                            Demo
                        </span>
                    </span>
                </MenuButton>

                <MenuItems
                    anchor='bottom'
                    className={clsx(
                        'mt-6 flex w-36 flex-col rounded-lg bg-zinc-100 py-1 text-sm font-bold shadow-lg',
                        'text-zinc-700',
                        'dark:bg-zinc-800 dark:stroke-zinc-300 dark:text-zinc-300',
                        'ring-1 ring-zinc-900/10',
                        'dark:ring-0',
                    )}
                    transition
                >
                    <MenuItem>
                        <MenuItemButton
                            additionalClasses={
                                mode === 'demo'
                                    ? 'text-indigo-600 dark:text-indigo-400'
                                    : ''
                            }
                            onClick={() => setMode('demo')}
                        >
                            Demo
                        </MenuItemButton>
                    </MenuItem>
                    <MenuItem>
                        <MenuItemButton
                            additionalClasses={
                                mode === 'llm'
                                    ? 'text-indigo-600 dark:text-indigo-400'
                                    : ''
                            }
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
