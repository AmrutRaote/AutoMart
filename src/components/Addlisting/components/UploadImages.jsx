import { IoMdCloseCircle } from "react-icons/io";
import { useEffect, useState } from "react"
import { getDownloadURL, ref, uploadBytes } from 'firebase/storage';
import { storage } from "../../../../config/firebase.config.jsx";
import { CarImages } from "../../../../config/schema.js";
import { db } from "../../../../config/index.js";
import { eq } from "drizzle-orm";

function UploadImages ( { triggerUploadImages, user, setLoader, carInfo, mode } )
{
    const [ selectedFilesList, setSelectedFilesList ] = useState( [] )
    const [ editCarImagesList, setEditCarImagesList ] = useState( [] )



    //////////////////////// used to set the images in the edit mode ///////////////////////
    useEffect( () =>
    {
        if ( carInfo != 0 && mode == 'edit' )
        {
            setEditCarImagesList( [] )
            carInfo?.images.forEach( ( image ) =>
            {
                setEditCarImagesList( ( prev ) => [ ...prev, image?.imageURL ] )

            } )
        }
    }, [ carInfo ] )
    //////////////////////////////////////////////////////////////////////////////////////


    //////////////////////// used to select the images and  remove image ///////////////////////
    const onFileSelected = ( event ) =>
    {
        const files = event.target.files;

        for ( let i = 0; i < files?.length; i++ )
        {
            const file = files[ i ];
            setSelectedFilesList( ( prev ) => [ ...prev, file ] ) // add the selected files to the selectedFilesList
        }

    }

    const onImageRemove = ( file, index ) =>
    {
        const result = selectedFilesList.filter( ( item ) => item != file ) // remove the selected image from the selectedFilesList
        setSelectedFilesList( result )
    }
    /////////////////////////////////////////////////////////////////////////////


    //////////////////////// used to remove the image from the database while editing the listing ///////////////////////
    const onImageRemoveFromDB = async ( image, index ) =>
    {
        // delete particular image from the database while editing the listing
        const result = await db.delete( CarImages )
            .where( eq( CarImages.id, carInfo?.images[ index ]?.id ) )
            .returning( { id: CarImages.id } );

        const imageList = editCarImagesList.filter( item => item != image )
        setEditCarImagesList( imageList )
    }


    //////////////////////// used to upload the images to the server ///////////////////////
    useEffect( () =>
    {

        if ( user && triggerUploadImages )
        {
            UploadImageToServer()
        }
    }, [ triggerUploadImages ] )


    const UploadImageToServer = async () =>
    {
        setLoader( true )

        selectedFilesList.forEach( async ( file ) =>
        {
            const fileName = Date.now() + '.jpeg'  // set filename as current date
            const storageRef = ref( storage, 'car-marketplace/' + fileName ) // set the storage reference path and filename 

            const metaData = { contentType: 'image/jpeg' }  // set the metadata of the file

            // uploadBytes is used to upload the file to the firebase storage 
            await uploadBytes( storageRef, file, metaData )
                .then( ( snapShot ) => { console.log( "file uploaded" ) } )
                .then( resp =>
                {
                    getDownloadURL( storageRef )  // get the download url of the uploaded file from the firebase storage
                        .then( async ( downloadURL ) =>
                        {
                            await db.insert( CarImages ).values( {  // insert the image url in the postgres database 
                                imageURL: downloadURL,
                                CarListingID: triggerUploadImages  // triggerUploadImages is the id of the listing   
                            } )
                        } )
                } )
        } )
        setLoader( false )
    }
    //////////////////////////////////////////////////////////////////////////////////////

    return (
        <div>
            <h2 className="my-3 text-xl font-medium">Upload Car Images</h2>
            <div className="grid grid-cols-2 gap-5 md:grid-cols-4 lg:grid-cols-6">

                { mode == 'edit' &&
                    editCarImagesList?.map( ( image, index ) => (
                        <div key={ index }>
                            <IoMdCloseCircle className="absolute m-2 text-lg text-white cursor-pointer" onClick={ () => onImageRemoveFromDB( image, index ) } />
                            <img src={ image } className="w-full h-[130px] rounded-xl object-cover" alt="car_image" />
                        </div>

                    ) ) }


                { selectedFilesList.map( ( file, index ) => (
                    <div key={ index }>
                        <IoMdCloseCircle className="absolute m-2 text-lg text-white cursor-pointer" onClick={ () => onImageRemove( file, index ) } />
                        <img src={ URL.createObjectURL( file ) } className="w-full h-[130px] rounded-xl object-cover" alt="car_image" />
                    </div>

                ) ) }



                <label htmlFor="upload-images" >
                    <div className="p-10 bg-blue-100 border border-dotted rounded-xl hover:shadow-md border-primary">
                        <h2 className="text-3xl text-center cursor-pointer text-primary ">+</h2>
                    </div>
                </label>

                <input type="file" onChange={ onFileSelected } multiple={ true } id='upload-images' className="opacity-0" />
            </div>

        </div>
    )
}

export default UploadImages
