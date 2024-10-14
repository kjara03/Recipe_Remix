import "./RecipeCard.css";

const RecipeCard = () => {
    return(
        <>
            <div className="card">;
                <img  src="../../assets/cakePic2.jpg" className="card-img-top" alt="Image of Cake"/>
                <div className="card-body">
                    <h5 className="card-title">Moist Cake Recipe</h5>
                    <p className="card-text">
                        Lorem ipsum odor amet, consectetuer adipiscing elit. Volutpat purus facilisis accumsan inceptos sodales vitae. Risus fames eget feugiat etiam malesuada felis augue. Etiam sit mi elementum amet convallis vivamus.
                    </p>
                </div>
                <a href="#" class="card-link">Click Here to find out this Delicious Recipe</a>
            </div>      
        </>
   );
};

export default RecipeCard