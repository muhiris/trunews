import News from "../model/news.model.js";
import axios from "axios";

export const news = async (req, res) => {
  const query = req.query.sort;
  console.log("====================================");
  console.log("query", query);
  console.log("====================================");

  try {
    const response = await axios.get(
      "https://api.currentsapi.services/v1/latest-news",
      {
        headers: {
          Authorization: "tGh070CTjcU-xxw8PoGDxg36eYd4dRBqmJkL8JJ5sMVTxVFN",
        },
      }
    );

    const newsData = response.data.news;

    if (newsData.length === 0) {
      res.status(404).json({ msg: "No news found" });
      return;
    }

    for (const item of newsData) {
      const existingNews = await News.findOne({ title: item.title });

      if (!existingNews) {
        const data = new News({
          title: item.title,
          description: item.description,
          image: item.image,
          category: item.category,
          author: item.author,
          published: item.published,
        });
        await data.save();
      }
    }

    let sortedNewsData;
    if (query === "sort") {
      sortedNewsData = await News.aggregate([
        {
          $addFields: {
            totalVotes: { $sum: ["$upVote", "$downVote"] },
          },
        },
        {
          $sort: { totalVotes: -1 },
        },
      ]);
    } else {
      sortedNewsData = await News.find({}).sort({ upVote: -1 });
    }

    if (sortedNewsData.length === 0) {
      res.status(404).json({ msg: "No news found" });
    } else {
      res.status(200).json(sortedNewsData);
    }
  } catch (error) {
    res
      .status(500)
      .json({ msg: "Internal server error", error: error.message });
    console.log("====================================");
    console.log("error", error.message);
    console.log("====================================");
  }
};
