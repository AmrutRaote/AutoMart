import IconField from '@/components/Addlisting/components/IconFeild'
import CarSpecification from '@/Shared/CarSpecification'
import React from 'react'

function Specification ( { carDetails } )
{
    return (
        <div className='p-10 border shadow-md rounded-xl mt-7'>
            <h2 className='text-2xl font-medium'>Car Specification</h2>

            { carDetails ? CarSpecification.map( ( carItem, index ) => (
                <div key={ index } className='flex items-center justify-between mt-2'>
                    <h2 className='flex gap-2'><IconField icon={ carItem.icon } />{ carItem?.label }</h2>
                    <h2>{ carDetails[ carItem?.name ] }</h2>
                </div>
            ) ) : <div className='w-full mt-6 rounded-xl h-[500px] bg-gray-400 animate-pulse'></div> }
        </div>
    )
}

export default Specification
