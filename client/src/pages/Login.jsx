"use client"

import { Button } from "@/components/ui/button.jsx"
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle
} from "@/components/ui/card.jsx"
import { Input } from "@/components/ui/input.jsx"
import { Label } from "@/components/ui/label.jsx"
import { Eye, EyeOff } from "lucide-react"
import { useState } from "react"
import "../App.css"
import axios from "axios"
import { Link, useNavigate } from "react-router-dom"

export default function Login() {
  const [showPassword, setShowPassword] = useState(false)
  const navigate = useNavigate()

  const handleSubmit = async (e) => {
    e.preventDefault()
    const formData = new FormData(e.target)
    const email = formData.get("email")
    const password = formData.get("password")
    if (!email || !password) {
      alert("Enter full credentials")
    } else {
      try {
        const res = await axios.post("http://localhost:3000/api/auth/login", {
          email,
          password,
        }, { withCredentials: true })

        const { accessToken, user } = res.data

        localStorage.setItem("accessToken", accessToken)
        localStorage.setItem("user", JSON.stringify(user))

        navigate("/")
      } catch (error) {
        const message = error.response?.data?.message || error.message || "Something went wrong"
        alert("Login failed: " + message)
      }
    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-900 px-4 text-gray-200">
      <Card className="w-full max-w-md bg-gray-800 border border-gray-700">
        <CardHeader className="space-y-1">
          <CardTitle className="text-2xl font-bold text-center text-white">Welcome back</CardTitle>
          <CardDescription className="text-center text-gray-400">
            Enter your credentials to access your account
          </CardDescription>
        </CardHeader>
        <form onSubmit={handleSubmit}>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="email" className="text-gray-300">Email</Label>
              <Input
                id="email"
                name="email"
                type="email"
                placeholder="Enter your email"
                required
                className="w-full bg-gray-700 text-white placeholder-gray-400 border-gray-600 focus:ring-purple-500"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="password" className="text-gray-300">Password</Label>
              <div className="relative">
                <Input
                  id="password"
                  name="password"
                  type={showPassword ? "text" : "password"}
                  placeholder="Enter your password"
                  required
                  className="w-full pr-10 bg-gray-700 text-white placeholder-gray-400 border-gray-600 focus:ring-purple-500"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-200"
                >
                  {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                </button>
              </div>
            </div>
          </CardContent>
          <CardFooter className="flex flex-col space-y-4">
            <Button type="submit" className="w-full bg-purple-600 mt-5 hover:bg-purple-700 text-white">
              Sign In
            </Button>
            <div className="text-center text-sm text-gray-400">
              {"Don't have an account? "}
              <Link className="text-purple-400 hover:underline hover:text-purple-300" to="/register">
                Sign up
              </Link>
            </div>
          </CardFooter>
        </form>
      </Card>
    </div>
  )
}
