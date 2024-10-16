import React, { useState } from "react";
import RecipeCard from "./RecipeCard"; 
import "./GridLayout.css";

const GridLayout = () => {
        //Sample Data for cards
    const [cards] = useState([      // need to use APIs instead (later on)
        { id: 1, imgSrc: "../../assets/cakePic2.jpg" },
        { id: 2, imgSrc: "" },
        { id: 3, imgSrc: "" },
        { id: 4, imgSrc: "" },
        
    ]);

    return (
        <div className="container">
            <div className="row">
                {cards.map(card => (
                    //to adjust to different screen size and to render RecipeCard for card data:
                    <div className="col-md-4 col-sm-6 mb-4" key={card.id}> 
                        <RecipeCard /> 
                    </div>
                ))}
            </div>
        </div>
    );
};

export default GridLayout;