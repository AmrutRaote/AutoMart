import React from 'react'

function Description ( { carDetails } )
{
    return (
        <div>
            { carDetails?.listingDescription ?
                <div className='p-10 mt-6 bg-white border shadow-md rounded-xl'>
                    <h2 className='my-2 text-2xl font-semibold'>Description</h2>
                    <p>{ carDetails?.listingDescription }</p>
                </div>
                : <div className='w-full mt-6 rounded-xl h-[100px] bg-gray-400 animate-pulse'></div> }
        </div>
    )
}

export default Description
