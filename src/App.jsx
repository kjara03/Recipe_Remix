import "./App.css";
import Navbar from "./components/Navbar/Navbar";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Search_bar from "./components/search_bar/search_bar";

const App = () => {
  return (
    <>
      <div className="App">
        <Router>
          <Navbar></Navbar>
          <Routes>
            <Route path="/"></Route>
            <Route path="/signup"></Route>
            <Route path="/login"></Route>
            <Route path="/account"></Route>
          </Routes>
        </Router>
      </div>
      <div>
        <Search_bar></Search_bar>
      </div>
    </>
  );
};

export default App;
