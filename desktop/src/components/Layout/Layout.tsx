import { ReactNode, useState } from 'react';
import clsx from 'clsx';
import { tw } from '@/utils';

interface LayoutProps {
    children: ReactNode;
}

export function Layout({ children }: LayoutProps): JSX.Element {
    const [theme, setTheme] = useState<'light' | 'dark'>('dark');

    return (
        <main
            className={clsx(
                theme === 'dark' && 'dark',
                'app-background-light dark:app-background-dark',
                tw`min-h-dvh bg-cover`,
            )}
        >
            <div className='min-h-dvh bg-zinc-50 bg-opacity-70 dark:bg-zinc-950 dark:bg-opacity-70'>
                {children}
                <button onClick={() => setTheme('light')} className='hidden'>
                    Switch to Light Mode
                </button>
                <button onClick={() => setTheme('dark')} className='hidden'>
                    Switch to Dark Mode
                </button>
            </div>
        </main>
    );
}
