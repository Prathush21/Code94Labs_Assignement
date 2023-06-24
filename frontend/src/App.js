import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Recipies from "./components/recipies";
import AddRecipe from "./components/addrecipe";
import EditRecipe from "./components/editrecipe";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Recipies />} />
        <Route path="/addRecipe" element ={ <AddRecipe />}  />
        <Route path="/editRecipe" element ={ <EditRecipe />}  />


      </Routes>
    </Router>
  );
}

export default App;
