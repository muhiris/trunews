import express from "express";
import { signup, login } from "../controllers/signup.controller.js";
import { news } from "../controllers/news.controller.js";
import { upVote } from "../controllers/upVote.controller.js";
import { downVote } from "../controllers/downVote.controller.js";
import { newsDetail } from "../controllers/newsDetail.controller.js";
import { addNews } from "../controllers/addNews.controller.js";
import { addComment } from "../controllers/addComment.controller.js";
import { searchNews } from "../controllers/searchNews.controller.js";
import { updateNews } from "../controllers/updateNews.controller.js";
import { getUserNews } from "../controllers/getUserNews.js";
import { deleteNews } from "../controllers/deleteNews.controller.js";
const router = express.Router();

router.post("/signup", signup);
router.post("/login", login);
router.post("/:id/addnews", addNews);
// router.get("/", news);
// make homeRoute with one query Trending below
router.get("/", news);

router.put("/:id/:userid/upvote", upVote);
router.put("/:id/:userid/downvote", downVote);

router.get("/:id", newsDetail);
router.post("/:id/addcomment", addComment);
router.put("/:id/:userid/update", updateNews);
router.delete("/:id/:userid/delete", deleteNews);
router.get("/api/search", searchNews);
router.get("/:id/news", getUserNews);
export default router;
