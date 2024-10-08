import Header from '@/components/Header'
import MyListing from './component/MyListing'
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import Inbox from './component/Inbox'
import { UserProfile, useUser } from '@clerk/clerk-react'
import Footer from '@/components/Footer'
import { Button } from '@/components/ui/button'

function Profile ()
{

    const { user } = useUser()
    return (
        <>
            <div className="flex flex-col min-h-screen">
                <Header />
                <div className='flex-grow px-10 my-10 md:px-20'>
                    { user ?
                        <Tabs defaultValue="my-listing" variant='outline' className="w-full">
                            <TabsList className='flex justify-start w-full gap-3 bg-white'>
                                <TabsTrigger className='text-lg text-white rounded-md bg-primary border-primary' value="my-listing">My Listing</TabsTrigger>
                                <TabsTrigger className='text-lg text-white rounded-md bg-primary border-primary' value="inbox">Inbox</TabsTrigger>
                                <TabsTrigger className='text-lg text-white rounded-md bg-primary border-primary' value="profile">Profile</TabsTrigger>
                            </TabsList>

                            <TabsContent value="my-listing">
                                <MyListing />
                            </TabsContent>
                            <TabsContent value="inbox">
                                <Inbox />
                            </TabsContent>
                            <TabsContent value="profile">
                                <div className='flex justify-center mt-5'>
                                    <UserProfile />
                                </div>
                            </TabsContent>

                        </Tabs>
                        :
                        <div className='flex flex-col items-center justify-center text-center h-96'>
                            <h1 className='mb-4 text-2xl font-bold'>Please Login / Sign-up to view your profile</h1>
                            <Button className='text-xl w-fit'>Login / Sign-up</Button>
                        </div>
                    }
                </div>
                <Footer />
            </div>
        </>
    )
}

export default Profile;
