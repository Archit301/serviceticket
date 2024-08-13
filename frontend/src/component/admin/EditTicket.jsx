import React, { useEffect } from 'react'
import { useState } from 'react';
import { useParams } from 'react-router-dom'
import { ToastContainer, toast } from 'react-toastify'; 
import 'react-toastify/dist/ReactToastify.css'; 
import {getDownloadURL,getStorage,ref,uploadBytesResumable} from 'firebase/storage'
import { app } from '../../firebase'
import { Bounce } from 'react-toastify';

import { useSelector } from 'react-redux';

const EditTicket = () => {
    const { ticketId } = useParams();

    const [formData, setFormData] = useState({
      ticketName: '',
      coverImage: [], // Initialize as an array
      ticketDescription: '',
      ticketPrice: '',
      ticketCategory: '',
      ticketSeatAvailable: '',
      expiryDate: ''
    });
    const [files, setFiles] = useState([]);
    const [uploading, setUploading] = useState(false);
    const [error, setError] = useState('');
    const [imageUploadError, setImageUploadError] = useState('');
   // const [currentUser, setCurrentUser] = useState({ _id: 'dummyUserId' }); // Replace with actual user logic
   const {currentUser}=useSelector((state)=>state.user)
    useEffect(() => {
      const fetchDetails = async () => {
        try {
          const id = ticketId;
          const response = await fetch('/backend/ticket/detailticketone', {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify({ id })
          });
          const data = await response.json();
          setFormData(data || { coverImage: [] }); // Ensure coverImage is initialized as an array
        } catch (error) {
          console.error('Error fetching ticket details:', error);
        }
      };
      fetchDetails();
    }, [ticketId]);
  
    const handleChange = (e) => {
      setFormData({ ...formData, [e.target.id]: e.target.value });
    };
  
    const handleSubmit = async (e) => {
      e.preventDefault();
      const now = new Date();
      if (!formData.ticketName || !formData.coverImage.length || !formData.ticketDescription || !formData.ticketPrice || !formData.ticketSeatAvailable || !formData.expiryDate) {
        setError('Please fill all the fields and upload a cover image.');
        return;
      }
      if (new Date(formData.expiryDate) < now) {
        setError('Date must be greater than today\'s date');
        return;
      }
      const  id=formData._id;
      console.log(id);
      try {
        const response = await fetch(`/backend/ticket/editticket/${id}`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ ...formData, adminId: currentUser._id }),
        });
        if (response.ok) {
          toast.success('Ticket  updated successfully!', {
            position: "top-right",
            autoClose: 5000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: "light",
            transition: Bounce,
          });
        } else {
          toast.error('Failed to create ticket. Please try again.', {
            position: "top-right",
            autoClose: 5000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: "light",
            transition: Bounce,
          });
        }
      } catch (error) {
        if (error.message.includes("E11000 duplicate key error collection:")) {
          setError("This ticket name is already used. Please choose a different name.");
        }
        toast.error('An error occurred. Please try again.', {
          position: "top-right",
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "light",
          transition: Bounce,
        });
      }
    };
  
    const handleImageSubmit = () => {
      if (files.length > 0 && files.length + formData.coverImage.length <= 6) {
        setUploading(true);
        const promise = [];
  
        for (let i = 0; i < files.length; i++) {
          promise.push(storeImage(files[i]));
        }
  
        Promise.all(promise)
          .then((urls) => {
            setFormData({
              ...formData,
              coverImage: [...formData.coverImage, ...urls]
            });
            setUploading(false);
          })
          .catch(() => {
            setUploading(false);
            setImageUploadError('Image upload failed (2 MB max per image)');
          });
      } else {
        setUploading(false);
        setImageUploadError('You can only upload up to 6 images per listing');
      }
    };
  
    const storeImage = (file) => {
      return new Promise((resolve, reject) => {
        const storage = getStorage(app);
        const fileName = new Date().getTime() + file.name;
        const storageRef = ref(storage, fileName);
        const uploadTask = uploadBytesResumable(storageRef, file);
  
        uploadTask.on(
          'state_changed',
          (snapshot) => {
            const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
            console.log(`Upload is ${progress}% done`);
          },
          (error) => {
            reject(error);
          },
          () => {
            getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
              resolve(downloadURL);
            });
          }
        );
      });
    };

    const  handleDeleteImage = (index)=>{
        setFormData({
            ...formData,
            coverImage:formData.coverImage.filter((_, i) => i !== index)
        })
    }
  
    return (
      <div className="bg-gray-100 min-h-screen p-6">
        <div className="max-w-4xl mx-auto bg-white shadow-lg rounded-lg p-8">
          <h1 className="text-3xl font-bold mb-8 text-gray-800">Edit Ticket</h1>
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="mb-6">
              <label className="block text-gray-700 text-lg font-medium mb-2">Ticket Name</label>
              <input
                type="text"
                id="ticketName"
                name="ticketName"
                value={formData.ticketName}
                onChange={handleChange}
                className="border border-gray-300 rounded-lg py-3 px-4 w-full focus:outline-none focus:ring-2 focus:ring-blue-500 transition duration-300"
                placeholder="Enter the ticket name"
                required
              />
            </div>
  
            <div className="mb-6">
              <label className="block text-gray-700 text-lg font-medium mb-2">Ticket Description</label>
              <textarea
                id="ticketDescription"
                name="ticketDescription"
                value={formData.ticketDescription}
                onChange={handleChange}
                className="border border-gray-300 rounded-lg py-3 px-4 w-full focus:outline-none focus:ring-2 focus:ring-blue-500 transition duration-300"
                rows="6"
                placeholder="Describe the ticket in detail"
                required
              />
            </div>
  
            <div className="mb-6">
              <label className="block text-gray-700 text-lg font-medium mb-2">Ticket Price</label>
              <input
                type="number"
                id="ticketPrice"
                name="ticketPrice"
                value={formData.ticketPrice}
                onChange={handleChange}
                className="border border-gray-300 rounded-lg py-3 px-4 w-full focus:outline-none focus:ring-2 focus:ring-blue-500 transition duration-300"
                placeholder="Enter the ticket price"
                required
              />
            </div>
  
            <div className="mb-6">
              <label className="block text-gray-700 text-lg font-medium mb-2">Category</label>
              <input
                type="text"
                id="ticketCategory"
                name="ticketCategory"
                value={formData.ticketCategory}
                onChange={handleChange}
                className="border border-gray-300 rounded-lg py-3 px-4 w-full focus:outline-none focus:ring-2 focus:ring-blue-500 transition duration-300"
                placeholder="Enter the category"
              />
            </div>
  
            <div className="mb-6">
              <label className="block text-gray-700 text-lg font-medium mb-2">Number of Seats</label>
              <input
                type="number"
                id="ticketSeatAvailable"
                name="ticketSeatAvailable"
                value={formData.ticketSeatAvailable}
                onChange={handleChange}
                className="border border-gray-300 rounded-lg py-3 px-4 w-full focus:outline-none focus:ring-2 focus:ring-blue-500 transition duration-300"
                placeholder="Enter the number of seats"
                required
              />
            </div>
  
            <div className="mb-6">
              <label htmlFor="expiryDate" className="text-lg font-semibold">Expiry Date</label>
              <input
                type="datetime-local"
                id="expiryDate"
                name="expiryDate"
                value={formData.expiryDate}
                onChange={handleChange}
                className="border border-gray-300 rounded-lg py-3 px-4 w-full focus:outline-none focus:ring-2 focus:ring-blue-500 transition duration-300"
             required
             />
            </div>
  
            <div className="mb-6">
              <label className="block text-gray-700 text-lg font-medium mb-2">Upload Cover Images</label>
              <input
                type="file"
                multiple
                onChange={(e) => setFiles(Array.from(e.target.files))}
                className="border border-gray-300 rounded-lg py-2 px-4 w-full"
              />
              <button
                type="button"
                onClick={handleImageSubmit}
                disabled={uploading}
                className="mt-2 bg-blue-500 text-white py-2 px-4 rounded-lg focus:outline-none hover:bg-blue-600 transition duration-300"
              >
                {uploading ? 'Uploading...' : 'Upload Images'}
              </button>
              {imageUploadError && <p className="text-red-500 mt-2">{imageUploadError}</p>}
            </div>
  
            <div className="mb-6">
              <label className="block text-gray-700 text-lg font-medium mb-2">Current Cover Images</label>
              {formData.coverImage?.length > 0 &&
                formData.coverImage.map((url, index) => (
                  <div
                    key={url}
                    className="flex justify-between items-center border border-gray-300 rounded-lg p-4 mb-2"
                  >
                    <img
                      src={url}
                      alt="Cover"
                      className="w-24 h-24 object-cover rounded-lg"
                    />
                     <button
                    type="button"
                    onClick={() => handleDeleteImage(index)}
                    className="text-red-500 hover:text-red-700 focus:outline-none"
                  >
                    Delete
                  </button>
                  </div>
                ))}
            </div>
  
            {error && <p className="text-red-500">{error}</p>}
  
            <button
              type="submit"
              className="bg-green-500 text-white py-2 px-4 rounded-lg focus:outline-none hover:bg-green-600 transition duration-300"
            >
              Save Ticket
            </button>
          </form>
        </div>
        <ToastContainer />
      </div>

            )
}

export default EditTicket
