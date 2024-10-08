import Header from '../Header'
import InputFeild from './components/InputFeild'
import CarDetails from '../../Shared/CarDetails.json'
import features from '../../Shared/features.json'
import DropDownFeild from './components/DropDownFeild'
import TextAreaFeild from './components/TextAreaFeild'
import { Separator } from '../ui/separator'
import { Button } from '../ui/button'
import { useEffect, useState } from 'react'
import { db } from '../../../config/index.js'
import { CarImages, CarListing } from '../../../config/schema'
import IconField from './components/IconFeild'
import UploadImages from './components/UploadImages'
import { AiOutlineLoading3Quarters } from "react-icons/ai";
import { toast } from 'sonner'
import { useNavigate, useSearchParams } from 'react-router-dom'
import { SignInButton, UserButton, useUser } from '@clerk/clerk-react'
import moment from 'moment'
import { eq } from 'drizzle-orm'
import { FormatResult } from '@/Shared/Service'
import Footer from '../Footer'


function Addlisting ()
{
    const [ formData, setFormData ] = useState( [] )
    const [ featuresData, serFeaturesData ] = useState( [] )
    const [ triggerUploadImages, setTriggerUploadImages ] = useState()
    const [ loader, setLoader ] = useState( false )

    const navigate = useNavigate()
    const { user } = useUser()

    const [ searchParams ] = useSearchParams()
    const mode = searchParams.get( 'mode' )
    const recordId = searchParams.get( 'id' )
    const [ carInfo, setCarInfo ] = useState( [] )


    useEffect( () =>
    {
        if ( mode == 'edit' )
        {
            getListingDetails()
        }
    }, [] )

    const getListingDetails = async () =>
    {
        const result = await db.select().from( CarListing )
            .innerJoin( CarImages, eq( CarListing.id, CarImages.CarListingID ) )
            .where( eq( CarListing.id, recordId ) )

        const resp = FormatResult( result )
        setCarInfo( resp[ 0 ] )
        setFormData( resp[ 0 ] )
        serFeaturesData( resp[ 0 ].features )
    }


    /////////////////////// used to handle the form data ///////////////////////
    const handleInputChange = ( name, value ) =>
    {
        setFormData( ( prev ) => ( { ...prev, [ name ]: value } ) )
    }
    //////////////////////////////////////////////////


    //////////////////// used to save the features data ///////////////////////
    const handleFeatureChange = ( name, value ) =>
    {

        // if the value is true then add the feature to the featuresData object
        if ( value == true )
        {
            serFeaturesData( ( prev ) => ( { ...prev, [ name ]: value } ) )
        }
        else
        {
            const { [ name ]: removed, ...rest } = featuresData
            serFeaturesData( rest )
        }
    }
    //////////////////////////////////////////////////


    ///////////////////////////// used to save the form data in the database /////////////////////////
    const onsubmit = async ( e ) =>
    {
        setLoader( true )
        e.preventDefault();
        toast( "Please Wait...." )

        if ( mode == "edit" )
        {
            const result = await db.update( CarListing ).set( {
                ...formData,
                features: featuresData,
                createdBy: user?.primaryEmailAddress?.emailAddress,
                userName: user?.fullName,
                userImageUrl: user?.imageUrl,
                postedOn: moment().format( 'DD/MM/YYYY' )
            } ).where( eq( CarListing.id, recordId ) )
                .returning( { id: CarListing.id } );
            setLoader( false )
            toast( "Data saved!" )

            navigate( '/profile' )
        }
        else
        {
            try
            {
                // save the formData in the database
                const result = await db.insert( CarListing ).values( {
                    ...formData,
                    features: featuresData,
                    createdBy: user?.primaryEmailAddress?.emailAddress,
                    postedOn: moment().format( 'DD/MM/YYYY' )
                } ).returning( { id: CarListing.id } );


                // if the data is saved successfully then set the triggerUploadImages to the id of the saved data and id sent to the UploadImages component
                if ( result )
                {
                    setTriggerUploadImages( result[ 0 ]?.id )
                    toast( "Data saved!" )
                    setLoader( false )
                }

            } catch ( error )
            {
                setLoader( false )
                toast( "Something went wrong. Please try again later!" );
            }

        }
    }
    //////////////////////////////////////////////////

    return (
        <div className="flex flex-col min-h-screen">
            <Header />

            <div className='px-10 my-10 md:px-20'>



                <h2 className='mb-4 text-4xl font-bold' >Add New Listing</h2>

                <form className='p-10 border rounded-xl'>
                    {/* Car Details */ }
                    <div>
                        <h2 className='mb-6 text-xl font-medium'> Car Details</h2>
                        <div className='grid grid-cols-1 gap-5 md:grid-cols-2'>
                            { CarDetails.carDetails.map( ( item, index ) => (
                                <div key={ index }>
                                    <label className='flex items-center gap-2 mb-2'><IconField icon={ item.icon } /> { item?.label } { item.required && <span className='text-red-500'> *</span> } </label>
                                    { item.fieldType == 'text' || item.fieldType == 'number' ?
                                        <InputFeild item={ item } handleInputChange={ handleInputChange } carInfo={ carInfo } />
                                        : item.fieldType == 'dropdown' ? <DropDownFeild item={ item } handleInputChange={ handleInputChange } carInfo={ carInfo } />
                                            : item.fieldType == 'textarea' ? <TextAreaFeild item={ item } handleInputChange={ handleInputChange } carInfo={ carInfo } />
                                                : null }
                                </div>
                            ) ) }
                        </div>

                    </div>

                    {/* ***************************************************************************************************************** */ }
                    <Separator className='my-6' />
                    {/* Features list */ }

                    <div>
                        <h2 className='my-6 text-xl font-medium'>Features</h2>

                        <div className='grid grid-cols-2 gap-2 md:grid-cols-3'>
                            { features.features.map( ( item, index ) => (
                                <div key={ index } className='flex items-center gap-2'>
                                    <input onChange={ ( e ) => handleFeatureChange( item?.name, e.target.checked ) } type='checkbox' checked={ featuresData?.[ item.name ] } className='text-white bg-white size-5' /> <h2>{ item.label }</h2>
                                </div>
                            ) ) }
                        </div>

                    </div>

                    {/* ***************************************************************************************************************** */ }
                    <Separator className='my-6' />
                    {/* Car image  */ }
                    <UploadImages
                        user={ user }
                        triggerUploadImages={ triggerUploadImages }
                        carInfo={ carInfo }
                        mode={ mode }
                        setLoader={ ( v ) => { setLoader( v ); navigate( '/profile' ) } } />

                    <div className='flex justify-end mt-10'>

                        { user ?
                            <Button
                                disabled={ loader || !formData }
                                type='Submit'
                                onClick={ ( e ) => onsubmit( e ) }
                            >
                                { !loader ? "Submit" : <AiOutlineLoading3Quarters className='text-2xl animate-spin' /> }</Button>

                            :

                            <SignInButton mode='modal' forceRedirectUrl='/add-listing'>
                                <Button>Submit</Button>
                            </SignInButton>
                        }
                    </div>


                </form>




            </div>
            <Footer />
        </div>
    )
}

export default Addlisting
