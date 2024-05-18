import React, { useState } from "react";

import axios from "axios";

import InputField from "../../components/InputField";
import Navbar from "../../components/Navbar";
import { useNavigate } from "react-router-dom";
import { useParams } from "react-router-dom";
import { useUser } from "../../hooks/UserContext";
function AddNews() {
  const {user} = useUser();
  const { id } = useParams();
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    title: "",
    subHeading: "",
    description: "",
    category: "",
    image: null,
  });

  const handleChange = (e) => {
    const { name, value, files } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: name === "image" ? files[0]?.name : value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    await axios.post(`http://localhost:4000/${id}/addnews`, {
      title: formData.title,
      subHeading: formData.subHeading,
      description: formData.description,
      category: formData.category,
      image: formData.image,
      author:user?.name,
      published : Date.now()
    });
    navigate("/");
  };

  return (
    <React.Fragment>
      <Navbar />
      <div className="py-12 h-screen bg-slate-900 px-3 mt-[30px] md:mt-0">
        <div className="p-6 rounded-md shadow dark:shadow-gray-800 bg-white dark:bg-slate-900">
          <h5 className="text-lg font-semibold mb-4">Share News :</h5>
          <form onSubmit={handleSubmit}>
            <div className="grid lg:grid-cols-2 grid-cols-1 gap-5">
              <InputField
                item={"Title:"}
                htmlForName={"title"}
                type={"text"}
                placeholder={"Enter Title"}
                name="title"
                value={formData.title}
                onChange={handleChange}
              />
              <InputField
                item={"Sub Heading:"}
                htmlForName={"subheading"}
                type={"text"}
                placeholder={"Enter Subheading"}
                name="subHeading"
                value={formData.subHeading}
                onChange={handleChange}
              />
              <InputField
                item={"Image:"}
                htmlForName={"tags"}
                type={"file"}
                placeholder={"Enter News Image"}
                name="image"
                onChange={handleChange}
              />

              <div>
                <label className="form-label font-medium">Category : </label>
                <div className="form-icon relative mt-2">
                  <select
                    className="form-select w-full py-2 px-3 h-10 bg-transparent dark:bg-slate-900 dark:text-slate-200 rounded outline-none border border-gray-200 focus:border-indigo-600 dark:border-gray-800 dark:focus:border-indigo-600 focus:ring-0"
                    id="category"
                    name="category"
                    required
                    value={formData.category}
                    onChange={handleChange}
                  >
                    <option value="">Select a category...</option>
                    <option value="war">War</option>
                    <option value="technology">Technology</option>
                    <option value="other">Other</option>
                  </select>
                </div>
              </div>
            </div>
            <div className="grid grid-cols-1">
              <div className="mt-5">
                <label className="form-label font-medium">Description : </label>
                <div className="form-icon relative mt-2">
                  <textarea
                    name="description"
                    id="description"
                    className="form-input ps-11 w-full py-2 px-3 h-28 bg-transparent dark:bg-slate-900 dark:text-slate-200 rounded outline-none border border-gray-200 focus:border-indigo-600 dark:border-gray-800 dark:focus:border-indigo-600 focus:ring-0"
                    placeholder="Message :"
                    defaultValue={""}
                    value={formData.description}
                    onChange={handleChange}
                  />
                </div>
              </div>
            </div>
            <input
              type="submit"
              id="submit"
              name="send"
              className="py-2 px-5 inline-block font-semibold tracking-wide border align-middle duration-500 text-base text-center bg-indigo-600 hover:bg-indigo-700 border-indigo-600 hover:border-indigo-700 text-white rounded-md mt-5"
              value="Save Changes"
            />
          </form>
        </div>
      </div>
    </React.Fragment>
  );
}

export default AddNews;
