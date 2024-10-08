import Data from "@/Shared/Data";
import { Link, useParams } from "react-router-dom";

function Category ()
{

    return (
        <div className='mt-40'>
            <h2 className='mb-6 text-2xl font-bold text-center'>Browse By Type</h2>

            <div className="grid grid-cols-3 gap-6 px-20 sm:grid-cols-4 md:grid-cols-6 lg:grid-cols-9">
                {
                    Data.Categories.map( ( item ) => (
                        <Link to={ '/search/' + item.name } key={ item.id }>
                            <div className="flex flex-col items-center w-20 p-2 border cursor-pointer sm:w-full hover:shadow-md rounded-xl" >
                                <img src={ item.icon } width={ 35 } height={ 35 } className="mt-2" alt="car_category" />
                                <h2 className="text-sm sm:text-lg" >{ item.name }</h2>
                            </div>
                        </Link>
                    ) )
                }
            </div>

        </div>
    )
}

export default Category
