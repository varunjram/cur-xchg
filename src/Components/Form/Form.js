import React from "react";
import {useDispatch} from "react-redux";
import {fecthExcRateData} from "../Chart/chartSlice";

export default function Form() {
  //   const getExchangeData = useDispatch();

  const formhandler = (e) => {
    e.preventDefault();
  };
  return (
    <div>
      <form onSubmit={formhandler}>
        <input type="text" placeholder="Enter your First name" required />
        <input type="email" placeholder="Enter your E-mail" required />
        <button type="submit">Submit</button>
      </form>
    </div>
  );
}
