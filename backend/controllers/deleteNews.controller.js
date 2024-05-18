import News from "../model/news.model.js";

export const deleteNews = async (req, res) => {
  try {
    const news = await News.findOneAndDelete({ _id: req.params.id });

    if (!news) {
      return res.status(404).json({ message: "News not found" });
    }

    res.status(200).json({ message: "News deleted successfully", news });
  } catch (error) {
    res.status(500).json({ message: "Internal server error" });
  }
};
