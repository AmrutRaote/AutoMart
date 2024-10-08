import { Button } from '@/components/ui/button'
import { db } from '../../../config/index.js'
import { Link } from 'react-router-dom'
import { CarImages, CarListing } from '../../../config/schema'
import { desc, eq } from 'drizzle-orm'
import { useUser } from '@clerk/clerk-react'
import { useEffect, useState } from 'react'
import { FormatResult } from '@/Shared/Service.jsx'
import CarItemCard from '@/components/CarItemCard.jsx'
import { FaTrashAlt } from "react-icons/fa";
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle, AlertDialogTrigger, } from "@/components/ui/alert-dialog"

function MyListing ()
{

    const { user } = useUser()
    const [ carListing, setCarListing ] = useState( [] )
    const [ isDel, setIsDel ] = useState( false )

    useEffect( () =>
    {
        user && getUserCarListing()
    }, [ user ] )

    const getUserCarListing = async () =>
    {
        // 1. SELECT query fetches all the carListing
        // 2. LEFT JOIN query fetches all the carImages
        // 2.1. It joins the CarListing.id with CarImages.CarListingID
        // 3. WHERE query fetches the carListing that is created by the current user
        // 4. ORDER BY query orders the carListing in descending order
        const result = await db.select().from( CarListing )
            .leftJoin( CarImages, eq( CarListing.id, CarImages.CarListingID ) )
            .where( eq( CarListing.createdBy, user?.primaryEmailAddress?.emailAddress ) )
            .orderBy( desc( CarListing.id ) )

        const resp = FormatResult( result )
        setCarListing( resp )
    }


    const DeleteUserCarListing = async ( carID ) =>
    {
        try
        {
            // Delete car images associated with the car listing
            const delCarImages = await db.delete( CarImages )
                .where( eq( CarImages?.CarListingID, carID ) )
                .returning( { id: CarImages.id } );

            // Delete the car listing
            const delCarListing = await db.delete( CarListing )
                .where( eq( CarListing?.id, carID ) );

            const editCarListing = carListing.filter( item => item.id != carID )
            setCarListing( editCarListing )
            setIsDel( false )

        } catch ( error )
        {
            console.error( "Error deleting car listing:", error );
        }
    };


    return (
        <div className='mt-6'>
            <div className='px-10 my-10 md:px-20' >
                <div className='flex items-center justify-between'>
                    <h2 className='text-xl font-bold md:text-4xl'>My Listing</h2>
                    <Link to='/add-listing'>
                        <Button>+ Add New Listing</Button>
                    </Link>
                </div>

                <div className='grid grid-cols-1 gap-5 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 mt-7'>
                    { carListing.length > 0 ? carListing.map( ( item ) => (
                        <div key={ item.id }>
                            <CarItemCard car={ item } />

                            <div className='flex justify-between gap-3 p-2 rounded-lg bg-gray-50'>
                                <Link className='w-full' to={ `/add-listing?mode=edit&id=${ item?.id }` }>
                                    <Button variant='outline' className='w-full text-lg transition-all hover:scale-110'>Edit</Button>
                                </Link>
                                <Button variant='destructive' onClick={ () => setIsDel( true ) } className='text-lg transition-all hover:scale-110'><FaTrashAlt /></Button>


                                <AlertDialog open={ isDel } onOpenChange={ setIsDel }>
                                    <AlertDialogContent>
                                        <AlertDialogHeader>
                                            <AlertDialogTitle>Are you sure?</AlertDialogTitle>
                                            <AlertDialogDescription>
                                                This action cannot be undone. This will permanently delete your car listing.
                                            </AlertDialogDescription>
                                        </AlertDialogHeader>
                                        <AlertDialogFooter>
                                            <AlertDialogCancel onClick={ () => setIsDel( false ) }>Cancel</AlertDialogCancel>
                                            <AlertDialogAction onClick={ () => DeleteUserCarListing( item.id ) }>
                                                Confirm
                                            </AlertDialogAction>
                                        </AlertDialogFooter>
                                    </AlertDialogContent>
                                </AlertDialog>

                            </div>
                        </div>
                    ) ) : <h2 className='text-2xl font-semibold '>You have not listed any car yet</h2> }
                </div>

            </div>
        </div>
    )
}

export default MyListing
