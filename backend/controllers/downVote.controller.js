import News from "../model/news.model.js";

export const downVote = async (req, res) => {
  try {
    const findNews = await News.findOne({ _id: req.params.id });

    if (!findNews) {
      return res.status(404).json({ message: "News not found" });
    }

    if (
      findNews.upVotes.includes(req.params.userid) ||
      findNews.downVotes.includes(req.params.userid)
    ) {
      return res.status(200).json(findNews);
    }

    findNews.downVote += 1;
    findNews.downVotes.push(req.params.userid);
    await findNews.save();

    res.status(200).json(findNews);
  } catch (error) {
    res.status(500).json({ message: "Internal server error" });
  }
};
