import { ReactNode } from 'react';
import clsx from 'clsx';

interface MenuItemButtonProps {
    additionalClasses?: string;
    children: ReactNode;
    onClick: (event: React.MouseEvent<HTMLButtonElement>) => void;
}

export function MenuItemButton({
    additionalClasses = '',
    children,
    onClick,
}: MenuItemButtonProps): JSX.Element {
    return (
        <button
            onClick={onClick}
            className={clsx(
                `${additionalClasses}`,
                'flex items-center gap-2 px-2 py-1.5',
                'hover:bg-zinc-200',
                'dark:hover:bg-zinc-700/55',
            )}
        >
            {children}
        </button>
    );
}
