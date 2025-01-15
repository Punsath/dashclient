import React, { useState, useEffect } from 'react';
import axios from 'axios';

const PetBottles = () => {
  const [data, setData] = useState([]);

  // Fetch data from the backend API
  useEffect(() => {
    axios.get('http://localhost:8000/petbottles/pet_bottles')  // Fixed URL here
      .then(response => {
        setData(response.data.Result); // Ensure you're using the correct field from the response
      })
      .catch(err => {
        console.error('Error fetching data', err);
      });
  }, []);

  return (
    <div className="container mx-auto my-8">
      <h2 className="text-2xl font-bold mb-4">Pet Bottles Collection Data</h2>
      <table className="table-auto w-full border-collapse">
        <thead>
          <tr className="bg-gray-200">
            <th className="px-4 py-2 border">Collection Point</th>
            <th className="px-4 py-2 border">Weight (kg)</th>
            <th className="px-4 py-2 border">Date Collected</th>
            <th className="px-4 py-2 border">Description</th>
            <th className="px-4 py-2 border">Contact Person</th>
            <th className="px-4 py-2 border">Contact Email</th>
            <th className="px-4 py-2 border">Address</th>
            <th className="px-4 py-2 border">Collection Method</th>
          </tr>
        </thead>
        <tbody>
          {data.map((row, index) => (
            <tr key={index} className="bg-white">
              <td className="px-4 py-2 border">{row.collection_point}</td>
              <td className="px-4 py-2 border">{row.weight}</td>
              <td className="px-4 py-2 border">{new Date(row.date_collected).toLocaleDateString()}</td>
              <td className="px-4 py-2 border">{row.description}</td>
              <td className="px-4 py-2 border">{row.contact_person}</td>
              <td className="px-4 py-2 border">{row.contact_email}</td>
              <td className="px-4 py-2 border">{row.address}</td>
              <td className="px-4 py-2 border">{row.collection_method}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default PetBottles;
