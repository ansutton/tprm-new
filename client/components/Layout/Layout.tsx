import { ReactNode } from 'react';

interface LayoutProps {
    children: ReactNode;
}

export function Layout({ children }: LayoutProps): JSX.Element {
    return (
        <main className='app-background-light dark:app-background-dark min-h-dvh bg-cover'>
            <div className='min-h-dvh bg-zinc-50 bg-opacity-70 dark:bg-zinc-950 dark:bg-opacity-70'>
                {children}
            </div>
        </main>
    );
}
