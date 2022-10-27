import React, {useEffect} from "react";
import {useSelector, useDispatch} from "react-redux/es/exports";
import {fecthExcRateData, setBaseCountry} from "../Chart/chartSlice";

export default function Chart() {
  const {loading, error, excRateData, countryCodes, baseCountry} = useSelector((state) => state.chart);
  // const countryCodes = Object.keys(excRateData.hasOwnProperty("base") && excRateData.rates);
  const allCountries = Object.entries(excRateData.hasOwnProperty("base") && excRateData.rates);
  const fiveCountries = allCountries.slice(1, 6);
  const dispatch = useDispatch();
  console.log(fiveCountries);
  console.log(baseCountry);

  useEffect(() => {
    dispatch(fecthExcRateData());
  }, [baseCountry, dispatch]);

  return (
    <div>
      <h1>Currency exchange Rate Comparison Chart</h1>
      <div>
        <section>
          <h2>Comparing with</h2>
          <p>
            <em>U S D</em>
          </p>
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
      </div>
    </div>
  );
}
