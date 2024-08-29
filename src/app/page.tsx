"use client"
import React, { useState, ChangeEvent, FormEvent } from "react"
import { useMutation } from "@blitzjs/rpc"
import signup from "../app/(auth)/mutations/signup"
import login from "../app/(auth)/mutations/login"
import logout from "../app/(auth)/mutations/logout"
import { HomeIcon, FileTextIcon, GearIcon, ExitIcon } from "@radix-ui/react-icons"
import { ToastContainer, toast } from "react-toastify"
import "react-toastify/dist/ReactToastify.css"

type ActivePage = "home" | "project" | "settings"

const App: React.FC = () => {
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false)
  const [isRegistering, setIsRegistering] = useState<boolean>(false)
  const [activePage, setActivePage] = useState<ActivePage>("home")
  const [loginMutation] = useMutation(login)
  const [signupMutation] = useMutation(signup)
  const [logoutMutation] = useMutation(logout)

  const handleLogin = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    const email = (event.currentTarget.elements.namedItem("email") as HTMLInputElement).value
    const password = (event.currentTarget.elements.namedItem("password") as HTMLInputElement).value

    try {
      await loginMutation({ email, password })
      setIsAuthenticated(true)
      toast.success("Login successful!")
    } catch (error: any) {
      toast.error("Login failed: " + error.message)
    }
  }

  const handleSignup = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    const email = (event.currentTarget.elements.namedItem("email") as HTMLInputElement).value
    const password = (event.currentTarget.elements.namedItem("password") as HTMLInputElement).value

    try {
      await signupMutation({ email, password })
      setIsAuthenticated(true)
      toast.success("Account created successfully!")
    } catch (error: any) {
      if (error.message.includes("Unique constraint failed on the fields: (`email`)")) {
        toast.error("This email is already registered. Please use a different email or log in.")
      } else {
        toast.error("Signup failed: " + error.message)
      }
    }
  }

  const handleLogout = async () => {
    try {
      await logoutMutation()
      setIsAuthenticated(false)
      toast.success("Logged out successfully!")
    } catch (error: any) {
      toast.error("Logout failed: " + error.message)
    }
  }

  const renderContent = () => {
    switch (activePage) {
      case "home":
        return (
          <div>
            <h1>Home</h1>
            <p>Welcome to the Home Page!</p>
          </div>
        )
      case "project":
        return (
          <div>
            <h1>Project</h1>
            <p>This is the Project Page.</p>
          </div>
        )
      case "settings":
        return (
          <div>
            <h1>Settings</h1>
            <p>This is the Settings Page.</p>
          </div>
        )
      default:
        return (
          <div>
            <h1>Home</h1>
            <p>Welcome to the Home Page!</p>
          </div>
        )
    }
  }

  if (!isAuthenticated) {
    return (
      <div className="flex h-screen items-center justify-center bg-gray-100">
        <ToastContainer />
        <div className="w-full max-w-md bg-white p-8 rounded-lg shadow">
          <h2 className="text-2xl font-bold text-gray-900">
            {isRegistering ? "Create an Account" : "Login"}
          </h2>
          <p className="mt-2 text-sm text-gray-600">
            {isRegistering
              ? "Fill in your details to create an account."
              : "Enter your email and password to access your account."}
          </p>
          <form className="mt-8 space-y-6" onSubmit={isRegistering ? handleSignup : handleLogin}>
            <div>
              <label htmlFor="email" className="sr-only">
                Email
              </label>
              <input
                id="email"
                name="email"
                type="email"
                required
                className="appearance-none rounded relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                placeholder="m@example.com"
              />
            </div>
            <div>
              <label htmlFor="password" className="sr-only">
                Password
              </label>
              <input
                id="password"
                name="password"
                type="password"
                required
                className="appearance-none rounded relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                placeholder="********"
              />
            </div>
            <div>
              <button
                type="submit"
                className="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-black hover:bg-gray-800 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-500"
              >
                {isRegistering ? "Create Account" : "Sign in"}
              </button>
            </div>
          </form>
          <div className="mt-6 text-sm text-center">
            <button
              onClick={() => setIsRegistering(!isRegistering)}
              className="text-indigo-600 hover:text-indigo-500"
            >
              {isRegistering
                ? "Already have an account? Sign in"
                : "Don't have an account? Create one"}
            </button>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="flex h-screen">
      <ToastContainer />
      {/* Sidebar */}
      <div className="w-64 bg-white border-r">
        <div className="p-6">
          <h1 className="text-lg font-bold flex items-center space-x-2">
            <span>🗻</span>
            <span>Acme Inc</span>
          </h1>
        </div>
        <nav className="mt-8">
          <button
            onClick={() => setActivePage("home")}
            className="flex items-center px-6 py-3 text-gray-700 hover:bg-gray-100 w-full text-left"
          >
            <HomeIcon className="w-6 h-6 mr-3" />
            <span>Home</span>
          </button>
          <button
            onClick={() => setActivePage("project")}
            className="flex items-center px-6 py-3 text-gray-700 hover:bg-gray-100 w-full text-left"
          >
            <FileTextIcon className="w-6 h-6 mr-3" />
            <span>Projects</span>
          </button>
          <button
            onClick={() => setActivePage("settings")}
            className="flex items-center px-6 py-3 text-gray-700 hover:bg-gray-100 w-full text-left"
          >
            <GearIcon className="w-6 h-6 mr-3" />
            <span>Settings</span>
          </button>
          <button
            onClick={handleLogout}
            className="flex items-center w-full px-6 py-3 text-gray-700 hover:bg-gray-100 text-left"
          >
            <ExitIcon className="w-6 h-6 mr-3" />
            <span>Logout</span>
          </button>
        </nav>
      </div>

      {/* Main Content */}
      <div className="flex-1 flex items-center justify-center bg-gray-100">{renderContent()}</div>
    </div>
  )
}

export default App
