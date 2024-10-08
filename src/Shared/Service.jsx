

// 1. forEach loop iterates through the response and get carListing?.id
// const response = [
//     { carListing: { id: 1, make: 'Toyota' }, carImages: 'image1.jpg' },
//     { carListing: { id: 1, make: 'Toyota' }, carImages: 'image2.jpg' },
//     { carListing: { id: 2, make: 'Honda' }, carImages: 'image3.jpg' }
// ]

import axios from "axios"
import { toast } from "sonner"

// 2. if the result[listingID] (listingID is position in list ) is not present then it creates an object with carListing(info of car) and images
// result[ 1 ] = {
//     car: { id: 1, make: 'Toyota' },
//     images: []
// }


// 3. if the item?.images is present then it pushes the carImages to the result[listingID].images list. pushing images in result[listingID].images list
// result[ 1 ].images = [ 'image1.jpg', 'image2.jpg' ]

// [
//     { car: { id: 1, make: 'Toyota' }, images: [ 'image1.jpg', 'image2.jpg' ] },
//     { car: { id: 2, make: 'Honda' }, images: [ 'image3.jpg' ] }
// ]


// 4. forEach loop iterates through the result and pushes the carListing and images to the finalResult list
// [
//     { id: 1, make: 'Toyota', images: [ 'image1.jpg', 'image2.jpg' ] },
//     { id: 2, make: 'Honda', images: [ 'image3.jpg' ] }
// ]

const FormatResult = ( resp ) =>
{
    let result = []
    let finalResult = []

    // 1. forEach loop iterates through the response and get carListing?.id
    resp.forEach( ( item ) =>
    {
        const listingID = item?.carListing?.id

        // 2. if the result[listingID] (listingID is position in list ) is not present then it creates an object with carListing(info of car) and images
        if ( !result[ listingID ] )
        {
            result[ listingID ] = {
                car: item?.carListing,
                images: []
            }
        }

        // 3. if the item?.images is present then it pushes the carImages to the result[listingID].images list. pushing images in result[listingID].images list
        if ( item?.carImages )
        {
            result[ listingID ].images.push( item?.carImages )
        }

    } )


    // 4. forEach loop iterates through the result and pushes the carListing and images to the finalResult list
    result.forEach( ( item ) =>
    {
        finalResult.push( { ...item.car, images: item.images } )
    } )

    return finalResult
}


const SendbirdAppID = import.meta.env.VITE_SENDBIRD_APP_ID
const SendbirdAPIToken = import.meta.env.VITE_SENDBIRD_API_TOKEN



const CreateSendBirdUser = async ( userID, nickName, profileUrl ) =>
{
    return await axios.post( 'https://api-' + SendbirdAppID + '.sendbird.com/v3/users', {
        user_id: userID,
        nickname: nickName,
        profile_url: profileUrl,
        issue_access_token: false
    }, {
        headers: {
            'Content-Type': 'application/json',
            'Api-Token': SendbirdAPIToken
        }
    } )
        .then( response =>
        {
            toast( "User created successfully" );
        } )
        .catch( error =>
        {
            if ( error.response )
            {
                console.error( "Error Response:", error.response.data );
            } else
            {
                console.error( "Error Message:", error.message );
            }
        } );
};

const CreateSendBirdChannel = async ( userIDs, channelName ) =>
{
    return axios.post( 'https://api-' + SendbirdAppID + '.sendbird.com/v3/group_channels', {
        user_ids: userIDs,
        is_distinct: true,
        name: channelName
    },
        {
            headers: {
                'Content-Type': 'application/json',
                'Api-Token': SendbirdAPIToken
            }
        } )
}

// export default { FormatResult, CreateSendBirdUser }
export { FormatResult, CreateSendBirdUser, CreateSendBirdChannel }