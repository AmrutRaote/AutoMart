# Demo: https://auto-mart-seven.vercel.app/
# AutoMart 🚗 

**AutoMart** is a React-based web application built with Vite, providing a modern platform for users to browse, buy, and sell cars. It features a sleek user interface styled with Tailwind CSS, allowing users to view detailed car listings and manage their inventory with ease.

## Features ✨

- 🔍 **Browse Cars**: Search and explore a wide range of car listings.
- 🛒 **Buy and Sell**: Post car listings and connect with buyers.
- 📄 **Detailed Car Profiles**: View comprehensive details about each car, including images and specifications.
- 🔐 **User Authentication**: Integrated with **Clerk** for secure user sign-up and login.
- 💬 **Messaging and Chat**: Powered by **Sendbird** for seamless communication between buyers and sellers.
- 🗄️ **Database**: Uses **PostgreSQL** and **Drizzle ORM** for efficient and scalable data management.
- 🔧 **Responsive Design**: Fully responsive for a seamless experience across devices.

## Tech Stack 🛠️

- **Frontend**: React, Tailwind CSS
- **Backend**: PostgreSQL, Drizzle ORM, Firebase
- **Authentication**: Clerk
- **Messaging**: Sendbird

## Getting Started 🚀

### Prerequisites

- Node.js (v14.x or above)
- PostgreSQL database
- npm or yarn

### Installation

1. Clone the repository:
   ```bash
   git clone https://github.com/errors4o4/AutoMart.git
   cd AutoMart
   ```

2. Install the dependencies:
   ```bash
   npm install
   ```

3. Set up PostgreSQL and create the required tables using **Drizzle ORM**.

<details>
  <summary><strong>PostgreSQL Steps</strong> 🗄️</summary>

#### 1. Install Dependencies

First, install the required packages:

```bash
npm i drizzle-orm @neondatabase/serverless
npm i -D drizzle-kit
```

#### 2. Create Neon PostgreSQL Database

Go to [Neon](https://console.neon.tech/) and create a new project. Once done, obtain your database connection URL.

Add this URL to your `.env` file as:

```bash
VITE_DRIZZLE_DATABASE_URL=your-neon-database-url
```

</details>

4. Sendbird and clerk Set up.

<details>
  <summary><strong>Sendbird Setup</strong> 💬</summary>

#### 1. Get API Credentials

Create a project on [Sendbird](https://sendbird.com/). Once your project is set up, obtain the following credentials:

- **SENDBIRD_API_TOKEN**
- **SENDBIRD_APP_ID**

#### 2. Add Environment Variables

Add the credentials to your `.env` file:

```bash
VITE_SENDBIRD_API_TOKEN=your-sendbird-api-token
VITE_SENDBIRD_APP_ID=your-sendbird-app-id
```

</details>

<details> <summary><strong>Clerk Setup</strong> 🔐</summary>
  
 #### 1. Get Clerk API Credentials
  
Go to [Clerk](https://clerk.com/) and create an account. Set up a new project and obtain the following credentials:

- **CLERK_FRONTEND_API**
- **CLERK_API_KEY**

#### 2. Add Environment Variables

Add these to your .env file:

```bash
VITE_CLERK_PUBLISHABLE_KEY=your-clerk-publishable-key
VITE_CLERK_API_KEY=your-clerk-api-key
```


</details>

5. Run the development server:
   ```bash
   npm run dev
   ```

## Contributing 🤝

Contributions are welcome! Feel free to open issues or submit pull requests to help improve the project.
