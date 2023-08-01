import "./App.css";
import BlogList from "./components/BlogList";
import BlogTrending from "./components/BlogTrending";
import Logo from "./assets/react.svg";

function App() {
  return (
    <div className="main">
      <header>
        <img className="logo" src={Logo} alt="Blog logo" />
        <h1 className="title">Blog</h1>
      </header>
      <div className="content">
        <BlogList />
        <BlogTrending />
      </div>
    </div>
  );
}

export default App;
