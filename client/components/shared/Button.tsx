import { ReactNode } from 'react';
import clsx from 'clsx';
import { tw } from '@/utils';

interface ButtonProps {
    children: ReactNode;
    onClick: (event: React.MouseEvent<HTMLButtonElement>) => void;
    startIcon?: JSX.Element | null;
    variant: 'disabled' | 'outlined' | 'solid';
}

export function Button({
    children,
    onClick,
    variant,
    startIcon = null,
}: ButtonProps): JSX.Element {
    const variantClasses: Record<string, string> = {
        disabled: tw`cursor-not-allowed bg-zinc-300 text-zinc-700`,
        solid: clsx(
            tw`text-white shadow-md shadow-indigo-900/30`,
            tw`bg-indigo-700`,
            tw`duration-100 hover:bg-indigo-900 hover:ease-in-out`,
            tw`dark:bg-indigo-700 dark:duration-100 dark:hover:bg-indigo-600 dark:hover:ease-in-out`,
            tw`dark:shadow-indigo-900/70`,
        ),
        outlined: tw`border-indigo-600 text-indigo-800 shadow-md shadow-indigo-900/30 duration-200 hover:bg-indigo-900 hover:text-white hover:ease-out dark:border-indigo-500 dark:text-indigo-400 dark:shadow-indigo-950 dark:hover:bg-indigo-900 dark:hover:text-white`,
    };
    const baseClasses = tw`mx-auto w-fit rounded-full px-5 py-2`;
    const startIconClasses = startIcon ? tw`flex items-center gap-1.5` : '';
    const finalClasses = `${variantClasses[variant]} ${startIconClasses} ${baseClasses}`;

    return (
        <button
            className={finalClasses}
            onClick={onClick}
            disabled={variant === 'disabled'}
        >
            {startIcon}
            {children}
        </button>
    );
}
