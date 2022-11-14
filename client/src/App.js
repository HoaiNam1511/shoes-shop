import "./App.css";
import { Route, Routes } from "react-router-dom";
import HomePage from "./page/HomePage";
import Category from "./page/Category";
import Product from "./page/Product";
import Sidebar from "./components/Sidebar";

function App() {
  return (
    <div style={{ display: "flex", flexDirection: "" }}>
      <Sidebar></Sidebar>
      <div style={{ height: "50px", width: "100%" }}>
        <div
          style={{ height: "50px", width: "auto", backgroundColor: "#fbfbfb" }}
        ></div>
        <div style={{ margin: "10px" }}>
          <Routes>
            <Route path="/" element={<HomePage></HomePage>}></Route>
            <Route path="/category" element={<Category></Category>}></Route>
            <Route path="/product" element={<Product></Product>}></Route>
          </Routes>
        </div>
      </div>
    </div>
  );
}

export default App;
