import { ReactNode } from 'react';

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
        disabled:
            'bg-zinc-300 text-zinc-700 cursor-not-allowed border-gray-700',
        solid: 'border-tprm-blue-dark bg-tprm-blue-dark text-white shadow-md shadow-tprm-blue-dark/30 duration-200 hover:bg-white hover:text-tprm-blue-dark hover:ease-out',
        outlined:
            'border-tprm-blue-dark text-tprm-blue-dark shadow-md shadow-tprm-blue-dark/30 duration-200 hover:bg-tprm-blue-dark hover:text-white hover:ease-out',
    };
    const baseClasses = 'mx-auto w-fit border px-4 py-1.5 font-bold';
    const startIconClasses = startIcon ? 'flex items-center gap-1.5' : '';
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
