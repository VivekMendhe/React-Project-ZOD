import "./App.css";
import Header from "./components/Header";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import Products from "./pages/Products";
import AddProducts from "./pages/AddProducts";
import Signup from "./pages/Signup";
import Footer from "./components/Footer";
import Signin from "./pages/Signin";
import PrivateComponents from "./components/PrivateComponents";

function App() {
  return (
    <BrowserRouter>
      <Header />
      <Routes>
        <Route path="/" element={<Home />} />

        <Route element={<PrivateComponents />}>
          <Route path="/products" element={<Products />} />
          <Route path="/add-product" element={<AddProducts />} />
          <Route path="/profile" element={<h1>Profile Page</h1>} />
        </Route>

        <Route path="/signup" element={<Signup />} />
        <Route path="/signin" element={<Signin />} />
      </Routes>
      <Footer />
    </BrowserRouter>
  );
}

export default App;
