import { Link } from "react-router-dom";

function ChooseRegister() {
    return (
        <main className="min-h-screen bg-black px-5 py-10 text-white">
            <div className="mx-auto flex min-h-[90vh] max-w-5xl items-center justify-center">

                <div className="w-full max-w-md">

                    {/* Heading */}
                    <div className="text-center">
                        <h1 className="text-4xl font-bold tracking-tight">
                            Join FoodView
                        </h1>

                        <p className="mt-3 text-gray-400">
                            Create an account and start discovering amazing food.
                        </p>
                    </div>

                    {/* Registration options */}
                    <div className="mt-10 space-y-4">

                        {/* User registration */}
                        <Link
                            to="/user/register"
                            className="block rounded-2xl border border-zinc-800 bg-zinc-900 p-6 transition hover:border-zinc-600 hover:bg-zinc-800"
                        >
                            <h2 className="text-xl font-semibold">
                                Join as a Food Lover
                            </h2>

                            <p className="mt-2 text-sm leading-6 text-gray-400">
                                Discover food videos, like your favourites
                                and save places you want to try.
                            </p>

                            <span className="mt-5 inline-block text-sm font-semibold text-white">
                                Create User Account →
                            </span>
                        </Link>

                        {/* Food partner registration */}
                        <Link
                            to="/food-partner/register"
                            className="block rounded-2xl border border-zinc-800 bg-zinc-900 p-6 transition hover:border-zinc-600 hover:bg-zinc-800"
                        >
                            <h2 className="text-xl font-semibold">
                                Join as a Food Partner
                            </h2>

                            <p className="mt-2 text-sm leading-6 text-gray-400">
                                Showcase your restaurant and share your
                                food with people nearby.
                            </p>

                            <span className="mt-5 inline-block text-sm font-semibold text-white">
                                Create Food Partner Account →
                            </span>
                        </Link>

                    </div>

                    {/* Login */}
                    <p className="mt-8 text-center text-sm text-gray-400">
                        Already have an account?{" "}
                        <Link
                            to="/login"
                            className="font-semibold text-white underline underline-offset-4 hover:text-gray-300"
                        >
                            Login
                        </Link>
                    </p>

                </div>
            </div>
        </main>
    );
}

export default ChooseRegister;