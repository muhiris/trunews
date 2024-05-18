import News from "../model/news.model.js";

export const addNews = async (req, res) => {
  const { title, description, image, category, subHeading,author,published } = req.body;
  const authorId = req.params.id;
  const data = new News({
    title,
    description,
    image,
    category: [category],
    subHeading,
    newsAuthor: authorId,
    author,
    published
  });
  try {
    await data.save();

    res.status(200).json({ msg: "Successfully Created News" });
  } catch (error) {
    res.status(500).json({ msg: "Error saving news " });
  }
};
