import { Navigate, Outlet } from "react-router-dom";
import { useSelector } from "react-redux";

//this componenet will protect the routes from unauthenticated user access

function AuthLayout( { requiredRole } ){

    //IMPORTNAT!!!!!!!!!!!!
    //why are we using Redux over here and not getUserAccount()?
    //since whenever we git "/" route App.jsx is invoked so an API call is already made to get the userAccount details and redux is also updated along with it, so we can directly get the data from redux instead of making another API call.

    //fetching user info from redux
    const { status, accountType } = useSelector((state)=> state.auth);

    console.log("AuthLayout:", {
        status,
        accountType,
        requiredRole
    });

    if (status !== "authenticated"){
        return <Navigate to="/login" replace/>
    }
    
    //if we got required role and the req. role and current role doesn't match then navigate to "/"
    if (requiredRole && accountType !== requiredRole){
        return <Navigate to="/" replace />;
    }

    //if user is authenticated and roles match
    return <Outlet/>

}

export default AuthLayout;