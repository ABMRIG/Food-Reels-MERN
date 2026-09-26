import axios from "axios"

//using axios we are able to: 
//send GET reqs to fetch food feeds, saved foods, profiles, auth status etc
//send POST reqs for registration, login, likes, saves and food creation
//prepaend urls like baseURL below
//send and receive auth cookies


const api = axios.create({
    //Why VITE_? Vite only exposes environment variables to frontend code when they begin with VITE_.

    baseURL: import.meta.env.VITE_API_URL || "http://localhost:3000",

    // since we are using cookies to handle authentication so we need withCredentials: true
    withCredentials: true,

})

export default api