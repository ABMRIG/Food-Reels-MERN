import api from "./api";

//so we made an object authService that has a property registerUser that send data to the respective API
const authService = {
    registerUser: async (userData) => {
        const response = await api.post(`/api/auth/user/register`, userData);

        //we write reponse.data, the property "data" is given by "Axios" and is not mentioned in backend
        return response.data;
    },

    loginUser: async (userData) => {
        const response = await api.post(`/api/auth/user/login`, userData);

        return response.data;
    },
    registerFoodPartner: async (userData) => {
        const response = await api.post("/api/auth/foodpartner/register", userData);

        return response.data;
    },

    loginFoodPartner: async (userData) => {
        const response = await api.post("/api/auth/foodpartner/login", userData);

        return response.data;
    },

    getCurrentAccount: async () => {
        const response = await api.get("/api/auth/me");

        //the backend sends us something like:
        //
        //    message: "...",
        //    accountType: "user",
        //    account: {...}
        //
        return response.data;
    },

    logoutUser: async () => {
        const response = await api.get("/api/auth/user/logout");
        return response.data;
    },

    logoutFoodPartner: async () => {
        const response = await api.get("/api/auth/foodpartner/logout");
        return response.data;
    },
};

export default authService;
