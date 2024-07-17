import Link from 'next/link';

export function Topbar(): JSX.Element {
    return (
        <div className='bg-gradient-to-r from-d-green/50 via-indigo-950 to-d-green/50 pb-0.5 shadow-sm shadow-indigo-500/50'>
            <div className='flex w-full items-center gap-2 bg-black px-4 py-3'>
                <Link href='/' className='flex'>
                    <span className='text-lg font-extrabold text-white'>
                        Deloitte
                    </span>
                    <span className='flex self-end'>
                        <svg
                            className='mb-[7px] ml-[1px] h-1.5 w-1.5 fill-d-green/90'
                            viewBox='0 0 100 100'
                            xmlns='http://www.w3.org/2000/svg'
                            fill='currentColor'
                        >
                            <circle cx='50' cy='50' r='50' />
                        </svg>
                    </span>
                </Link>
                <Bar />
                <Link href='/'>
                    <h1 className='bg-gradient-to-r from-indigo-500 to-zinc-400 bg-clip-text text-lg font-bold text-transparent hover:from-indigo-500 hover:to-indigo-500'>
                        Neuron
                    </h1>
                </Link>
                <Bar />
                <h2 className='text-lg text-white'>
                    <span className='font-bold text-d-green/90'>
                        Accelerate
                    </span>
                    <span className='bg-gradient-to-r from-indigo-500 to-pink-500 bg-clip-text font-bold text-transparent'>
                        .AI
                    </span>
                </h2>
            </div>
        </div>
    );
}

export function Bar(): JSX.Element {
    return (
        <p className='bg-gradient-to-t from-zinc-800 via-zinc-400 to-zinc-800 bg-clip-text text-2xl font-extrabold text-transparent'>
            |
        </p>
    );
}
