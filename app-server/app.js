import express from "express";
import cors from "cors";
import axios from "axios";
import { API, baseUrl } from "../routes/api-routes.js";

const app = express();
const port = 3000;
app.use(cors(baseUrl));

app.get("/posts", async (req, res) => {
  try {
    // Extract search parameters from the request
    const searchValue = req?.query?.title || null;
    const sortValue = req?.query?.sort || null;
    const trending = req?.query?.trending || null;

    // Fetch data from the API
    const response = await axios.get(API.posts);
    let data = response.data;

    // If trending is specified, sort the posts by title length (as a stand-in for trendiness)
    if (trending) {
      data = data?.sort(
        (a, b) => b?.title?.length - a?.title?.length
      );

      const top5TrendingPosts = data.slice(0, 5);
      res.json(top5TrendingPosts);
    } else {
      // If a search value is specified, filter the posts
      if (searchValue) {
        data = data.filter((item) =>
          item.title.toLowerCase().includes(searchValue.toLowerCase())
        );
      }
      // If a sort value is specified, sort the posts accordingly
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
      // Return the resulting data
      res.json(data);
    }
  } catch (error) {
    res.status(500).json({ error: "An error occurred while fetching data." });
  }
});

app.listen(port, () => {
  console.log(`Node.js server listening on port ${port}`);
});
