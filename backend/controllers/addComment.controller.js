import News from "../model/news.model.js";

export const addComment = async (req, res) => {
  try {
    const { comment,username } = req.body;
    const newsId = req.params.id;

    const findNews = await News.findById(newsId);

    if (!findNews) {
      return res.status(404).json({ message: "News not found" });
    }

    findNews.comments.push({ comment,username });
    findNews.commentsCount += 1;
    await findNews.save();

    res.status(200).json(findNews);
  } catch (error) {
    res.status(500).json({ message: "Internal server error" });
  }
};
