import { ReactNode } from 'react';
import { tw } from '@/utils';

interface HeadingProps {
    additionalClasses?: string;
    children: ReactNode;
}

export function H3({ children }: HeadingProps): JSX.Element {
    return (
        <h3 className='mb-3 w-full text-center text-3xl font-bold text-indigo-600 dark:text-indigo-500'>
            {children}
        </h3>
    );
}

export function H4({
    additionalClasses = '',
    children,
}: HeadingProps): JSX.Element {
    return (
        <h4 className={tw`${additionalClasses} mb-4 w-full text-2xl font-bold`}>
            {children}
        </h4>
    );
}
