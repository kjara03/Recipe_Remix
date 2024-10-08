import "./search_bar.css";

const Search_bar = () => {
  return (
    <>
    <body>
        <div id="page_image">
            <div id="search_bar">
                <input type="search" id="search_value" placeholder="Search for Recipes..." size="100"/>
                <button type="submit" id ="search_icon"> Search </button>
            </div>
        </div>
    </body>
    </>
  );
};

export default Search_bar;