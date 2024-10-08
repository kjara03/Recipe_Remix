import "./App.css";
import Navbar from "./components/Navbar/Navbar";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

const App = () => {
  return (
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
  );
};

export default App;
