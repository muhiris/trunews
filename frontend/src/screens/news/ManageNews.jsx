import React, { useEffect, useState } from "react";
import ForumTr from "../../components/ForumTr";
import Navbar from "../../components/Navbar";
import { useUser } from "../../hooks/UserContext";
import axios from "axios";

function ManageNews() {
  const [news, setNews] = useState([]);
  const { user } = useUser();
  const { isjournalist, _id } = user;
  useEffect(() => {
    axios
      .get(`http://localhost:4000/${_id}/news`)
      .then((response) => {
        setNews(response.data);
      })
      .catch((err) => {});
  }, []);
  if (news.length === 0) {
    return (
      <React.Fragment>
        <Navbar />

        <div className="flex justify-center mt-2">
          <h4 className="text-xl">No News Found </h4>
        </div>
      </React.Fragment>
    );
  }

  return (
    <React.Fragment>
      <Navbar />
      <section className="min-h-screen bg-slate-900 flex-center w-full">
        <div className="container relative">
          <div className="relative overflow-x-auto block w-full bg-white dark:bg-slate-900 rounded-md border border-gray-100 dark:border-slate-800">
            <table className="w-full text-start">
              <thead className="text-lg border-b border-gray-100 dark:border-slate-800">
                <tr>
                  <th className="py-6 px-4 font-semibold min-w-[300px] text-start">
                    Forum
                  </th>
                  <th className="text-center py-6 px-4 font-semibold min-w-[40px]">
                    Category
                  </th>
                  <th className="text-center py-6 px-4 font-semibold min-w-[40px]">
                    Comments
                  </th>
                  {/* <th className="py-6 px-4 font-semibold min-w-[220px] text-center">
                  Update
                </th>
                <th className="py-6 px-4 font-semibold min-w-[220px] text-center">
                  Delete
                </th> */}
                </tr>
              </thead>
              <tbody>
                {news?.map((item, index) => (
                  <ForumTr
                    key={index}
                    id={item._id}
                    title={item.title}
                    description={item.description}
                    commentsCount={item.commentsCount}
                    likes={item.upVote}
                    dislikes={item.downVote}
                    isjournalist={isjournalist}
                    category={item.category[0].toUpperCase()}
                  />
                ))}

                {/*end topic content*/}
              </tbody>
            </table>
          </div>
        </div>
      </section>
    </React.Fragment>
  );
}

export default ManageNews;
