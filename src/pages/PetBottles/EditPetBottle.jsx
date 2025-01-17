import axios from "axios";
import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";

const EditPetBottle = () => {
  const { id } = useParams();
  const [petBottle, setPetBottle] = useState({
    collection_point: "",
    weight: "",
    date_collected: "",
    description: "",
    contact_person: "",
    contact_email: "",
    address: "",
    collection_method: "",
  });

  const navigate = useNavigate();

  useEffect(() => {
    axios
      .get(`http://localhost:8000/petbottles/pet_bottle/${id}`)
      .then((result) => {
        console.log("Fetched Pet Bottle:", result.data.Result[0]); // Check the fetched data
        setPetBottle(result.data.Result[0]);
      })
      .catch((err) => console.error("Error fetching Pet Bottle:", err));
  }, [id]);

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Submitting data:", petBottle); // Debug log for the submitted data
  
    axios
      .put(`http://localhost:8000/petbottles/edit_pet_bottle/${id}`, petBottle)
      .then((response) => {
        if (response.data.Status) {
          alert("Pet Bottle updated successfully");
          navigate("/dashboard/pet_bottles");
        } else {
          alert(response.data.Error);
        }
      })
      .catch((err) => console.error("Error updating Pet Bottle:", err));
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-100 p-4">
      <div className="bg-white shadow-lg rounded-lg p-6 w-full max-w-lg">
        <h3 className="text-xl font-semibold mb-6 text-gray-800">
          Edit Pet Bottles
        </h3>
        <form className="space-y-4" onSubmit={handleSubmit}>
          {/* Editable fields (excluding id field) */}
          {Object.keys(petBottle)
            .filter((key) => key !== "id") // Exclude id field from the form
            .map((key) => (
              <div key={key}>
                <label className="block text-gray-700 text-sm font-medium mb-1 capitalize">
                  {key.replace("_", " ")}
                </label>
                <input
                  type={key.includes("date") ? "date" : "text"}
                  className="w-full px-4 py-2 border rounded-lg focus:ring focus:ring-indigo-300 text-sm"
                  value={petBottle[key]}
                  onChange={(e) =>
                    setPetBottle({ ...petBottle, [key]: e.target.value })
                  }
                />
              </div>
            ))}
          <button
            type="submit"
            className="w-full bg-indigo-600 text-white py-2 rounded-lg hover:bg-indigo-700 transition"
          >
            Update Pet Bottles
          </button>
        </form>
      </div>
    </div>
  );
};

export default EditPetBottle;
