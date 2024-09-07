import React from 'react'
import { useNavigate } from 'react-router-dom';

const PaymentButton = ({amount,ticketId,userId}) => {
    const navigate=useNavigate()
    const handlePayment = async () => {
        try {
            const res = await fetch('/backend/create-order', {
                method: 'POST',
                headers: {
                  'Content-Type': 'application/json',
                },
                body: JSON.stringify({ amount }),
              });
        
              const data = await res.json();
        
              // Step 2: Configure Razorpay options
              const options = {
                key: 'rzp_test_uq83ufnV8txFFP', // Replace with your Razorpay key
                amount: data.amount, // Amount in paise (100 INR = 10000 paise)
                currency: 'INR',
                name: 'Your Company Name',
                description: 'Ticket Purchase',
                order_id: data.id, // Order ID from backend
                handler: async (response) => {
                   // const paymentId = response.razorpay_payment_id;
                  try {
                    // Step 3: Verify payment on your backend
                    const verifyRes = await fetch('/backend/verify-payment', {
                      method: 'POST',
                      headers: {
                        'Content-Type': 'application/json',
                      },
                      body: JSON.stringify({
                        paymentId: response.razorpay_payment_id,
                        orderId: response.razorpay_order_id,
                        signature: response.razorpay_signature,
                      }),
                    });
         console.log(verifyRes)
         console.log('verifyRes.ok:', verifyRes.ok);
                    if (verifyRes.ok) {
                      // Step 4: Store user details after successful verification
                   const res=   await fetch(`/backend/ticket/purchase`, {
                        method: 'POST',
                        headers: {
                          'Content-Type': 'application/json',
                        },
                        body: JSON.stringify({
                          userId,ticketId,paymentId: response.razorpay_payment_id
                        }),
                      });
                const data=await res.json();
                console.log(res);
                      alert('Payment successful and user details stored!');
                      navigate('/userticket')
                    } 
                  } catch (error) {
                    // alert('Payment verification failed.');
                    console.error('Error verifying payment:', error);
                  }
                },
                prefill: {
                  name: 'Archit Tambi',
                  email: 'tambiarchit@gmail.com',
                  contact: '7297898025',
                },
                theme: {
                  color: '#3399cc',
                },
              };
        
              // Step 5: Open Razorpay checkout
              const paymentObject = new window.Razorpay(options);
              paymentObject.open();
            } catch (error) {
              console.error('Error creating order:', error);
              alert('An error occurred while processing the payment.');
            }
          };
  return (
    <button
    className="bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 px-4 rounded-lg transition duration-300"
    onClick={handlePayment}
  >
    Pay {amount} INR
  </button>
  )
}

export default PaymentButton
