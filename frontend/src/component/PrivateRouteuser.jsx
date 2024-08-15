import React from 'react'
import { useSelector} from 'react-redux'
import { Navigate, Outlet } from 'react-router-dom'

const PrivateRouteuser = () => {
  const {currentUser}=useSelector((state)=>state.user)
  console.log(currentUser)
  return currentUser.role==='user'?<Outlet/>:<Navigate to="/signin"/>
}

export default PrivateRouteuser