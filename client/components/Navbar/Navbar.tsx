export function Navbar(): JSX.Element {
    return (
        <div className='bg-gradient-to-r from-d-green via-pink-500 to-blue-500 pb-2'>
            <div className='flex w-full items-center gap-2 bg-black px-3 py-6'>
                <div className='text-xl text-white'>(Deloitte Logo)</div>
                <p className='text-xl text-d-green'>|</p>
                <h1 className='text-xl font-bold text-white'>Neuron</h1>
                <p className='text-xl text-d-green'>|</p>
                <h2 className='text-lg text-white'>
                    Third-Party Risk Management (TPRM) Accelerator
                </h2>
            </div>
        </div>
    );
}
