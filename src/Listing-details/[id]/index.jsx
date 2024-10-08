import Header from '@/components/Header'
import DetailHeader from '../components/DetailHeader'
import { useParams } from 'react-router-dom'
import { db } from '/config/index.js'
import { CarImages, CarListing } from '/config/schema'
import { eq } from 'drizzle-orm'
import { FormatResult } from '@/Shared/Service'
import { useEffect, useState } from 'react'
import ImageGallery from '../components/ImageGallery'
import Description from '../components/Description'
import Features from '../components/Features'
import Pricing from '../components/Pricing'
import Specification from '../components/Specification'
import OwnersDetails from '../components/OwnersDetails'
import Footer from '@/components/Footer'
import FinancialCal from '../components/FinancialCal'
import MostSearchCar from '@/components/MostSearchCar'

function ListingDetail ()
{
    const { id } = useParams()
    const [ carDetails, setCarDetails ] = useState()


    useEffect( () => { GetCarDetails() }, [ id ] )


    ////////////////////////////////////////// Get Car Details //////////////////////////////////////////
    // get car id from url and fetch car details
    const GetCarDetails = async () =>
    {
        const result = await db.select().from( CarListing )
            .innerJoin( CarImages, eq( CarListing.id, CarImages.CarListingID ) )
            .where( eq( CarListing.id, id ) )

        const resp = FormatResult( result )
        setCarDetails( resp[ 0 ] )
    }

    ////////////////////////////////////////////////////////////////////////////////////
    return (
        <div>
            <Header />
            <div className='p-10 md:px-20'>
                {/* Header detail comp */ }
                <DetailHeader carDetails={ carDetails } />


                <div className='grid w-full grid-cols-1 gap-5 mt-10 md:grid-cols-3'>

                    {/* Left car image details  */ }
                    <div className='md:col-span-2'>
                        {/* Image galary */ }
                        <ImageGallery carDetails={ carDetails } />
                        {/* description */ }
                        <Description carDetails={ carDetails } />
                        {/* features list */ }
                        <Features features={ carDetails?.features } />

                        {/* Financial comp */ }
                        < FinancialCal carDetails={ carDetails } />

                    </div>

                    {/* Right car details  */ }
                    <div className=''>
                        {/* price details */ }
                        <Pricing carDetails={ carDetails } />

                        {/* car specification */ }
                        <Specification carDetails={ carDetails } />

                        {/* owner detail */ }
                        <OwnersDetails carDetails={ carDetails } />


                    </div>



                </div>
                <MostSearchCar />
            </div>
            <Footer />
        </div>
    )
}

export default ListingDetail
