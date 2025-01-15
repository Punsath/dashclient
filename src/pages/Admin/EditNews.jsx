import axios from "axios";
import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";

const EditNews = () => {
  const { id } = useParams();
  const [news, setNews] = useState({
    title: "",
    description: "",
    date: "",
    image: null,
  });
  const navigate = useNavigate();

  useEffect(() => {
    // Fetch existing news data to edit
    axios
      .get(`http://localhost:8000/auth/news/${id}`)
      .then((result) => {
        setNews({
          title: result.data.Result[0].title,
          description: result.data.Result[0].description,
          date: result.data.Result[0].date,
        });
      })
      .catch((err) => console.log(err));
  }, [id]);

  const handleSubmit = (e) => {
    e.preventDefault(); // Prevent form default submission behavior

    const formData = new FormData();
    formData.append("title", news.title);
    formData.append("description", news.description);
    formData.append("date", news.date);
    if (news.image) {
      formData.append("image", news.image); // Add the file if it exists
    }

    axios
      .put(`http://localhost:8000/auth/edit_news/${id}`, formData)
      .then((response) => {
        if (response.data.Status) {
          alert("News updated successfully");
          navigate("/dashboard/employee"); // Redirect after successful edit
        } else {
          alert(response.data.Error);
        }
      })
      .catch((err) => console.error(err));
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-100 p-4">
      <div className="bg-white shadow-lg rounded-lg p-6 w-full max-w-2xl">
        <h3 className="text-2xl font-semibold text-center mb-4 text-gray-800">Edit News</h3>
        <form className="space-y-4" onSubmit={handleSubmit}>
          <div>
            <label className="block text-gray-700 font-medium">Title</label>
            <input
              type="text"
              className="w-full p-2 border rounded focus:ring focus:ring-indigo-300"
              placeholder="Enter Title"
              value={news.title}
              onChange={(e) => setNews({ ...news, title: e.target.value })}
            />
          </div>

          <div>
            <label className="block text-gray-700 font-medium">Date</label>
            <input
              type="date"
              className="w-full p-2 border rounded focus:ring focus:ring-indigo-300"
              value={news.date}
              onChange={(e) => setNews({ ...news, date: e.target.value })}
            />
          </div>

          <div>
            <label className="block text-gray-700 font-medium">Description</label>
            <textarea
              className="w-full p-2 border rounded focus:ring focus:ring-indigo-300"
              placeholder="Enter Description"
              value={news.description}
              onChange={(e) => setNews({ ...news, description: e.target.value })}
            />
          </div>

          <div>
            <label className="block text-gray-700 font-medium">Select Image</label>
            <input
              type="file"
              className="w-full p-2 border rounded focus:ring focus:ring-indigo-300"
              onChange={(e) => setNews({ ...news, image: e.target.files[0] })}
            />
          </div>

          <button
            type="submit"
            className="w-full bg-indigo-600 text-white py-2 rounded-lg hover:bg-indigo-700 transition"
          >
            Edit News
          </button>
        </form>
      </div>
    </div>
  );
};

export default EditNews;
