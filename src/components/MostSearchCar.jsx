import FakeData from '@/Shared/FakeData'
import CarItemCard from './CarItemCard'
import
{
    Carousel,
    CarouselContent,
    CarouselItem,
    CarouselNext,
    CarouselPrevious,
} from "@/components/ui/carousel"
import { db } from '../../config'
import { CarImages, CarListing } from '../../config/schema'
import { desc, eq } from 'drizzle-orm'
import { useEffect, useState } from 'react'
import { FormatResult } from '@/Shared/Service'


function MostSearchCar ()
{
    // console.log( FakeData.carList )

    const [ carList, setCarList ] = useState( [] )


    ////////////////////////////////////////// Get Popular Car List //////////////////////////////////////////
    useEffect( () =>
    {
        GetPopularCarList()
    }, [] )

    const GetPopularCarList = async () =>
    {
        const result = await db.select().from( CarListing )
            .leftJoin( CarImages, eq( CarListing.id, CarImages.CarListingID ) )
            .orderBy( desc( CarListing.id ) )
            .limit( 10 )

        const resp = FormatResult( result )
        setCarList( resp )
    }
    ////////////////////////////////////////////////////////////////////////////////////

    return (
        <div className='mx-24' >
            <h2 className='mt-16 text-2xl font-bold text-center md:text-3xl mb-7'>Most Searched Cars</h2>

            <Carousel>
                <CarouselContent>

                    { carList.map( ( car, index ) => (

                        <CarouselItem key={ index } className='md:basis-1/4 sm:basis-1/2 basis-full '>
                            <CarItemCard key={ car.id } car={ car } />
                        </CarouselItem>
                    ) )
                    }
                </CarouselContent >
                <CarouselPrevious />
                <CarouselNext />
            </Carousel>



        </div>
    )
}

export default MostSearchCar
