import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";
import authService from "../../../services/auth";
import { useForm } from "react-hook-form";
import { login } from "../../../store/authSlice";
import { useDispatch } from "react-redux";

function FoodPartnerRegister() {
    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm();

    const [error, setError] = useState("");
    const [loading, setLoading] = useState(false);

    const navigate = useNavigate();
    const dispatch = useDispatch();

    async function registerFoodPartner(data) {
        setError("");
        setLoading(true);

        try {
            await authService.registerFoodPartner(data);

            const response = await authService.getCurrentAccount();

            dispatch(
                login({
                    accountType: response.accountType,
                    userData: response.account,
                })
            );

            navigate("/create-food");
        }
        catch (error) {
            console.log("FOOD PARTNER REGISTER ERROR:", error);
            console.log(
                "FOOD PARTNER REGISTER ERROR RESPONSE:",
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
                            Become a Food Partner
                        </h1>

                        <p className="mt-3 text-sm text-gray-400">
                            Create your restaurant account and start
                            showcasing your food.
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
                        onSubmit={handleSubmit(registerFoodPartner)}
                        className="mt-8 space-y-5"
                    >

                        {/* Restaurant Name */}
                        <div>
                            <label
                                htmlFor="name"
                                className="mb-2 block text-sm font-medium"
                            >
                                Restaurant Name
                            </label>

                            <input
                                id="name"
                                type="text"
                                placeholder="Enter restaurant name"
                                {...register("name", {
                                    required: "Restaurant name is required",
                                })}
                                className="w-full rounded-lg border border-zinc-700 bg-zinc-900 px-4 py-3 text-white outline-none placeholder:text-zinc-500 focus:border-white"
                            />

                            {errors.name && (
                                <p className="mt-2 text-sm text-red-400">
                                    {errors.name.message}
                                </p>
                            )}
                        </div>

                        {/* Contact Name */}
                        <div>
                            <label
                                htmlFor="contactName"
                                className="mb-2 block text-sm font-medium"
                            >
                                Contact Person
                            </label>

                            <input
                                id="contactName"
                                type="text"
                                placeholder="Enter contact person's name"
                                {...register("contactName", {
                                    required: "Contact person is required",
                                })}
                                className="w-full rounded-lg border border-zinc-700 bg-zinc-900 px-4 py-3 text-white outline-none placeholder:text-zinc-500 focus:border-white"
                            />

                            {errors.contactName && (
                                <p className="mt-2 text-sm text-red-400">
                                    {errors.contactName.message}
                                </p>
                            )}
                        </div>

                        {/* Phone */}
                        <div>
                            <label
                                htmlFor="phone"
                                className="mb-2 block text-sm font-medium"
                            >
                                Phone Number
                            </label>

                            <input
                                id="phone"
                                type="tel"
                                placeholder="Enter phone number"
                                {...register("phone", {
                                    required: "Phone number is required",
                                })}
                                className="w-full rounded-lg border border-zinc-700 bg-zinc-900 px-4 py-3 text-white outline-none placeholder:text-zinc-500 focus:border-white"
                            />

                            {errors.phone && (
                                <p className="mt-2 text-sm text-red-400">
                                    {errors.phone.message}
                                </p>
                            )}
                        </div>

                        {/* Address */}
                        <div>
                            <label
                                htmlFor="address"
                                className="mb-2 block text-sm font-medium"
                            >
                                Restaurant Address
                            </label>

                            <textarea
                                id="address"
                                rows="3"
                                placeholder="Enter restaurant address"
                                {...register("address", {
                                    required: "Restaurant address is required",
                                })}
                                className="w-full resize-none rounded-lg border border-zinc-700 bg-zinc-900 px-4 py-3 text-white outline-none placeholder:text-zinc-500 focus:border-white"
                            />

                            {errors.address && (
                                <p className="mt-2 text-sm text-red-400">
                                    {errors.address.message}
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
                                placeholder="Enter email"
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
                            {loading
                                ? "Creating Account..."
                                : "Create Food Partner Account"}
                        </button>

                    </form>

                    {/* Login */}
                    <p className="mt-8 text-center text-sm text-gray-400">
                        Already have a food partner account?{" "}
                        <Link
                            to="/food-partner/login"
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

export default FoodPartnerRegister;