import mongoose from "mongoose";

const newsSchema = mongoose.Schema({
  title: {
    type: String,
  },
  description: {
    type: String,
  },
  subHeading: { type: String, default: "" },
  category: [
    {
      type: String,
    },
  ],
  upVote: {
    type: Number,
    default: 0,
  },
  downVote: {
    type: Number,
    default: 0,
  },
  upVotes: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "SignUp",
    },
  ],
  downVotes: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "SignUp",
    },
  ],
  image: { type: String },
  commentsCount: { type: Number, default: 0 },
  newsAuthor: { type: mongoose.Schema.Types.ObjectId, ref: "SignUp" },
  author: { type: String },
  published: { type: Date },
  comments: [
    {
      comment: { type: String, default: "" },
      username: { type:String },
      createdAt: { type: Date, default: Date.now },
    },
  ],
});

const News = mongoose.model("News", newsSchema);
export default News;
