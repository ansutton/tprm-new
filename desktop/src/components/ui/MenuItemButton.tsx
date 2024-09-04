import { forwardRef, ReactNode } from 'react';
import clsx from 'clsx';
import { useTheme } from '@/hooks';
import { tw } from '@/utils';

interface MenuItemButtonProps {
    additionalClasses?: string | false | null | undefined;
    children: ReactNode;
    onClick: (event: React.MouseEvent<HTMLButtonElement>) => void;
}

export const MenuItemButton = forwardRef<
    HTMLButtonElement,
    MenuItemButtonProps
>((props, ref) => {
    const { additionalClasses = '', children, onClick } = props;
    const { theme } = useTheme();

    return (
        <button
            ref={ref}
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
});
