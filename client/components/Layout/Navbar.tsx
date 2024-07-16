import Link from 'next/link';

export function Navbar(): JSX.Element {
    return (
        <div className='bg-gradient-to-r from-d-green via-pink-500 to-blue-500 pb-1.5 shadow-md shadow-blue-400'>
            <div className='flex w-full items-center gap-2 bg-black px-4 py-6'>
                <Link href='/' className='flex'>
                    <span className='text-xl font-extrabold text-white'>
                        Deloitte
                    </span>
                    <span className='flex self-end'>
                        <svg
                            className='mb-1.5 ml-0.5 h-1.5 w-1.5 fill-d-green'
                            viewBox='0 0 100 100'
                            xmlns='http://www.w3.org/2000/svg'
                            fill='currentColor'
                        >
                            <circle cx='50' cy='50' r='50' />
                        </svg>
                    </span>
                </Link>
                <p className='text-xl text-d-green'>|</p>
                <Link href='/'>
                    <h1 className='bg-gradient-to-r from-blue-500 to-pink-500 bg-clip-text text-xl font-bold text-transparent hover:from-pink-500 hover:to-blue-500'>
                        Neuron
                    </h1>
                </Link>
                <p className='text-xl text-d-green'>|</p>
                <h2 className='text-xl text-white'>
                    <span className='font-bold text-d-green'>Accelerate</span>
                    <span className='bg-gradient-to-r from-blue-500 to-pink-500 bg-clip-text font-bold text-transparent'>
                        .AI
                    </span>
                </h2>
            </div>
        </div>
    );
}
