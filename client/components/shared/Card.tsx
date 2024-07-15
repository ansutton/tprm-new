import { ReactNode } from 'react';

interface CardProps {
    children: ReactNode;
}

export function Card({ children }: CardProps): JSX.Element {
    return (
        <div className='mx-auto flex w-full max-w-2xl flex-col gap-6 bg-white p-4 shadow-lg shadow-tprm-blue-light/60'>
            {children}
        </div>
    );
}
