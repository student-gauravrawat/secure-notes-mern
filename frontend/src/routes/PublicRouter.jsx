import { useSelector } from "react-redux";
import { Navigate } from "react-router-dom";


function PublicRoute ({ children }){
  const user = useSelector(state=> state.user.authUser)

  if(user){
     return <Navigate to="/" replace/>
  }
  
  return children;
}

export default PublicRoute;