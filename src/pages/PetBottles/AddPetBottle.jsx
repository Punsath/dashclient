import axios from "axios";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const AddPetBottle = () => {
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

  const handleSubmit = (e) => {
    e.preventDefault();

    if (
      !petBottle.collection_point ||
      !petBottle.weight ||
      !petBottle.date_collected ||
      !petBottle.description ||
      !petBottle.contact_person ||
      !petBottle.contact_email ||
      !petBottle.address ||
      !petBottle.collection_method
    ) {
      alert("Please fill all fields.");
      return;
    }

    const formData = new FormData();
    formData.append("collection_point",petBottle.collection_point);
    formData.append("weight",petBottle.weight);
    formData.append("date_collected",petBottle.date_collected);
    formData.append("description",petBottle.description);
    formData.append("contact_person",petBottle.contact_person);
    formData.append("contact_email",petBottle.contact_email);
    formData.append("address",petBottle.address);
    formData.append("collection_method",petBottle.collection_method);

    axios
      .post("http://localhost:8000/petbottles/add_pet_bottle", petBottle)
      .then((result) => {
        if (result.data.Status) {
          alert("Pet Bottle added successfully");
          navigate("/dashboard/pet_bottles");
        } else {
          alert(result.data.Error);
        }
      })
      .catch((err) => console.error(err));
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-100 p-4">
      <div className="bg-white shadow-lg rounded-lg p-6 w-full max-w-lg">
        <h3 className="text-xl font-semibold mb-6 text-gray-800">
          Add Pet Bottles
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
            Add Pet Bottles
          </button>
        </form>
      </div>
    </div>
  );
};

export default AddPetBottle;
