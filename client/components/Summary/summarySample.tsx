import Link from 'next/link';

export const summarySample = [
    {
        controlQuestion: 'What access control procedures are in place?',
        tpResponse:
            'Lorem ipsum dolor, sit amet consectetur adipisicing elit. Accusamus consequuntur mollitia, dolorum dolores quos quo ipsa cum totam natus earum!',
        aiAnswer:
            'Lorem ipsum dolor, sit amet consectetur adipisicing elit. Accusamus consequuntur mollitia, dolorum dolores quos quo ipsa cum totam natus earum!',
        answersMatch: 'Yes',
        citation: <Citation url='https://citation1.org' />,
    },
    {
        controlQuestion: 'When was the access control policy last reviewed?',
        tpResponse:
            'Nostrum rem nobis excepturi fugit doloremque, iusto culpa perferendis saepe amet sapiente. Lorem ipsum dolor sit amet consectetur adipisicing elit.',
        aiAnswer:
            'Undu, incidunt magni! A, ex error dolorum pariatur magnam nam illo amet. Lorem ipsum, dolor sit amet consectetur adipisicing elit.',
        answersMatch: 'No',
        citation: <Citation url='https://citation2.org' />,
    },
];

interface CitationProps {
    url: string;
}

function Citation({ url }: CitationProps) {
    return (
        <Link
            href={url}
            className='text-indigo-800 hover:text-indigo-500 dark:text-indigo-400 dark:hover:text-indigo-200'
            target='_blank'
            rel='noreferrer noopener'
        >
            {url}
        </Link>
    );
}
