import React, { useEffect, useState } from 'react'
import Slider from 'react-slick';
import { FaChevronLeft, FaChevronRight } from 'react-icons/fa';
import { useNavigate } from 'react-router-dom';

const UserHomepage = () => {
    const [tickets,setTicket]=useState([])
    const navigate=useNavigate()
    useEffect(()=>{
        const latestticket=async()=>{
            try {
                const res = await fetch(`/backend/ticket/latestticket`);
               const data= await res.json();
               console.log(data);
               setTicket(data);
              // setStats({totalTickets: data});
            } catch (error) {
                console.error('Error fetching admin stats:', error);
            }
        }

        latestticket()
    },[])
    const handleClick=(ticketId)=>{
        console.log("hello")
   navigate(`/viewticket/${ticketId}`)
    }

    const handleexplore=()=>{
   
 navigate(`/userticket`)
  }
    const settings = {
        dots: true,
        infinite: true,
        speed: 500,
        slidesToShow: 1,
        slidesToScroll: 1,
        arrows: true,
        nextArrow: <FaChevronRight className="absolute right-4 top-1/2 transform -translate-y-1/2 text-white text-3xl" />,
        prevArrow: <FaChevronLeft className="absolute left-4 top-1/2 transform -translate-y-1/2 text-white text-3xl" />
      };
  return (
    <div>
    <div className="relative bg-gray-800 text-white">
    <div className="relative w-full h-96 bg-gray-800 bg-opacity-70 flex items-center justify-center">
    <div className="text-center px-4 md:px-8">
      <h1 className="text-4xl md:text-6xl font-bold text-white mb-4">
        Welcome to ServiceDesk
      </h1>
      <p className="text-lg md:text-2xl text-gray-300 mb-8">
        Discover your favorite events, enjoy seamless booking, and never miss out on exciting experiences.
      </p>
      <button className="bg-blue-500 hover:bg-blue-600 text-white font-semibold py-2 px-6 rounded-lg shadow-lg transition duration-300" onClick={handleexplore}>
        Explore Now
      </button>
    </div>
  </div>
    </div>
    <div className="latest-tickets mt-12 py-8 bg-gray-100">
      <div className="max-w-6xl mx-auto px-4">
        <h2 className="text-3xl font-bold text-gray-800 mb-6 text-center">Latest Tickets</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 ">
          {tickets.length > 0 ? (
            tickets.map(ticket => (
                <div key={ticket._id} className="bg-white shadow-lg rounded-lg p-4"  >
                <img src={ticket.coverImage} alt={ticket.ticketName} className="w-full h-40 object-cover rounded-t-lg mb-4" />
                <h3 className="text-xl font-semibold text-gray-800 mb-2">{ticket.ticketName} </h3>
                <p className="text-gray-600 mb-4">{ticket.ticketDescription}</p>
                <div className="flex justify-between items-center">
                  <span className="text-lg font-semibold text-gray-800">${ticket.ticketPrice}</span>
                  <button className="bg-blue-500 hover:bg-blue-600 text-white font-semibold py-2 px-4 rounded-lg cursor-pointer" onClick={() => handleClick(ticket._id)}>
                    Book Now
                  </button>
                </div>
              </div>
            ))
          ) : (
            <p className="text-center text-gray-500">No tickets available at the moment</p>
          )}
        </div>
      </div>
    </div>
</div>

  )
}

export default UserHomepage
