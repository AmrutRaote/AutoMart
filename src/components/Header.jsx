import { SignInButton, UserButton, useUser } from '@clerk/clerk-react'
import { Button } from './ui/button'
import { Link } from 'react-router-dom'

function Header ()
{

    // clerk provides a user object that contains user information after the user has signed in
    const { isSignedIn } = useUser()



    return (
        <div className='flex items-center justify-between p-5 shadow-sm'>
            <Link to='/'>
                <img src="/AutoMart.png" className='sm:h-[40px] h-[30px]' alt="Logo" />
            </Link>

            {/* Navigation links for medium screens and above */ }
            <ul className='hidden sm:gap-8 md:gap-16 md:flex'>
                <Link to='/'>
                    <li className='font-medium transition-all cursor-pointer hover:scale-105 hover:text-primary'>Home</li>
                </Link>
                <Link to='/search?condition=New'>
                    <li className='font-medium transition-all cursor-pointer hover:scale-105 hover:text-primary'>New</li>
                </Link>
                <Link to='/search?condition=Used'>
                    <li className='font-medium transition-all cursor-pointer hover:scale-105 hover:text-primary'>Used</li>
                </Link>
                <Link to='/search?condition=Certified-Pre-Owned'>
                    <li className='font-medium transition-all cursor-pointer hover:scale-105 hover:text-primary'>Preowned</li>
                </Link>
            </ul>

            {/* User Actions */ }
            { isSignedIn ? (
                <div className='flex items-center gap-1 md:gap-5'>
                    <Link to='/profile'>
                        <Button className='p-3 text-xs sm:text-base'>My Profile</Button>
                    </Link>
                    <Link to='/add-listing'>
                        <Button className='p-3 text-xs sm:text-base'>Submit Listing</Button>
                    </Link>
                    <UserButton />
                </div>
            ) : (
                <div className='flex items-center gap-2 md:gap-5'>
                    <SignInButton mode='modal' forceRedirectUrl='/'>
                        <Button className='p-3 text-xs sm:text-base'>Sign In</Button>
                    </SignInButton>
                    <Link to='/add-listing'>
                        <Button className='p-3 text-xs sm:text-base' >Submit Listing</Button>
                    </Link>
                </div>
            ) }
        </div>

    )
}

export default Header
