import React, { useEffect, useState } from 'react'
import { FaTicketAlt, FaCalendarCheck, FaCalendarTimes, FaBan } from 'react-icons/fa';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';

const Superadminhomepage = () => {
    const {currentUser}=useSelector((state)=>state.user)
    const navigate=useNavigate()
    const [stats, setStats] = useState({
        totalTickets: 0,
        availableTickets: 0,
        expiredTickets: 0,
        totalCreated: 0,
    });
    //let count="";
  const [count,setcount]=useState("")
  const [availableTickets,setavailableTickets]=useState("")
  const [expiredTickets,setexpiredTickets]=useState("")
  const [soldoutTicket,setsoldoutTicket]=useState("")
    useEffect(() => {
        // Fetch admin statistics from the API
        console.log(currentUser);
        const fetchStats = async () => {
            try {
                const res = await fetch('/backend/ticket/countallticket');
               const data= await res.json();
               console.log(data);
               setcount(data);
              // setStats({totalTickets: data});
            } catch (error) {
                console.error('Error fetching admin stats:', error);
            }
        };

        fetchStats();
    }, [currentUser._id]);


    useEffect(() => {
        // Fetch admin statistics from the API
        console.log(currentUser);
        const fetchStats = async () => {
            try {
                const res = await fetch(`/backend/ticket/countallsoldoutticket`);
               const data= await res.json();
               console.log(data);
               setsoldoutTicket(data);
              // setStats({totalTickets: data});
            } catch (error) {
                console.error('Error fetching admin stats:', error);
            }
        };

        fetchStats();
    }, [currentUser._id]);

    useEffect(() => {
        // Fetch admin statistics from the API
      //  console.log(currentUser);
        const fetchStats = async () => {
            try {
                const res = await fetch(`/backend/ticket/countallavailableticket`);
               const data= await res.json();
               console.log(data);
               setavailableTickets(data);
              // setStats({totalTickets: data});
            } catch (error) {
                console.error('Error fetching admin stats:', error);
            }
        };

        fetchStats();
    }, [currentUser._id]);

    useEffect(() => {
        // Fetch admin statistics from the API
      //  console.log(currentUser);
        const fetchStats = async () => {
            try {
                const res = await fetch(`/backend/ticket/countallexpiryticket`);
               const data= await res.json();
               console.log(data);
               setexpiredTickets(data);
              // setStats({totalTickets: data});
            } catch (error) {
                console.error('Error fetching admin stats:', error);
            }
        };

        fetchStats();
    }, [currentUser._id]);

    const handleSeeall=()=>{
     navigate('/superadminticketname');
    }

    const handleSeeavailable=()=>{
        navigate('/superadminticketavailablename');
       }

       const handleSeesoldout=()=>{
        navigate('/superadminticketsoldoutname');
       }

       const handleSeeexpiry=()=>{
        navigate('/superadminticketexpiryname');
       }

  return (
    <div className="bg-gray-100 min-h-screen p-6">
    <div className="max-w-6xl mx-auto">
        {/* Welcome Message */}
        <div className="bg-white shadow-md rounded-lg p-6 mb-8">
            <h1 className="text-3xl font-semibold text-gray-800">Welcome back, {currentUser.username}!</h1>
            <p className="text-gray-600 mt-2">Here’s a summary of your ticket statistics.</p>
        </div>

        {/* Statistics Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6" >
            <div className="bg-white shadow-md rounded-lg p-6 flex items-center cursor-pointer" onClick={handleSeeall}>
                <FaTicketAlt className="text-blue-500 text-3xl mr-4" />
                <div>
                    <h2 className="text-xl font-semibold text-gray-800">{count}</h2>
                    <p className="text-gray-600">Total Tickets Created</p>
                </div>
            </div>
            <div className="bg-white shadow-md rounded-lg p-6 flex items-center cursor-pointer" onClick={handleSeeavailable}>
                        <FaCalendarCheck className="text-green-500 text-3xl mr-4" />
                        <div>
                            <h2 className="text-xl font-semibold text-gray-800">{availableTickets}</h2>
                            <p className="text-gray-600">Available Tickets</p>
                        </div>
                    </div>

                    <div className="bg-white shadow-md rounded-lg p-6 flex items-center cursor-pointer" onClick={handleSeeexpiry}>
                        <FaCalendarTimes className="text-red-500 text-3xl mr-4" />
                        <div>
                            <h2 className="text-xl font-semibold text-gray-800">{expiredTickets}</h2>
                            <p className="text-gray-600">Expired Tickets</p>
                        </div>
                    </div>

                    <div className="bg-white shadow-md rounded-lg p-6 flex items-center cursor-pointer" onClick={handleSeesoldout}>
                    <FaBan className="text-red-500 text-3xl mr-4" />
                        <div>
                            <h2 className="text-xl font-semibold text-gray-800">{soldoutTicket}</h2>
                            <p className="text-gray-600">Tickets Sold Out</p>
                        </div>
                    </div>
           
        </div>
    </div>
</div>
  )
}

export default Superadminhomepage
