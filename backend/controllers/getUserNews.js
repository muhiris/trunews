import News from "../model/news.model.js";

export const getUserNews = async (req, res) => {
  const userId = req.params.id;

  try {
    const userNews = await News.find({ newsAuthor: userId });
    res.status(200).json(userNews);
  } catch (error) {
    res.status(500).json({ message: "Internal server error" });
  }
};
