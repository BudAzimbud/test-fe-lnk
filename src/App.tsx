import React from 'react';
import './App.css';
import MyCalendar from './component/Calender';
import Login from './component/Login';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import ErrorPage from './component/ErrorPage';

function App() {
  const router = createBrowserRouter([
    {
      path: "/",
      element: <MyCalendar />,
      errorElement: <ErrorPage />,
    },
    {
      path: "/login",
      element: <Login />,
      errorElement: <ErrorPage />,
    },
  ]);
  return (
    <RouterProvider router={router} />
  );
}

export default App;
