import React from 'react'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import Login from './components/auth/Login';
import MainPage from './components/Pages/MainPage';

const Body = () => {
  const appRouter = createBrowserRouter([
    {
      path:"/",
      element: <Login/>
    },
    {
      path:"/main",
      element: <MainPage/> ,
    },
  ]);

  return (
    <div>
      <RouterProvider router={appRouter} />
    </div>
  )
}

export default Body