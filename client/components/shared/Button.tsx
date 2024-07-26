import { ReactNode } from 'react';
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
        disabled: tw`cursor-not-allowed border-gray-700 bg-zinc-300 text-zinc-700`,
        solid: tw`border-tprm-blue-dark bg-tprm-blue-dark text-white shadow-md shadow-tprm-blue-dark/30 duration-200 hover:bg-white hover:text-tprm-blue-dark hover:ease-out`,
        outlined: tw`border-indigo-900 text-indigo-900 shadow-md shadow-indigo-900/30 duration-200 hover:bg-indigo-900 hover:text-white hover:ease-out dark:border-indigo-500 dark:text-indigo-400 dark:shadow-indigo-950 dark:hover:bg-indigo-900 dark:hover:text-white`,
    };
    const baseClasses = tw`mx-auto w-fit rounded-md border px-4 py-1.5 font-bold`;
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
