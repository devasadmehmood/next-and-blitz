# Admin Portal

This is a simple admin portal built using Blitz.js, React, and TypeScript. It includes user authentication (login, signup, logout), a sidebar navigation menu, and basic routing to different pages (Home, Projects, Settings). Toast notifications are used to display success and error messages.

## Features

- **User Authentication**: Allows users to sign up, log in, and log out.
- **Routing**: Basic navigation through Home, Projects, and Settings pages.
- **Toast Notifications**: Feedback for user actions like login, signup, and logout.
- **TypeScript**: The project is fully typed with TypeScript for type safety and better developer experience.

## Installation

### Prerequisites

- Node.js (version 14.x or higher)
- npm or yarn
- Blitz.js installed globally (optional but recommended)

### Steps

1. **Clone the Repository**

   ```bash
   git clone https://github.com/asadmehmood091/next-and-blitz
   cd next-and-blitz
   ```

2. **Install Dependencies**

   ```bash
   npm install
   ```

   or if you're using yarn:

   ```bash
   yarn install
   ```

3. **Set Up the Database**

   Configure your database connection in `db/schema.prisma` and then run:

   ```bash
   blitz prisma migrate dev
   ```

   This will set up your database schema.

4. **Start the Development Server**

   ```bash
   blitz dev
   ```

   This will start the development server, and you can view the app at `http://localhost:3000`.

## Usage

### Authentication

- **Sign Up**: Create a new account by filling in your email and password.
- **Login**: Log in with an existing account.
- **Logout**: Log out by clicking the "Logout" button in the sidebar.

### Navigation

- Use the sidebar to navigate between the Home, Projects, and Settings pages.
- The main content area will update based on the selected page.

### Error Handling

- If an email is already registered during signup, a toast notification will inform you to use a different email or log in.

## File Structure

```
├── app/
│   ├── (auth)/
│   │   ├── mutations/
│   │   │   ├── login.ts
│   │   │   ├── logout.ts
│   │   │   └── signup.ts
│   ├── pages/
│   │   ├── _app.tsx
│   │   ├── index.tsx
├── components/
│   ├── App.tsx
├── public/
│   ├── favicon.ico
├── styles/
│   ├── globals.css
├── README.md
├── blitz.config.ts
├── package.json
├── tsconfig.json
└── ...
```

## Technologies Used

- **Blitz.js**: A fullstack framework built on Next.js, providing a great developer experience.
- **React**: A JavaScript library for building user interfaces.
- **TypeScript**: Typed JavaScript to provide better tooling and error-checking.
- **Tailwind CSS**: Utility-first CSS framework for styling.
- **React Toastify**: For displaying toast notifications.
- **Radix UI**: Icons used for the sidebar.
