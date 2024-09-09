import React, { useEffect, useState } from 'react';
import Slider from 'react-slick';
import { useNavigate, useParams } from 'react-router-dom';
import PaymentButton from '../pages/PaymentButton';
import { useSelector } from 'react-redux';

const UserticketView = () => {
  const { currentUser } = useSelector((state) => state.user);
  const navigate = useNavigate();
  const [ticket, setTicket] = useState([]);
  const [loading, setLoading] = useState(true);
  const { ticketId } = useParams();
  const [isPurchased, setIsPurchased] = useState(false);

  useEffect(() => {
    const checkTicketStatus = async () => {
      try {
        const response = await fetch(`/backend/ticket/check-purchase/${ticketId}/${currentUser._id}`);
        const data = await response.json();
        if (data.purchased) {
          setIsPurchased(true);
        } else {
          setIsPurchased(false);
        }
      } catch (error) {
        console.error('Error fetching ticket status:', error);
      }
    };

    checkTicketStatus();
  }, [ticketId, currentUser._id]);

  const id = ticketId;

  useEffect(() => {
    const fetchDetail = async () => {
      const res = await fetch('/backend/ticket/detailticketone', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ id }),
      });
      const data = await res.json();
      setTicket(data);
      setLoading(false);
    };
    fetchDetail();
  }, [id]);

  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    adaptiveHeight: true, // Ensures the height of the slider adjusts based on the image
  };

  const handleFeedback = () => {
    navigate(`/feedback/${ticketId}`);
  };

  const onBuy = async () => {
    // Handle buy action
  };

  if (loading) return <p>Loading...</p>;
  if (!ticket) return <p>Ticket not found.</p>;

  return (
    <div className="bg-gray-100">
      {/* Slider */}
      <div className="relative">
        <Slider {...settings} className="w-full">
          {ticket.coverImage.map((image, index) => (
            <div key={index} className="w-full flex items-center justify-center">
              <img
                src={image}
                alt={`Slide ${index + 1}`}
                className="w-full object-cover h-64 sm:h-80 lg:h-96"
              />
            </div>
          ))}
        </Slider>
      </div>

      {/* Ticket Details */}
      <div className="max-w-6xl mx-auto px-4 py-8">
        <div className="bg-white shadow-xl rounded-lg overflow-hidden mt-6">
          <div className="p-6">
            <h1 className="text-3xl font-bold text-gray-900 mb-4">{ticket.ticketName}</h1>
            <p className="text-lg text-gray-700 mb-4">{ticket.ticketDescription}</p>
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-6">
              <span className="text-2xl font-bold text-gray-900">₹{ticket.ticketPrice}</span>
              <span className="text-lg text-gray-600 mt-2 sm:mt-0">Category: {ticket.category}</span>
            </div>
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-6">
              <span className="text-lg text-gray-700 mb-4">Seats Available: {ticket.ticketSeatAvailable}</span>
              {isPurchased ? (
                <button
                  disabled
                  className="bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 px-4 rounded-lg transition duration-300"
                >
                  Bought
                </button>
              ) : (
                <PaymentButton
                  amount={ticket.ticketPrice}
                  ticketId={ticket._id}
                  userId={currentUser._id}
                />
              )}
            </div>
            {/* Feedback Section */}
            <div className="mt-6">
              <button
                disabled={!isPurchased}
                className="bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 px-4 rounded-lg transition duration-300"
                onClick={handleFeedback}
              >
                Feedback
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UserticketView;
