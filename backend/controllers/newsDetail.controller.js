import News from "../model/news.model.js";

export const newsDetail = async (req, res) => {
  try {
    const findNews = await News.findOne({ _id: req.params.id });

    if (!findNews) {
      return res.status(404).json({ message: "News not found" });
    }
    res.status(200).json(findNews);
  } catch (error) {
    res.status(500).json({ message: "Internal server error" });
  }
};
