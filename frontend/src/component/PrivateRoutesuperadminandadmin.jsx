import React from 'react'
import { useSelector} from 'react-redux'
import { Navigate, Outlet } from 'react-router-dom'

const PrivateRoutesuperadminandadmin = () => {
    const {currentUser}=useSelector((state)=>state.user)
    if(currentUser.role==='superadmin'||currentUser.role==='admin')
    {
      return   <Outlet/>
    }
    else
   return  <Navigate to="/signin"/>
}

export default PrivateRoutesuperadminandadmin
