import React, { useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import { useUser } from "../hooks/UserContext";
import { useNavigate } from "react-router-dom";

function ForumTr({
  id,
  title,
  description,
  likes,
  dislikes,
  commentsCount,
  category,
  upVote,
  downVote,
  isjournalist = false,
}) {
  const { user } = useUser();
  const [upvotes, setUpvotes] = useState(likes);
  const [downvotes, setDownvotes] = useState(dislikes);
  const navigate = useNavigate();
  const handleUpVote = async (id) => {
    if (!user?.name) {
      alert("Please Login");
      return;
    }
    try {
      const response = await axios.put(
        `http://localhost:4000/${id}/${user?._id}/upvote`
      );
      if (
        response.data.downVote === dislikes &&
        response.data.upVote === likes
      ) {
        alert("Already Voted");
        return;
      }
      upVote(id, response.data);
    } catch (error) {}
  };

  const handleDownVote = async (id) => {
    if (!user?.name) {
      alert("Please Login");
      return;
    }
    try {
      const response = await axios.put(
        `http://localhost:4000/${id}/${user?._id}/downvote`
      );
      if (
        response.data.downVote === dislikes &&
        response.data.upVote === likes
      ) {
        alert("Already Voted");
        return;
      }
      downVote(id, response.data);
    } catch (error) {}
  };

  const handleUpdate = () => {
    navigate(`/${id}/${user?._id}/update`);
  };
  const handleDelete = () => {
    try {
      axios
        .delete(`http://localhost:4000/${id}/${user?._id}/delete`)
        .then(() => {
          alert("News deleted");
          navigate("/");
        })
        .catch(() => {
          alert("Error deleting");
        });
    } catch (e) {
      alert("Failed to delete");
    }
  };
  return (
    <tr className="border-b border-gray-100 dark:border-slate-800">
      <th className="p-4">
        <div className="flex text-start">
          <i className="uil uil-comment text-indigo-600 text-2xl" />
          <div className="ms-2">
            <Link to={`/${id}`} className="hover:text-indigo-600 text-lg">
              {title}
            </Link>
            <p className="text-slate-400 font-normal">{description}</p>
          </div>
        </div>
      </th>
      <td className="text-center p-4">{category}</td>
      <td className="text-center p-4">{commentsCount}</td>
      {!isjournalist ? (
        <div>
          <td className="text-center p-4">
            <p>{likes}</p>
            <button
              className="btn btn-primary"
              onClick={() => handleUpVote(id)}
            >
              Upvote
            </button>
          </td>
          <td className="text-center p-4">
            <p>{dislikes}</p>
            <button
              className="btn btn-primary"
              onClick={() => handleDownVote(id)}
            >
              Downvote
            </button>
          </td>
        </div>
      ) : (
        <div className="">
          <td className="text-center p-4">
            <button className="btn btn-primary" onClick={handleUpdate}>
              Update
            </button>
          </td>
          <td className="text-center p-4">
            <button className="btn btn-outline" onClick={handleDelete}>
              Delete
            </button>
          </td>
        </div>
      )}
    </tr>
  );
}

export default ForumTr;
