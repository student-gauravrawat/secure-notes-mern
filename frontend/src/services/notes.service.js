import api from "../utils/axiosInterceptor"
import toast from "react-hot-toast"

export const addNotes = async(data)=>{
  try {
   const response = await api.post(`/notes/add-notes`,
        data,
        {
            headers: {
                "Content-Type": "application/json"
            }
        }
    )

    toast.success(response?.data?.message)
    return response.data

  } catch (error) {
        const msg = error?.response?.data?.error ||
                           error?.response?.data?.message ||
                           "Something went wrong"
                 toast.error(msg)  
                 console.log(error?.response?.data)
  }
}

export const updateNotes = async(notesId, data)=>{
    try {
       const response = await api.patch(`/notes/update-notes/${notesId}`,
            data,
            {
                headers: {
                    "Content-Type": "application/json"
                }
            }
        )

        toast.success(response?.data?.message)
        return response.data

    } catch (error) {
         const msg = error?.response?.data?.error ||
                    error?.response?.data?.message ||
                    "Something went wrong"
          toast.error(msg)  
          console.log(error?.response?.data)
    }
}

export const deleteNotes = async(notesId)=>{
  try {
     const response = await api.delete(`notes/delete-notes/${notesId}`)

     toast.success(response?.data?.message)
     return response.data

  } catch (error) {
       const msg = error?.response?.data?.error ||
                    error?.response?.data?.message ||
                    "Something went wrong"
          toast.error(msg)  
          console.log(error?.response?.data)
  }
}

