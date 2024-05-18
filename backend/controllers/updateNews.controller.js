import News from "../model/news.model.js";

export const updateNews = async (req, res) => {
  try {
    const news = await News.findOneAndUpdate({ _id: req.params.id }, req.body, {
      new: true,
    });

    if (!news) {
      return res.status(404).json({ message: "News not found" });
    }

    res.status(200).json(news);
  } catch (error) {
    res.status(500).json({ message: "Internal server error" });
  }
};
