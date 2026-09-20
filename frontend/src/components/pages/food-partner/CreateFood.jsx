import { useState } from "react";
// import { Link, useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import foodService from "../../../services/food";


function CreateFood() {

    const {
        register,
        handleSubmit,
        reset
    } = useForm()

    const [error, setError] = useState("");
    const [loading, setLoading] = useState(false);
    const [success, setSuccess] = useState("");

    // const navigate = useNavigate();

    async function submitFood(data){

        setError("");
        setLoading(true);
        setSuccess("")

        try {
            //this is a class provided by JS
            const formData = new FormData();

            formData.append("name", data.name);
            formData.append("description", data.description);

            //data.video is a FileList because this is a file input
            //we need the first selected file
            formData.append("video", data.video[0])

            const response = await foodService.createFood(formData);

            console.log("FOOD CREATED:", response)
            setSuccess("Food uploaded Successfully!")

            //clears the form after successful upload
            reset();
        } catch (error) {
            console.log("CREATE FOOD ERROR:", error);
            console.log(
                "CREATE FOOD ERROR RESPONSE:",
                error.response
            );

            setError(
                error.response?.data?.message ||
                "Something went wrong while uploading the food."
            );
        }
        finally{
            setLoading(false);
        }


    }

    return (
        <main className="min-h-screen bg-black text-white px-5 py-8">

            <div className="mx-auto max-w-2xl">

                {/* Back link
                <Link
                    to="/"
                    className="text-sm text-gray-400 hover:text-white"
                >
                    ← Back
                </Link> */}


                {/* Heading */}
                <div className="mt-8">

                    <h1 className="text-3xl font-bold">
                        Create Food
                    </h1>

                    <p className="mt-2 text-gray-400">
                        Upload a new food video for your restaurant.
                    </p>

                </div>


                {/* Error message */}
                {error && (
                    <div className="mt-6 rounded-lg border border-red-500/30 bg-red-500/10 px-4 py-3 text-sm text-red-400">
                        {error}
                    </div>
                )}


                {/* Success message */}
                {success && (
                    <div className="mt-6 rounded-lg border border-green-500/30 bg-green-500/10 px-4 py-3 text-sm text-green-400">
                        {success}
                    </div>
                )}


                {/* Create Food Form */}
                <form
                    onSubmit={handleSubmit(submitFood)}
                    className="mt-8 space-y-6"
                >

                    {/* Food Name */}
                    <div>

                        <label
                            htmlFor="name"
                            className="mb-2 block text-sm font-medium"
                        >
                            Food Name
                        </label>

                        <input
                            id="name"
                            type="text"
                            placeholder="Enter food name"
                            {...register("name", {
                                required: "Food name is required"
                            })}
                            className="w-full rounded-lg border border-zinc-700 bg-zinc-900 px-4 py-3 text-white outline-none placeholder:text-zinc-500 focus:border-white"
                        />

                    </div>


                    {/* Description */}
                    <div>

                        <label
                            htmlFor="description"
                            className="mb-2 block text-sm font-medium"
                        >
                            Description
                        </label>

                        <textarea
                            id="description"
                            rows="4"
                            placeholder="Describe the food..."
                            {...register("description")}
                            className="w-full resize-none rounded-lg border border-zinc-700 bg-zinc-900 px-4 py-3 text-white outline-none placeholder:text-zinc-500 focus:border-white"
                        />

                    </div>


                    {/* Video */}
                    <div>

                        <label
                            htmlFor="video"
                            className="mb-2 block text-sm font-medium"
                        >
                            Food Video
                        </label>

                        <input
                            id="video"
                            type="file"
                            accept="video/*"
                            {...register("video", {
                                required: "Please select a video"
                            })}
                            className="block w-full cursor-pointer rounded-lg border border-zinc-700 bg-zinc-900 text-sm text-gray-300 file:mr-4 file:border-0 file:bg-white file:px-4 file:py-3 file:font-semibold file:text-black hover:file:bg-gray-200"
                        />

                        <p className="mt-2 text-xs text-gray-500">
                            Select a video file to upload.
                        </p>

                    </div>


                    {/* Submit */}
                    <button
                        type="submit"
                        disabled={loading}
                        className="w-full rounded-lg bg-white px-5 py-3 font-semibold text-black transition hover:bg-gray-200 disabled:cursor-not-allowed disabled:opacity-50"
                    >
                        {loading ? "Uploading..." : "Upload Food"}
                    </button>

                </form>

            </div>

        </main>
    );
}

export default CreateFood
