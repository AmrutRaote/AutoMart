import React from 'react'

function Infosection ()
{
    return (
        <section>
            <div className="px-4 py-16 mx-auto max-w-screen-2xl sm:px-6 lg:px-8">
                <div className="grid grid-cols-1 lg:h-screen lg:grid-cols-2">
                    <div className="relative z-10 lg:py-16">
                        <div className="relative h-64 sm:h-80 lg:h-full">
                            <img
                                alt="car"
                                src="https://imgd.aeplcdn.com/664x374/n/cw/ec/176129/m4-competition-exterior-left-front-three-quarter.jpeg?isig=0&q=80/"
                                className="absolute inset-0 object-cover w-full h-full"
                            />
                        </div>
                    </div>

                    <div className="relative flex items-center bg-gray-100">
                        <span
                            className="hidden lg:absolute lg:inset-y-0 lg:-start-16 lg:block lg:w-16 lg:bg-gray-100"
                        ></span>

                        <div className="p-8 sm:p-16 lg:p-24">
                            <h2 className="text-2xl font-bold sm:text-3xl">
                                Find Your Dream Car                            </h2>

                            <p className="mt-4 text-gray-600">
                                Unlock a world of possibilities and drive home the car you've always wanted. From luxury rides to budget-friendly options, explore a vast selection of cars tailored to your style and preferences. Whether it's performance, comfort, or efficiency, we have the perfect match waiting for you. Start your journey to finding the ultimate ride today!
                            </p>


                        </div>
                    </div>
                </div>
            </div>
        </section>
    )
}

export default Infosection
