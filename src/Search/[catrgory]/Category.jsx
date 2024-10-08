import Header from '@/components/Header'
import Search from '../../components/Search.jsx'
import { db } from '../../../config/index';
import { useParams } from "react-router-dom";
import { CarImages, CarListing } from '../../../config/schema'
import { eq } from 'drizzle-orm';
import { useEffect, useState } from 'react';
import { FormatResult } from '@/Shared/Service';
import CarItemCard from '@/components/CarItemCard';
import Footer from '@/components/Footer.jsx';

function SearchByCategory ()
{
    const { category } = useParams();
    const [ carList, setCarList ] = useState( [] );
    const [ isLoading, setIsLoading ] = useState( true );


    ////////////////////////////////////////// Get Car List //////////////////////////////////////////
    useEffect( () =>
    {
        const fetchCarList = async () =>
        {
            await GetCarList();
            setIsLoading( false );
        };
        fetchCarList();
    }, [ category ] );

    const GetCarList = async () =>
    {
        const result = await db.select().from( CarListing )
            .innerJoin( CarImages, eq( CarListing.id, CarImages.CarListingID ) )
            .where( eq( CarListing.category, category ) );

        const resp = FormatResult( result );
        setCarList( resp );
    };
    ///////////////////////////////////////////////////////////////////////////////////////////////

    return (
        <div className="flex flex-col min-h-screen">
            <Header />
            <div className='flex justify-center p-10 bg-blue-900'>
                <Search />
            </div>

            <div className='flex-grow p-10 md:px-20'>
                <h2 className='text-4xl font-bold '>{ category }</h2>

                {/* List of Carlist */ }
                <div className='grid grid-cols-2 gap-5 mt-5 md:grid-cols-3 lg:grid-cols-4'>
                    { carList?.length > 0 ? (
                        carList.map( ( item, index ) => (
                            <div key={ index }>
                                <CarItemCard car={ item } />
                            </div>
                        ) )
                    ) : isLoading ? (
                        <div className='w-full mt-6 rounded-xl h-[500px] bg-gray-400 animate-pulse'></div>
                    ) : (
                        <h2 className='text-2xl font-medium'>No Car Found</h2>
                    ) }
                </div>
            </div>
            <Footer />
        </div>
    );
}

export default SearchByCategory;
