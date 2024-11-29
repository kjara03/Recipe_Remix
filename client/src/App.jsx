import "./App.css";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import ExplorePage from "./pages/ExplorePage/ExplorePage";
import FavoritePage from "./pages/FavoritePage/FavoritePage";
import HomePage from "./pages/HomePage/HomePage";
import NotFoundPage from "./pages/NotFoundPage/NotFoundPage";
import SearchPage from "./pages/SearchPage/SearchPage";
import RecipePage from "./pages/RecipePage/RecipePage";
import AccountPage from "./pages/AccountPage/AccountPage";
import Alert from "./components/Alert/Alert";
import Navbar from "./components/Navbar/Navbar";
import AlertProvider from "./context/AlertProvider";
import AuthProvider from "./context/AuthProvider";
import { CookiesProvider } from "react-cookie";

const App = () => {
  return (
    <div className="App">
      <CookiesProvider>
        <AuthProvider>
          <AlertProvider>
            <Alert />
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
          </AlertProvider>
        </AuthProvider>
      </CookiesProvider>
    </div>
  );
};

export default App;
