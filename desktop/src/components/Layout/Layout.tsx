import { ReactNode, useState } from 'react';
import clsx from 'clsx';
import { useTheme } from '@/hooks';
import { tw } from '@/utils';

interface LayoutProps {
    children: ReactNode;
}

export function Layout({ children }: LayoutProps): JSX.Element {
    const { theme } = useTheme();

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
            </div>
        </main>
    );
}
