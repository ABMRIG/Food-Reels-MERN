import api from "./api";

//this service will have all the API calls related to food

const foodService = {

    //this will bring all the food items to be displayed on the user's feed
    getFoodItems: async () => {
        const response = await api.get("/api/food");

        //we write reponse.data, the property "data" is given by "Axios" and is not mentioned in backend
        return response.data;
    },

    // this function sends a request to like or unlike a video
    //the backend decides which operation needs to be done
    likeFood: async (foodId) => {
        const response = await api.post("/api/food/like", {
            foodId: foodId
        })

        return response.data
    },

    saveFood: async (foodId) => {
        const response = await api.post("/api/food/save", {
            foodId: foodId
        })

        return response.data
    },

    getSavedFoods: async () => {
        const response = await api.get("/api/food/save");

        return response.data
    },

    getFoodPartnerById: async (foodPartnerId) => {
        const response = await api.get(`/api/food-partner/${foodPartnerId}`)


        return response.data;
    },

    createFood: async (foodData) => {
        const response = await api.post("/api/food", foodData);
        return response.data;
    },

}

export default foodService;