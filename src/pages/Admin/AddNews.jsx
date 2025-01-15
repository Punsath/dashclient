import axios from "axios";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const AddNews = () => {
  const [news, setNews] = useState({
    title: "",
    description: "",
    date: "",
    image: null,
  });

  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!news.title || !news.description || !news.date || !news.image) {
      alert("Please fill all the fields.");
      return;
    }

    const formData = new FormData();
    formData.append("title", news.title);
    formData.append("description", news.description);
    formData.append("date", news.date);
    formData.append("image", news.image);

    axios
      .post("http://localhost:8000/auth/add_news", formData)
      .then((result) => {
        if (result.data.Status) {
          navigate("/dashboard/employee");
        } else {
          alert(result.data.Error);
        }
      })
      .catch((err) => console.log(err));
  };

  return (
    <div className="p-4 sm:p-6 lg:p-8 bg-gray-50 min-h-screen flex items-center justify-center">
      <div className="bg-white shadow-md rounded-lg p-6 w-full max-w-xl">
        <h3 className="text-xl sm:text-2xl font-semibold text-center mb-6 text-gray-800">
          Add News
        </h3>
        <form className="space-y-5" onSubmit={handleSubmit}>
          {/* Title */}
          <div>
            <label className="block text-sm sm:text-base font-medium text-gray-700 mb-1">
              Title
            </label>
            <input
              type="text"
              className="w-full px-4 py-2 border rounded-lg focus:ring focus:ring-indigo-300 text-sm sm:text-base"
              placeholder="Enter Title"
              value={news.title}
              onChange={(e) => setNews({ ...news, title: e.target.value })}
            />
          </div>

          {/* Date */}
          <div>
            <label className="block text-sm sm:text-base font-medium text-gray-700 mb-1">
              Date
            </label>
            <input
              type="date"
              className="w-full px-4 py-2 border rounded-lg focus:ring focus:ring-indigo-300 text-sm sm:text-base"
              value={news.date}
              onChange={(e) => setNews({ ...news, date: e.target.value })}
            />
          </div>

          {/* Description */}
          <div>
            <label className="block text-sm sm:text-base font-medium text-gray-700 mb-1">
              Description
            </label>
            <textarea
              className="w-full px-4 py-2 border rounded-lg focus:ring focus:ring-indigo-300 text-sm sm:text-base"
              placeholder="Enter Description"
              rows="4"
              value={news.description}
              onChange={(e) => setNews({ ...news, description: e.target.value })}
            />
          </div>

          {/* Image */}
          <div>
            <label className="block text-sm sm:text-base font-medium text-gray-700 mb-1">
              Select Image
            </label>
            <input
              type="file"
              className="w-full px-4 py-2 border rounded-lg focus:ring focus:ring-indigo-300 text-sm sm:text-base"
              onChange={(e) => setNews({ ...news, image: e.target.files[0] })}
            />
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            className="w-full bg-indigo-600 text-white py-2 sm:py-3 rounded-lg hover:bg-indigo-700 transition text-sm sm:text-base font-medium"
          >
            Add News
          </button>
        </form>
      </div>
    </div>
  );
};

export default AddNews;
