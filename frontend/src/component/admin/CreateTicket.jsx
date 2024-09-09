import React, { useState } from 'react'
import { ToastContainer, toast } from 'react-toastify'; 
import 'react-toastify/dist/ReactToastify.css'; 
import Select from 'react-select'
import {getDownloadURL,getStorage,ref,uploadBytesResumable} from 'firebase/storage'
import { app } from '../../firebase'
import { Bounce } from 'react-toastify';
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom';
const categories = [
    { value: 'concert', label: 'Concert' },
    { value: 'sports', label: 'Sports' },
    { value: 'theater', label: 'Theater' },
    // Add more categories as needed
  ];


const CreateTicket = () => {
  const { currentUser } = useSelector((state) => state.user);
  const [formData, setFormData] = useState({
    ticketName: '',
    ticketDescription: '',
    ticketPrice: '',
    category: 'sports', // Default category
    coverImage: [],
    ticketSeatAvailable: '',
    expiryDate: ''
  });
  const [error, setError] = useState('');
  const [files, setFiles] = useState([]);
  const [uploading, setUploading] = useState(false);
  const [imageUploadError, setImageUploadError] = useState(false);
  const [showCustomCategory, setShowCustomCategory] = useState(false);
  const [customCategory, setCustomCategory] = useState('');

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    if (name === 'category' && value === 'other') {
      setShowCustomCategory(true);
    } else if (name === 'category') {
      setShowCustomCategory(false);
      setCustomCategory(''); // Clear custom category if not 'other'
    }
    setFormData({ ...formData, [name]: value });
  };

  const handleCustomCategoryChange = (e) => {
    setCustomCategory(e.target.value);
  };

  const handleImageSubmit = (e) => {
    if (files.length > 0 && files.length + formData.coverImage.length < 7) {
      setUploading(true);
      const promise = [];
      for (let i = 0; i < files.length; i++) {
        promise.push(storeImage(files[i]));
      }
      Promise.all(promise)
        .then((urls) => {
          setFormData({
            ...formData,
            coverImage: formData.coverImage.concat(urls)
          });
          setUploading(false);
        })
        .catch((err) => {
          setUploading(false);
          setImageUploadError('Image upload failed (2 MB max per image)');
        });
    } else {
      setUploading(false);
      setImageUploadError('You can only upload 6 images per listing');
    }
  };

  const storeImage = async (file) => {
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

  const handleSubmit = async (e) => {
    e.preventDefault();
    const now = new Date();
    if (!formData.ticketName || !formData.coverImage.length || !formData.ticketDescription || !formData.ticketPrice || !formData.ticketSeatAvailable) {
      setError('Please fill all the fields and upload a cover image.');
      return;
    }
    if (formData.expiryDate < now.toISOString().split('T')[0]) {
      setError('Date must be greater than today.');
      return;
    }

    // Include the custom category if 'Other' is selected
    if (showCustomCategory) {
      setFormData({ ...formData, category: customCategory });
    }

    try {
      const response = await fetch('/backend/ticket/createticket', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ ...formData, adminId: currentUser._id }),
      });
      console.log(response);

      if (response.ok) {
        toast.success('Ticket created successfully!', {
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
        // Reset form after success
        setFormData({
          ticketName: '',
          ticketDescription: '',
          ticketPrice: '',
          category: 'sports', // Reset to default category
          coverImage: [],
          ticketSeatAvailable: '',
          expiryDate: ''
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
        setError("This ticket name is already taken. Please choose a different name.");
      } else {
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
    }
  };

  return (
    <div className="bg-gray-100 min-h-screen p-6">
    <div className="max-w-4xl mx-auto bg-white shadow-lg rounded-lg p-8">
      <h1 className="text-3xl font-bold mb-8 text-gray-800">Create a New Ticket</h1>
      <form onSubmit={handleSubmit} className="space-y-6">
        
        <div className="mb-6">
          <label className="block text-gray-700 text-lg font-medium mb-2">
            Ticket Name <span className="text-red-500">*</span>
          </label>
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
          <label className="block text-gray-700 text-lg font-medium mb-2">
            Ticket Description <span className="text-red-500">*</span>
          </label>
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
          <label className="block text-gray-700 text-lg font-medium mb-2">
            Ticket Price <span className="text-red-500">*</span>
          </label>
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
          <label className="block text-gray-700 text-lg font-medium mb-2">
            Category <span className="text-red-500">*</span>
          </label>
          <select
            id="category"
            name="category"
            value={formData.category}
            onChange={handleChange}
            className="border border-gray-300 rounded-lg py-3 px-4 w-full focus:outline-none focus:ring-2 focus:ring-blue-500 transition duration-300"
            required
          >
            <option value="sports">Sports</option>
            <option value="adventure">Adventure</option>
            <option value="comedy">Comedy</option>
            <option value="thriller">Thriller</option>
            {/* <option value="others">Other</option> */}
          </select>
          {showCustomCategory && (
            <input
              type="text"
              id="customCategory"
              value={customCategory}
              onChange={handleCustomCategoryChange}
              className="border border-gray-300 rounded-lg py-3 px-4 w-full mt-2 focus:outline-none focus:ring-2 focus:ring-blue-500 transition duration-300"
              placeholder="Enter custom category"
            />
          )}
        </div>
  
        <div className="mb-6">
          <label className="block text-gray-700 text-lg font-medium mb-2">
            Cover Image <span className="text-red-500">*</span>
          </label>
          <input
            type="file"
            multiple
            onChange={(e) => setFiles(e.target.files)}
            className="border border-gray-300 rounded-lg py-3 px-4 w-full"
          />
          <button
            type="button"
            onClick={handleImageSubmit}
            className="mt-3 px-4 py-2 bg-blue-500 text-white rounded-lg"
            disabled={uploading}
          >
            {uploading ? 'Uploading...' : 'Upload Images'}
          </button>
          {imageUploadError && (
            <p className="text-red-500 mt-2">{imageUploadError}</p>
          )}
        </div>
  
        <div className="mb-6">
          <label className="block text-gray-700 text-lg font-medium mb-2">
            Seats Available <span className="text-red-500">*</span>
          </label>
          <input
            type="number"
            id="ticketSeatAvailable"
            name="ticketSeatAvailable"
            value={formData.ticketSeatAvailable}
            onChange={handleChange}
            className="border border-gray-300 rounded-lg py-3 px-4 w-full focus:outline-none focus:ring-2 focus:ring-blue-500 transition duration-300"
            placeholder="Enter number of available seats"
            required
          />
        </div>
  
        <div className="mb-6">
          <label className="block text-gray-700 text-lg font-medium mb-2">
            Expiry Date <span className="text-red-500">*</span>
          </label>
          <input
            type="date"
            id="expiryDate"
            name="expiryDate"
            value={formData.expiryDate}
            onChange={handleChange}
            className="border border-gray-300 rounded-lg py-3 px-4 w-full focus:outline-none focus:ring-2 focus:ring-blue-500 transition duration-300"
            required
          />
        </div>
  
        <button
          type="submit"
          className="px-6 py-3 bg-blue-500 text-white rounded-lg hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 transition duration-300"
        >
          Create Ticket
        </button>
      </form>
      {error && <p className="text-red-500 mt-4">{error}</p>}
      <ToastContainer />
    </div>
  </div>
  
  );
};


export default CreateTicket
