import axios from "axios";
import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";

const EditWasteCollection = () => {
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
      .get(`http://localhost:8000/api/pet_bottle/${id}`)
      .then((result) => {
        setPetBottle(result.data.Result[0]);
      })
      .catch((err) => console.error(err));
  }, [id]);

  const handleSubmit = (e) => {
    e.preventDefault();

    axios
      .put(`http://localhost:8000/api/edit_pet_bottle/${id}`, petBottle)
      .then((response) => {
        if (response.data.Status) {
          alert("Pet Bottle updated successfully");
          navigate("/dashboard/pet_bottles");
        } else {
          alert(response.data.Error);
        }
      })
      .catch((err) => console.error(err));
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-100 p-4">
      <div className="bg-white shadow-lg rounded-lg p-6 w-full max-w-lg">
        <h3 className="text-xl font-semibold mb-6 text-gray-800">
          Edit Pet Bottle
        </h3>
        <form className="space-y-4" onSubmit={handleSubmit}>
          {Object.keys(petBottle).map((key) => (
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
            Update Pet Bottle
          </button>
        </form>
      </div>
    </div>
  );
};

export default EditWasteCollection;
