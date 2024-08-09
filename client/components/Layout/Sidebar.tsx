import { Menu, MenuButton, MenuItem, MenuItems } from '@headlessui/react';
import { Mode } from '@/types/globals';

interface SidebarProps {
    mode: Mode;
    setMode: React.Dispatch<React.SetStateAction<Mode>>;
}

export function Sidebar({ mode, setMode }: SidebarProps): JSX.Element {
    return (
        <div>
            <div>Sidebar</div>
            <Menu>
                <MenuButton>
                    Mode: {mode === 'demo' ? 'Demo' : 'LLM'}
                </MenuButton>

                <MenuItems
                    anchor='bottom end'
                    className='ml-2 flex flex-col'
                    transition
                >
                    <MenuItem>
                        <button
                            className='text-left'
                            onClick={() => setMode('demo')}
                        >
                            Demo {mode === 'demo' ? '(current)' : ''}
                        </button>
                    </MenuItem>
                    <MenuItem>
                        <button
                            className='text-left'
                            onClick={() => setMode('llm')}
                        >
                            LLM {mode === 'llm' ? '(current)' : ''}
                        </button>
                    </MenuItem>
                </MenuItems>
            </Menu>
        </div>
    );
}
