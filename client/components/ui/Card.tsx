import { ReactNode } from 'react';
import clsx from 'clsx';

interface CardProps {
    variant?: 'wide' | 'default';
    children: ReactNode;
}

export function Card({
    children,
    variant = 'default',
}: CardProps): JSX.Element {
    const variantClasses = variant === 'wide' ? 'max-w-4xl' : 'max-w-2xl';

    return (
        <div
            className={clsx(
                `${variantClasses}`,
                'mx-auto flex flex-col gap-6 p-6',
                'bg-zinc-50',
                'rounded-2xl border border-indigo-200 shadow-lg shadow-indigo-200',
                'dark:border-indigo-500/60 dark:bg-zinc-800 dark:shadow-indigo-900/40',
            )}
        >
            {children}
        </div>
    );
}
