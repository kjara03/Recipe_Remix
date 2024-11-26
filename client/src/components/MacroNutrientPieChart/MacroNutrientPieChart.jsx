import "./MacroNutrientPieChart.css";
import { Cell, Pie, PieChart } from "recharts";
import PropTypes from "prop-types";

const MacroNutrientPieChart = ({ carbs, fats, proteins }) => {
  // Extract the macronutrients
  const marcoNutrients = [
    { name: "Carbs", value: carbs },
    { name: "Fats", value: fats },
    { name: "Proteins", value: proteins },
  ];
  const colors = ["#ffcc00", "#ffa500", "#ff6347"]; // Colors to be used for the cells

  return (
    <div>
      <h3 className="text-center">Macronutrient Caloric Breakdown</h3>
      <div className="macro-pie-chart">
        <PieChart width={300} height={250}>
          <Pie
            data={marcoNutrients}
            dataKey="value"
            innerRadius={60}
            outerRadius={80}
            paddingAngle={5}
            fill="#8884d8"
            label={(entry) => `${entry.value}%`}
          >
            {marcoNutrients.map((_, index) => (
              <Cell key={`cell-${index}`} fill={colors[index]} />
            ))}
          </Pie>
        </PieChart>
        <div className="marco-pie-legend">
          <ul className="marco-list">
            <p>Marco Key</p>
            {marcoNutrients.map((nutrient) => {
              return (
                <li className="nutrient-key" key={nutrient.name}>
                  <div className={`${nutrient.name.toLowerCase()}-key`}></div>
                  <div>{nutrient.name}</div>
                </li>
              );
            })}
          </ul>
        </div>
      </div>
    </div>
  );
};

MacroNutrientPieChart.propTypes = {
  carbs: PropTypes.number.isRequired,
  fats: PropTypes.number.isRequired,
  proteins: PropTypes.number.isRequired,
};

export default MacroNutrientPieChart;
