import { ReactNode } from 'react';

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
            className={`${variantClasses} mx-auto flex flex-col gap-6 border border-indigo-100 bg-zinc-50 p-4 shadow-lg shadow-indigo-200 dark:border-indigo-950 dark:bg-zinc-950 dark:shadow-indigo-900`}
        >
            {children}
        </div>
    );
}
