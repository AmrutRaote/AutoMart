import { Button } from '@/components/ui/button'
import { useUser } from '@clerk/clerk-react';
import { MdOutlineLocalOffer } from "react-icons/md";
import { useNavigate } from 'react-router-dom';
import { CreateSendBirdChannel, CreateSendBirdUser } from '@/Shared/Service';
import { toast } from 'sonner';


function Pricing ( { carDetails } )
{
    const { user } = useUser()
    const navigation = useNavigate()


    const OnMessageOwnerButtonClick = async () =>
    {
        const userID = user?.primaryEmailAddress?.emailAddress.split( "@" )[ 0 ]
        const ownerUserId = carDetails?.createdBy.split( "@" )[ 0 ]

        // current user id
        try
        {
            await CreateSendBirdUser( userID, user?.fullName, user?.imageUrl )
        } catch ( error )
        {
            // owner userid
            try
            {
                await CreateSendBirdUser( ownerUserId, carDetails?.userName, carDetails?.UserImageUrl )
            } catch ( error )
            {
                toast( 'Failed to create user please try again' )
                navigation( '/profile' )
            }
        }

        // create channel with current user and owner user

        try
        {
            await CreateSendBirdChannel( [ userID, ownerUserId ], carDetails?.listingTitle ).then( ( res ) =>
            {
                navigation( '/profile' )
            } )
        } catch ( error )
        {
            toast( 'Failed to create user please try again' )
            navigation( '/profile' )
        }
    }

    return (
        <div className='p-10 border shadow-md rounded-xl'>
            <h2 className='text-lg'>Our Price</h2>
            <h2 className='text-4xl font-bold'>₹ { carDetails?.sellingPrice }</h2>

            <Button
                onClick={ OnMessageOwnerButtonClick }
                disabled={ user?.primaryEmailAddress?.emailAddress === carDetails?.createdBy }
                className='w-full text-xl mt-7'>
                <MdOutlineLocalOffer className='mr-2 text-lg' />Make An Offer Price</Button>
        </div>
    )
}

export default Pricing
