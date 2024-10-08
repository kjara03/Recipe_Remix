import "./App.css";
import Navbar from "./components/Navbar/Navbar";
import HomePage from "./pages/Homepage/Homepage";
import NotFoundPage from "./pages/NotFoundPage/NotFoundPage";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Search_bar from "./components/SearchBar/search_bar";

const App = () => {
  return (
    <div className="App">
      <Router>
        <Navbar></Navbar>
        <Routes>
          <Route path="/" element={<HomePage />}></Route>
          <Route path="/recipes"></Route>
          <Route path="/favorites"></Route>
          <Route path="/account"></Route>
          <Route path="/about"></Route>
          <Route path="*" element={<NotFoundPage />} />
        </Routes>
      </Router>
    </div>
  );
};

export default App;
