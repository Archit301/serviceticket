import React from 'react'
import { useSelector} from 'react-redux'
import { Navigate, Outlet } from 'react-router-dom'

const PrivateRouteadmin = () => {
  const {currentUser}=useSelector((state)=>state.user)
  // return currentUser.role==='admin'?<Outlet/>:<Navigate to="/signin"/>
  if(currentUser.role==='admin'&& currentUser.requestStatus==='approved')
    {
      return   <Outlet/>
    }
    else
   return  <Navigate to="/signin"/>
}

export default PrivateRouteadmin