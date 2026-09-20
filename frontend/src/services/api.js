import axios from "axios"

const api = axios.create({
    baseURL: "http://localhost:3000",
    // since we are using cookies to handle authentication so we need withCredentials: true
    withCredentials: true,
})

export default api