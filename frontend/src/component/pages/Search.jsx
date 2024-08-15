import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';

const Search = () => {
    const navigate=useNavigate()
   const {currentUser}=useSelector(state=>state.user)
    const [loading, setLoading] = useState(false);
  const [tickets, settickets] = useState([]);
  const [showMore, setShowMore] = useState(false);


  useEffect(()=>{
    const urlParams = new URLSearchParams(location.search);
    const searchTermFromUrl = urlParams.get('searchTerm');
    const typeFromUrl = urlParams.get('type');
  const fetchTickets=async()=>{
    setLoading(true);
    setShowMore(false);
    const searchQuery = urlParams.toString();
    const res = await fetch(`/backend/ticket/get?${searchQuery}`);   
    const data = await res.json();
    if (data.length > 8) {
      setShowMore(true);
    } else {
      setShowMore(false);
    }
    settickets(data);
    setLoading(false);
}
fetchTickets()
},[location.search])
  
const handleClick=(ticketId)=>{
  console.log("hello")
navigate(`/viewticket/${ticketId}`)
}
const handleSubmit = (e) => {
    e.preventDefault();
    const urlParams = new URLSearchParams();
    const searchQuery = urlParams.toString();
    navigate(`/search?${searchQuery}`);
  };

  const onShowMoreClick = async () => {
    const numberOfListings = tickets.length;
    const startIndex = numberOfListings;
    const urlParams = new URLSearchParams(location.search);
    urlParams.set('startIndex', startIndex);
    const searchQuery = urlParams.toString();
    const res = await fetch(`/backend/ticket/get?${searchQuery}`);
    const data = await res.json();
    if (data.length < 9) {
      setShowMore(false);
    }
    settickets([...tickets, ...data]);
  };
  return (
    <div className='flex-1'>
  <h1 className='text-3xl font-semibold border-b p-4 text-slate-700 mt-5'>
    Listing Results:
  </h1>
  <div className='p-7 flex flex-wrap gap-6'>
    {!loading && tickets.length === 0 && (
      <p className='text-xl text-slate-700 w-full text-center'>
        No ticket found!
      </p>
    )}
    {loading && (
      <p className='text-xl text-slate-700 text-center w-full'>
        Loading...
      </p>
    )}

    {!loading &&
      tickets.map((listing) => (
        tickets.map(ticket => (
          <div key={ticket._id} className="bg-white shadow-lg rounded-lg overflow-hidden transition-transform transform hover:scale-105">
            <img
              src={ticket.coverImage}
              alt={ticket.ticketName}
              className="w-full h-48 object-cover"
            />
            <div className="p-4">
              <h3 className="text-xl font-semibold text-gray-800 mb-2">{ticket.ticketName}</h3>
              <p className="text-gray-600 mb-4">{ticket.ticketDescription}</p>
              <div className="flex justify-between items-center mb-4">
                <span className="text-lg font-semibold text-gray-800">${ticket.ticketPrice}</span>
                <span className="text-sm text-gray-500 capitalize">{ticket.category}</span>
              </div>
            { currentUser.role==="user" &&
            (  <button
                className="bg-blue-500 hover:bg-blue-600 text-white font-semibold py-2 px-4 rounded-lg w-full transition duration-300"
                onClick={() => handleClick(ticket._id)}
              >
                Book Now
              </button>)
}
            </div>
          </div>
        ))
    )  )}

    {showMore && (
      <button
        onClick={onShowMoreClick}
        className='text-green-700 hover:underline p-4 text-center w-full'
      >
        Show More
      </button>
    )}
  </div>
</div>

  )
}

export default Search
