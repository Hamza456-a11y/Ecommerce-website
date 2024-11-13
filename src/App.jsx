// App.jsx
import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Login from "./page/Login";
import Signup from "./page/Signup";
import Card from "./components/Card";
import Categories from "./components/Categories";
import CategoryProducts from "./components/CategoriesProducts";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/card" element={<Card />} />
        <Route path="/categories" element={<Categories />} />
        <Route path="/categories/:categoryName" element={<CategoryProducts />} />
      </Routes>
    </Router>
  );
}

export default App;
