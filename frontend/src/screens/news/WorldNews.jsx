import React, { useState, useEffect } from "react";
import axios from "axios";
import Navbar from "../../components/Navbar";
import ForumTr from "../../components/ForumTr";

function WorldNews() {
  const [news, setNews] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const showNews = async () => {
      setLoading(true);
      try {
        const response = await axios.get("http://localhost:4000");
        setNews(response.data);
      } catch (error) {
      } finally {
        setLoading(false);
      }
    };
    showNews();
  }, []);

  return (
    <React.Fragment>
      <Navbar />
      <div className="min-h-screen bg-gray-50 dark:bg-slate-800">
        <section className="flex-center w-full">
          <div className="container relative md:mt-24 mt-16">
            <div className="relative overflow-x-auto block w-full bg-white dark:bg-slate-900 rounded-md border border-gray-100 dark:border-slate-800">
              {loading ? (
                <div className="absolute inset-0 flex items-center justify-center bg-white dark:bg-slate-900 bg-opacity-90 z-10">
                  <div className="loader ease-linear rounded-full border-8 border-t-8 border-gray-200 h-12 w-12"></div>
                </div>
              ) : null}
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
                  </tr>
                </thead>
                <tbody>
                  {news?.map((item, index) => {
                    if (item.category[0].toUpperCase() === "WORLD") {
                      return (
                        <ForumTr
                          key={index}
                          id={item._id}
                          title={item.title}
                          description={item.description}
                          commentsCount={item.commentsCount}
                          likes={item.upVote}
                          dislikes={item.downVote}
                          upVote={(newsID, updatedObj) => {
                            // find news by id and then update entire Object
                            const updatedNews = news.map((news) => {
                              if (news._id === newsID) {
                                return updatedObj;
                              }
                              return news;
                            });
                            setNews(updatedNews);
                          }}
                          downVote={(newsID, updatedObj) => {
                            // find news by id and then update entire Object
                            const updatedNews = news.map((news) => {
                              if (news._id === newsID) {
                                return updatedObj;
                              }
                              return news;
                            });
                            setNews(updatedNews);
                          }}
                          category={item.category[0].toUpperCase()}
                        />
                      );
                    }
                  })}
                </tbody>
              </table>
            </div>
          </div>
        </section>
      </div>
    </React.Fragment>
  );
}

export default WorldNews;
