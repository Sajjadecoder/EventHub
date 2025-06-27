import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import { createBrowserRouter } from 'react-router-dom'
import Login from './pages/Login.jsx'
import Register from './pages/Register'
import { RouterProvider } from 'react-router'
import Navbar from './components/Navbar'
import Home from './pages/Home'
import AllEvents from './pages/AllEvents'
import CreateEvent from './pages/CreateEvent'
import ManageEvents from './pages/ManageEvents'

const route  = createBrowserRouter([
  {
    path: '/',
    element: <Home />
  }
  ,
  {
    path: '/login',
    element: <Login />
    
  },
  {
    path: '/register',
    element: <Register />
  },
  {
    path: '/events',
    element: <AllEvents />
  },
  {
    path: '/create-event',
    element: <CreateEvent />
  },
  {
    path: "/manage-events",
    element: <ManageEvents />
  }
])


createRoot(document.getElementById('root')).render(
  <StrictMode>
    <RouterProvider router={route}/>
  </StrictMode>,
)
