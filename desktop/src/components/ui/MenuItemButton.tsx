import { ReactNode } from 'react';
import clsx from 'clsx';
import { useTheme } from '@/hooks';
import { tw } from '@/utils';

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
    const { theme } = useTheme();

    return (
        <button
            onClick={onClick}
            className={clsx(
                `${additionalClasses}`,
                tw`flex items-center gap-2 px-2 py-1.5`,
                theme === 'light' && tw`hover:bg-zinc-200`,
                theme === 'dark' && tw`hover:bg-zinc-700/55`,
            )}
        >
            {children}
        </button>
    );
}
