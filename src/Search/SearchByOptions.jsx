import { CarListing } from '/config/schema'
import { db } from '../../config/index.js'
import { useSearchParams } from 'react-router-dom'
import { CarImages } from '/config/schema'
import { asc, desc, eq } from 'drizzle-orm'
import { useEffect, useState } from 'react'
import { FormatResult } from '@/Shared/Service'
import Header from '@/components/Header'
import Search from '../components/Search.jsx'
import CarItemCard from '@/components/CarItemCard'
import Footer from '@/components/Footer.jsx'

function SearchByOptions ()
{
    const [ searchParams ] = useSearchParams()
    const company = searchParams.get( 'cars' )
    const make = searchParams.get( 'make' )
    const price = searchParams.get( 'price' )
    const condition = searchParams.get( 'condition' )

    const [ carList, setCarList ] = useState( [] )


    ////////////////////////////////////////// Get Car List //////////////////////////////////////////
    useEffect( () => { GetCarList() }, [ price, condition ] )


    const GetCarList = async () =>
    {
        // if condition true then fetch car list based on condition [NEW , USED , PRE-OWNED]
        if ( condition )
        {
            const result = await db.select().from( CarListing )
                .innerJoin( CarImages, eq( CarListing.id, CarImages.CarListingID ) )
                .where( eq( CarListing.condition, condition ) )

            const resp = FormatResult( result )
            setCarList( resp )
        }
        // if condition false then fetch car list based on company, make and price
        else
        {
            const order = price == 'Low-to-High' ? desc( CarListing.sellingPrice ) : asc( CarListing.sellingPrice )
            const result = await db.select().from( CarListing )
                .innerJoin( CarImages, eq( CarListing.id, CarImages.CarListingID ) )
                .where( company != undefined && eq( CarListing.company, company ) )
                .where( make != undefined && eq( CarListing.make, make ) )
                .orderBy( order )

            const resp = FormatResult( result )
            setCarList( resp )
        }
    }
    ///////////////////////////////////////////////////////////////////////////////////////////////
    return (
        <div className="flex flex-col min-h-screen">
            <Header />
            <div className='flex justify-center p-16 bg-blue-900'>
                <Search />
            </div>

            <div className='flex-grow p-10 md:px-20'>
                <h2 className='text-4xl font-bold'>Search Result</h2>

                {/* List of Carlist */ }
                <div className='grid grid-cols-1 gap-5 mt-5 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4'>
                    { carList.length > 0 ?
                        carList.map( ( item, index ) => (
                            <div key={ index }>
                                <CarItemCard car={ item } />
                            </div>
                        ) )
                        :
                        <h2 className='text-2xl font-medium'>No Car Found</h2>
                    }
                </div>
            </div>

            <Footer />
        </div>
    )
}

export default SearchByOptions
