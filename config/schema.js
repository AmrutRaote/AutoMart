import { integer, json, pgTable, serial, varchar } from "drizzle-orm/pg-core";

export const CarListing = pgTable('carListing', { // create new table carListing
    id: serial('id').primaryKey(), // create new column id
    listingTitle: varchar('listingTitle').notNull(), // create new column listingTitle
    tagline: varchar('tagline'),
    originalPrice: varchar('originalPrice'),
    sellingPrice: integer('sellingPrice').notNull(),
    category: varchar('category').notNull(),
    condition: varchar('condition').notNull(),
    make: varchar('make').notNull(),
    model: varchar('model').notNull(),
    year: varchar('year').notNull(),
    driveType: varchar('driveType').notNull(),
    transmission: varchar('transmission').notNull(),
    fuelType: varchar('fuelType').notNull(),
    mileage: varchar('mileage').notNull(),
    engineSize: varchar('engineSize'),
    cylinder: varchar('cylinder'),
    color: varchar('color').notNull(),
    door: varchar('door').notNull(),
    vin: varchar('vin'),
    offerType: varchar('offerType'),
    listingDescription: varchar('listingDescription').notNull(),
    features: json('features'),
    createdBy: varchar('createdBy').notNull(),
    userName: varchar('userName').notNull().default('Hello World'),
    userImageUrl: varchar('userImageUrl').default('https://via.placeholder.com/150'),
    postedOn: varchar('postedOn'),
})

export const CarImages = pgTable('carImages', {
    id: serial('id').primaryKey(), // create new column id
    imageURL: varchar('imageURL').notNull(), // create new column imageURL
    CarListingID: integer('carListingID').notNull().references(() => CarListing.id) // create new column CarListingID

})