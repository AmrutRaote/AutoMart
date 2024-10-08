import { useUser } from '@clerk/clerk-react';
import { App as SendbirdApp, SendBirdProvider } from '@sendbird/uikit-react';
import '@sendbird/uikit-react/dist/index.css';
import { useEffect, useState } from 'react';
import { GroupChannelList } from '@sendbird/uikit-react/GroupChannelList'
import { GroupChannel } from '@sendbird/uikit-react/GroupChannel';


function Inbox ()
{
    const { user } = useUser()
    const [ userID, setUserID ] = useState()
    const [ channelURL, setChannelURL ] = useState()

    //////////////////////// used to get the user id ///////////////////////
    // split the email address to get the user id
    // create a channel with the user id
    useEffect( () =>
    {
        if ( user )
        {
            const id = ( user?.primaryEmailAddress?.emailAddress ).split( "@" )[ 0 ]
            setUserID( id )
        }
    }, [ user ] )

    return user && (
        <div>
            <div className='w-100% h-[800px] md:h-[500px]' >

                <SendBirdProvider
                    appId={ import.meta.env.VITE_SENDBIRD_APP_ID }
                    userId={ userID }
                    nickname={ user?.fullName }
                    profileUrl={ user?.imageUrl }
                    allowProfileEdit={ true }
                >
                    <div className='grid h-full grid-cols-1 gap-5 mt-5 sm:grid-cols-2 md:grid-cols-4'>
                        {/* Channel List */ }
                        <div className='w-full p-5 overflow-x-auto border shadow-lg sm:w-fit md:w-full'>
                            {/* // GroupChannelList is a component that displays a list of group channels. */ }
                            <GroupChannelList
                                className={ 'w-full' }
                                onChannelSelect={ ( channel ) => { setChannelURL( channel?.url ); } }
                                channelListQueryParams={ { includeEmpty: true } } />
                        </div>

                        {/* Chat Message Area */ }
                        <div className='overflow-x-auto shadow-lg md:col-span-3'>
                            {/* // GroupChannel is a component that displays a group channel. */ }
                            <GroupChannel channelUrl={ channelURL } />
                        </div>
                    </div>

                </SendBirdProvider>

            </div>

        </div>
    )
}

export default Inbox
