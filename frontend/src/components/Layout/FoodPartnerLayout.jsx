import { Outlet, NavLink, useNavigate } from "react-router-dom";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

import {
    faPlus,
    faRightFromBracket,
} from "@fortawesome/free-solid-svg-icons";

import { useDispatch } from "react-redux";
import authService from "../../services/auth";
import { logout } from "../../store/authSlice";


function FoodPartnerLayout() {

    const dispatch = useDispatch();
    const navigate = useNavigate();


    async function handleLogout() {

        try {

            //tell the backend to clear the food partner authentication cookie
            await authService.logoutFoodPartner();

        }
        catch (error) {

            console.log("LOGOUT ERROR:", error);
            console.log(
                "LOGOUT ERROR RESPONSE:",
                error.response
            );

        }
        finally {

            //clear authentication information from Redux
            dispatch(logout());

            //send the food partner back to the login screen
            navigate("/login", { replace: true });

        }

    }


    return (

        <div className="min-h-screen bg-black text-white">

            {/* Desktop sidebar */}
            <aside className="fixed left-0 top-0 hidden h-screen w-60 border-r border-white/10 bg-black px-6 py-8 md:flex md:flex-col">

                {/* Application name */}
                <h1 className="mb-10 text-2xl font-bold">
                    FoodReels
                </h1>


                {/* Navigation */}
                <nav className="flex flex-col gap-4">

                    <NavLink
                        to="/create-food"
                        className={({ isActive }) =>
                            `flex items-center gap-4 rounded-lg px-4 py-3 text-base font-semibold transition ${
                                isActive
                                    ? "bg-white/10"
                                    : "hover:bg-white/5"
                            }`
                        }
                    >
                        <FontAwesomeIcon icon={faPlus} />
                        <span>Create Food</span>
                    </NavLink>

                </nav>


                {/* Logout */}
                <button
                    type="button"
                    onClick={handleLogout}
                    className="mt-auto flex items-center gap-4 rounded-lg px-4 py-3 text-left text-base font-semibold text-gray-400 transition hover:bg-white/5 hover:text-white"
                >
                    <FontAwesomeIcon icon={faRightFromBracket} />
                    <span>Logout</span>
                </button>

            </aside>


            {/* Main page area */}
            <main className="pb-16 md:ml-60 md:pb-0">

                <Outlet />

            </main>


            {/* Mobile bottom navigation */}
            <nav className="fixed bottom-0 left-0 right-0 z-50 flex h-16 items-center justify-around border-t border-white/10 bg-black/95 backdrop-blur md:hidden">

                <NavLink
                    to="/create-food"
                    className={({ isActive }) =>
                        `flex h-full flex-1 flex-col items-center justify-center gap-1 text-xs font-semibold transition ${
                            isActive
                                ? "text-white"
                                : "text-gray-500"
                        }`
                    }
                >
                    <FontAwesomeIcon
                        icon={faPlus}
                        className="text-lg"
                    />

                    <span>Create Food</span>

                </NavLink>


                <button
                    type="button"
                    onClick={handleLogout}
                    className="flex h-full flex-1 flex-col items-center justify-center gap-1 text-xs font-semibold text-gray-500 transition hover:text-white"
                >
                    <FontAwesomeIcon
                        icon={faRightFromBracket}
                        className="text-lg"
                    />

                    <span>Logout</span>

                </button>

            </nav>

        </div>

    );

}

export default FoodPartnerLayout;