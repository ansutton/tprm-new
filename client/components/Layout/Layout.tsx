import { ReactNode } from 'react';

interface LayoutProps {
    children: ReactNode;
}

export function Layout({ children }: LayoutProps): JSX.Element {
    return (
        <main className='app-background min-h-dvh bg-cover'>
            <div className='min-h-dvh bg-zinc-950 bg-opacity-70'>
                {children}
            </div>
        </main>
    );
}
