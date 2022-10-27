import React, {useEffect} from "react";
import {useSelector, useDispatch} from "react-redux/es/exports";
import {fecthExcRateData, setBaseCountry} from "../Chart/chartSlice";
import {Chart as ChartJS, CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend} from "chart.js";
import {Bar} from "react-chartjs-2";

ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

export default function Chart() {
  const {excRateData, countryCodes, baseCountry} = useSelector((state) => state.chart);
  const allCountries = Object.entries(excRateData.hasOwnProperty("base") && excRateData.rates);
  const fiveCountries = allCountries.slice(2, 10);

  const dispatch = useDispatch();

  const labels = [];
  const currencyRates = [];

  console.log(allCountries);

  const data = {
    labels,
    datasets: [
      {
        label: `Currency exchange rates when compared with ${baseCountry}`,
        data: currencyRates,
        backgroundColor: "rgba(255, 99, 132, 0.5)",
      },
    ],
  };
  for (const [country, currrate] of fiveCountries) {
    labels.push(country);
    currencyRates.push(currrate);
    console.log(country);
  }
  const options = {
    responsive: true,
    plugins: {
      // legend: {
      //   position: "top",
      // },
      title: {
        display: false,
        // text: "Comparing with",
      },
    },
  };

  useEffect(() => {
    dispatch(fecthExcRateData(baseCountry));
  }, [baseCountry, dispatch]);
  console.log(labels, currencyRates);
  return (
    <div>
      <h1>Currency exchange Rate Comparison Chart</h1>
      <div>
        <section>
          <h2>Comparing with</h2>
        </section>
        <select defaultValue={baseCountry} onChange={(e) => dispatch(setBaseCountry(e.target.value))}>
          {countryCodes.map((countryCode, i) => {
            return (
              <option key={i} value={countryCode}>
                {countryCode}
              </option>
            );
          })}
        </select>

        <div>
          <Bar options={options} data={data} />
        </div>
      </div>
    </div>
  );
}
