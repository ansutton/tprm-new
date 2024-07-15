interface CitationProps {
    url: string;
}

function Citation({ url }: CitationProps) {
    return (
        <a
            href={url}
            className='text-tprm-blue-dark underline hover:text-tprm-blue-medium'
        >
            {url}
        </a>
    );
}

export const summarySample = [
    {
        controlQuestion: 'What access control procedures are in place?',
        tpResponse: 'Sample TP response 1',
        aiAnswer: 'Sample AI answer 1',
        answersMatch: 'Yes',
        citation: <Citation url='https://citation1.org' />,
    },
    {
        controlQuestion: 'When was the access control policy last reviewed?',
        tpResponse: 'Sample TP response 2',
        aiAnswer: 'Sample AI answer 2',
        answersMatch: 'Yes',
        citation: <Citation url='https://citation2.org' />,
    },
    {
        controlQuestion: 'What is the password management policy in place?',
        tpResponse: 'Sample TP response 3',
        aiAnswer: 'Sample AI answer 3',
        answersMatch: 'No',
        citation: <Citation url='https://citation3.org' />,
    },
];
