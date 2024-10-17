import { ReactNode } from 'react';
import clsx from 'clsx';
import { tw } from '@/utils';

interface ButtonProps {
    additionalClasses?: string;
    children: ReactNode;
    onClick?: (event: React.MouseEvent<HTMLButtonElement>) => void;
    startIcon?: JSX.Element | null;
    variant?: 'disabledSolid' | 'outlined' | 'solid' | 'text';
}

export function Button({
    additionalClasses = '',
    children,
    onClick = () => null,
    variant = 'solid',
    startIcon = null,
}: ButtonProps): JSX.Element {
    const variantClasses: Record<string, string> = {
        disabledSolid: clsx(
            tw`text-white shadow-md shadow-indigo-900/30 dark:text-zinc-400`,
            tw`bg-indigo-700/50`,
            tw`dark:bg-indigo-500/50`,
        ),
        outlined: tw`border-indigo-600 text-indigo-800 shadow-md shadow-indigo-900/30 duration-200 hover:bg-indigo-900 hover:text-white hover:ease-out dark:border-indigo-500 dark:text-indigo-400 dark:shadow-indigo-950 dark:hover:bg-indigo-900 dark:hover:text-white`,
        solid: clsx(
            tw`text-white shadow-md shadow-indigo-900/30`,
            tw`bg-indigo-700`,
            tw`duration-100 hover:bg-indigo-900 hover:ease-in-out`,
            tw`dark:bg-indigo-700 dark:duration-100 dark:hover:bg-indigo-600 dark:hover:ease-in-out`,
            tw`dark:shadow-indigo-900/70`,
        ),
        text: clsx(
            tw`text-indigo-600`,
            tw`dark:text-indigo-400`,
            tw`hover:bg-zinc-200`,
            tw`dark:hover:bg-zinc-800`,
        ),
    };
    const baseClasses = tw`w-fit rounded-full px-5 py-2`;
    const startIconClasses = startIcon ? tw`flex items-center gap-1.5` : '';
    const finalClasses = `${variantClasses[variant]} ${startIconClasses} ${baseClasses} ${additionalClasses}`;

    return (
        <button
            className={finalClasses}
            onClick={onClick}
            disabled={variant === 'disabledSolid'}
        >
            {startIcon}
            {children}
        </button>
    );
}
