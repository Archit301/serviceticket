import React from 'react'
import { useSelector} from 'react-redux'
import { Navigate, Outlet } from 'react-router-dom'

const PrivateRoutesuperadmin = () => {
    const {currentUser}=useSelector((state)=>state.user)
    return currentUser.role==='superadmin'?<Outlet/>:<Navigate to="/signin"/>
}

export default PrivateRoutesuperadmin
