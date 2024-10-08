import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import Home from './Home'
import { ClerkProvider } from '@clerk/clerk-react'
import Profile from './Profile'
import Addlisting from './components/Addlisting/Addlisting'
import { Toaster } from "@/components/ui/sonner"
import SearchByCategory from './Search/[catrgory]/Category'
import SearchByOptions from './Search/SearchByOptions'
import ListingDetail from './Listing-details/[id]'



const PUBLISHABLE_KEY = import.meta.env.VITE_CLERK_PUBLISHABLE_KEY

if ( !PUBLISHABLE_KEY )
{
  throw new Error( "Missing Publishable Key" )
}

const router = createBrowserRouter( [
  {
    path: '/',
    element: <Home />
  },
  {
    path: '/profile',
    element: <Profile />
  },
  {
    path: '/add-listing',
    element: <Addlisting />
  },
  {
    path: '/search',
    element: <SearchByOptions />
  },
  {
    path: '/search/:category',
    element: <SearchByCategory />
  },
  {
    path: '/listing-details/:id',
    element: <ListingDetail />
  }

] )

createRoot( document.getElementById( 'root' ) ).render(
  <StrictMode>
    <ClerkProvider publishableKey={ PUBLISHABLE_KEY } afterSignOutUrl="/">
      {/* <Header /> */ }
      <RouterProvider router={ router } />
      <Toaster />
    </ClerkProvider>
  </StrictMode>
)
