import "./App.css";
import Chart from "./Components/Chart/Chart";
import Form from "./Components/Form/Form";
import {fecthExcRateData} from "./Components/Chart/chartSlice";

fecthExcRateData();
function App() {
  return (
    <div className="App">
      <Form />
      <Chart />
    </div>
  );
}

export default App;
