import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { useNavigate, useParams } from 'react-router-dom';

const TicketPurchaseUserdetail = () => {
  const { ticketId } = useParams(); // Get ticketId from URL
  const [purchases, setPurchases] = useState([]);
  const [ticket, setticket] = useState([]);
  const navigate = useNavigate();
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage] = useState(10);
  const [filter, setfilter] = useState('');
  const { currentUser } = useSelector((state) => state.user);

  useEffect(() => {
    const fetchPurchaseDetails = async () => {
      try {
        const response = await fetch(`/backend/ticket/purchasedetail/${ticketId}`);
        const data = await response.json();
        setPurchases(data); // Adjust based on your response structure || []
      } catch (error) {
        console.error('Error fetching purchase details:', error);
      }
    };
    fetchPurchaseDetails();
  }, [ticketId]);

  useEffect(() => {
    const fetchDetails = async () => {
      try {
        const id = ticketId;
        const response = await fetch('/backend/ticket/detailticketone', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ id }),
        });
        const data = await response.json();
        setticket(data || []); // Adjust based on your response structure || []
      } catch (error) {
        console.error('Error fetching purchase details:', error);
      }
    };
    fetchDetails();
  }, [ticketId]);

  const handleFeedbackClick = (userId) => {
    navigate(`/ticket/${ticketId}/feedback/${userId}`);
  };

  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = purchases.slice(indexOfFirstItem, indexOfLastItem);

  // Handle page change
  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  // Generate page numbers
  const totalPages = Math.ceil(purchases.length / itemsPerPage);
  const pageNumbers = [...Array(totalPages).keys()].map((i) => i + 1);

  const [sortBy, setSortBy] = useState('date');
  const [orderBy, setOrderBy] = useState('asc');

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch(`/backend/ticket/purchasedetailone/${ticketId}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ sortBy, orderBy }),
      });
      const data = await response.json();
      setPurchases(data); // Adjust based on your response structure || []
    } catch (error) {
      console.error('Error fetching purchase details:', error);
    }
  };

  return (
    <div className="bg-gray-100 min-h-screen p-6">
      <h1 className="text-2xl font-bold mb-4">{ticket.ticketName}</h1>
      <img src={ticket.coverImage} alt={ticket.ticketName} className="w-full h-48 object-cover mb-4" />
      <p className="text-gray-700">{ticket.ticketDescription}</p>
      <p className="text-lg font-semibold mt-4">Price: ₹{ticket.ticketPrice}</p>
      <p className="text-sm mt-2">Seats Available: {ticket.ticketSeatAvailable}</p>
      <div className="max-w-6xl mx-auto bg-white shadow-md rounded-lg overflow-x-auto">
        <h1 className="text-2xl font-semibold p-6 border-b">Purchase By</h1>
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-6 p-4 bg-white shadow rounded-md">
          <form onSubmit={handleSubmit} className="flex flex-col sm:flex-row items-center w-full">
            <div className="flex items-center mb-4 sm:mb-0 sm:mr-4">
              <label className="text-lg font-semibold px-3">Sort By:</label>
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value)}
                className="p-2 border border-gray-300 rounded-md"
              >
                <option value="date">Date</option>
                <option value="name">Name</option>
              </select>
            </div>
            <div className="flex items-center mb-4 sm:mb-0 sm:mr-4">
              <label className="text-lg font-semibold px-3">Order By:</label>
              <select
                value={orderBy}
                onChange={(e) => setOrderBy(e.target.value)}
                className="p-2 border border-gray-300 rounded-md"
              >
                <option value="asc">Ascending</option>
                <option value="desc">Descending</option>
              </select>
            </div>
            <button
              type="submit"
              className="mb-4 ml-2 px-4 py-2 bg-blue-500 text-white font-semibold rounded-md hover:bg-blue-600"
            >
              Apply
            </button>
          </form>
        </div>

        <div className="overflow-x-auto">
          <table className="min-w-full bg-white divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">S.No</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Image</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Username</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Email</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Date of Purchase</th>
                {currentUser.role === 'admin' && (
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Feedback</th>
                )}
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {purchases.length > 0 ? (
                currentItems.map((purchase, index) => (
                  <tr key={index}>
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">{index + 1}</td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <img
                        src={purchase.avatar || 'https://via.placeholder.com/50'}
                        alt={purchase.username}
                        className="w-12 h-12 object-cover rounded-full"
                      />
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">{purchase.username}</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{purchase.email}</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{new Date(purchase.createdAt).toLocaleDateString()}</td>
                    {currentUser.role === 'admin' && (
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                        <button
                          onClick={() => handleFeedbackClick(purchase._id)}
                          className="text-blue-500 hover:text-blue-700 focus:outline-none"
                        >
                          See Feedback
                        </button>
                      </td>
                    )}
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="6" className="px-6 py-4 text-center text-gray-500">No purchase details available</td>
                </tr>
              )}
            </tbody>
          </table>
        </div>

        <div className="flex justify-center mt-4">
          <nav>
            <ul className="flex flex-wrap space-x-2">
              {pageNumbers.map((number) => (
                <li key={number}>
                  <button
                    onClick={() => handlePageChange(number)}
                    className={`px-3 py-1 text-sm font-medium ${currentPage === number ? 'bg-blue-500 text-white' : 'bg-white text-blue-500'} border border-gray-300 rounded-md`}
                  >
                    {number}
                  </button>
                </li>
              ))}
            </ul>
          </nav>
        </div>
      </div>
    </div>
  );
};

export default TicketPurchaseUserdetail;
