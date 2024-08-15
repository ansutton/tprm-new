import { ReactNode } from 'react';
import { tw } from '@/utils';

interface HeadingWrapperProps {
    children: ReactNode;
}

function HeadingWrapper({ children }: HeadingWrapperProps): JSX.Element {
    return <div className='flex items-center gap-3'>{children} </div>;
}

interface HeadingProps extends HeadingWrapperProps {
    additionalClasses?: string;
    level?: 3 | 4;
    startIcon?: ReactNode;
}

export function Heading({
    additionalClasses = '',
    level = 4,
    startIcon = null,
    children,
}: HeadingProps): JSX.Element {
    function FinalHeading(): JSX.Element {
        switch (level) {
            case 3:
                return (
                    <h3
                        className={tw`${additionalClasses} mb-3 w-full text-center text-3xl font-bold text-indigo-600 dark:text-indigo-500`}
                    >
                        {children}
                    </h3>
                );

            case 4:
                return (
                    <h4
                        className={tw`${additionalClasses} w-full text-2xl font-bold`}
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
