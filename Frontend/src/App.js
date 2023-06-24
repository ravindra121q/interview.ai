import logo from "./logo.svg";
import "./App.css";
import { All_Routes } from "./Routes/All_Routes";
import { Navbar } from "./Components/Navbar";

function App() {
  return (
    <div className="App">
      <Navbar />
      <All_Routes />
    </div>
  );
}

export default App;
