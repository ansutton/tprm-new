import { ReactNode } from 'react';
import clsx from 'clsx';
import { tw } from '@/utils';

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
                tw`p-6`,
                tw`w-full`,
                tw`bg-zinc-50`,
                tw`dark:bg-zinc-800`,
                tw`rounded-2xl border border-indigo-200 shadow-lg shadow-indigo-200`,
                tw`dark:border-indigo-500/60 dark:shadow-indigo-900/40`,
                `${additionalClasses}`,
            )}
        >
            {children}
        </div>
    );
}
