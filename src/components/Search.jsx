import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Separator } from "./ui/separator"
import { CiSearch } from "react-icons/ci";
import Data from "@/Shared/Data";
import { useState } from "react";
import { Link } from "react-router-dom";


function Search ()
{

    const [ cars, setCars ] = useState()
    const [ make, setMake ] = useState()
    const [ price, setPrice ] = useState()

    return (
        <div className="flex flex-col items-center gap-10 p-2 px-5 bg-white rounded-md md:p-5 md:rounded-full md:flex-row w-[90%] md:w-[60%]">
            <Select onValueChange={ ( value ) => setCars( value ) }>
                <SelectTrigger className="w-full text-lg shadow-none outline-none md:border-none">
                    <SelectValue placeholder="Condition" />
                </SelectTrigger>
                <SelectContent>
                    <SelectItem value="New">New</SelectItem>
                    <SelectItem value="Used">Used</SelectItem>
                    <SelectItem value="Certified Pre-Owned">Certified Pre-Owned</SelectItem>
                </SelectContent>
            </Select>

            {/* Vertical Separator for medium screens and above */ }
            <Separator orientation="vertical" className='hidden mx-2 md:block' />

            <Select onValueChange={ ( value ) => setMake( value ) }>
                <SelectTrigger className="w-full text-lg shadow-none outline-none md:border-none">
                    <SelectValue placeholder="Company" />
                </SelectTrigger>
                <SelectContent>
                    { Data?.CarMakes?.map( ( company ) => (
                        <SelectItem key={ company.id } value={ company.name }>{ company.name }</SelectItem>
                    ) ) }
                </SelectContent>
            </Select>

            {/* Vertical Separator for medium screens and above */ }
            <Separator orientation="vertical" className='hidden mx-2 md:block' />

            <Select onValueChange={ ( value ) => setPrice( value ) }>
                <SelectTrigger className="w-full text-lg shadow-none outline-none md:border-none">
                    <SelectValue placeholder="Cost" />
                </SelectTrigger>
                <SelectContent>
                    { Data.Pricing.map( ( amount ) => (
                        <SelectItem key={ amount.id } value={ amount.amount }>{ amount.amount }</SelectItem>
                    ) ) }
                </SelectContent>
            </Select>

            {/* // Link to search page with query params set params as /search?cars=New&make=BMW&price=Low-to-High  */ }
            <Link to={ !cars || !make || !price ? "/#" : `/search?cars=${ cars }&make=${ make }&price=${ price }` }>
                <CiSearch
                    className={ `p-3 text-[50px] transition-all cursor-pointer font-bold text-white rounded-full 
                ${ !cars || !make || !price ? "bg-gray-400 cursor-not-allowed" : "bg-primary hover:scale-105" }` }
                    disabled={ !cars || !make || !price }
                />
            </Link>
        </div>

    )
}

export default Search
