import React, { useState, useEffect } from "react";
import axios from "axios";
import Navbar from "../../components/Navbar";
import ForumTr from "../../components/ForumTr";

function ContradictoryNews() {
  const [news, setNews] = useState([]);
  const [loading, setLoading] = useState(false);
  const [summarized, setSummarized] = useState([]);

  console.log("====================================");
  console.log(summarized);
  console.log("====================================");

  useEffect(() => {
    const showNews = async () => {
      setLoading(true);
      try {
        const response = await axios.get("http://localhost:4000");
        setNews(response.data);
      } catch (error) {
        console.error("News Fetch Error:", error);
      } finally {
        setLoading(false);
      }
    };
    showNews();
  }, []);

  useEffect(() => {
    if (news.length > 0) {
      let respArray = [];
      news.map((item, index) => {
        // console.log(item._id)
        if (index < news.length - 1) {
          axios
            .post("http://127.0.0.1:5000/summarize_and_detect", {
              article1: item?.description,
              article2: news[index + 1]?.description,
            })
            .then((response) => {
              const result = response.data;
              console.log(result);
              setSummarized((prev) => [...prev, { ...result, id: item._id, nextId: news[index + 1]?._id }]);
            })
            .catch((error) => {
              console.error("Python Error:", error);
            });
        }
      });
    }
  }, [news]);

  return (
    <React.Fragment>
      <Navbar />
      <div className="min-h-screen bg-gray-50 dark:bg-slate-800 p-4">
        {/* <section className="flex-center w-full"> */}
        <div className="container relative  mt-6">
          <div className="relative overflow-x-auto block w-full bg-white dark:bg-slate-900 rounded-md border border-gray-200 dark:border-slate-800">
            {loading ? (
              <div className="absolute inset-0 flex items-center justify-center bg-white dark:bg-slate-900 bg-opacity-90 z-10">
                <div className="loader ease-linear rounded-full border-8 border-t-8 border-gray-200 h-12 w-12"></div>
              </div>
            ) : null}
          </div>
        </div>
        {/* </section> */}
        <h1 className="text-2xl font-medium text-center ">
          Contradictory News
        </h1>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-8">
          {summarized?.length !== 0 ? (
            summarized?.map((item, index) => {
              if (item.contradictions.length > 0) {
                return (
                  <div
                    key={index}
                    className="p-6 rounded-md shadow dark:shadow-gray-800 bg-white dark:bg-slate-900 mt-8"
                  >
                    <h5 className="text-lg font-semibold text-gray-900 dark:text-gray-100">
                      Contradiction {index + 1}:
                    </h5>
                    <div className="overflow-x-auto">
                      <table className="min-w-full bg-white dark:bg-slate-900 rounded-md mt-4">
                        <thead>
                          <tr>
                            <th className="py-3 px-4 font-semibold text-left border-b border-gray-200 dark:border-slate-700">
                              Article 1
                            </th>
                            <th className="py-3 px-4 font-semibold text-left border-b border-gray-200 dark:border-slate-700">
                              Article 2
                            </th>
                          </tr>
                        </thead>
                        <tbody>
                          <tr>
                            <td
                              onClick={() => {
                                window.location.href = `/${item.id}`;
                              }}
                              className="cursor-pointer py-3 px-4 border-b border-gray-200 dark:border-slate-700"
                            >
                              {item.article1_summary}
                            </td>
                            <td
                              onClick={() => {
                                window.location.href = `/${item.nextId}`;
                              }}
                              className="cursor-pointer py-3 px-4 border-b border-gray-200 dark:border-slate-700"
                            >
                              {item.article2_summary}
                            </td>
                          </tr>
                        </tbody>
                      </table>
                    </div>
                    <h5 className="text-lg font-semibold mt-4 text-gray-900 dark:text-gray-100">
                      Contradictions:
                    </h5>
                    {item.contradictions.map((contradiction, index) => (
                      <p
                        key={index}
                        className="mt-2 text-gray-700 dark:text-gray-300"
                      >
                        {contradiction}
                      </p>
                    ))}
                  </div>
                );
              }
              return null;
            })
          ) : (
            <div className="p-6 rounded-md shadow dark:shadow-gray-800 bg-white dark:bg-slate-900 mt-8">
              No Summarized News Found
            </div>
          )}
        </div>
      </div>
    </React.Fragment>
  );
}

export default ContradictoryNews;
