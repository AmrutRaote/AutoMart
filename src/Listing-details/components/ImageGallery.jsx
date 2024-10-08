import React from 'react'

function ImageGallery ( { carDetails } )
{
    return (
        <div className='py-2 border shadow-lg rounded-xl'>
            <img src={ carDetails?.images[ 0 ]?.imageURL } className='w-full object-cover rounded-xl h-[500px]' alt="car-image" />
        </div>
    )
}

export default ImageGallery
