import "./App.css";
import Navbar from "./components/Navbar/Navbar";
import ExplorePage from "./pages/ExplorePage/ExplorePage";
import FavoritePage from "./pages/FavoritePage/FavoritePage";
import HomePage from "./pages/HomePage/HomePage";
import NotFoundPage from "./pages/NotFoundPage/NotFoundPage";
import SearchPage from "./pages/SearchPage/SearchPage";
import RecipePage from "./pages/RecipePage/RecipePage";
import AccountPage from "./pages/AccountPage/AccountPage";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

const App = () => {
  return (
    <div className="App">
      <Router>
        <Navbar />
        <Routes>
          <Route path="/" element={<HomePage />}></Route>
          <Route path="/search/:query" element={<SearchPage />}></Route>
          <Route path="/recipe/:id" element={<RecipePage />}></Route>
          <Route path="/favorites" element={<FavoritePage />}></Route>
          <Route path="/account" element={<AccountPage />}></Route>
          <Route path="/about"></Route>
          <Route path="/explore" element={<ExplorePage />}></Route>
          <Route path="*" element={<NotFoundPage />} />
        </Routes>
      </Router>
    </div>
  );
};

export default App;
