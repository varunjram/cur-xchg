import React, {useEffect, useState} from "react";
import {useSelector, useDispatch} from "react-redux/es/exports";
import {fecthExcRateData, setBaseCountry} from "../Chart/chartSlice";
import {Chart as ChartJS, CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend} from "chart.js";
import {Bar} from "react-chartjs-2";
import {Dropdown} from "primereact/dropdown";
import {getFetchedtime} from "../Form/formSlice";
import {CircularProgressbar} from "react-circular-progressbar";
import "react-circular-progressbar/dist/styles.css";

ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

export default function Chart() {
  const [timer, setTimer] = useState(0);
  const {excRateData, countryCodes, baseCountry} = useSelector((state) => state.chart);
  const {isFormSubmitted, user, lastfetchedTimeData} = useSelector((state) => state.form);
  const allCountries = Object.entries(excRateData.hasOwnProperty("base") && excRateData.rates);
  const pickedCountries = allCountries.filter((item) => ["VND", "UZS", "IRR", "PYG", "TZS"].includes(item[0]));
  const decendingOrderedCountries = pickedCountries.sort((a, b) => b[1] - a[1]);
  const dispatch = useDispatch();
  const labels = [];
  const currencyRates = [];
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
  for (const [country, currrate] of decendingOrderedCountries) {
    labels.push(country);
    currencyRates.push(currrate);
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
    setTimer(0);
  }, [user]);

  useEffect(() => {
    const interval = setInterval(() => {
      dispatch(getFetchedtime());
      setTimer(0);
    }, 30000);

    return () => clearInterval(interval);
  }, [dispatch, baseCountry]);
  useEffect(() => {
    const interval = setInterval(() => {
      setTimer((pre) => pre + 1);
    }, 1000);

    return () => clearInterval(interval);
  }, [baseCountry]);

  useEffect(() => {
    dispatch(fecthExcRateData(baseCountry));
    dispatch(getFetchedtime());
    setTimer(0);
  }, [baseCountry, dispatch]);
  return (
    <section className="charts">
      <h2>{`${isFormSubmitted ? user.name : "null"} your requesed data `}</h2>
      <Dropdown className="charts__dropdown-menu" options={countryCodes} value={baseCountry} onChange={(e) => dispatch(setBaseCountry(e.target.value))} editable />
      <p>
        {`Data last fetched on ${lastfetchedTimeData}`}&nbsp;&nbsp;
        <span style={{width: 30, height: 30, display: "inline-block"}}>
          <CircularProgressbar value={timer * 3.333} text={`${timer}`} />
        </span>
      </p>

      <div className="charts__plot">
        <Bar options={options} data={data} />
        <div className="countries">Countries</div>
      </div>

      <div className="exchange-Rates">
        {pickedCountries.map(([country, rate]) => (
          <p>
            {rate.toFixed(2)}
            <img className="flag" src={`/assets/images/${country}.svg`} alt="country" />
            {country}
          </p>
        ))}
      </div>
    </section>
  );
}
