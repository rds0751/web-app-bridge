import "./App.css";
import Card from "./Modules/Card/Card";
import About from "./Modules/About/";
import Bridge from "./Modules/Bridge"
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Link,
  Switch,
} from "react-router-dom";

function App() {
  return (
    <div className="App">
      <Router>
        {/* <Tile__homepage /> */}
        {/* <Switch> */}
        <Routes>
          <Route path="/" element={<Card />} />
          <Route path="/card" element={<Card />} />
          <Route path="/about" element={<About />} />
          <Route path="/bridge" element={<Bridge />} />
          {/* <Route path="/about" element={<About />} />
          <Route path="/about" element={<About />} />
          <Route path="/about" element={<About />} />
          <Route path="/about" element={<About />} />
          <Route path="/about" element={<About />} /> */}
        </Routes>
      </Router>
    </div>
  );
}

export default App;
