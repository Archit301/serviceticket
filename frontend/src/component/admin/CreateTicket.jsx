import React, { useState } from 'react'
import { ToastContainer, toast } from 'react-toastify'; 
import 'react-toastify/dist/ReactToastify.css'; 
import Select from 'react-select'
import {getDownloadURL,getStorage,ref,uploadBytesResumable} from 'firebase/storage'
import { app } from '../../firebase'
import { Bounce } from 'react-toastify';
import { useSelector } from 'react-redux'
const categories = [
    { value: 'concert', label: 'Concert' },
    { value: 'sports', label: 'Sports' },
    { value: 'theater', label: 'Theater' },
    // Add more categories as needed
  ];


const CreateTicket = () => {
    const {currentUser}=useSelector((state)=>state.user)
    const [formData, setFormData] = useState({
        ticketName: '',
        ticketDescription: '',
        ticketPrice: '',
        ticketCategory: '',
        coverImage: [],
        ticketSeatAvailable: '',
        expiryDate:''
    });
//     const [ticketName, setTicketName] = useState('');
//   const [ticketDescription, setTicketDescription] = useState('');
//   const [ticketPrice, setTicketPrice] = useState('');
//   const [selectedCategory, setSelectedCategory] = useState(null);
//   const [coverImage, setCoverImage] = useState([]);
//   const [seatCount, setSeatCount] = useState('');
  const [error,seterror]=useState('')
  const [files,setFiles]=useState([])
  const [uploading, setUploading] = useState(false);
  const [imageUploadError,setImageUploadError]=useState(false)

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
};
  const handleImageSubmit=(e)=>{
    if(files.length>0 && files.length + formData.coverImage.length<7 )
    {   
      setUploading(true)
        const promise=[];
        for(let i=0;i<files.length;i++){
            promise.push(storeImage(files[i]));
        }
        Promise.all(promise)
              .then((urls)=>{
                setFormData({
                    ...formData,
                    coverImage:formData.coverImage.concat(urls)
                })
                setUploading(false);
              })
              .catch((err)=>{
                setUploading(false);
           setImageUploadError('Image upload failed (2 mb max per image)')
              })
    }
    else{
      setUploading(false);
        setImageUploadError('You can only upload 6 images per listing');
    }
    }

    const storeImage=async(file)=>{
        return new Promise((resolve,reject)=>{
        const storage=getStorage(app)
        const fileName=new Date().getTime() + file.name;
        const storageRef=ref(storage,fileName)
        const uploadTask=uploadBytesResumable(storageRef,file)
  uploadTask.on(
    'state_changed',
    (snapshot)=>{
        const progress=
        (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
        console.log(`Upload is ${progress}% done`);  
    },
    (error) => {
        reject(error);
      },
      ()=>{
        getDownloadURL(uploadTask.snapshot.ref).then((downloadURL)=>{
            resolve(downloadURL);
        })
      }
  )
    })
    }


    const handleSubmit = async(e) => {
        e.preventDefault();
       const now=new Date();
         if (!formData.ticketName||!formData.coverImage || !formData.ticketDescription || !formData.ticketPrice   || !formData.ticketSeatAvailable) {
           seterror('Please fill all the fields and upload a cover image.');
           return;
         }
         if(formData.expiryDate<now)
         {
          seterror('Date must be greater than today date');
          return;
         }

    
        // const formData = new FormData();
        // formData.append('coverImage', coverImage);
        //  formData.append('ticketName', ticketName);
        //  formData.append('ticketDescription', ticketDescription);
        //  formData.append('ticketPrice', ticketPrice);
        //  formData.append('seatCount', seatCount);
        //  formData.append('admin_id',currentUser._id);
        //  formData.append('category', selectedCategory.value);
        //  console.log(formData);
        try {
            const response = await fetch('/backend/ticket/createticket', {
              method: 'POST',
              headers: {
                'Content-Type': 'application/json',
              },
              body: JSON.stringify({...formData,adminId:currentUser._id}),
            });
            console.log(response);
      
            if (response.ok){
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
                })
              // Reset form after success
            //   setTicketName('');
            //   setTicketDescription('');
            //   setTicketPrice('');
            //   setSelectedCategory(null);
            //   setCoverImage(null);
            //   setSeatCount('');
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
          } catch (error){
            if(error==="E11000 duplicate key error collection:"){
             seterror("This ticketname is alerady made plz make a different ticket name")
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
    }
  return (
    <div className="bg-gray-100 min-h-screen p-6">
    <div className="max-w-4xl mx-auto bg-white shadow-lg rounded-lg p-8">
        <h1 className="text-3xl font-bold mb-8 text-gray-800">Create a New Ticket</h1>
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
          
          <div className='mb-6'>
        
          <label htmlFor="expiryDate" className="text-lg font-semibold">Expiry Date:</label>
<input
  type="datetime-local"
  id="expiryDate"
  name="expiryDate"
  value={formData.expiryDate}
  onChange={handleChange}
  className="border border-gray-300 rounded-lg py-3 px-4 w-full focus:outline-none focus:ring-2 focus:ring-blue-500 transition duration-300"
/>

          </div>

          <div className="mb-6">
            <label className="block text-gray-700 text-lg font-medium mb-2">Cover Image</label>
            <div className="flex flex-col gap-4">
              <input
                onChange={(e) => setFiles(e.target.files)}
                className='border border-gray-300 rounded-lg p-2 w-full cursor-pointer'
                type='file'
                id='images'
                accept='image/*'
                multiple
              />
              <button
                disabled={uploading}
                type='button'
                onClick={handleImageSubmit}
                className='bg-green-600 text-white py-2 px-4 rounded-lg hover:bg-green-700 transition duration-300 disabled:opacity-70'
              >
                {uploading ? 'Uploading...' : 'Upload Images'}
              </button>
            </div>
          </div>

          {formData.coverImage.length > 0 &&
            formData.coverImage.map((url, index) => (
              <div
                key={url}
                className='flex justify-between items-center border border-gray-300 rounded-lg p-4 mb-2'
              >
                <img
                  src={url}
                  alt='listing image'
                  className='w-24 h-24 object-cover rounded-lg'
                />
              </div>
            ))}

          <button
            type="submit"
            className="bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 transition duration-300"
          >
            Create Ticket
          </button>
        </form>
        {error && <p className='text-red-600 mt-5'>{error}</p>}
        {imageUploadError && <p className='text-red-600 mt-5'>{imageUploadError}</p>}
      </div>
      <ToastContainer />
    </div>
  )
}

export default CreateTicket
