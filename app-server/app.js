import express from "express";
import cors from "cors";
import axios from "axios";
import { API, baseUrl } from "../routes/api-routes.js";

const app = express();
const port = 3000;
app.use(cors(baseUrl));

app.get("/posts", async (req, res) => {
  try {
    const searchValue = req?.query?.title || null;
    const sortValue = req?.query?.sort || null;

    const response = await axios.get(API.posts);
    let data = response.data;

    if (searchValue) {
      data = data.filter((item) =>
        item.title.toLowerCase().includes(searchValue.toLowerCase())
      );
    }

    if (sortValue) {
      switch (sortValue) {
        case "ascending":
          data?.sort((a, b) => a?.title?.localeCompare(b?.title));
          break;
        case "descending":
          data?.sort((a, b) => b?.title?.localeCompare(a?.title));
          break;
        case "most_trending":
          data?.sort((a, b) => b?.title?.length - a?.title?.length);
          break;
        case "least_trending":
          data?.sort((a, b) => a?.title?.length - b?.title?.length);
          break;
      }
    }

    res.json(data);
  } catch (error) {
    res.status(500).json({ error: "An error occurred while fetching data." });
  }
});

app.get("/posts_trending", async (req, res) => {
  try {
    const response = await axios.get(API.posts);

    const trendingPosts = (response.data || [])?.sort(
      (a, b) => b?.title?.length - a?.title?.length
    );

    const top5TrendingPosts = trendingPosts.slice(0, 5);
    res.json(top5TrendingPosts);
  } catch (error) {
    res.status(500).json({ error: "An error occurred while fetching data." });
  }
});

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
