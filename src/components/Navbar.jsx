import React from 'react'

export default function Navbar() {
    const refresh = () => {
        location.reload();
    }
    return (
        <>
            <div className=' max-w-screen-2xl mx-auto container px-6 md:px-40 shadow-lg h-16 font-bold pt-4 fixed'>
                <div className=' flex justify-between'>
                    <h1 className=' text-3xl cursor-pointer'>Word<span className=' text-blue-500 text-xl'>TO</span>pdf</h1>
                 <h1 onClick={refresh} className=' text-2xl cursor-pointer hover:scale-110 duration-200 '>Home</h1>
                </div>
            </div>
        </>

    )
}
