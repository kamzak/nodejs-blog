import "./App.css";
import BlogList from "./components/BlogList";
import BlogTrending from "./components/BlogTrending";
import Logo from "./assets/react.svg";
import { useMediaQuery } from "@mui/material";

function App() {
  const isMobile = useMediaQuery("(max-width:680px)");

  return (
    <div className="main">
      <header>
        <img className="logo" src={Logo} alt="Blog logo" />
        <h1 className="title">Blog</h1>
      </header>
      <div className="content">
        <BlogList />
        {isMobile ? null : <BlogTrending />}
      </div>
    </div>
  );
}

export default App;
