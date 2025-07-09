"use client"

import React from "react"
import { Link } from "react-router-dom"

export default function LoginPrompt() {
    return (
        <div className="min-h-screen flex items-center justify-center bg-gray-100 dark:bg-gray-900">
            <div className="bg-white dark:bg-gray-800 shadow-lg rounded-2xl p-6 max-w-md text-center">
                <h2 className="text-2xl font-semibold text-gray-800 dark:text-white mb-4">
                    Please log in
                </h2>
                <p className="text-gray-600 dark:text-gray-300 mb-6">
                    You need to log in to access this page.
                </p>

                <Link
                    className="inline-block px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition"
                    to={'/login'}
                >
                    Go to Login
                </Link>
            </div>
        </div>
    )
}
