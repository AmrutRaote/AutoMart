import React from 'react'
import Search from './Search'

function Hero ()
{
    return (
        <>
            <div className='flex flex-col items-center p-10 py-20 gap-6 h-[650px] w-full bg-[#eef0fc]'>
                <h2 className='text-lg'>Find cars for sale and for rent near you</h2>
                <h2 className='md:text-[60px] text-3xl font-bold' >Find Your Dream Car</h2>
                <Search />
                <img src="Dahsbord_car.png" className='mt-10' alt="car" />
            </div>
        </>
    )
}

export default Hero
