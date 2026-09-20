import { useState } from "react";
// import { Link, useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { upload } from "@imagekit/javascript";
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
    const [uploadProgress, setUploadProgress] = useState(0);

    // const navigate = useNavigate();

    async function submitFood(data){

        setError("");
        setLoading(true);
        setSuccess("");
        setUploadProgress(0);

        try {
            //data.video is a FileList because this is a file input
            //we need the first selected file
            const videoFile = data.video[0];

            if (!videoFile) {
                setError("Please select a video");
                setLoading(false);
                return;
            }

            //first we ask our backend for temporary ImageKit authentication details
            //these details allow the browser to upload the video directly to ImageKit
            const authentication =
                await foodService.getImageKitUploadAuthentication();

            console.log(
                "IMAGEKIT AUTHENTICATION:",
                authentication
            );

            //now the browser uploads the video directly to ImageKit
            //the video does not pass through our backend
            const uploadResponse = await upload({
                file: videoFile,
                fileName: videoFile.name,
                publicKey: authentication.publicKey,
                token: authentication.token,
                signature: authentication.signature,
                expire: authentication.expire,

                //this gives us the upload progress
                onProgress: (event) => {
                    const progress = Math.round(
                        (event.loaded / event.total) * 100
                    );
                    setUploadProgress(progress);
                },
            });

            console.log(
                "IMAGEKIT UPLOAD RESPONSE:",
                uploadResponse
            );

            //ImageKit gives us the URL of the uploaded video
            //we only need to save this URL in our database
            const foodData = {
                name: data.name,
                description: data.description,
                video: uploadResponse.url,
            };

            //now we create the food document in MongoDB
            const response = await foodService.createFood(foodData);

            console.log("FOOD CREATED:", response);

            setSuccess("Food uploaded Successfully!");

            //clears the form after successful upload
            reset();
            setUploadProgress(0);

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


                    {/* Upload progress */}
                    {loading && uploadProgress > 0 && (

                        <div>
                            <div className="mb-2 flex justify-between text-xs text-gray-400">
                                <span>
                                    Uploading video...
                                </span>

                                <span>
                                    {uploadProgress}%
                                </span>
                            </div>

                            <div className="h-2 w-full overflow-hidden rounded-full bg-zinc-800">
                                <div
                                    className="h-full rounded-full bg-white transition-all duration-200"
                                    style={{
                                        width: `${uploadProgress}%`
                                    }}
                                />
                            </div>
                        </div>

                    )}


                    {/* Submit */}
                    <button
                        type="submit"
                        disabled={loading}
                        className="w-full rounded-lg bg-white px-5 py-3 font-semibold text-black transition hover:bg-gray-200 disabled:cursor-not-allowed disabled:opacity-50"
                    >

                        {loading
                            ? uploadProgress > 0
                                ? `Uploading... ${uploadProgress}%`
                                : "Preparing upload..."
                            : "Upload Food"
                        }

                    </button>
                    
                </form>
            </div>
        </main>

    );

}

export default CreateFood