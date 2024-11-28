import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import "./FavoriteIcon.css";
import useAuth from "../../context/AuthContext";
import useAlert from "../../context/AlertContext";

const FavoriteIcon = () => {
  const [isFavorite, setIsFavorite] = useState(false);
  const { id } = useParams();
  const { user } = useAuth();
  const { showAlert } = useAlert();

  useEffect(() => {
    // Function to fetch the favorite status of the recipe if a user is logged in
    async function fetchFavoriteStatus() {
      if (user) {
        const response = await fetch(`/api/favorite/${user.userid}/${id}`);
        const json = await response.json();
        if (json) {
          setIsFavorite(true);
        }
      }
    }
    fetchFavoriteStatus();
  }, [id, user]);

  // Function to add/remove recipe from favorite list
  async function toggleFavorite() {
    if (!user) {
      showAlert("danger", "Login to favorite recipes!", 5000);
      return;
    }
    if (isFavorite) {
      // Remove favorite entry if it is already favorited
      const response = await fetch("/api/favorite", {
        method: "DELETE",
        body: JSON.stringify({
          userid: user.userid,
          recipeid: id,
        }),
        headers: {
          "Content-type": "application/json; charset=UTF-8",
        },
      });
      const json = await response.json();
      console.log(json);
      setIsFavorite(false);
    } else {
      // Add to favorite list
      const response = await fetch("/api/favorite", {
        method: "POST",
        body: JSON.stringify({
          userid: user.userid,
          recipeid: id,
        }),
        headers: {
          "Content-type": "application/json; charset=UTF-8",
        },
      });
      const json = await response.json();
      console.log(json);
      setIsFavorite(true);
    }
  }

  return (
    <i
      className={`bi ${isFavorite ? "bi-star-fill" : "bi-star"} favorite-icon`}
      onClick={toggleFavorite}
    ></i>
  );
};

export default FavoriteIcon;
