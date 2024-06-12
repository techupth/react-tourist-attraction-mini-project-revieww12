import "./App.css";
import Homepage from "./component/Homepage";
import { BrowserRouter, Routes, Route } from "react-router-dom";

function App() {
  return (
    <>
      <div className="App">
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<Homepage />} />
          </Routes>
        </BrowserRouter>

        {/* Start coding here */}
      </div>
    </>
  );
}

export default App;
