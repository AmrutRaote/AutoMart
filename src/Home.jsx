
import Header from "./components/Header"
import Hero from "./components/Hero"
import Category from "./components/Category"
import MostSearchCar from "./components/MostSearchCar"
import Infosection from "./components/Infosection"
import Footer from "./components/Footer"

function Home ()
{
    return (
        <div>
            {/* Header */ }
            <Header />

            {/* Hero */ }
            <Hero />

            {/* Categories */ }
            <Category />

            {/* Most Search Car */ }
            <MostSearchCar />

            {/* Infosection */ }
            <Infosection />

            {/* Footer */ }
            <Footer />
        </div >
    )
}

export default Home
