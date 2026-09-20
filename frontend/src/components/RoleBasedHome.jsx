import { Navigate } from "react-router-dom";
import { useSelector } from "react-redux";

//this component decides where "/" should send the current account

function RoleBasedHome() {

    const {status, accountType} = useSelector((state) => state.auth)
    
     //if authentication is still being initialized, App.jsx normally prevents this component from rendering
    if (status !== "authenticated"){
        return <Navigate to="/login" replace/>
    }

    //food partners don't have the user reel home
    if (accountType === "foodPartner") {
        return <Navigate to="/create-food" replace />;
    }

    //normal users can access the reel home
    return <Navigate to="/home" replace />;

}

export default RoleBasedHome