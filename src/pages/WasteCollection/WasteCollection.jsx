import axios from "axios";
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";

const WasteCollection = () => {
  // Sample data for now
  const [petBottles, setPetBottles] = useState([
    {
      id: 1,
      collection_point: "Downtown Recycling Center",
      weight: 150,
      date_collected: "2025-01-10",
      description: "Collection of 150kg of PET bottles from the downtown area.",
      contact_person: "John Doe",
      contact_email: "johndoe@example.com",
      address: "123 Main St, Downtown",
      collection_method: "Manual Collection",
    },
    {
      id: 2,
      collection_point: "East Side Collection Hub",
      weight: 200,
      date_collected: "2025-01-12",
      description: "Collection of 200kg of PET bottles from the East side hub.",
      contact_person: "Jane Smith",
      contact_email: "janesmith@example.com",
      address: "456 East Rd, East Side",
      collection_method: "Automated Pickup",
    },
  ]);

  const handleDelete = (id) => {
    if (window.confirm("Are you sure you want to delete this Pet Bottle entry?")) {
      // This will simulate deletion and update the list
      setPetBottles(petBottles.filter((pb) => pb.id !== id));
    }
  };

  return (
    <div className="px-4 py-6 sm:px-6 lg:px-8 bg-gray-50 min-h-screen">
      {/* Header */}
      <div className="flex flex-col sm:flex-row justify-between items-center mb-6">
        <h3 className="text-2xl font-semibold text-gray-800">Pet Bottles Collection</h3>
        <Link
          to="/dashboard/addwaste_collection" // Adjusted to add Pet Bottle
          className="bg-[#004066] text-white px-4 py-2 rounded-md hover:bg-[#283f4d] transition"
        >
          + Add Waste Collection
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
                <th className="py-3 px-2 sm:px-4 text-left">Action</th>
              </tr>
            </thead>
            <tbody>
              {petBottles.map((pb, index) => (
                <tr
                  key={index}
                  className="border-b text-sm sm:text-base hover:bg-gray-100 transition"
                >
                  <td className="py-3 px-2 sm:px-4">{pb.collection_point}</td>
                  <td className="py-3 px-2 sm:px-4">{pb.weight}</td>
                  <td className="py-3 px-2 sm:px-4">{pb.date_collected}</td>
                  <td className="py-3 px-2 sm:px-4">{pb.description}</td>
                  <td className="py-3 px-2 sm:px-4">{pb.contact_person}</td>
                  <td className="py-3 px-2 sm:px-4">{pb.contact_email}</td>
                  <td className="py-3 px-2 sm:px-4">{pb.address}</td>
                  <td className="py-3 px-2 sm:px-4">{pb.collection_method}</td>
                  <td className="py-3 px-2 sm:px-4 flex flex-col sm:flex-row space-y-2 sm:space-y-0 sm:space-x-2">
                    <Link
                      to={`/dashboard/editwaste_collection/${pb.id}`} // Adjusted to edit Pet Bottle
                      className="bg-green-500 text-white px-3 py-1 rounded text-xs sm:text-sm hover:bg-green-600 transition"
                    >
                      Edit
                    </Link>
                    <button
                      className="bg-red-500 text-white px-3 py-1 rounded text-xs sm:text-sm hover:bg-red-600 transition"
                      onClick={() => handleDelete(pb.id)} // Adjusted to delete Pet Bottle
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

export default WasteCollection;
