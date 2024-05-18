import News from "../model/news.model.js";

export const searchNews = async (req, res) => {
  try {
    const { search } = req.query;

    if (!search) {
      const data = await News.find();
      res.status(200).json(data);
    }

    const newsData = await News.find({
      title: { $regex: search, $options: "i" },
    });

    if (!newsData || newsData.length === 0) {
      return res.status(404).json({ msg: "No news found" });
    }

    res.status(200).json(newsData);
  } catch (error) {
    res.status(500).json({ msg: "Internal server error" });
  }
};
