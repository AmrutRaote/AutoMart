import
{
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select"


function DropDownFeild ( { item, handleInputChange, carInfo } )
{
    return (
        <div>
            <Select onValueChange={ ( value ) => handleInputChange( item.name, value ) } defaultValue={ carInfo?.[ item?.name ] } required={ item.required }>
                <SelectTrigger className="w-full">
                    <SelectValue placeholder={ carInfo?.[ item?.name ] ? carInfo?.[ item?.name ] : item.label } />
                </SelectTrigger>
                <SelectContent>
                    { item?.options.map( ( type, index ) => (
                        <SelectItem key={ index } value={ type }>{ type }</SelectItem> ) ) }
                </SelectContent>
            </Select>

        </div>
    )
}

export default DropDownFeild
