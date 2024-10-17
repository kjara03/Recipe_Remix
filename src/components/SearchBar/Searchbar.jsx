import { useState } from "react";
import "./Searchbar.css";
import { useNavigate } from "react-router-dom";

const Searchbar = () => {
  const [searchInput, setSearchInput] = useState("");
  const navigate = useNavigate();

  // Function to update search input
  function updateSearch(event) {
    setSearchInput(event.target.value);
  }

  // Function to search for recipes by navigating to the search page with the search input
  function searchRecipe(event) {
    event.preventDefault();
    if (searchInput.trim().length > 2) {
      navigate(`/search/${searchInput.trim()}`);
    } else {
      return;
    }
    setSearchInput("");
  }

  return (
    <search className="search-bar input-group">
      <form
        onSubmit={(event) => searchRecipe(event)}
        className="form-outline d-flex"
        data-mdb-input-init
      >
        <input
          type="search"
          className="form-control"
          id="search-input"
          placeholder="Search for recipes"
          minLength="3"
          value={searchInput}
          onChange={updateSearch}
          required
        />
        <button
          type="submit"
          className="btn btn-primary search-button"
          data-mdb-ripple-init
        >
          Search
        </button>
      </form>
    </search>
  );
};

export default Searchbar;
