import { Navigate, Outlet } from "react-router-dom";
import { useSelector } from "react-redux";


//this layout is for pages that should only be accessed when the user is NOT logged in
function PublicOnlyLayout() {

    const { status, accountType } = useSelector((state) => state.auth)

    //if the user is already authenticated, don't allow them to stay on login/register pages

    if (status === "authenticated"){
        if (accountType === "foodPartner"){
            return <Navigate to="/create-food" replace/>
        }
        return <Navigate to="/" replace/>
    }

    return (
        <Outlet/>
    )   
}

export default PublicOnlyLayout