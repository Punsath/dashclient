import React, { useState, useEffect } from "react";
import axios from "axios";
import { Link } from "react-router-dom";

const PetBottles = () => {
  const [data, setData] = useState([]);

  // Fetch data from the backend API
  useEffect(() => {
    axios
      .get("http://localhost:8000/petbottles/pet_bottles")
      .then((response) => {
        setData(response.data.Result); // Ensure you're using the correct field from the response
      })
      .catch((err) => {
        console.error("Error fetching data", err);
      });
  }, []);

  const handleEdit = (id) => {
    console.log("Edit item with ID:", id);
    // Add your edit logic here
  };

  const handleDelete = (id) => {
    axios
    .delete(`http://localhost:8000/petbottles/delete_pet_bottle/${id}`)
  
      .then((response) => {
        if (response.data.Status) {
          // Update the state to remove the deleted record
          setData((prevData) => prevData.filter((item) => item.id !== id));
          alert("Record deleted successfully");
        } else {
          console.error("Delete failed:", response.data.Error);
        }
      })
      .catch((err) => {
        console.error("Error deleting record:", err);
      });
  };
  

  return (
    <div className="px-4 py-6 sm:px-6 lg:px-8 bg-gray-50 min-h-screen">

        <div className="flex flex-col sm:flex-row justify-between items-center mb-6">
              <h3 className="text-2xl font-semibold text-gray-800">Pet Bottles Collection</h3>
              <Link
                to="/dashboard/add_bottles" // Adjusted to add Pet Bottle
                className="bg-[#004066] text-white px-4 py-2 rounded-md hover:bg-[#283f4d] transition"
              >
                + Add Pet Bottles
              </Link>
            </div>
   

      {/* Table Container */}
      <div className="overflow-hidden bg-white shadow-md rounded-lg">
        <div className="overflow-x-auto">
          <table className="min-w-full table-auto border-collapse">
            <thead>
              <tr className="bg-[#004066] text-white text-sm sm:text-base">
                <th className="py-3 px-2 sm:px-4 text-left">Collection Point</th>
                <th className="py-3 px-2 sm:px-4 text-left">Weight (kg)</th>
                <th className="py-3 px-2 sm:px-4 text-left">Date Collected</th>
                <th className="py-3 px-2 sm:px-4 text-left">Description</th>
                <th className="py-3 px-2 sm:px-4 text-left">Contact Person</th>
                <th className="py-3 px-2 sm:px-4 text-left">Contact Email</th>
                <th className="py-3 px-2 sm:px-4 text-left">Address</th>
                <th className="py-3 px-2 sm:px-4 text-left">Collection Method</th>
                <th className="py-3 px-2 sm:px-4 text-left">Actions</th>
              </tr>
            </thead>
            <tbody>
              {data.map((row, index) => (
                <tr
                  key={index}
                  className="border-b text-sm sm:text-base hover:bg-gray-100 transition"
                >
                  <td className="py-3 px-2 sm:px-4">{row.collection_point}</td>
                  <td className="py-3 px-2 sm:px-4">{row.weight}</td>
                  <td className="py-3 px-2 sm:px-4">
                    {new Date(row.date_collected).toLocaleDateString()}
                  </td>
                  <td className="py-3 px-2 sm:px-4">{row.description}</td>
                  <td className="py-3 px-2 sm:px-4">{row.contact_person}</td>
                  <td className="py-3 px-2 sm:px-4">{row.contact_email}</td>
                  <td className="py-3 px-2 sm:px-4">{row.address}</td>
                  <td className="py-3 px-2 sm:px-4">{row.collection_method}</td>
                  <td className="py-3 px-2 sm:px-4 flex gap-2">
                  <Link
 to={`/dashboard/edit_bottles/${row.id}`} // Correct template literal


    className="bg-green-500 text-white px-3 py-1 rounded text-xs sm:text-sm hover:bg-green-600 transition"
  >
    Edit
  </Link>
  <button
    className="bg-red-500 text-white px-3 py-1 rounded text-xs sm:text-sm hover:bg-red-600 transition"
    onClick={() => handleDelete(row.id)} // Correctly using row.id here
  >
    Delete
  </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default PetBottles;