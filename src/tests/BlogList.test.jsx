// eslint-disable-next-line no-unused-vars
import React from "react";
import { render, fireEvent, waitFor, screen } from "@testing-library/react";
import { Provider } from "react-redux";
import { rest } from "msw";
import { setupServer } from "msw/node";
import store from "../store/store";
import BlogList from "../components/BlogList";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { NodeJsAPI } from "../../routes/api-routes";

// Get api route
const ApiRoute = NodeJsAPI.posts();

// Create server with the defined handlers
const server = setupServer(
  rest.get(ApiRoute, (req, res, ctx) => {
    // This default handler returns a successful response
    return res(
      ctx.json([{ userId: 1, id: 1, title: "Test Title", body: "Test Body" }])
    );
  })
);

// Initialize QueryClient
const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      retry: false,
    },
  },
});

beforeAll(() => server.listen());
afterEach(() => server.resetHandlers());
afterAll(() => server.close());

// Set jsx mock
const BlogListMock = (
  <QueryClientProvider client={queryClient}>
    <Provider store={store}>
      <BlogList />
    </Provider>
  </QueryClientProvider>
);

// --------------------------------------------------------------------

test("renders blog list", async () => {
  render(BlogListMock);

  expect(screen.getByTestId("skeleton")).toBeInTheDocument();
  await waitFor(() => screen.getByTestId("blog-item"));
  expect(screen.getByTestId("blog-item")).toBeInTheDocument();
});

// --------------------------------------------------------------------

test("handles error state", async () => {
  // Override the default handler for this specific test
  server.use(
    rest.get(ApiRoute, (req, res, ctx) => {
      return res(ctx.status(500));
    })
  );

  render(BlogListMock);

  await screen.findByText("An error occurred while fetching data.");
});

// --------------------------------------------------------------------

test("handles search input", async () => {
  render(BlogListMock);

  fireEvent.change(screen.getByTestId("search-input"), {
    target: { value: "test" },
  });

  expect(screen.getByTestId("search-input")).toHaveValue("test");
});
