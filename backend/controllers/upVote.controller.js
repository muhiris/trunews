import News from "../model/news.model.js";

export const upVote = async (req, res) => {
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

    findNews.upVote += 1;
    findNews.upVotes.push(req.params.userid);
    const resp = await findNews.save();

    res.status(200).json(resp);
  } catch (error) {
    res.status(500).json({ message: "Internal server error" });
  }
};
