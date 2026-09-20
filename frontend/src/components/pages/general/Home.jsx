import { useEffect, useState } from "react";
import foodService from "../../../services/food";
import ReelFeed from "../ReelFeed/ReelFeed";

function Home() {

    const [foodItems, setFoodItems] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");

    //fetch all food items
    useEffect(() => {

        async function fetchFoodItems() {
            try {
                //this fetches all the food items for our feed
                const response = await foodService.getFoodItems();

                setFoodItems(response.foodItems)
            }
            catch (err) {
                console.log("FOOD FETCH ERROR:", err);
                console.log("FOOD FETCH ERROR RESPONSE:", err.response);

                setError("Something went wrong while fetching food items.");
            }
            finally {
                setLoading(false)
            }
        }

        fetchFoodItems()
    }, [])

    //this function will handle liking/unliking a food item
    async function handleLike(foodId) {
        try {
            //server decides whether to like or unlike
            const response = await foodService.likeFood(foodId);

            //update only the food item that was clicked
            setFoodItems((previousFoodItems) =>
                previousFoodItems.map((food) =>
                    food._id === foodId
                        ? {
                            ...food,
                            isLiked: response.isLiked,
                            likeCount: response.likeCount
                        }
                        : food
                )
            );
        }
        catch (err) {
            console.log("LIKE FOOD ERROR:", err);
            console.log("LIKE FOOD ERROR RESPONSE:", err.response);
        }
    }

    //this function handles saving/unsaving a food item
    async function handleSave(foodId) {
        try {
            //server decides if to save or unsave
            const response = await foodService.saveFood(foodId);

            //update only the food item that was clicked
            setFoodItems((previousFoodItems) =>
                previousFoodItems.map((food) =>
                    food._id === foodId
                        ? {
                            ...food,
                            isSaved: response.isSaved,
                            savesCount: response.savesCount
                        }
                        : food
                )
            );
        }
        catch (err) {
            console.log("SAVE FOOD ERROR:", err);
            console.log("SAVE FOOD ERROR RESPONSE:", err.response);
        }
    }

    if (loading)
        return <div>loading food...</div>

    if (error) {
        return <div>{error}</div>
    }

    return (
        <ReelFeed foodItems={foodItems} onLike={handleLike} onSave={handleSave} />
    )
}

export default Home