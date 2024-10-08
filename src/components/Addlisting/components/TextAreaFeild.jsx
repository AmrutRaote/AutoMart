import React from 'react'
import { Textarea } from "@/components/ui/textarea"


function TextAreaFeild ( { item, handleInputChange, carInfo } )
{
    return (
        <div>
            < Textarea name={ item?.name } defaultValue={ carInfo?.[ item?.name ] } onChange={ ( e ) => handleInputChange( item?.name, e.target.value ) } required={ item?.required } />
        </div>
    )
}

export default TextAreaFeild
