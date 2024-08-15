import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import { BrowserRouter,Route,Routes } from 'react-router-dom'
import Login from './auth/Login'
import SuperAdmin_listing from './component/SuperADmin/SuperAdmin_listing'
import Signup from './auth/Signup'
import Header from './component/pages/Header'
import Footer from './component/pages/Footer'
import Request from './component/admin/Request'
import PrivateRoute from './component/PrivateRoute'
import Adminhomepage from './component/admin/Adminhomepage'
import Adminticket from './component/admin/Adminticket'
import CreateTicket from './component/admin/CreateTicket'
import TicketPurchaseUserdetail from './component/pages/TicketPurchaseUserdetail'
import Feedback from './component/admin/Feedback'
import EditTicket from './component/admin/EditTicket'
import Aboutus from './component/pages/Aboutus'
import AdminticketName from './component/admin/AdminticketName'
import AdminavailableName from './component/admin/AdminavailableName'
import AdminsoldoutName from './component/admin/AdminsoldoutName'
import AdminexpiryName from './component/admin/AdminexpiryName'
import Adminbankdetail from './component/admin/Adminbankdetail'
import Superadminhomepage from './component/SuperADmin/Superadminhomepage'
import SuperAdminallName from './component/SuperADmin/SuperAdminallName'
import SuperAdminavailablename from './component/SuperADmin/SuperAdminavailablename'
import SuperAdminsoldoutName from './component/SuperADmin/SuperAdminsoldoutName'
import SuperAdminexpiryName from './component/SuperADmin/SuperAdminexpiryName'
import SuperAdminticket from './component/SuperADmin/SuperAdminticket'
import UserHomepage from './component/user/UserHomepage'
import UserticketView from './component/user/UserticketView'
import UserTicket from './component/user/UserTicket'
import UserMyticket from './component/user/UserMyticket'
import Profile from './component/pages/Profile'
import { useSelector } from 'react-redux'
import Search from './component/pages/Search'
import Contact from './component/pages/Contact'
import UserFeedback from './component/user/UserFeedback'
import PrivateRouteuser from './component/PrivateRouteuser'
import PrivateRouteadmin from './component/PrivateRouteadmin'
import PrivateRoutesuperadmin from './component/PrivateRoutesuperadmin'
import PrivateRoutesuperadminandadmin from './component/PrivateRoutesuperadminandadmin'

function App() {
  const [count, setCount] = useState(0)
  const {currentUser}=useSelector((state)=>state.user)
  const [error,seterror]=useState("");

  return (
    
    <>
      <BrowserRouter>
      { currentUser&& 
      <Header/>
} 
      <Routes>
      <Route path='/' element={<Login/>} />
      <Route path='/signin' element={<Signup/>}/>
      {/* { currentUser&&<> */}
      <Route  element={<PrivateRoute/>}>
      <Route path='/contact' element={<Contact />} /> 
      <Route path='/profile' element={<Profile/>} />
      <Route path='/search' element={<Search />} />
        <Route path='/about' element={<Aboutus/>} />
        <Route path='/request' element={<Request/>}/>
        </Route>
        {/* </>} */}
         {/* <Route  element={<PrivateRoute/>}> */}
          <Route  element={<PrivateRouteadmin/>}> 
        <Route path='/adminhomepage' element={<Adminhomepage/>}/>
        <Route path='/adminticket' element={<Adminticket/>}/>
        <Route path='/createticket' element={<CreateTicket/>}/>
        <Route path='/ticket/:ticketId/feedback/:userId' element={<Feedback/>} />
        <Route path='/edit/:ticketId' element={<EditTicket/>} />
        <Route path='/adminticketname' element={<AdminticketName/>}/>
        <Route path='/adminticketavailablename' element={<AdminavailableName/>}/>
        <Route path='/adminticketsoldoutname' element={<AdminsoldoutName/>}/>
        <Route path='/adminticketexpiryname' element={<AdminexpiryName/>}/>
        <Route path='/adminbankdetail' element={<Adminbankdetail/>}/>
         </Route> 
        <Route  element={<PrivateRoutesuperadminandadmin/>}>
        <Route path="/purchasedetails/:ticketId" element={<TicketPurchaseUserdetail />} />
        </Route>
        <Route  element={<PrivateRoutesuperadmin/>}>
        <Route path='/superadminhomepage' element={<Superadminhomepage/>} />
        <Route path='/superadminuserlist' element={<SuperAdmin_listing/>}/>
        <Route path='/superadminticketname' element={<SuperAdminallName/>}/>
        <Route path='/superadminticketavailablename' element={<SuperAdminavailablename/>}/>
        <Route path='/superadminticketsoldoutname' element={<SuperAdminsoldoutName/>}/>
        <Route path='/superadminticketexpiryname' element={<SuperAdminexpiryName/>}/>
        <Route path='/superadminticket' element={<SuperAdminticket/>}/>
        </Route>
        <Route  element={<PrivateRouteuser/>}>
        <Route path='/userhomepage' element={<UserHomepage/>}/>
        <Route path='/userticket' element={<UserTicket/>}/>
        <Route path='/usermyticket' element={<UserMyticket/>}/>
        <Route path='/viewticket/:ticketId' element={<UserticketView/>}/>
        <Route path='/feedback/:ticketId' element={<UserFeedback/>} />
        </Route>
        {/* </Route> */}
        
      </Routes>
      <Footer/>
      </BrowserRouter>
    </>
  )
}

export default App
