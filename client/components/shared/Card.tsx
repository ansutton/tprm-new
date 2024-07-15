import { ReactNode } from 'react';

interface CardProps {
    variant?: 'wide' | 'default';
    children: ReactNode;
}

export function Card({
    children,
    variant = 'default',
}: CardProps): JSX.Element {
    const variantClassNames = variant === 'wide' ? 'max-w-4xl' : 'max-w-2xl';

    return (
        <div
            className={`${variantClassNames} mx-auto flex flex-col gap-6 bg-white p-4 shadow-lg shadow-tprm-blue-light/60`}
        >
            {children}
        </div>
    );
}
