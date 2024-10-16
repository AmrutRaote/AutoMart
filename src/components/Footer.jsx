import React from 'react'
import { Link } from 'react-router-dom'

function Footer ()
{
    return (
        <footer className="bg-gray-100">
            <div className="max-w-5xl px-4 py-5 mx-auto sm:px-6 lg:px-8">
                <div className="flex justify-center text-teal-600">
                    <Link to={ '/' }>
                        <img src="/AutoMart.svg" className='h-20 transition-all cursor-pointer hover:scale-110' alt="" />
                    </Link>
                </div>



                <ul className="flex flex-wrap justify-center gap-6 mt-5 md:gap-8 lg:gap-12">

                    <Link to={ '/' }>
                        <li className='text-xl text-gray-700 transition hover:text-gray-700/75'>Home</li>
                    </Link>
                    <Link to={ '/search?condition=New' }>
                        <li className='text-xl text-gray-700 transition hover:text-gray-700/75'>New</li>
                    </Link>
                    <Link to={ '/search?condition=Used' }>
                        <li className='text-xl text-gray-700 transition hover:text-gray-700/75'>Used</li>
                    </Link>
                    <Link to={ '/search?condition=Certified-Pre-Owned' }>
                        <li className='text-xl text-gray-700 transition hover:text-gray-700/75'>Preowned</li>
                    </Link>

                </ul>

                <ul className="flex justify-center gap-6 mt-12 md:gap-8">
                    <li>
                        <a href="https://www.linkedin.com/in/amrutraote/" target="_blank">
                            <img src="/linkedin.svg" className='transition-all size-7 lg:size-9 hover:scale-110 ' alt="linkedin" />
                        </a>
                    </li>

                    <li>
                        <a href="https://github.com/errors4o4" target="_blank">
                            <img src="/github-mark.svg" className='transition-all size-7 lg:size-8 hover:scale-110 ' alt="github" />
                        </a>
                    </li>

                </ul>
            </div>
        </footer>
    )
}

export default Footer
