import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
    faHeart,
    faBookmark,
} from "@fortawesome/free-regular-svg-icons";

import foodService from "../../../services/food"

function SavedFoods() {
    const [savedFoods, setSavedFoods] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");


    useEffect(() => {

        async function fetchSavedFoods() {

            try {
                const response = await foodService.getSavedFoods();

                setSavedFoods(response.savedFoods);
            } catch (err) {
                console.log("SAVED FOOD FETCH ERROR:", err);
                console.log(
                    "SAVED FOOD FETCH ERROR RESPONSE:",
                    err.response
                );

                //backend returns 404 if user has no saved foods
                if (err.response?.status === 404) {
                    setSavedFoods([])
                }
                else {
                    setError("Something went wrong while fetching your saved foods.")
                }
            }
            finally {
                setLoading(false);
            }
        }

        fetchSavedFoods();

    }, [])

    if (loading) {
        return (
            <div className="flex min-h-screen items-center justify-center bg-black text-white">
                <p className="text-lg">Loading saved foods...</p>
            </div>
        );
    }

    if (error) {
        return (
            <div className="flex min-h-screen items-center justify-center bg-black text-white">
                <p className="text-lg">{error}</p>
            </div>
        );
    }

    if (savedFoods.length === 0) {
        return (
            <div className="flex min-h-screen flex-col items-center justify-center bg-black px-6 text-center text-white">
                <FontAwesomeIcon
                    icon={faBookmark}
                    className="mb-5 text-5xl"
                />

                <h1 className="text-3xl font-bold">
                    No saved foods yet
                </h1>

                <p className="mt-3 text-gray-400">
                    Foods that you save will appear here.
                </p>

                <Link
                    to="/home"
                    className="mt-6 rounded-lg bg-white px-5 py-3 font-semibold text-black transition hover:bg-gray-200"
                >
                    Explore Foods
                </Link>
            </div>
        )
    }

    return (
        <main className="min-h-screen bg-black px-6 py-8 text-white">
            <div className="mx-auto max-w-6xl">
                <h1 className="mb-8 text-3xl font-bold">
                    Saved Foods
                </h1>

                <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
                    {savedFoods.map((savedItem) => {
                        const food = savedItem.food;

                        return (
                            <article key={savedItem._id}
                                className="overflow-hidden rounded-xl bg-zinc-900">
                                {/* Food video */}
                                <div className="aspect-9/16 w-full bg-black">

                                    <video
                                        src={food.video}
                                        controls
                                        loop
                                        muted
                                        playsInline
                                        className="h-full w-full object-cover"
                                    />

                                </div>

                                {/* Food information */}
                                <div className="p-5">

                                    <h2 className="text-xl font-bold">
                                        {food.name}
                                    </h2>

                                    <p className="mt-2 line-clamp-2 text-sm text-gray-400">
                                        {food.description}
                                    </p>

                                    {/* Counts */}
                                    <div className="mt-4 flex items-center gap-5 text-sm text-gray-300">

                                        <span className="flex items-center gap-2">
                                            <FontAwesomeIcon icon={faHeart} />
                                            {food.likeCount}
                                        </span>

                                        <span className="flex items-center gap-2">
                                            <FontAwesomeIcon icon={faBookmark} />
                                            {food.savesCount}
                                        </span>

                                    </div>

                                    {/* Food partner */}
                                    <Link
                                        to={`/food-partner/${food.foodPartner}`}
                                        className="mt-5 inline-block font-semibold underline"

                                        onClick={() => {
                                            window.scrollTo(0, 0);
                                        }}
                                    >
                                        View Food Partner
                                    </Link>

                                </div>
                            </article>
                        )
                    })}

                </div>
            </div>

        </main>
    )


}

export default SavedFoods;