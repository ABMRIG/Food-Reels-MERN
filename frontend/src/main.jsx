// import { StrictMode } from 'react'

import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import ChooseRegister from './components/pages/auth/ChooseRegister.jsx'
import UserRegister from './components/pages/auth/UserRegister.jsx'
import UserLogin from './components/pages/auth/UserLogin.jsx'
import Login from './components/pages/auth/Login.jsx'
import FoodPartnerLogin from './components/pages/auth/FoodPartnerLogin.jsx'
import FoodPartnerRegister from './components/pages/auth/FoodPartnerRegister.jsx'
import { Provider } from "react-redux"
import store from "./store/store"
import AuthLayout from './components/AuthLayout.jsx'
import Home from './components/pages/general/Home.jsx'
import UserLayout from './components/Layout/UserLayout.jsx'
import SavedFoods from './components/pages/general/SavedFoods.jsx'
import FoodPartnerProfile from './components/pages/food-partner/FoodPartnerProfile.jsx'
import CreateFood from './components/pages/food-partner/CreateFood.jsx'
import FoodPartnerLayout from "./components/Layout/FoodPartnerLayout.jsx";
import PublicOnlyLayout from "./components/PublicOnlyLayout.jsx";
import RoleBasedHome from "./components/RoleBasedHome.jsx";


const router = createBrowserRouter([

    {
        path: "/",
        element: <App />,

        children: [

            // Public Routes
            {
                element: <PublicOnlyLayout />,
                children: [

                    {
                        path: "register",
                        element: <ChooseRegister />
                    },

                    {
                        path: "user/register",
                        element: <UserRegister />
                    },

                    {
                        path: "user/login",
                        element: <UserLogin />
                    },

                    {
                        path: "login",
                        element: <Login />
                    },

                    {
                        path: "food-partner/login",
                        element: <FoodPartnerLogin />
                    },

                    {
                        path: "food-partner/register",
                        element: <FoodPartnerRegister />
                    },

                ]
            },

            // "/" decides where the authenticated account should go
            {
                index: true,
                element: <RoleBasedHome />
            },


            // Protected User Routes
            {
                element: <AuthLayout requiredRole="user" />,
                children: [

                    {
                        element: <UserLayout />,
                        children: [

                            {
                                path: "home",
                                element: <Home />
                            },

                            {
                                path: "saved",
                                element: <SavedFoods />
                            },

                            {
                                path: "food-partner/:id",
                                element: <FoodPartnerProfile />
                            },

                        ]
                    }

                ]
            },


            // Protected Food Partner Routes
            {
                element: <AuthLayout requiredRole="foodPartner" />,
                children: [

                    {
                        element: <FoodPartnerLayout />,
                        children: [

                            {
                                path: "create-food",
                                element: <CreateFood />
                            },

                        ]
                    }

                ]
            }

        ]
    }

])


createRoot(document.getElementById('root')).render(

    // <StrictMode>
    <Provider store={store}>

        <RouterProvider router={router} />

    </Provider>
    // </StrictMode>

)