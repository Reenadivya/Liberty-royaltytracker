import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Nav from "./components/navbar/Nav";
import Home from "./pages/Home";
import SearchResults from "./pages/SearchResults";

function App() {
  return (
    <Router>
      <Nav />
      <Routes>
        <Route exact path="/" element={<Home />}></Route>
        <Route exact path="/searchresults" element={<SearchResults />}></Route>
      </Routes>
    </Router>
  );
}

export default App;
