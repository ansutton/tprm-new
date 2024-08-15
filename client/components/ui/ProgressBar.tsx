interface ProgressBarProps {
    progressPercentage: number;
}

export function ProgressBar({
    progressPercentage,
}: ProgressBarProps): JSX.Element {
    return (
        <div className='h-4 w-full rounded-full bg-gray-200'>
            <div
                className='h-4 rounded-full bg-indigo-600 transition-all duration-300'
                style={{ width: `${progressPercentage}%` }}
            ></div>
        </div>
    );
}
