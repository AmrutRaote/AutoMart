import { Separator } from "./ui/separator"
import { LuFuel } from "react-icons/lu";
import { IoSpeedometerOutline } from "react-icons/io5";
import { TbManualGearboxFilled } from "react-icons/tb";
import { MdOutlineOpenInNew } from "react-icons/md";
import { Link } from "react-router-dom";

function CarItemCard ( { car } )
{
    return (
        <Link to={ '/listing-details/' + car?.id }>
            <div className="bg-white border shadow-sm cursor-pointer rounded-xl hover:shadow-md">
                <h2 className="absolute px-2 m-2 text-sm text-white bg-green-500 rounded-full">New</h2>

                <img src={ car?.images[ 0 ]?.imageURL || "sample.jpeg" } className='rounded-t-xl object-cover h-[180px]' width={ "100%" } height={ 250 } alt="car_image" />

                <div className='p-4 '>
                    <h2 className='mb-2 text-lg font-bold text-black'>{ car?.listingTitle }</h2>

                    <Separator orientation="horizontal" className='hidden md:block' />

                    <div className="grid grid-cols-3 mt-5">

                        <div className="flex flex-col items-center" >
                            <LuFuel className="mb-2 text-lg" />
                            <h2 className="text-sm md:text-lg">{ car.mileage }</h2>
                        </div>

                        <div className="flex flex-col items-center" >
                            <IoSpeedometerOutline className="mb-2 text-lg" />
                            <h2 className="text-sm md:text-lg">{ car.fuelType }</h2>
                        </div>

                        <div className="flex flex-col items-center" >
                            <TbManualGearboxFilled className="mb-2 text-lg" />
                            <h2 className="text-sm md:text-lg">{ car.transmission } </h2>
                        </div>

                    </div>

                    <Separator orientation="horizontal" className='hidden my-2 md:block' />

                    <div className="flex items-center justify-between ">

                        <h2 className="text-base font-bold md:text-lg lg:text-xl">₹ { car.sellingPrice }</h2>
                    </div>

                </div>
            </div>

        </Link>
    )
}

export default CarItemCard
