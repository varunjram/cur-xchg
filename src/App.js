import "./App.css";
import Chart from "./Components/Chart/Chart";
import Form from "./Components/Form/Form";
import {useSelector} from "react-redux";

function App() {
  const {isFormSubmitted} = useSelector((state) => state.form);
  return (
    <div className="App">
      <Form />
      {isFormSubmitted && <Chart />}
    </div>
  );
}

export default App;
