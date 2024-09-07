import React from 'react';
import { FaEye,FaEdit,FaTrash} from 'react-icons/fa';
import { useNavigate } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify'; 
import 'react-toastify/dist/ReactToastify.css'; 
import { Bounce } from 'react-toastify';
import { useSelector } from 'react-redux';


const TicketCard = ({ ticket, onDelete,onClick,onEdit }) => {
  const navigate=useNavigate();
  const {currentUser}=useSelector((state)=>state.user)
  // if(currentUser.role==='admin'){
  const handleDelete = async () => {
    try {
      await onDelete(ticket._id);
    } catch (error) {
      console.error('Error handling delete:', error);
    }
  };
  // }
  const handleEdit=async()=>{
    navigate(`/edit/${ticket._id}`)
  }

  const handleViewDetails = () => {
    navigate(`/purchasedetails/${ticket._id}`);

  };

  const handleImageClick = (e) => {
    e.stopPropagation(); // Prevents the click event from reaching the parent element
  //  onClick(); // Calls the function to handle viewing the ticket
};
  
    return (
        <div
            onClick={onClick}
            className="bg-white shadow-md rounded-lg p-4 cursor-pointer hover:shadow-lg transition-shadow"
        >
      
            <img
                src={ticket.coverImage}
                alt={ticket.ticketName}
                className="w-full h-48 object-cover rounded-lg mb-4"
            />
            
            <h2 className="text-xl font-semibold text-gray-800">{ticket.ticketName}</h2>
            <p className="text-gray-600 mt-2">{ticket.ticketDescription}</p>
            <div className="mt-4 flex items-center justify-between">
                <span className="text-lg font-semibold text-gray-800">₹{ticket.ticketPrice}</span>
                <span className="text-sm text-gray-600">Seats: {ticket.ticketSeatAvailable}</span>
                <FaEye className="text-gray-600 cursor-pointer hover:text-blue-500" />
            </div>
        
      {currentUser.role === 'admin' && (
            <div className="cursor-pointer" >
            <div className="mt-auto flex gap-4">
        <button
          onClick={(e) => { handleImageClick(e); handleEdit()}}
          className="text-blue-500 hover:text-blue-700 flex items-center"
        >
          <FaEdit className="mr-1" /> Edit
        </button>
        <button
         onClick={ (e) => { handleImageClick(e); handleDelete()}}
          className="text-red-500 hover:text-red-700 flex items-center"
        >
          <FaTrash className="mr-1" /> Delete
        </button>

        {/* <button
          onClick={() => onDelete(ticket._id)}
          className="text-red-500 hover:text-red-700 flex items-center"
        >
          <FaTrash className="mr-1" /> Delete
        </button> */}
      </div>
      </div>
        )}
      <ToastContainer/>
        </div>
    );
};

export default TicketCard;
