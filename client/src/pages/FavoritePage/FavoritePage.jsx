import { useState, useEffect } from "react";
import GridLayout from "../../components/GridLayout/GridLayout";
import LoadingSpinner from "../../components/LoadingSpinner/LoadingSpinner";
import useAuth from "../../context/AuthContext";
const API = import.meta.env.VITE_API_BASE_URL || "";

const FavoritePage = () => {
  const [favorites, setFavorites] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const { user } = useAuth();

  useEffect(() => {
    setIsLoading(true);
    // Function to fetch favorite recipes by a user
    async function fetchFavorites() {
      if (user) {
        const response = await fetch(`${API}/favorite/${user.userid}`);
        const json = await response.json();
        setFavorites(json.data);
      }
      setIsLoading(false);
    }
    fetchFavorites();
  }, [user]);

  return (
    <div className="container mt-4 text-center">
      {isLoading ? (
        <LoadingSpinner />
      ) : user ? (
        // Check if the user has any favorite recipes
        favorites.length > 0 ? (
          <>
            <h2 className="mb-4">My Favorite Recipes</h2>
            <GridLayout recipes={favorites} />
          </>
        ) : (
          <h2>You have no favorite recipes yet.</h2>
        )
      ) : (
        <h2>Log in to see your favorite recipes!</h2>
      )}
    </div>
  );
};

export default FavoritePage;
