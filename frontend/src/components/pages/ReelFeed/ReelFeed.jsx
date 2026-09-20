import { Link } from "react-router-dom";
import { useEffect } from "react";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

import {
    faHeart as faHeartRegular,
    faBookmark as faBookmarkRegular,
} from "@fortawesome/free-regular-svg-icons";

import {
    faHeart as faHeartSolid,
    faBookmark as faBookmarkSolid,
} from "@fortawesome/free-solid-svg-icons";

function ReelFeed({ foodItems, onLike, onSave }) {

    //this makes sure that only the reel currently visible on screen plays*
    //when we scroll to another reel, the previous video is paused*
    //when we come back to it, the video starts playing again*
    useEffect(() => {

        const videos = document.querySelectorAll("video");

        const observer = new IntersectionObserver(
            (entries) => {

                entries.forEach((entry) => {

                    const video = entry.target;

                    if (entry.isIntersecting) {

                        //play the video when its reel becomes visible*
                        video.play().catch(() => {
                            //browser may reject play in some situations*
                        });

                    } else {

                        //pause videos that are no longer visible*
                        video.pause();

                    }

                });

            },
            {
                threshold: 0.6,
            }
        );

        videos.forEach((video) => {
            observer.observe(video);
        });

        //cleanup when component is removed*
        return () => {
            observer.disconnect();
        };

    }, [foodItems]);


    return (

        <main className="h-screen w-full overflow-y-auto snap-y snap-mandatory flex flex-col items-center">

            {foodItems.map((food) => (

                <section
                    key={food._id}
                    className="relative h-screen w-full shrink-0 snap-start bg-black md:w-125"
                >

                    {/* Food video */}

                    <video
                        src={food.video}
                        autoPlay
                        muted
                        loop
                        playsInline
                        className="h-full w-full object-cover"
                    />

                    {/* Dark gradient at the bottom so the text is easier to read */}

                    <div className="absolute inset-x-0 bottom-0 h-1/2 bg-linear-to-t from-black/80 to-transparent pointer-events-none">
                    </div>


                    {/* Food information */}

                    <div className="absolute bottom-8 left-6 right-24 text-white">

                        <h2 className="text-2xl font-bold">
                            {food.name}
                        </h2>

                        <p className="mt-2 text-base">
                            {food.description}
                        </p>

                        <Link
                            to={`/food-partner/${food.foodPartner}`}
                            className="mt-5 inline-block text-base font-semibold underline"
                        >
                            View Food Partner
                        </Link>

                    </div>


                    {/* Like and Save buttons */}

                    <div className="absolute bottom-24 right-5 flex flex-col items-center gap-6 text-white">

                        {/* Like */}

                        <button
                            type="button"
                            onClick={() => onLike(food._id)}
                            className="flex flex-col items-center gap-1 transition-transform active:scale-90"
                        >

                            <FontAwesomeIcon
                                icon={
                                    food.isLiked
                                        ? faHeartSolid
                                        : faHeartRegular
                                }
                                className={`text-3xl ${food.isLiked
                                        ? "text-red-500"
                                        : "text-white"
                                    }`}
                            />

                            <span className="text-sm font-semibold">
                                {food.likeCount}
                            </span>

                        </button>


                        {/* Save */}

                        <button
                            type="button"
                            onClick={() => onSave(food._id)}
                            className="flex flex-col items-center gap-1 transition-transform active:scale-90"
                        >

                            <FontAwesomeIcon
                                icon={
                                    food.isSaved
                                        ? faBookmarkSolid
                                        : faBookmarkRegular
                                }
                                className={`text-3xl ${food.isSaved
                                        ? "text-yellow-400"
                                        : "text-white"
                                    }`}
                            />

                            <span className="text-sm font-semibold">
                                {food.savesCount}
                            </span>

                        </button>

                    </div>

                </section>

            ))}

        </main>
    );
}

export default ReelFeed;