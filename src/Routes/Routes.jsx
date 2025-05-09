// src/Routes/Routes.jsx

import { createBrowserRouter } from "react-router-dom";
import MainLayout from "../Layouts/MainLayout";
import Home from "../Components/Home";
import Login from "../Pages/Login";
import Register from "../Pages/Register";
import AuthLayout from "../Layouts/AuthLayout";
import PrivateRoute from "./PrivateRoute";

// Import or create these components
import Bills from "../Pages/Bills";
import Profile from "../Pages/Profile";
import UpdateProfile from "../Pages/UpdateProfile";
import BillDetails from "../Pages/BillDetails";

const router = createBrowserRouter([
    {
        path: '/',
        element: <MainLayout />,
        children: [
            {   
                index: true,
                path: '/',
                element: <Home />,
            },
            {
                path: '/bills',
                element: <PrivateRoute><Bills /></PrivateRoute>,
            },
            {
                path: '/bills/:id',
                element: <PrivateRoute><BillDetails /></PrivateRoute>,
            },
            {
                path: '/profile',
                element: <PrivateRoute><Profile /></PrivateRoute>,
            },
            {
                path: '/profile/update',
                element: <PrivateRoute><UpdateProfile /></PrivateRoute>,
            },
        ]
    },
    {
        path: '/auth',
        element: <AuthLayout />,
        children: [
            {
                path: '/auth/login',
                element: <Login />,
            },
            {
                path: '/auth/register',
                element: <Register />,
            },
        ]
    }
]);

export default router;