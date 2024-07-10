import { ReactNode } from 'react';

interface LayoutProps {
    children: ReactNode;
}

export function Layout({ children }: LayoutProps): JSX.Element {
    return (
        <main className='min-h-dvh bg-[url("../public/images/clipboard-pen.jpg")] bg-cover'>
            <div className='min-h-dvh bg-white/60'>{children}</div>
        </main>
    );
}
