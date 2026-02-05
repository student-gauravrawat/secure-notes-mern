import React, { useEffect, useState } from "react";
// import { MdEdit, MdDelete } from "react-icons/md";
import { Input } from "../index";
import {addNotes, updateNotes, deleteNotes} from "../../services/notes.service"
import { useDispatch, useSelector } from "react-redux";
import { getUser } from "../../services/auth.service";
import { setAuthUser } from "../../redux/userSlice";

function AllNotes() {
 
  const user = useSelector(state=> state.user.authUser)
  const dispatch = useDispatch()
  const notes = user?.todos || []
  const [noteText, setNoteText] = useState("")
  const [editId, setEditId] = useState(null)
   
  // console.log(user)

  const refreshUser = async()=>{
        const res = await getUser()
        // console.log(res.data)
        dispatch(setAuthUser(res?.data))
  }

  useEffect(() => {
    refreshUser();
  }, []);

  const handleSubmit = async(e)=>{
    e.preventDefault()
    if(editId){
         await updateNotes(editId, {content: noteText})
         setEditId(null)
    }else{
         await addNotes({content: noteText})
    }

    setNoteText("")
    refreshUser()
  }

  const handleToggle = async(note)=>{
      await updateNotes( note._id, { complete: !note.complete })
      refreshUser()
  }

  const handleEdit = (note)=>{
      setNoteText(note.content)
      setEditId(note._id)
  }

  const handleDelete = async(id)=>{
     await deleteNotes(id)
     refreshUser()
  }

  return (
    <div className="flex flex-col items-center w-full px-4 gap-6">

      <div className="w-full lg:w-1/3 flex justify-center  ">
          <Input
            value={noteText}
            onChange={setNoteText}
            onSubmit={handleSubmit}
            isEditing={!!editId}
          />
      </div>

      <div className="w-full max-w-2xl space-y-4">
        {notes.map((note) => (
          <div key={note._id} className="bg-white/80 backdrop-blur-md shadow-lg rounded-2xl p-5 border border-white/20">
              <div className="flex items-start justify-between gap-4">
                <input
                  type="checkbox"
                  checked={note.complete}
                  onChange={()=> handleToggle(note)}
                  className="w-5 h-5 mt-1 accent-blue-600 cursor-pointer shrink-0"
                />

                {/* Note Content */}
                <div className="flex-1 min-w-0">
                  <p className={`text-gray-800 font-medium leading-relaxed wrap-break-word ${note.complete ? "line-through font-mono text-xl opacity-60" : ""}`}>
                    {note.content}
                  </p>
                </div>

                {/* Action Buttons - flex-shrink-0 so that button can be pushed */}
                <div className="flex items-center gap-1 shrink-0">
                  <button onClick={()=> handleEdit(note)}
                          className="px-3 py-1 text-sm font-semibold text-blue-600 hover:bg-blue-500 hover:text-white rounded-md transition-colors">
                    Edit
                  </button>
                  <button onClick={()=> handleDelete(note._id)}
                          className="px-3 py-1 text-sm font-semibold text-red-500 hover:bg-red-500 hover:text-white rounded-md transition-colors">
                    Delete
                  </button>
                </div>
              </div>
          </div>
        ))}
      </div>

    </div>
  );
}


export default AllNotes;
