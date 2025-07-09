"use client"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { useEffect, useState } from "react"
import { Link } from "react-router-dom"
import { motion, useInView } from "framer-motion"
import { useRef } from "react"

// Counter animation hook
function useCountAnimation(end, duration = 2) {
  const [count, setCount] = useState(0)
  const [hasAnimated, setHasAnimated] = useState(false)

  const animate = () => {
    if (hasAnimated) return
    setHasAnimated(true)

    let start = 0
    const increment = end / (duration * 60)
    const timer = setInterval(() => {
      start += increment
      if (start >= end) {
        setCount(end)
        clearInterval(timer)
      } else {
        setCount(Math.floor(start))
      }
    }, 1000 / 60)
  }

  return [count, animate]
}

// Animated counter component
function AnimatedCounter({ end, suffix = "", trigger }) {
  const [count, animate] = useCountAnimation(Number.parseInt(end.replace(/[^0-9]/g, "")))

  useEffect(() => {
    if (trigger) {
      animate()
    }
  }, [trigger, animate])

  return (
    <span>
      {count.toLocaleString()}
      {suffix}
    </span>
  )
}

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

  const [user, setUser] = useState(null)
  const statsRef = useRef(null)
  const statsInView = useInView(statsRef, { once: true, threshold: 0.3 })

  useEffect(() => {
    const storedUser = localStorage.getItem("user")
    if (storedUser) {
      setUser(JSON.parse(storedUser))
    }
  }, [])

  const steps = [
    {
      step: "01",
      title: "Sign Up",
      description: "Create your free account in less than a minute. Choose between User or Admin account.",
    },
    {
      step: "02",
      title: "Explore",
      description: "Browse events by category and location. Use filters to find exactly what you're looking for.",
    },
    {
      step: "03",
      title: "Book & Enjoy",
      description: "Reserve your spot, and get ready for an amazing experience.",
    },
  ]

  const stats = [
    { number: "100+", label: "Events Hosted" },
    { number: "500+", label: "Happy Users" },
    { number: "50+", label: "Cities Covered" },
    { number: "95%", label: "Uptime" },
  ]

  // Animation variants
  const fadeInUp = {
    hidden: { opacity: 0, y: 60 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.8, ease: "easeOut" },
    },
  }

  const fadeInLeft = {
    hidden: { opacity: 0, x: -60 },
    visible: {
      opacity: 1,
      x: 0,
      transition: { duration: 0.8, ease: "easeOut" },
    },
  }

  const fadeInRight = {
    hidden: { opacity: 0, x: 60 },
    visible: {
      opacity: 1,
      x: 0,
      transition: { duration: 0.8, ease: "easeOut" },
    },
  }

  const staggerContainer = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
        delayChildren: 0.1,
      },
    },
  }

  const staggerItem = {
    hidden: { opacity: 0, y: 40 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.6, ease: "easeOut" },
    },
  }

  return (
    <div className="min-h-screen bg-black text-white">
      {/* Hero Section */}
      <section className="relative bg-gradient-to-br from-gray-900 via-gray-800 to-black py-20 px-4 overflow-hidden">
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute -top-40 -right-40 w-80 h-80 bg-purple-800 rounded-full blur-3xl opacity-20 animate-pulse"></div>
          <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-blue-800 rounded-full blur-3xl opacity-20 animate-pulse delay-1000"></div>
        </div>
        <div className="max-w-7xl mx-auto text-center relative z-10">
          <motion.h1
            className="text-5xl md:text-6xl font-bold text-white mb-6 leading-tight"
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, ease: "easeOut" }}
          >
            Discover Amazing
            <motion.span
              className="block bg-gradient-to-r from-purple-400 to-blue-400 bg-clip-text text-transparent"
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 1, delay: 0.3, ease: "easeOut" }}
            >
              Events Near You
            </motion.span>
          </motion.h1>
          <motion.p
            className="text-xl text-gray-300 mb-8 max-w-3xl mx-auto leading-relaxed"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.5 }}
          >
            EventHub is your gateway to incredible experiences. Whether you're looking to attend inspiring events or
            create memorable gatherings, we've got you covered with our comprehensive event management platform.
          </motion.p>
          <motion.div
            className="flex flex-col sm:flex-row gap-4 justify-center items-center"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.7 }}
          >
            {!user && (
              <Button
                size="lg"
                className="bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700 text-white px-8 py-4 text-lg font-semibold rounded-xl shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-200"
              >
                <Link to={"/register"}>Get Started Free</Link>
              </Button>
            )}
            <Button
              variant="outline"
              size="lg"
              className="bg-transparent border-2 border-gray-600 hover:border-purple-500 text-gray-100 hover:text-black px-8 py-4 text-lg font-semibold rounded-xl transition-all duration-200"
            >
              <Link to={"/events"}>Browse Events</Link>
            </Button>
          </motion.div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-16 bg-gray-900" ref={statsRef}>
        <div className="max-w-7xl mx-auto px-4">
          <motion.div
            className="grid grid-cols-2 md:grid-cols-4 gap-8"
            variants={staggerContainer}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, threshold: 0.3 }}
          >
            {stats.map((stat, index) => (
              <motion.div key={index} className="text-center" variants={staggerItem}>
                <div className="text-4xl md:text-5xl font-bold text-white mb-2">
                  <AnimatedCounter
                    end={stat.number}
                    suffix={stat.number.includes("+") ? "+" : stat.number.includes("%") ? "%" : ""}
                    trigger={statsInView}
                  />
                </div>
                <div className="text-gray-400 font-medium">{stat.label}</div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 bg-gray-800">
        <div className="max-w-7xl mx-auto px-4">
          <motion.div
            className="text-center mb-16"
            variants={fadeInUp}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, threshold: 0.3 }}
          >
            <h2 className="text-4xl font-bold text-white mb-4">Why Choose EventHub?</h2>
            <p className="text-xl text-gray-300 max-w-3xl mx-auto">
              We provide everything you need to discover, book, and manage events seamlessly. Join thousands of users
              who trust EventHub for their event needs.
            </p>
          </motion.div>
          <motion.div
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
            variants={staggerContainer}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, threshold: 0.1 }}
          >
            {features.map((feature, index) => (
              <motion.div key={index} variants={staggerItem}>
                <Card className="bg-gray-900 border border-gray-700 shadow-md hover:shadow-lg transition-all duration-300 hover:scale-105 hover:border-purple-500">
                  <CardHeader className="text-center pb-4">
                    <motion.div
                      className="text-4xl mb-4"
                      whileHover={{ scale: 1.2, rotate: 10 }}
                      transition={{ type: "spring", stiffness: 300 }}
                    >
                      {feature.icon}
                    </motion.div>
                    <CardTitle className="text-xl font-bold text-white">{feature.title}</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <CardDescription className="text-gray-400 text-center leading-relaxed">
                      {feature.description}
                    </CardDescription>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* How It Works Section */}
      <section className="py-20 bg-black">
        <div className="max-w-7xl mx-auto px-4">
          <motion.div
            className="text-center mb-16"
            variants={fadeInUp}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, threshold: 0.3 }}
          >
            <h2 className="text-4xl font-bold text-white mb-4">How It Works</h2>
            <p className="text-xl text-gray-300 max-w-2xl mx-auto">
              Getting started with EventHub is simple. Follow these three easy steps to begin your event journey.
            </p>
          </motion.div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {steps.map((step, index) => (
              <motion.div
                key={index}
                className="text-center relative"
                variants={index % 2 === 0 ? fadeInLeft : fadeInRight}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, threshold: 0.3 }}
                transition={{ delay: index * 0.2 }}
              >
                {index < steps.length - 1 && (
                  <motion.div
                    className="hidden md:block absolute top-12 left-1/2 w-full h-0.5 bg-gradient-to-r from-purple-500 to-blue-500 transform translate-x-1/2"
                    initial={{ scaleX: 0 }}
                    whileInView={{ scaleX: 1 }}
                    viewport={{ once: true }}
                    transition={{ duration: 1, delay: 0.5 + index * 0.2 }}
                  />
                )}
                <div className="relative z-10">
                  <motion.div
                    className="w-24 h-24 bg-gradient-to-br from-purple-600 to-blue-600 rounded-full flex items-center justify-center mx-auto mb-6 shadow-lg"
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    <span className="text-2xl font-bold text-white">{step.step}</span>
                  </motion.div>
                  <h3 className="text-2xl font-bold text-white mb-4">{step.title}</h3>
                  <p className="text-gray-400 leading-relaxed max-w-sm mx-auto">{step.description}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Event Organizers Section */}
      <motion.section
        className="py-20 bg-gradient-to-r from-purple-700 to-blue-700"
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true, threshold: 0.3 }}
        transition={{ duration: 1 }}
      >
        <div className="max-w-7xl mx-auto px-4 text-center">
          <motion.h2
            className="text-4xl font-bold text-white mb-6"
            variants={fadeInUp}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
          >
            Are You an Event Organizer?
          </motion.h2>
          <motion.p
            className="text-xl text-purple-100 mb-8 max-w-3xl mx-auto leading-relaxed"
            variants={fadeInUp}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
          >
            Take your events to the next level with our comprehensive event management tools. Create, promote, and
            manage your events with ease while reaching thousands of potential attendees.
          </motion.p>
          <motion.div
            className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12"
            variants={staggerContainer}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, threshold: 0.1 }}
          >
            {[
              {
                icon: "🎪",
                title: "Easy Event Creation",
                desc: "Set up your event in minutes with our intuitive interface",
              },
              { icon: "📈", title: "Real-time event management", desc: "Cancel An Event Anytime" },
              {
                icon: "📑",
                title: "View Your Bookings",
                desc: "Why only be an Admin when you can be an attendee as well",
              },
            ].map((item, index) => (
              <motion.div key={index} className="text-center" variants={staggerItem}>
                <motion.div
                  className="text-4xl mb-4"
                  whileHover={{ scale: 1.2, rotate: 10 }}
                  transition={{ type: "spring", stiffness: 300 }}
                >
                  {item.icon}
                </motion.div>
                <h3 className="text-xl font-semibold text-white mb-2">{item.title}</h3>
                <p className="text-purple-100">{item.desc}</p>
              </motion.div>
            ))}
          </motion.div>
          {user?.role === "admin" && (
            <motion.div
              initial={{ scale: 0.8, opacity: 0 }}
              whileInView={{ scale: 1, opacity: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.3 }}
            >
              < Link to={'/create-event'}>
                <Button
                  size="lg"
                  className="bg-white text-purple-600 hover:bg-gray-100 px-8 py-4 text-lg font-semibold rounded-xl shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-200"

                >
                  Start Organizing Events
                </Button>
              </Link>
            </motion.div>
          )}
        </div>
      </motion.section>

      {/* CTA Section */}
      {!user && (
        <motion.section
          className="py-20 bg-gray-900"
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, threshold: 0.3 }}
          transition={{ duration: 0.8 }}
        >
          <div className="max-w-4xl mx-auto text-center px-4">
            <motion.h2
              className="text-4xl font-bold text-white mb-6"
              variants={fadeInUp}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
            >
              Ready to Get Started?
            </motion.h2>
            <motion.p
              className="text-xl text-gray-300 mb-8 leading-relaxed"
              variants={fadeInUp}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              transition={{ delay: 0.2 }}
            >
              Join thousands of users who have already discovered amazing events and created unforgettable experiences.
              Your next great adventure is just a click away.
            </motion.p>
            <motion.div
              className="flex flex-col sm:flex-row gap-4 justify-center"
              initial={{ scale: 0.8, opacity: 0 }}
              whileInView={{ scale: 1, opacity: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.4 }}
            >
              <Button
                size="lg"
                className="bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700 text-white px-8 py-4 text-lg font-semibold rounded-xl shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-200"
              >
                <Link to={"/register"}>Sign Up Now</Link>
              </Button>
              <Button
                variant="outline"
                size="lg"
                className="border-2 border-gray-600 hover:border-white text-gray-300 hover:text-white hover:bg-white/10 px-8 py-4 text-lg font-semibold rounded-xl transition-all duration-200 bg-transparent"
              >
                Learn More
              </Button>
            </motion.div>
          </div>
        </motion.section>
      )}

      {/* Footer */}
      <motion.footer
        className="bg-black py-12"
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true, threshold: 0.1 }}
        transition={{ duration: 0.8 }}
      >
        <div className="max-w-7xl mx-auto px-4">
          <motion.div
            className="grid grid-cols-1 md:grid-cols-4 gap-8"
            variants={staggerContainer}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, threshold: 0.1 }}
          >
            <motion.div className="col-span-1 md:col-span-2" variants={staggerItem}>
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
            </motion.div>
            <motion.div variants={staggerItem}>
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
            </motion.div>
            <motion.div variants={staggerItem}>
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
            </motion.div>
          </motion.div>
          <motion.div
            className="border-t border-gray-700 mt-8 pt-8 text-center text-gray-400"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            <p>&copy; 2025 EventHub. All rights reserved.</p>
          </motion.div>
        </div>
      </motion.footer>
    </div>
  )
}
