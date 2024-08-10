import { Menu, MenuButton, MenuItem, MenuItems } from '@headlessui/react';
import { MenuItemButton } from '@/components';
import { Mode } from '@/types/globals';
import clsx from 'clsx';
interface SidebarProps {
    mode: Mode;
    setMode: React.Dispatch<React.SetStateAction<Mode>>;
}

export function Sidebar({ mode, setMode }: SidebarProps): JSX.Element {
    return (
        <div className='w-fit rounded-lg p-1 text-sm font-bold hover:bg-zinc-200 dark:hover:bg-zinc-800'>
            <Menu>
                <MenuButton
                    className={clsx(
                        'p-1 text-indigo-600',
                        'hover:bg-zinc-200',
                        'dark:bg-zinc-800 dark:text-indigo-400 dark:hover:bg-zinc-800',
                    )}
                >
                    <span className='text-indigo-600 dark:text-indigo-400'>
                        {mode === 'demo' ? 'Demo' : 'LLM'}
                    </span>
                </MenuButton>

                <MenuItems
                    anchor='right end'
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
