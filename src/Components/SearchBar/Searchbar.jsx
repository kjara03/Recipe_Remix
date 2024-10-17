import { useState } from "react";
import "./Searchbar.css";

const Searchbar = () => {
  const [searchInput, setSearchInput] = useState("");

  // Function to update search input
  function UpdateSearch(event) {
    setSearchInput(event.target.value);
  }

  // Function to search for recipes
  function SearchRecipe() {}

  return (
    <search className="search-bar input-group">
      <form
        onSubmit={SearchRecipe}
        className="form-outline d-flex"
        data-mdb-input-init
      >
        <input
          type="search"
          className="form-control"
          id="search-input"
          placeholder="Search for recipes"
          value={searchInput}
          onChange={UpdateSearch}
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
