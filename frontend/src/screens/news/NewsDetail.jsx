import React, { useState, useEffect } from "react";
import Comment from "../../components/Comment";
import Navbar from "../../components/Navbar";
import { useParams } from "react-router-dom";
import axios from "axios";
import { useUser } from "../../hooks/UserContext";

function NewsDetail() {
  const [newsDetail, setNewsDetail] = useState({});
  const [comment, setComment] = useState("");
  const { id } = useParams();
  const { user } = useUser();
  useEffect(() => {
    const newsDetailFunction = async () => {
      try {
        const response = await axios.get(`http://localhost:4000/${id}`);
        setNewsDetail(response.data);
      } catch (error) {}
    };
    newsDetailFunction();
  }, [id]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!user?.name) {
      alert("Please Login");
      return;
    }
    try {
      await axios.post(`http://localhost:4000/${id}/addcomment`, {
        comment,
        username: user?.name,
      });
      const response = await axios.get(`http://localhost:4000/${id}`);
      setNewsDetail(response.data);
      setComment("");
    } catch (error) {}
  };

  const publishedDate = new Date(newsDetail.published);
  const formattedDate = publishedDate.toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });

  return (
    <div>
      <Navbar />
      <section className="relative md:pb-24 md:pt-40 pb-16 pt-36">
        <div className="container relative">
          <div className="flex-center gap-[30px]">
            <div className="lg:col-span-8 md:col-span-6 order-1 md:order-2">
              <div className="p-6 rounded-md shadow dark:shadow-gray-800">
                <img src={ newsDetail?.image} className="rounded-md" alt="" />
                <div className="text-center mt-12">
                <h3 className="my-3 text-[26px] font-semibold">
                    {newsDetail?.title}
                  </h3>
                  <ul className="list-none mt-6">
                    <li className="inline-block font-semibold text-slate-400 mx-4">
                      <span className="text-slate-900 dark:text-white block">
                        Client :
                      </span>
                      <span className="block">{newsDetail.author}</span>
                    </li>
                    <li className="inline-block font-semibold text-slate-400 mx-4">
                      <span className="text-slate-900 dark:text-white block">
                        Date :
                      </span>
                      <span className="block">{formattedDate}</span>
                    </li>
                  </ul>
                </div>

                <div className="mt-6">
                  <p className="text-slate-400"></p>
                  <p className="text-slate-400 italic border-x-4 border-indigo-600 rounded-ss-xl rounded-ee-xl mt-3 p-3">
                    {newsDetail?.description}
                  </p>
                </div>
              </div>
              <div className="p-6 rounded-md shadow dark:shadow-gray-800 mt-8">
                <h5 className="text-lg font-semibold">Leave A Comment:</h5>
                <form className="mt-8 w-full md:w-2/3" onSubmit={handleSubmit}>
                  <div className="grid grid-cols-1">
                    <div className="mb-5">
                      <div className="text-start">
                        <label htmlFor="comments" className="font-semibold">
                          Your Comment:
                        </label>
                        <div className="form-icon relative mt-2">
                          <i
                            data-feather="message-circle"
                            className="size-4 absolute top-3 start-4"
                          />
                          <textarea
                            name="comments"
                            id="comments"
                            className="form-input ps-11 w-full py-2 px-3 h-28 bg-transparent dark:bg-slate-900 dark:text-slate-200 rounded outline-none border border-gray-200 focus:border-indigo-600 dark:border-gray-800 dark:focus:border-indigo-600 focus:ring-0"
                            placeholder="Message :"
                            value={comment}
                            onChange={(e) => setComment(e.target.value)}
                          />
                        </div>
                      </div>
                    </div>
                  </div>
                  <button
                    type="submit"
                    id="submit"
                    name="send"
                    className="py-2 px-5 inline-block tracking-wide border align-middle duration-500 text-base text-center bg-indigo-600 hover:bg-indigo-700 border-indigo-600 hover:border-indigo-700 text-white rounded-md w-full"
                  >
                    Comment
                  </button>
                </form>
              </div>
              <div className="p-6 rounded-md shadow dark:shadow-gray-800 mt-8">
                {newsDetail?.comments?.length > 0 && (
                  <h5 className="text-lg font-semibold">Comments:</h5>
                )}
                {newsDetail?.comments?.map((item, index) => (
                  <Comment
                    key={index}
                    name={item.username}
                    time={new Date(item.createdAt).toLocaleString()}
                    comment={item.comment}
                  />
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}

export default NewsDetail;
