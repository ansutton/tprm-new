import { CircularProgressbar } from 'react-circular-progressbar';

const value = 2;
const questionsAnswered = 4;

export function QuestionsAnswered(): JSX.Element {
    return (
        <div className='h-52 w-52'>
            <CircularProgressbar
                value={value}
                minValue={0}
                maxValue={questionsAnswered}
                text={`${questionsAnswered} Qs`}
            />
        </div>
    );
}
