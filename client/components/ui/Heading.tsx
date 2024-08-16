import { ReactNode } from 'react';
import { tw } from '@/utils';

interface HeadingWrapperProps {
    children: ReactNode;
    customTwGap?: string;
    level?: 3 | 4;
}

function HeadingWrapper({
    children,
    customTwGap,
    level = 4,
}: HeadingWrapperProps): JSX.Element {
    function finalTwGap() {
        if (customTwGap) return customTwGap;
        switch (level) {
            case 3:
                return 'gap-3';
            case 4:
                return tw`gap-2.5`;
        }
    }

    return (
        <div className={`${finalTwGap()} flex items-center`}>{children} </div>
    );
}

interface HeadingProps extends HeadingWrapperProps {
    additionalClasses?: string;
    startIcon?: ReactNode;
    twFontSize?: string;
}

export function Heading({
    additionalClasses = '',
    level = 4,
    startIcon = null,
    children,
    twFontSize,
}: HeadingProps): JSX.Element {
    function FinalHeading(): JSX.Element {
        switch (level) {
            case 3:
                return (
                    <h3
                        className={tw`${additionalClasses} ${twFontSize ? twFontSize : 'text-3xl'} mb-3 w-full text-center font-bold text-indigo-600 dark:text-indigo-500`}
                    >
                        {children}
                    </h3>
                );

            case 4:
                return (
                    <h4
                        className={tw`${additionalClasses} ${twFontSize ? twFontSize : 'text-2xl'} w-full font-bold`}
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
