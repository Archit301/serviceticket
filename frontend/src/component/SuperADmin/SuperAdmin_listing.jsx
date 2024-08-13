import React, { useEffect, useState } from 'react'

const SuperAdmin_listing = () => {
    const [response,setresponse]=useState();
    const [filter,setFilter]=useState('admin');
    const [operation,setoperation]=useState(0);
    const [operat,setoperat]=useState(0);
    useEffect(()=>{
        const listing=async()=>{
            const res = await fetch('/backend/user/superadminlisting');
            if (!res.ok) {
               console.log(`HTTP error! Status: ${res.status}`);
            }
            const data=await res.json();
            setresponse(data);
         console.log(data);
            }
        listing();
        },[])  


        


       

    const handlechange=async(e)=>{
      console.log(e.target.value);
      setFilter(e.target.value);
      if(e.target.value==="All")
        {
         const res = await fetch('/backend/user/superadminalllisting');
         if (!res.ok) {
            console.log(`HTTP error! Status: ${res.status}`);
         }
         const data=await res.json();
         setresponse(data);
      console.log(data);
     
     }
     else if(e.target.value==="User"){
         const res = await fetch('/backend/user/superadminuserlisting');
         if (!res.ok) {
            console.log(`HTTP error! Status: ${res.status}`);
         }
         const data=await res.json();
         setresponse(data);
      console.log(data);
 
     }
        else{
         const res = await fetch('/backend/user/superadminlisting');
         if (!res.ok) {
            console.log(`HTTP error! Status: ${res.status}`);
         }
         const data=await res.json();
         setresponse(data);
      console.log(data);
      
         
        }
    }
    

    const onAccept=async(id)=>{
        console.log(id);
        const res = await fetch('/backend/user/accept', {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify({id})
          });
          const data = await res.json();
          setoperation(prev => prev + 1);
          console.log(data);
    }

    const onReject=async(id)=>{
        const res = await fetch('/backend/user/decline', {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify({id}),
          });
          const data = await res.json();
          setoperation(prev => prev + 1)
          console.log(data);
    }

    const onDelete=async(id)=>{
        const res = await fetch('/backend/user/delete', {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify({id}),
          });
          const data = await res.json();
          console.log(data);
    }







    
  return (
    <div className="min-h-screen bg-white-100 flex flex-col">
    <div className="w-full bg-white p-4">
        <h2 className="text-3xl font-bold text-center text-gray-800 mb-2">Hello Archit</h2>
        {filter==="admin"?(<h3 className="text-lg font-semibold text-center text-gray-700 mb-4">Admin Requests</h3>)
        :(
            <h3 className="text-lg font-semibold text-center text-gray-700 mb-4"> {filter} Listing</h3>
        )}
    </div>
    <div className="flex justify-center mb-4">
                    <select
                        value={filter}
                        onChange={handlechange}
                        className="p-2 border border-gray-300 rounded-md"
                    >
                        <option value="admin">Admin</option>
                        <option value="User">User</option>
                        <option value="All">All</option>
                    </select>
                </div>
    <div className="flex-grow p-4 overflow-auto">
        <div className="w-full max-w-5xl mx-auto">
            <div className="overflow-x-auto">
                <table className="min-w-full bg-white shadow-lg rounded-lg">
                    <thead>
                        <tr>
                        <th className="py-2 px-4 border-b-2 border-gray-200 bg-gray-50 text-left">S.No</th>
                            <th className="py-2 px-4 border-b-2 border-gray-200 bg-gray-50 text-left">Username</th>
                            <th className="py-2 px-4 border-b-2 border-gray-200 bg-gray-50 text-left">Email</th>
                            <th className="py-2 px-4 border-b-2 border-gray-200 bg-gray-50 text-left">Role</th>
                            {filter === 'admin' && (
                                <>
                            <th className="py-2 px-4 border-b-2 border-gray-200 bg-gray-50 text-left">Status</th>
                            <th className="py-2 px-12 border-b-2 border-gray-200 bg-gray-50 text-left">Action</th>
                          
                            </>
                            )}
                              <th className="py-2 px-4 border-b-2 border-gray-200 bg-gray-50 text-left">Delete</th>
                             
                        </tr>
                    </thead>
                    <tbody>
                        {response && response.length > 0 ? (
                            response.map((request, index) => (
                                <tr key={index} className="hover:bg-gray-100">
                                    <td className="py-2 px-4 border-b">{index+1}</td>
                                    <td className="py-2 px-4 border-b">{request.username}</td>
                                    <td className="py-2 px-4 border-b">{request.email}</td>
                                    <td className="py-2 px-4 border-b">{request.role}</td>
                                    {filter === 'admin' && (
                                        <>
                                    <td className="py-2 px-4 border-b">
                                        <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${
                                            request.requestStatus === 'pending'
                                                ? 'bg-yellow-100 text-yellow-800'
                                                : request.requestStatus === 'approved'
                                                ? 'bg-green-100 text-green-800'
                                                : 'bg-red-100 text-red-800'
                                        }`}>
                                            {request.requestStatus}
                                        </span>
                                    </td>
                                    <td className="py-2 px-4 border-b space-x-2">
                                        <button
                                            onClick={() => onAccept(request._id)}
                                            className="py-1 px-3 bg-green-500 text-white rounded-md hover:bg-green-600 focus:outline-none focus:ring-2 focus:ring-green-500"
                                        >
                                            Accept
                                        </button>
                                        <button
                                            onClick={() => onReject(request._id)}
                                            className="py-1 px-3 bg-red-500 text-white rounded-md hover:bg-red-600 focus:outline-none focus:ring-2 focus:ring-red-500"
                                        >
                                            Reject
                                        </button>
                                    </td> 
                                    
                                    </>
                                    )  }
                                        <td className="py-2 px-4 border-b">
                                           <button
                                            onClick={() => onDelete(request._id)}
                                            className="py-1 px-3 bg-blue-500 text-white rounded-md hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-red-500"
                                        >
                                            Delete
                                        </button>
                                    </td>
                                </tr>
                            
                            ))
                        ) : (
                            <td colSpan="5" className="text-center py-4 text-gray-600">
                            {filter === "admin" 
                                ? "No admin requests pending." 
                                : `No ${filter} requests`}
                        </td> 
                        )}
                    </tbody>
                </table>
            </div>
        </div>
    </div>
</div>
  )
}

export default SuperAdmin_listing
