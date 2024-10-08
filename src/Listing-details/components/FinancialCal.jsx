import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { useState } from 'react'

function FinancialCal ( { carDetails } )
{

    const [ carPrice, setCarPrice ] = useState( 0 )
    const [ interestRate, setInterestRate ] = useState( 0 )
    const [ loanTerm, setLoanTerm ] = useState( 0 )
    const [ downPayment, setDownPayment ] = useState( 0 )
    const [ monthlyPayment, setMonthlyPayment ] = useState( 0 )

    ////////////////////////////////////////// Calculate Monthly Payment //////////////////////////////////////////
    const CalculateMonthyPayment = () =>
    {
        const Principal = carPrice - downPayment
        const MonthlyInterestRate = interestRate / 1200
        const MonthlyPayment = ( Principal * MonthlyInterestRate * Math.pow( 1 + MonthlyInterestRate, loanTerm ) / ( Math.pow( 1 + MonthlyInterestRate, loanTerm ) - 1 ) ).toFixed( 2 )
        setMonthlyPayment( MonthlyPayment )
    }
    ////////////////////////////////////////////////////////////////////////////////////

    return (
        <div className='p-10 border shadow-md rounded-xl mt-7'>
            <h2 className='text-2xl font-medium'>Financial Calculator</h2>

            <div className='flex gap-5 mt-5 '>

                <div className='w-full'>
                    <label >Price ₹ </label>
                    <Input type="number" onChange={ ( e ) => setCarPrice( e.target.value ) } />
                </div>

                <div className='w-full'>
                    <label >Interest Rate </label>
                    <Input type="number" onChange={ ( e ) => setInterestRate( e.target.value ) } />
                </div>

            </div>
            <div className='flex gap-5 mt-5 '>


                <div className='w-full'>
                    <label >Loan Term (Months)</label>
                    <Input type="number" onChange={ ( e ) => setLoanTerm( e.target.value ) } />
                </div>

                <div className='w-full'>
                    <label >Down Payment</label>
                    <Input type="number" onChange={ ( e ) => setDownPayment( e.target.value ) } />
                </div>

            </div>
            { monthlyPayment > 0 && <h2 className='mt-3 text-xl font-medium'>Your Monthly Payment Is: <span className='text-2xl font-semibold'>₹{ monthlyPayment }</span></h2> }
            <Button disabled={ !carPrice || !interestRate || !loanTerm || !downPayment } className='w-full mt-3' size="lg" onClick={ () => CalculateMonthyPayment() } >Calculate</Button>
        </div>
    )
}

export default FinancialCal
