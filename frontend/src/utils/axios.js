import axios from "axios"

const api = axios.create({
    baseURL: "https://secure-notes-mern.onrender.com/api/v1",
    withCredentials: true
})

export default api;