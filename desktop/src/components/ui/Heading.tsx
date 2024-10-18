import { ReactNode } from 'react';
import clsx from 'clsx';

interface HeadingWrapperProps {
    children: ReactNode;
    customTwGap?: string;
    level?: 3 | 4;
}

function HeadingWrapper({
    children,
    customTwGap,
}: HeadingWrapperProps): JSX.Element {
    return (
        <div
            className={clsx(
                'flex items-center',
                customTwGap ? `${customTwGap}` : 'gap-3',
            )}
        >
            {children}
        </div>
    );
}

interface HeadingProps extends HeadingWrapperProps {
    additionalClasses?: string;
    startIcon?: ReactNode;
    fontSize?: string;
}

export function Heading({
    additionalClasses = '',
    level = 4,
    startIcon = null,
    children,
    fontSize,
}: HeadingProps): JSX.Element {
    function FinalHeading(): JSX.Element {
        switch (level) {
            case 3:
                return (
                    <h3
                        className={`${additionalClasses} ${fontSize ? fontSize : 'text-3xl'} mb-3 w-full text-center font-bold text-indigo-600 dark:text-indigo-500`}
                    >
                        {children}
                    </h3>
                );

            case 4:
                return (
                    <h4
                        className={`${additionalClasses} ${fontSize ? fontSize : 'text-2xl'} w-full font-bold`}
                    >
                        {children}
                    </h4>
                );
        }
    }

    if (startIcon) {
        return (
            <HeadingWrapper>
                {startIcon}
                <FinalHeading />
            </HeadingWrapper>
        );
    }
    return <FinalHeading />;
}
