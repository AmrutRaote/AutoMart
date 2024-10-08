import { FaCheck } from "react-icons/fa6";

function Features ( { features } )
{
    return (
        <div>
            <div className='p-10 my-6 border shadow-md rounded-xl'>
                <h2 className='text-2xl font-medium'>Features</h2>

                <div className='grid grid-cols-1 gap-8 mt-5 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4'>
                    { features && Object.entries( features ).map( ( [ features, value ] ) => (
                        <div key={ features } className='flex items-center gap-2 '>
                            <FaCheck className='p-1 text-lg bg-blue-100 rounded-full text-primary' /> <h2>{ features }</h2>
                        </div>
                    ) ) }
                </div>

            </div>
        </div>
    )
}

export default Features