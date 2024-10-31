import "./MacroNutrientPieChart.css";
import { Cell, Pie, PieChart } from "recharts";
import PropTypes from "prop-types";

const MacroNutrientPieChart = ({ carbs, fats, proteins }) => {
  // Extract the macronutrients
  const marcoNutrients = [
    { name: carbs.label, value: Math.round(carbs.quantity), unit: carbs.unit },
    { name: fats.label, value: Math.round(fats.quantity), unit: fats.unit },
    {
      name: proteins.label,
      value: Math.round(proteins.quantity),
      unit: proteins.unit,
    },
  ];
  const colors = ["#ffcc00", "#ffa500", "#ff6347"]; // Colors to be used for the cells

  return (
    <div>
      <h3 className="text-center">Total Macronutrient Distribution</h3>
      <div className="macro-pie-chart">
        <PieChart width={250} height={250}>
          <Pie
            data={marcoNutrients}
            dataKey="value"
            innerRadius={60}
            outerRadius={80}
            paddingAngle={5}
            fill="#8884d8"
            label
          >
            {marcoNutrients.map((entry, index) => (
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
  carbs: PropTypes.object.isRequired,
  fats: PropTypes.object.isRequired,
  proteins: PropTypes.object.isRequired,
};

export default MacroNutrientPieChart;
