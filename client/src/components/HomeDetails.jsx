"use client"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Link } from "react-router-dom"

export default function HomeDetails() {
  const features = [
    {
      icon: "🎯",
      title: "Discover Events",
      description:
        "Browse through thousands of events across different categories and locations. Find exactly what interests you.",
    },
    {
      icon: "📅",
      title: "Easy Booking",
      description:
        "Book your favorite events with just a few clicks. Secure payment and instant confirmation guaranteed.",
    },
    {
      icon: "🎪",
      title: "Create Events",
      description:
        "Organize your own events and reach a wider audience. Complete event management tools at your fingertips.",
    },
    {
      icon: "👥",
      title: "Community",
      description:
        "Connect with like-minded people, share experiences, and build lasting relationships through events.",
    },
    {
      icon: "🔒",
      title: "Secure Platform",
      description: "Your data and payments are protected with enterprise-grade security. Book with confidence.",
    },
    {
      icon: "📊",
      title: "Analytics",
      description: "Event organizers get detailed insights and analytics to make their events more successful.",
    },
  ]

  const steps = [
    {
      step: "01",
      title: "Sign Up",
      description: "Create your free account in less than a minute. Choose between user or organizer account.",
    },
    {
      step: "02",
      title: "Explore",
      description: "Browse events by category, location, or date. Use filters to find exactly what you're looking for.",
    },
    {
      step: "03",
      title: "Book & Enjoy",
      description: "Reserve your spot, make secure payment, and get ready for an amazing experience.",
    },
  ]

  const stats = [
    { number: "10,000+", label: "Events Hosted" },
    { number: "50,000+", label: "Happy Users" },
    { number: "500+", label: "Cities Covered" },
    { number: "99.9%", label: "Uptime" },
  ]

  return (
    <div className="min-h-screen bg-white">
      {/* Hero Section */}
      <section className="relative bg-gradient-to-br from-purple-50 via-blue-50 to-indigo-100 py-20 px-4 overflow-hidden">
        {/* Background decorative elements */}
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute -top-40 -right-40 w-80 h-80 bg-gradient-to-br from-purple-400 to-pink-400 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-pulse"></div>
          <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-gradient-to-br from-blue-400 to-indigo-400 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-pulse delay-1000"></div>
        </div>

        <div className="max-w-7xl mx-auto text-center relative z-10">
          <h1 className="text-5xl md:text-6xl font-bold text-gray-900 mb-6 leading-tight">
            Discover Amazing
            <span className="block bg-gradient-to-r from-purple-600 to-blue-600 bg-clip-text text-transparent">
              Events Near You
            </span>
          </h1>
          <p className="text-xl text-gray-600 mb-8 max-w-3xl mx-auto leading-relaxed">
            EventHub is your gateway to incredible experiences. Whether you're looking to attend inspiring events or
            create memorable gatherings, we've got you covered with our comprehensive event management platform.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
            <Button
              size="lg"
              className="bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700 text-white px-8 py-4 text-lg font-semibold rounded-xl shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-200"
            >
            <Link to={'/register'}>
              Get Started Free
            </Link>
            
            
            </Button>
            <Button
              variant="outline"
              size="lg"
              className="border-2 border-gray-300 hover:border-purple-500 text-gray-700 hover:text-purple-600 px-8 py-4 text-lg font-semibold rounded-xl transition-all duration-200"
            >
              <Link to={'/events'}>
              Browse Events
              </Link>
            </Button>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {stats.map((stat, index) => (
              <div key={index} className="text-center">
                <div className="text-4xl md:text-5xl font-bold text-gray-900 mb-2">{stat.number}</div>
                <div className="text-gray-600 font-medium">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">Why Choose EventHub?</h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              We provide everything you need to discover, book, and manage events seamlessly. Join thousands of users
              who trust EventHub for their event needs.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {features.map((feature, index) => (
              <Card key={index} className="hover:shadow-lg transition-shadow duration-300 border-0 shadow-md">
                <CardHeader className="text-center pb-4">
                  <div className="text-4xl mb-4">{feature.icon}</div>
                  <CardTitle className="text-xl font-bold text-gray-900">{feature.title}</CardTitle>
                </CardHeader>
                <CardContent>
                  <CardDescription className="text-gray-600 text-center leading-relaxed">
                    {feature.description}
                  </CardDescription>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* How It Works Section */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">How It Works</h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Getting started with EventHub is simple. Follow these three easy steps to begin your event journey.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {steps.map((step, index) => (
              <div key={index} className="text-center relative">
                {/* Step connector line */}
                {index < steps.length - 1 && (
                  <div className="hidden md:block absolute top-12 left-1/2 w-full h-0.5 bg-gradient-to-r from-purple-300 to-blue-300 transform translate-x-1/2"></div>
                )}

                <div className="relative z-10 bg-white">
                  <div className="w-24 h-24 bg-gradient-to-br from-purple-500 to-blue-500 rounded-full flex items-center justify-center mx-auto mb-6 shadow-lg">
                    <span className="text-2xl font-bold text-white">{step.step}</span>
                  </div>
                  <h3 className="text-2xl font-bold text-gray-900 mb-4">{step.title}</h3>
                  <p className="text-gray-600 leading-relaxed max-w-sm mx-auto">{step.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* For Event Organizers Section */}
      <section className="py-20 bg-gradient-to-r from-purple-600 to-blue-600">
        <div className="max-w-7xl mx-auto px-4 text-center">
          <h2 className="text-4xl font-bold text-white mb-6">Are You an Event Organizer?</h2>
          <p className="text-xl text-purple-100 mb-8 max-w-3xl mx-auto leading-relaxed">
            Take your events to the next level with our comprehensive event management tools. Create, promote, and
            manage your events with ease while reaching thousands of potential attendees.
          </p>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12">
            <div className="text-center">
              <div className="text-4xl mb-4">🎪</div>
              <h3 className="text-xl font-semibold text-white mb-2">Easy Event Creation</h3>
              <p className="text-purple-100">Set up your event in minutes with our intuitive interface</p>
            </div>
            <div className="text-center">
              <div className="text-4xl mb-4">📈</div>
              <h3 className="text-xl font-semibold text-white mb-2">Real-time Analytics</h3>
              <p className="text-purple-100">Track registrations, sales, and engagement metrics</p>
            </div>
            <div className="text-center">
              <div className="text-4xl mb-4">💰</div>
              <h3 className="text-xl font-semibold text-white mb-2">Secure Payments</h3>
              <p className="text-purple-100">Accept payments safely with our integrated payment system</p>
            </div>
          </div>
          <Button
            size="lg"
            className="bg-white text-purple-600 hover:bg-gray-100 px-8 py-4 text-lg font-semibold rounded-xl shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-200"
          >
            Start Organizing Events
          </Button>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gray-900">
        <div className="max-w-4xl mx-auto text-center px-4">
          <h2 className="text-4xl font-bold text-white mb-6">Ready to Get Started?</h2>
          <p className="text-xl text-gray-300 mb-8 leading-relaxed">
            Join thousands of users who have already discovered amazing events and created unforgettable experiences.
            Your next great adventure is just a click away.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button
              size="lg"
              className="bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700 text-white px-8 py-4 text-lg font-semibold rounded-xl shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-200"
            >
              <Link to={'/register'} >
              Sign Up Now
              </Link>
            </Button>
            <Button
              variant="outline"
              size="lg"
              className="border-2 border-gray-600 hover:border-white text-gray-300 hover:text-white hover:bg-white/10 px-8 py-4 text-lg font-semibold rounded-xl transition-all duration-200"
            >
              Learn More
            </Button>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-800 py-12">
        <div className="max-w-7xl mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <div className="col-span-1 md:col-span-2">
              <div className="flex items-center space-x-2 mb-4">
                <div className="w-8 h-8 bg-gradient-to-br from-purple-600 to-blue-600 rounded-lg flex items-center justify-center">
                  <span className="text-white font-bold text-sm">E</span>
                </div>
                <span className="text-xl font-bold text-white">EventHub</span>
              </div>
              <p className="text-gray-400 mb-4 max-w-md">
                Your trusted platform for discovering and creating amazing events. Connect, experience, and create
                memories that last a lifetime.
              </p>
            </div>
            <div>
              <h3 className="text-white font-semibold mb-4">Platform</h3>
              <ul className="space-y-2 text-gray-400">
                <li>
                  <a href="#" className="hover:text-white transition-colors">
                    Browse Events
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-white transition-colors">
                    Create Event
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-white transition-colors">
                    Pricing
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-white transition-colors">
                    Help Center
                  </a>
                </li>
              </ul>
            </div>
            <div>
              <h3 className="text-white font-semibold mb-4">Company</h3>
              <ul className="space-y-2 text-gray-400">
                <li>
                  <a href="#" className="hover:text-white transition-colors">
                    About Us
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-white transition-colors">
                    Contact
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-white transition-colors">
                    Privacy Policy
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-white transition-colors">
                    Terms of Service
                  </a>
                </li>
              </ul>
            </div>
          </div>
          <div className="border-t border-gray-700 mt-8 pt-8 text-center text-gray-400">
            <p>&copy; 2025 EventHub. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  )
}
