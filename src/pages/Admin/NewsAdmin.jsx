import axios from "axios";
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";

const NewsAdmin = () => {
  const [news, setNews] = useState([]);

  useEffect(() => {
    axios
      .get("http://localhost:8000/auth/news") // Adjusted to fetch news
      .then((result) => {
        if (result.data.Status) {
          setNews(result.data.Result); // Set news instead of employee
        } else {
          alert(result.data.Error);
        }
      })
      .catch((err) => console.log(err));
  }, []);

  const handleDelete = (id) => {
    if (window.confirm("Are you sure you want to delete this news?")) {
      axios
      .delete(`http://localhost:8000/auth/delete_news/${id}`) 
      .then((result) => {
        if (result.data.Status) {
          setNews(news.filter((n) => n.id !== id)); // Filter news
        } else {
          alert(result.data.Error);
        }
      });
    }
  };

  return (
    <div className="px-4 py-6 sm:px-6 lg:px-8">
      {/* Header */}
      <div className="flex flex-col sm:flex-row justify-between items-center mb-6">
        <h3 className="text-2xl font-semibold text-gray-800">News Details</h3>
        <Link
          to="/dashboard/add_employee" // Adjusted to add news
          className="bg-[#004066] text-white px-4 py-2 rounded-md hover:bg-[#283f4d] transition"
        >
          + Add News
        </Link>
      </div>

      {/* Table Container */}
      <div className="overflow-x-auto bg-white shadow-md rounded-lg">
        <table className="min-w-full border-collapse">
          <thead>
            <tr className="bg-[#004066] text-white text-sm sm:text-base">
              <th className="py-3 px-2 sm:px-4 text-left">Title</th>
              <th className="py-3 px-2 sm:px-4 text-left">Image</th>
              <th className="py-3 px-2 sm:px-4 text-left">Date</th>
              <th className="py-3 px-2 sm:px-4 text-left">Description</th>
              <th className="py-3 px-2 sm:px-4 text-left">Action</th>
            </tr>
          </thead>
          <tbody>
            {news.map((n, index) => (
              <tr
                key={index}
                className="border-b hover:bg-gray-100 transition text-sm sm:text-base"
              >
                <td className="py-3 px-2 sm:px-4">{n.title}</td> {/* Title */}
                <td className="py-3 px-2 sm:px-4">
                  <img
                    src={`http://localhost:8000/Images/${n.image}`} // Image URL
                    alt="News"
                    className="w-8 h-8 sm:w-10 sm:h-10 rounded-full object-cover border"
                  />
                </td>
                <td className="py-3 px-2 sm:px-4">{n.date}</td> {/* Date */}
                <td className="py-3 px-2 sm:px-4">{n.description}</td> {/* Description */}
                <td className="py-3 px-2 sm:px-4 flex flex-col sm:flex-row space-y-2 sm:space-y-0 sm:space-x-2">
                  <Link
                    to={`/dashboard/edit_employee/${n.id}`} // Adjusted to edit news
                    className="bg-green-500 text-white px-3 py-1 rounded text-xs sm:text-sm hover:bg-green-600 transition"
                  >
                    Edit
                  </Link>
                  <button
                    className="bg-red-500 text-white px-3 py-1 rounded text-xs sm:text-sm hover:bg-red-600 transition"
                    onClick={() => handleDelete(n.id)} // Adjusted to delete news
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
  );
};

export default NewsAdmin;
