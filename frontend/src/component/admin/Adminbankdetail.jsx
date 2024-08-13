import React, { useState } from 'react'
import { FaPlus, FaInfoCircle } from 'react-icons/fa';
import { useSelector } from 'react-redux';

const Adminbankdetail = () => {
  const {currentUser}=useSelector((state)=>state.user)
    const [error,seterror]=useState('')
    const [formData, setFormData] = useState({
        adminId: currentUser._id,
        bankName: '',
        accountNumber: '',
        accountHolderName: '',
        branchName: '',
        ifscCode: '',
        swiftCode: '',
        phoneNumber: '',
       // paymentMethod: 'bank',
        preferredOption: 'bank',
      });
    
      const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
      };
    
      const handleSubmit =async (e) => {
        e.preventDefault();
        // Add form submission logic here
        try {
        const res = await fetch('/backend/user/bankdetail', {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify(formData),
          });
          const data = await res.json();
          if(res.ok==="success"){
            ////toastifier lagana hai idhar
          }

        } catch (error) {
            seterror(error);
        }

      };
  return (
    <div className="bg-gray-100 min-h-screen p-6">
    <div className="max-w-3xl mx-auto bg-white p-6 rounded-lg shadow-lg">
      <h1 className="text-2xl font-semibold mb-6">Bank Details Form</h1>
      <form onSubmit={handleSubmit} className="space-y-6">
        {/* Bank Name */}
        <div>
          <label htmlFor="bankName" className="block text-gray-700 text-sm font-medium mb-2">Bank Name</label>
          <input
            type="text"
            id="bankName"
            name="bankName"
            value={formData.bankName}
            onChange={handleChange}
            className="border border-gray-300 rounded-lg py-2 px-4 w-full focus:outline-none focus:ring-2 focus:ring-blue-500"
            required
          />
        </div>

        {/* Account Number */}
        <div>
          <label htmlFor="accountNumber" className="block text-gray-700 text-sm font-medium mb-2">Account Number</label>
          <input
            type="text"
            id="accountNumber"
            name="accountNumber"
            value={formData.accountNumber}
            onChange={handleChange}
            className="border border-gray-300 rounded-lg py-2 px-4 w-full focus:outline-none focus:ring-2 focus:ring-blue-500"
            required
          />
        </div>

        {/* Account Holder Name */}
        <div>
          <label htmlFor="accountHolderName" className="block text-gray-700 text-sm font-medium mb-2">Account Holder Name</label>
          <input
            type="text"
            id="accountHolderName"
            name="accountHolderName"
            value={formData.accountHolderName}
            onChange={handleChange}
            className="border border-gray-300 rounded-lg py-2 px-4 w-full focus:outline-none focus:ring-2 focus:ring-blue-500"
            required
          />
        </div>

        {/* Branch Name */}
        <div>
          <label htmlFor="branchName" className="block text-gray-700 text-sm font-medium mb-2">Branch Name</label>
          <input
            type="text"
            id="branchName"
            name="branchName"
            value={formData.branchName}
            onChange={handleChange}
            className="border border-gray-300 rounded-lg py-2 px-4 w-full focus:outline-none focus:ring-2 focus:ring-blue-500"
            required
          />
        </div>

        {/* IFSC Code */}
        <div>
          <label htmlFor="ifscCode" className="block text-gray-700 text-sm font-medium mb-2">IFSC Code</label>
          <input
            type="text"
            id="ifscCode"
            name="ifscCode"
            value={formData.ifscCode}
            onChange={handleChange}
            className="border border-gray-300 rounded-lg py-2 px-4 w-full focus:outline-none focus:ring-2 focus:ring-blue-500"
            required
          />
        </div>

        {/* SWIFT Code */}
        <div>
          <label htmlFor="swiftCode" className="block text-gray-700 text-sm font-medium mb-2">SWIFT Code (optional)</label>
          <input
            type="text"
            id="swiftCode"
            name="swiftCode"
            value={formData.swiftCode}
            onChange={handleChange}
            className="border border-gray-300 rounded-lg py-2 px-4 w-full focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>

        {/* Phone Number */}
        <div>
          <label htmlFor="phoneNumber" className="block text-gray-700 text-sm font-medium mb-2">Phone Number</label>
          <input
            type="text"
            id="phoneNumber"
            name="phoneNumber"
            value={formData.phoneNumber}
            onChange={handleChange}
            className="border border-gray-300 rounded-lg py-2 px-4 w-full focus:outline-none focus:ring-2 focus:ring-blue-500"
            required
          />
        </div>

        {/* Preferred Option */}
        <div>
          <label htmlFor="preferredOption" className="block text-gray-700 text-sm font-medium mb-2">Preferred Option</label>
          <select
            id="preferredOption"
            name="preferredOption"
            value={formData.preferredOption}
            onChange={handleChange}
            className="border border-gray-300 rounded-lg py-2 px-4 w-full focus:outline-none focus:ring-2 focus:ring-blue-500"
            required
          >
            <option value="bank">Bank Transfer</option>
            <option value="upi">UPI</option>
          </select>
        </div>

        {/* Payment Method */}
        {/* <div>
          <label htmlFor="paymentMethod" className="block text-gray-700 text-sm font-medium mb-2">Payment Method</label>
          <select
            id="paymentMethod"
            name="paymentMethod"
            value={formData.paymentMethod}
            onChange={handleChange}
            className="border border-gray-300 rounded-lg py-2 px-4 w-full focus:outline-none focus:ring-2 focus:ring-blue-500"
            required
          >
            <option value="bank">Bank Transfer</option>
            <option value="upi">UPI (PhonePe)</option>
          </select>
          {formData.paymentMethod === 'upi' && (
            <p className="mt-2 text-sm text-gray-600 flex items-center">
              <FaInfoCircle className="mr-2 text-blue-500" />
              Please use PhonePe for UPI payments.
            </p>
          )}
        </div> */}

        {/* Submit Button */}
        <button
          type="submit"
          className="bg-blue-500 text-white px-4 py-2 rounded-lg flex items-center hover:bg-blue-600 transition duration-300"
        >
          <FaPlus className="mr-2" /> Save Details
        </button>
      </form>
    </div>
  </div>
  )
}

export default Adminbankdetail
