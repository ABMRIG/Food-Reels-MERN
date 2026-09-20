import './App.css'
import { useEffect, useState } from 'react'
import { Outlet } from 'react-router-dom'
import { useDispatch } from 'react-redux'

// import Header from './components/Header/Header.jsx'
// import Footer from './components/Footer/Footer.jsx'
// import Container from './components/container/Container.jsx'

import authService from './services/auth'
import { login, logout } from './store/authSlice'


function App() {


    const dispatch = useDispatch();


    //this loading state is used because checking the current account requires an API request, which takes some time

    //while we are waiting for the backend to tell us whether the user is logged in or not, we don't want the application to render
    //with an incorrect authentication state. Using loading we will block user interaction on the page

    const [loading, setLoading] = useState(true);


    useEffect(() => {

        //this function will ask our backend:
        //"Is there currently an authenticated account associated with this browser?"

        async function initializeAuth() {

            try {
                //getCurrentAccount() is our service function
                //it sends GET /api/auth/me to the backend

                //we don't need to tell it whether the account is a user
                //or a food partner
                //the backend figures that out from the JWT stored in the cookie as the token contains the user type
                const response = await authService.getCurrentAccount();


                //if the request succeeds, the backend has confirmed
                //that the current browser has a valid authenticated account

                //the response contains:
                //
                //{
                //    accountType: "user",
                //    account: {...}
                //}

                //now we take that information and put it into Redux
                dispatch(
                    login({
                        accountType: response.accountType,
                        userData: response.account,
                    })
                );

            }

            catch(err) {

                //if /api/auth/me fails, it normally means that
                //there is no valid authentication cookie
                //
                //for example:
                //- the user is not logged in
                //- the cookie doesn't exist
                //- the JWT is invalid or expired
                //
                //in that situation we make sure Redux knows that
                //there is no authenticated account
                console.log(err);
                dispatch(logout());

            }

            finally {

                //whether the account was found or not, the authentication
                //check is now finished*

                //so we can allow the rest of the application to render
                setLoading(false);

            }

        }


        //call the function when App is loaded

        initializeAuth();

    }, [dispatch]);


    //IMPORTANT: while we are checking /api/auth/me,
    //we temporarily don't render the application

    //this prevents the application from making decisions based on
    //an authentication state that has not been determined yet

    if (loading) {

        return <div>Loading...</div>;

    }


    return (
        <>
            <main>
                <Outlet/>
            </main>
        </>
    )
}

export default App