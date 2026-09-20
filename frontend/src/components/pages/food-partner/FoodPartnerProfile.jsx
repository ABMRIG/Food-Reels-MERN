import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import foodService from "../../../services/food";

function FoodPartnerProfile() {

    const { id } = useParams();

    const [foodPartner, setFoodPartner] = useState(null)
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("")

    useEffect(()=>{

        async function fetchFoodPartner(){

            try{
                const response = await foodService.getFoodPartnerById(id);

                setFoodPartner(response.foodPartner);
            }
            catch(err){
                console.log("FOOD PARTNER FETCH ERROR:", err)
                console.log(
                    "FOOD PARTNER FETCH ERROR RESPONSE:",
                    err.response
                );

                setError("Something went wrong while fetching the food partner.");
            }
            finally{
                setLoading(false);
            }
        }
        fetchFoodPartner()
    },[id])

    if (loading){
        return (
            <div className="min-h-screen bg-black text-white flex items-center justify-center">
                <p>Loading food partner...</p>
            </div>
        )
    }

    if (error){
        return(
             <div className="min-h-screen bg-black text-white flex items-center justify-center">
                <p>{error}</p>
            </div>
        )
    }

    if (!foodPartner){
        return (
            <div className="min-h-screen bg-black text-white flex items-center justify-center">
                <p>Food partner not found.</p>
            </div>
        )
    }

    return (
        <main className="min-h-screen bg-black text-white px-5 py-8">
            {/* Back to Home */}
            <Link
                to="/"
                className="inline-block mb-8 text-sm font-semibold text-gray-300 hover:text-white"
            >
                ← Back to Home
            </Link>

            {/* food partner information */}
            <section className="mx-auto max-w-4xl">
                <div className="border-b border-gray-800 pb-8">
                    <h1 className="text-3xl font-bold">
                        {foodPartner.name}
                    </h1>

                    <p className="mt-2 text-gray-400">
                        Food Partner
                    </p>

                    <div className="mt-6 grid gap-4 sm:grid-cols-2">
                        <div>
                            <p className="text-sm text-gray-500">
                                Contact Person
                            </p>

                            <p className="mt-1 text-base">
                                {foodPartner.contactName}
                            </p>
                        </div>

                        <div>
                            <p className="text-sm text-gray-500">
                                Phone
                            </p>

                            <p className="mt-1 text-base">
                                {foodPartner.phone}
                            </p>
                        </div>


                        <div>
                            <p className="text-sm text-gray-500">
                                Email
                            </p>

                            <p className="mt-1 text-base break-all">
                                {foodPartner.email}
                            </p>
                        </div>


                        <div>
                            <p className="text-sm text-gray-500">
                                Address
                            </p>

                            <p className="mt-1 text-base">
                                {foodPartner.address}
                            </p>
                        </div>
                    </div>

                </div>

                {/* food videos */}
                <section className="pt-8">
                    <h2 className="text-2xl font-bold">
                        Food Videos
                    </h2>

                    {foodPartner.foodItems.length === 0 ?
                    (
                        <p className="mt-6 text-gray-400">This food partner hasn't uploaded any food videos yet.</p>
                    ):(
                        <div className="mt-6 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
                            {foodPartner.foodItems.map((food) => (
                                <article
                                    key={food._id}
                                    className="overflow-hidden rounded-xl bg-zinc-900"
                                >

                                    <video
                                        src={food.video}
                                        controls
                                        muted
                                        playsInline
                                        className="aspect-9/16 w-full object-cover"
                                    />

                                    <div className="p-4">

                                        <h3 className="text-lg font-semibold">
                                            {food.name}
                                        </h3>

                                        {food.description && (
                                            <p className="mt-2 text-sm text-gray-400">
                                                {food.description}
                                            </p>
                                        )}

                                        <div className="mt-4 flex gap-4 text-sm text-gray-400">

                                            <span>
                                                ♥ {food.likeCount}
                                            </span>

                                            <span>
                                                🔖 {food.savesCount}
                                            </span>

                                        </div>

                                    </div>

                                </article>
                            ))}
                        </div>
                    )}
                </section>

            </section>
        </main>
    )
}

export default FoodPartnerProfile