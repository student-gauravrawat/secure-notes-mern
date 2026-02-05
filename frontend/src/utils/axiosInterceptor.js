import api from "./axios";

api.interceptors.response.use(
    (response)=> response,
    async (error)=>{
      const originalResquest = error.config;

      if(error.response.status === 401 && !originalResquest._retry){
         originalResquest._retry = true;

         try {
            await api.post("/users/refresh-token")
            return api(originalResquest)

         } catch (error) {
            window.location.href = "/login"
            return Promise.reject(error)
         }
      }
      return Promise.reject(error)
    }
)

export default api;