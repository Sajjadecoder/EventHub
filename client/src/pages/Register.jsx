"use client"

import { Button } from "@/components/ui/button.jsx"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card.jsx"
import { Input } from "@/components/ui/input.jsx"
import { Label } from "@/components/ui/label.jsx"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select.jsx"
import { Eye, EyeOff, User, Shield, Mail, Lock, UserPlus, Key } from "lucide-react"
import { useState } from "react"
import axios from "axios"
import ADMIN_SECRET_KEY from "@/assets/secretKey.js"
import '../App.css'
import { Link, useNavigate } from "react-router-dom"
export default function Register() {
    const navigate = useNavigate()
    const [showPassword, setShowPassword] = useState(false)
    const [showConfirmPassword, setShowConfirmPassword] = useState(false)
    const [selectedRole, setSelectedRole] = useState("")
    const [formData, setFormData] = useState({
        name: "",
        email: "",
        password: "",
        confirmPassword: "",
        role: "",
        secretKey: "",
    })
    const [errors, setErrors] = useState({})
    const handleInputChange = (e) => {
        const { name, value } = e.target
        setFormData((prev) => ({
            ...prev,
            [name]: value,
        }))

        // Clear error when user starts typing
        if (errors[name]) {
            setErrors((prev) => ({
                ...prev,
                [name]: "",
            }))
        }
    }

    const handleRoleChange = (value) => {
        setSelectedRole(value)
        setFormData((prev) => ({
            ...prev,
            role: value,
            secretKey: "", // Clear secret key when role changes
        }))
    }

    const validateForm = () => {
        const newErrors = {}

        if (!formData.name.trim()) {
            newErrors.name = "Name is required"
        }

        if (formData.name.length > 20) {
            newErrors.name = "Name should have less than 20 characters"
        }

        if (!formData.email.trim()) {
            newErrors.email = "Email is required"
        } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
            newErrors.email = "Email is invalid"
        }



        if (!formData.password) {
            newErrors.password = "Password is required"
        } else if (formData.password.length < 6) {
            newErrors.password = "Password must be at least 6 characters"
        }

        if (!formData.confirmPassword) {
            newErrors.confirmPassword = "Please confirm your password"
        } else if (formData.password !== formData.confirmPassword) {
            newErrors.confirmPassword = "Passwords do not match"
        }

        if (!formData.role) {
            newErrors.role = "Please select a role"
        }

        if (formData.role === "admin") {
            if (!formData.secretKey) {
                newErrors.secretKey = "Secret key is required for admin role"
            } else if (formData.secretKey !== ADMIN_SECRET_KEY) {
                newErrors.secretKey = "Invalid secret key"
            }
        }

        setErrors(newErrors)
        return Object.keys(newErrors).length === 0
    }

    const handleSubmit = async (e) => {
        e.preventDefault()
        if (validateForm()) {
            // Handle signup logic here
            console.log("Signup data:", {
                name: formData.name,
                email: formData.email,
                role: formData.role,
                passwordProvided: !!formData.password,
                secretKeyProvided: !!formData.secretKey,
            })
            const payload = {
                name: formData.name,
                email: formData.email,
                password: formData.password,
                role: formData.role,
            };
            try {
                const backendUrl = import.meta.env.VITE_BACKEND_URL;
                const res = await axios.post(`${backendUrl}/api/auth/register`, payload, {
                    withCredentials: true
                });

                navigate('/login');
            } catch (error) {
                alert("Registration failed: " + error.response?.data?.message || error.message);
            }
        }
    }

    return (
        <div className="min-h-screen  flex items-center justify-center bg-gradient-to-br from-purple-50 via-blue-50 to-indigo-100 px-4 py-8 relative overflow-hidden">
            {/* Background decorative elements */}
            <div className="absolute inset-0 overflow-hidden">
                <div className="absolute -top-40 -right-40 w-80 h-80 bg-gradient-to-br from-purple-400 to-pink-400 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-pulse"></div>
                <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-gradient-to-br from-blue-400 to-indigo-400 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-pulse delay-1000"></div>
                <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-60 h-60 bg-gradient-to-br from-teal-400 to-cyan-400 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-pulse delay-500"></div>
            </div>

            <Card className="max-h-full overflow-y-auto w-full max-w-md relative z-10 backdrop-blur-sm bg-white/90 shadow-2xl border-0 ring-1 ring-gray-200/50">
                <CardHeader className="space-y-1 text-center pb-0">
                    <div className="mx-auto w-16 h-16 bg-gradient-to-br from-purple-500 to-blue-600 rounded-2xl flex items-center justify-center mb-4 shadow-lg">
                        <UserPlus className="h-8 w-8 text-white" />
                    </div>
                    <CardTitle className="text-2xl mt-0 font-bold bg-gradient-to-r from-purple-600 to-blue-600 bg-clip-text text-transparent">
                        Create Account
                    </CardTitle>
                </CardHeader>

                <form onSubmit={handleSubmit}>
                    <CardContent className="space-y-2">
                        {/* Name Field */}
                        <div className="space-y-2">
                            <Label htmlFor="name" className="text-sm font-semibold text-gray-700">
                                Full Name
                            </Label>
                            <div className="relative group">
                                <User className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400 group-focus-within:text-purple-500 transition-colors" />
                                <Input
                                    id="name"
                                    name="name"
                                    type="text"
                                    placeholder="Enter your full name"
                                    value={formData.name}
                                    onChange={handleInputChange}
                                    className={`pl-10 h-12 border-2 transition-all duration-200 focus:border-purple-500 focus:ring-4 focus:ring-purple-500/20 ${errors.name
                                        ? "border-red-400 focus:border-red-500 focus:ring-red-500/20"
                                        : "border-gray-200 hover:border-gray-300"
                                        }`}
                                />
                            </div>
                            {errors.name && (
                                <p className="text-sm text-red-500 flex items-center gap-1 animate-in slide-in-from-left-1">
                                    <span className="w-1 h-1 bg-red-500 rounded-full"></span>
                                    {errors.name}
                                </p>
                            )}
                        </div>

                        {/* Email Field */}
                        <div className="space-y-2">
                            <Label htmlFor="email" className="text-sm font-semibold text-gray-700">
                                Email Address
                            </Label>
                            <div className="relative group">
                                <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400 group-focus-within:text-purple-500 transition-colors" />
                                <Input
                                    id="email"
                                    name="email"
                                    type="email"
                                    placeholder="Enter your email"
                                    value={formData.email}
                                    onChange={handleInputChange}
                                    className={`pl-10 h-12 border-2 transition-all duration-200 focus:border-purple-500 focus:ring-4 focus:ring-purple-500/20 ${errors.email
                                        ? "border-red-400 focus:border-red-500 focus:ring-red-500/20"
                                        : "border-gray-200 hover:border-gray-300"
                                        }`}
                                />
                            </div>
                            {errors.email && (
                                <p className="text-sm text-red-500 flex items-center gap-1 animate-in slide-in-from-left-1">
                                    <span className="w-1 h-1 bg-red-500 rounded-full"></span>
                                    {errors.email}
                                </p>
                            )}
                        </div>



                        {/* Role Selection */}
                        <div className="space-y-2">
                            <Label htmlFor="role" className="text-sm font-semibold text-gray-700">
                                Account Type
                            </Label>
                            <Select onValueChange={handleRoleChange} value={formData.role}>
                                <SelectTrigger
                                    className={`h-12 border-2 transition-all duration-200 focus:border-purple-500 focus:ring-4 focus:ring-purple-500/20 ${errors.role ? "border-red-400" : "border-gray-200 hover:border-gray-300"
                                        }`}
                                >
                                    <SelectValue placeholder="Choose your role" />
                                </SelectTrigger>
                                <SelectContent className="border-2 border-gray-100 shadow-xl">
                                    <SelectItem value="user" className="cursor-pointer hover:bg-purple-50 focus:bg-purple-50">
                                        <div className="flex items-center gap-3 py-1">
                                            <div className="w-8 h-8 bg-blue-100 rounded-lg flex items-center justify-center">
                                                <User className="h-4 w-4 text-blue-600" />
                                            </div>
                                            <div>
                                                <div className="font-medium">User</div>
                                                <div className="text-xs text-gray-500">Standard access</div>
                                            </div>
                                        </div>
                                    </SelectItem>
                                    <SelectItem value="admin" className="cursor-pointer hover:bg-purple-50 focus:bg-purple-50">
                                        <div className="flex items-center gap-3 py-1">
                                            <div className="w-8 h-8 bg-purple-100 rounded-lg flex items-center justify-center">
                                                <Shield className="h-4 w-4 text-purple-600" />
                                            </div>
                                            <div>
                                                <div className="font-medium">Admin</div>
                                                <div className="text-xs text-gray-500">Full access</div>
                                            </div>
                                        </div>
                                    </SelectItem>
                                </SelectContent>
                            </Select>
                            {errors.role && (
                                <p className="text-sm text-red-500 flex items-center gap-1 animate-in slide-in-from-left-1">
                                    <span className="w-1 h-1 bg-red-500 rounded-full"></span>
                                    {errors.role}
                                </p>
                            )}
                        </div>

                        {/* Admin Secret Key (Conditional) */}
                        {selectedRole === "admin" && (
                            <div className="space-y-2 animate-in slide-in-from-top-2 duration-300">
                                <Label htmlFor="secretKey" className="text-sm font-semibold text-gray-700">
                                    Admin Secret Key
                                </Label>
                                <div className="relative group">
                                    <Key className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400 group-focus-within:text-purple-500 transition-colors" />
                                    <Input
                                        id="secretKey"
                                        name="secretKey"
                                        type="password"
                                        placeholder="Enter admin secret key"
                                        value={formData.secretKey}
                                        onChange={handleInputChange}
                                        className={`pl-10 h-12 border-2 transition-all duration-200 focus:border-purple-500 focus:ring-4 focus:ring-purple-500/20 ${errors.secretKey
                                            ? "border-red-400 focus:border-red-500 focus:ring-red-500/20"
                                            : "border-gray-200 hover:border-gray-300"
                                            }`}
                                    />
                                </div>
                                {errors.secretKey && (
                                    <p className="text-sm text-red-500 flex items-center gap-1 animate-in slide-in-from-left-1">
                                        <span className="w-1 h-1 bg-red-500 rounded-full"></span>
                                        {errors.secretKey}
                                    </p>
                                )}
                                <div className="bg-amber-50 border border-amber-200 rounded-lg p-3">
                                    <p className="text-xs text-amber-700 flex items-center gap-2">
                                        <Shield className="h-3 w-3" />
                                        Contact your administrator for the secret key
                                    </p>
                                </div>
                            </div>
                        )}

                        {/* Password Field */}
                        <div className="space-y-2">
                            <Label htmlFor="password" className="text-sm font-semibold text-gray-700">
                                Password
                            </Label>
                            <div className="relative group">
                                <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400 group-focus-within:text-purple-500 transition-colors" />
                                <Input
                                    id="password"
                                    name="password"
                                    type={showPassword ? "text" : "password"}
                                    placeholder="Create a strong password"
                                    value={formData.password}
                                    onChange={handleInputChange}
                                    className={`pl-10 pr-12 h-12 border-2 transition-all duration-200 focus:border-purple-500 focus:ring-4 focus:ring-purple-500/20 ${errors.password
                                        ? "border-red-400 focus:border-red-500 focus:ring-red-500/20"
                                        : "border-gray-200 hover:border-gray-300"
                                        }`}
                                />
                                <button
                                    type="button"
                                    onClick={() => setShowPassword(!showPassword)}
                                    className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-purple-500 transition-colors p-1"
                                >
                                    {showPassword ? <EyeOff className="h-5 w-5" /> : <Eye className="h-5 w-5" />}
                                </button>
                            </div>
                            {errors.password && (
                                <p className="text-sm text-red-500 flex items-center gap-1 animate-in slide-in-from-left-1">
                                    <span className="w-1 h-1 bg-red-500 rounded-full"></span>
                                    {errors.password}
                                </p>
                            )}
                        </div>

                        {/* Confirm Password Field */}
                        <div className="space-y-2">
                            <Label htmlFor="confirmPassword" className="text-sm font-semibold text-gray-700">
                                Confirm Password
                            </Label>
                            <div className="relative group">
                                <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400 group-focus-within:text-purple-500 transition-colors" />
                                <Input
                                    id="confirmPassword"
                                    name="confirmPassword"
                                    type={showConfirmPassword ? "text" : "password"}
                                    placeholder="Confirm your password"
                                    value={formData.confirmPassword}
                                    onChange={handleInputChange}
                                    className={`pl-10 pr-12 h-12 border-2 transition-all duration-200 focus:border-purple-500 focus:ring-4 focus:ring-purple-500/20 ${errors.confirmPassword
                                        ? "border-red-400 focus:border-red-500 focus:ring-red-500/20"
                                        : "border-gray-200 hover:border-gray-300"
                                        }`}
                                />
                                <button
                                    type="button"
                                    onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                                    className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-purple-500 transition-colors p-1"
                                >
                                    {showConfirmPassword ? <EyeOff className="h-5 w-5" /> : <Eye className="h-5 w-5" />}
                                </button>
                            </div>
                            {errors.confirmPassword && (
                                <p className="text-sm text-red-500 flex items-center gap-1 animate-in slide-in-from-left-1">
                                    <span className="w-1 h-1 bg-red-500 rounded-full"></span>
                                    {errors.confirmPassword}
                                </p>
                            )}
                        </div>
                    </CardContent>

                    <CardContent className="pt-0 pb-0">
                        <Button
                            type="submit"
                            className="w-full h-12 bg-gradient-to-r from-purple-600 to-blue-600 mt-4 hover:from-purple-700 hover:to-blue-700 text-white font-semibold rounded-xl shadow-lg hover:shadow-xl transform hover:scale-[1.02] transition-all duration-200 border-0"
                        >
                            <UserPlus className="h-5 w-5 mr-2 " />
                            Create Account
                        </Button>

                        <div className="text-center mt-6">
                            <p className="text-gray-600">
                                Already have an account?{" "}
                                <Link
                                    className="font-semibold text-purple-600 hover:text-purple-700 hover:underline transition-colors"
                                    to={'/login'}
                                >
                                    Sign in here
                                </Link>
                            </p>
                        </div>
                    </CardContent>
                </form>
            </Card>
        </div>
    )
}
