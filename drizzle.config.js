/** @type { import("drizzle-kit").Config } */
export default {
    schema: "./config/schema.js",
    dialect: 'postgresql',
    dbCredentials: {
        url: import.meta.env.VITE_POSTGRESQL_URL,
    }
};