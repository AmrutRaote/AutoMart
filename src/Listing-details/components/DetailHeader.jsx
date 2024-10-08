import { HiCalendarDays } from "react-icons/hi2";
import { BsSpeedometer2 } from "react-icons/bs";
import { GiGearStickPattern } from "react-icons/gi";
import { FaGasPump } from "react-icons/fa";

function DetailHeader ( { carDetails } )
{
    return (
        <div>
            <h2 className="text-3xl font-bold">{ carDetails?.listingTitle }</h2>
            <p className="text-sm">{ carDetails?.tagline }</p>

            { carDetails?.listingTitle ?
                <div>
                    <div className="flex gap-2 ">
                        <div className="flex items-center gap-2 p-2 px-3 bg-blue-100 rounded-full text-primary">
                            <HiCalendarDays className="size-5" />
                            <h2 className="text-sm font-semibold" >{ carDetails?.year }</h2>
                        </div>

                        <div className="flex items-center gap-2 p-2 px-3 bg-blue-100 rounded-full text-primary">
                            <BsSpeedometer2 className="size-5" />
                            <h2 className="text-sm font-semibold" >{ carDetails?.mileage }</h2>
                        </div>

                        <div className="flex items-center gap-2 p-2 px-3 bg-blue-100 rounded-full text-primary">
                            <GiGearStickPattern className="size-5" />
                            <h2 className="text-sm font-semibold" >{ carDetails?.transmission }</h2>
                        </div>

                        <div className="flex items-center gap-2 p-2 px-3 bg-blue-100 rounded-full text-primary">
                            <FaGasPump className="size-5" />
                            <h2 className="text-sm font-semibold" >{ carDetails?.fuelType }</h2>
                        </div>
                    </div>
                </div>

                : <div className="w-full rounded-xl h-[100px] bg-gray-400 animate-pulse"></div>
            }
        </div>
    )
}

export default DetailHeader
