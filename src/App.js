import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import HTMLPage from "./htmlPage";

const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/:page" element={<HTMLPage />} />
      </Routes>
    </Router>
  );
};

export default App;
