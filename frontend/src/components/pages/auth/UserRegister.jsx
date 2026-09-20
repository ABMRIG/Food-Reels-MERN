import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";
import authService from "../../../services/auth";
import { useForm } from "react-hook-form";
import { login } from "../../../store/authSlice";
import { useDispatch } from "react-redux";

function UserRegister() {
    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm();

    const [error, setError] = useState("");
    const [loading, setLoading] = useState(false);

    const navigate = useNavigate();
    const dispatch = useDispatch();

    async function registerUser(data) {
        setError("");
        setLoading(true);

        try {
            await authService.registerUser(data);

            const response = await authService.getCurrentAccount();

            dispatch(
                login({
                    accountType: response.accountType,
                    userData: response.account,
                })
            );

            navigate("/");
        }
        catch (error) {
            console.log("REGISTER ERROR:", error);
            console.log(
                "REGISTER ERROR RESPONSE:",
                error.response
            );

            setError(
                error.response?.data?.message ||
                "Something went wrong while creating your account."
            );
        }
        finally {
            setLoading(false);
        }
    }

    return (
        <main className="min-h-screen bg-black px-5 py-10 text-white">

            <div className="mx-auto flex min-h-[90vh] max-w-md items-center">

                <div className="w-full">

                    {/* Heading */}
                    <div className="text-center">
                        <h1 className="text-3xl font-bold">
                            Create Your Account
                        </h1>

                        <p className="mt-3 text-sm text-gray-400">
                            Join FoodView and start discovering great food.
                        </p>
                    </div>

                    {/* Error */}
                    {error && (
                        <div className="mt-6 rounded-lg border border-red-500/30 bg-red-500/10 px-4 py-3 text-sm text-red-400">
                            {error}
                        </div>
                    )}

                    {/* Form */}
                    <form
                        onSubmit={handleSubmit(registerUser)}
                        className="mt-8 space-y-5"
                    >

                        {/* Full Name */}
                        <div>
                            <label
                                htmlFor="fullName"
                                className="mb-2 block text-sm font-medium"
                            >
                                Full Name
                            </label>

                            <input
                                id="fullName"
                                type="text"
                                placeholder="Enter your full name"
                                {...register("fullName", {
                                    required: "Full name is required",
                                })}
                                className="w-full rounded-lg border border-zinc-700 bg-zinc-900 px-4 py-3 text-white outline-none placeholder:text-zinc-500 focus:border-white"
                            />

                            {errors.fullName && (
                                <p className="mt-2 text-sm text-red-400">
                                    {errors.fullName.message}
                                </p>
                            )}
                        </div>

                        {/* Email */}
                        <div>
                            <label
                                htmlFor="email"
                                className="mb-2 block text-sm font-medium"
                            >
                                Email
                            </label>

                            <input
                                id="email"
                                type="email"
                                placeholder="Enter your email"
                                {...register("email", {
                                    required: "Email is required",
                                })}
                                className="w-full rounded-lg border border-zinc-700 bg-zinc-900 px-4 py-3 text-white outline-none placeholder:text-zinc-500 focus:border-white"
                            />

                            {errors.email && (
                                <p className="mt-2 text-sm text-red-400">
                                    {errors.email.message}
                                </p>
                            )}
                        </div>

                        {/* Password */}
                        <div>
                            <label
                                htmlFor="password"
                                className="mb-2 block text-sm font-medium"
                            >
                                Password
                            </label>

                            <input
                                id="password"
                                type="password"
                                placeholder="Create a password"
                                {...register("password", {
                                    required: "Password is required",
                                })}
                                className="w-full rounded-lg border border-zinc-700 bg-zinc-900 px-4 py-3 text-white outline-none placeholder:text-zinc-500 focus:border-white"
                            />

                            {errors.password && (
                                <p className="mt-2 text-sm text-red-400">
                                    {errors.password.message}
                                </p>
                            )}
                        </div>

                        {/* Submit */}
                        <button
                            type="submit"
                            disabled={loading}
                            className="w-full rounded-lg bg-white px-5 py-3 font-semibold text-black transition hover:bg-gray-200 disabled:cursor-not-allowed disabled:opacity-50"
                        >
                            {loading ? "Creating Account..." : "Create Account"}
                        </button>

                    </form>

                    {/* Login */}
                    <p className="mt-8 text-center text-sm text-gray-400">
                        Already have an account?{" "}
                        <Link
                            to="/user/login"
                            className="font-semibold text-white underline underline-offset-4 hover:text-gray-300"
                        >
                            Login
                        </Link>
                    </p>

                    {/* Back */}
                    <p className="mt-4 text-center">
                        <Link
                            to="/register"
                            className="text-sm text-gray-500 hover:text-gray-300"
                        >
                            ← Choose another account type
                        </Link>
                    </p>

                </div>

            </div>

        </main>
    );
}

export default UserRegister;