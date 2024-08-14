import { ReactNode } from 'react';
import clsx from 'clsx';

interface CardProps {
    additionalClasses?: string;
    children: ReactNode;
}

export function Card({
    additionalClasses = '',
    children,
}: CardProps): JSX.Element {
    return (
        <div
            className={clsx(
                `${additionalClasses}`,
                'bg-zinc-50',
                'rounded-2xl border border-indigo-200 shadow-lg shadow-indigo-200',
                'dark:border-indigo-500/60 dark:bg-zinc-800 dark:shadow-indigo-900/40',
            )}
        >
            {children}
        </div>
    );
}
