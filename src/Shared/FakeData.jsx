import { faker } from 'https://esm.sh/@faker-js/faker';

function CreateRandomCarList ()
{
    return {
        name: faker.vehicle.vehicle(),
        fuelType: faker.vehicle.fuel(),
        model: faker.vehicle.model(),
        type: faker.vehicle.type(),
        images: "https://www.ronbrooks.co.uk/wp-content/uploads/2023/06/toyota-supra-mk4.png",
        miles: 1000,
        gearType: "Automatic",
        price: faker.finance.amount( { min: 100000, max: 1000000 } ),
    }
}

const carList = faker.helpers.multiple( CreateRandomCarList, { count: 7 } )

export default { carList }