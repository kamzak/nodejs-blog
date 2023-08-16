export const baseUrl = "https://nodejs-blog-k7vl.vercel.app";

export const API = {
  posts: `https://jsonplaceholder.typicode.com/posts`,
};

export const NodeJsAPI = {
  posts: ({ sort, searchValue, prevOffset = 0 } = {}) =>
    `${baseUrl}/posts${sort ? `?sort=${sort}` : "?sort=ascending"}${
      searchValue ? `&title=${searchValue}` : ""
    }${`&offset=${prevOffset}`}`,
  posts_trending: `${baseUrl}/posts?trending=true`,
  posts_test: `${baseUrl}/posts`,
};
