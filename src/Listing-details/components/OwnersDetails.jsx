import { Button } from '@/components/ui/button'
import { CreateSendBirdChannel, CreateSendBirdUser } from '@/Shared/Service';
import { useUser } from '@clerk/clerk-react';
import { Link, useNavigate } from 'react-router-dom';
import { toast } from 'sonner';

function OwnersDetails ( { carDetails } )
{
    const { user } = useUser()
    const navigation = useNavigate()

    /////////////////////////// Create a channel with the owner of the car listing ///////////////////////////
    const OnMessageOwnerButtonClick = async () =>
    {
        // get the user id of the current user and the owner of the car listing
        // split the email address to get the owners user id
        const userID = user?.primaryEmailAddress?.emailAddress.split( "@" )[ 0 ]
        const ownerUserId = carDetails?.createdBy.split( "@" )[ 0 ]

        // current user id
        try
        {
            // create a sendbird user with the current user id
            await CreateSendBirdUser( userID, user?.fullName, user?.imageUrl )
        } catch ( error )
        {
            // owner userid
            try
            {
                // create a sendbird user with the owner user id
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
        <div className='p-10 mt-5 border shadow-md rounded-xl'>
            <h2 className='mb-3 text-2xl font-medium'>Owner&lsquo;s Detail</h2>
            <img className='rounded-full size-20' src={ carDetails?.userImageUrl || '/public/profile.jpg' } />
            <h2 className='mt-2 text-xl font-bold'>{ carDetails?.userName }</h2>
            <h2 className='mt-2 font-bold text-gray-500'>{ carDetails?.createdBy }</h2>
            <Button
                disabled={ user?.primaryEmailAddress?.emailAddress === carDetails?.createdBy }
                className='w-full mt-6'
                onClick={ OnMessageOwnerButtonClick }
            >Message Owner</Button>
        </div>
    )
}

export default OwnersDetails
