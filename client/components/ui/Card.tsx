import { ReactNode } from 'react';
import clsx from 'clsx';

interface CardProps {
    twFlex?: string;
    twMaxWidth?: string;
    children: ReactNode;
}

export function Card({
    twFlex = '',
    twMaxWidth = '',
    children,
}: CardProps): JSX.Element {
    return (
        <div
            className={clsx(
                `${twFlex} ${twMaxWidth}`,
                'bg-zinc-50',
                'rounded-2xl border border-indigo-200 shadow-lg shadow-indigo-200',
                'dark:border-indigo-500/60 dark:bg-zinc-800 dark:shadow-indigo-900/40',
            )}
        >
            {children}
        </div>
    );
}
