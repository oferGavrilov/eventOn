import Home from "pages/Home"
import Login from "pages/Login"
import Register from "pages/Register"
import { createBrowserRouter, RouterProvider } from "react-router-dom"


const router = createBrowserRouter([
  {
    path: '/',
    element: <Home />
  },
  {
    path: '/login',
    element: <Login />
  },
  {
    path: '/register',
    element: <Register />
  },
])


export const App = () => (
  <RouterProvider router={router} />
)
