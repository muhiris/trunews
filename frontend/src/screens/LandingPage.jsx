import React, { useState, useEffect } from "react";
import axios from "axios";
import ForumTr from "../components/ForumTr";
import Navbar from "../components/Navbar";
import { Link } from "react-router-dom";
import { FaSearch } from "react-icons/fa";
import { useUser } from "../hooks/UserContext";
import useDebounce from "../hooks/Debounce";
import file_path1 from "./article1.json";
import file_path2 from "./article2.json";

const url = "http://127.0.0.1:5000/summarize_and_detect";

const data = {
  article1: "jenfj",
  article2: "efnjn",
};

function LandingPage() {
  const [isWriter, setIsWriter] = useState(false);
  const [news, setNews] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [loading, setLoading] = useState(false);
  const debouncedSearchTerm = useDebounce(searchTerm, 500);
  const { user } = useUser();

  useEffect(() => {
    console.log("====================================");
    console.log("Data:", data);
    console.log("====================================");
    axios
      .post(url, data)
      .then((response) => {
        const result = response.data;
        console.log("Article 1 Summary:", result.article1_summary);
        console.log("Article 2 Summary:", result.article2_summary);
        console.log("Contradictions Detected:", result.contradictions);
        console.log("Contradiction Detected:", result.contradiction_detected);
        console.log("Numeric Mismatch Detected:", result.numeric_mismatch);
      })
      .catch((error) => {
        console.error("Pythin Error:", error);
      });

    console.log("====================================");
    console.log("Data:", "Out of post");
    console.log("====================================");

    const showNews = async () => {
      try {
        setLoading(true);
        const response = await axios.get("http://localhost:4000");
        setNews(response.data);
        setIsWriter(user.isjournalist);
      } catch (error) {
      } finally {
        setLoading(false);
      }
    };
    showNews();
  }, []);

  useEffect(() => {
    const showNews = async () => {
      console.log("====================================");
      console.log(debouncedSearchTerm.length, "debouncedSearchTerm");
      console.log("====================================");
      if (debouncedSearchTerm.length > 0) {
        try {
          setLoading(true);
          const response = await axios.get(
            `http://localhost:4000/api/search?search=${debouncedSearchTerm}`
          );

          setNews(response.data);
        } catch (error) {
        } finally {
          setLoading(false);
        }
      }
    };
    showNews();
  }, [debouncedSearchTerm, searchTerm]);

  const handleSearchChange = async (e) => {
    if (!e.target.value.length) {
      setSearchTerm("");
      return;
    }
    setSearchTerm(e.target.value);
  };
  if (loading) {
  }
  return (
    <React.Fragment>
      <Navbar />
      <div className="min-h-screen bg-gray-50 dark:bg-slate-800">
        <section className="relative table w-full ">
          <div className="container relative">
            <div className="grid grid-cols-1 mt-10 text-center">
              {!isWriter ? (
                <div>
                  <h3 className="font-bold uppercase leading-normal text-4xl mb-5">
                    TruNews
                  </h3>
                  <p className="text-slate-400 text-lg mx-auto">
                    Share the news and let the audience decide{" "}
                  </p>
                </div>
              ) : (
                <div>
                  <p className="font-bold uppercase leading-normal text-4xl mb-5">
                    Hello Writer
                  </p>
                  <div className="flex-center gap-5">
                    <Link
                      to={`/${user._id}/addnews`}
                      className="btn btn-primary"
                    >
                      Add News
                    </Link>
                    <Link to="managenews" className="btn btn-primary">
                      Manage News
                    </Link>
                  </div>
                </div>
              )}

              <div className="subcribe-form mt-6">
                <form className="relative max-w-xl mx-auto">
                  <input
                    type="text"
                    id="SearchForumKeyword"
                    name="text"
                    className="pt-4 pe-14 pb-4 ps-6 w-full h-[50px] outline-none text-black dark:text-white rounded-full bg-white dark:bg-slate-900 shadow dark:shadow-gray-800"
                    placeholder="Enter your keywords :"
                    value={searchTerm}
                    onChange={handleSearchChange}
                  />
                  <button
                    type="submit"
                    className="inline-flex items-center justify-center tracking-wide align-middle duration-500 text-base text-center absolute top-[2px] end-[3px] size-[46px] bg-indigo-600 hover:bg-indigo-700 border-indigo-600 hover:border-indigo-700 text-white rounded-full"
                  >
                    <FaSearch />
                  </button>
                </form>
              </div>
            </div>
          </div>
        </section>

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
                  {news ? (
                    news?.map((item, index) => (
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
                        category={item.category && item.category[0] ? item.category[0].toUpperCase() : "UNKNOWN"}
                      />
                    ))
                  ) : (
                    <h4 className="text-xl">No News Found </h4>
                  )}
                </tbody>
              </table>
            </div>
          </div>
        </section>
      </div>
    </React.Fragment>
  );
}

export default LandingPage;
