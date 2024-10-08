import { Input } from '@/components/ui/input'
import React from 'react'

function InputFeild ( { item, handleInputChange, carInfo } )
{
    return (
        <div>
            <Input
                type={ item?.fieldType }
                name={ item?.name }
                required={ item?.required }
                defaultValue={ carInfo?.[ item?.name ] }
                onChange={ ( e ) => handleInputChange( item?.name, e.target.value ) }
            />
        </div>
    )
}

export default InputFeild
