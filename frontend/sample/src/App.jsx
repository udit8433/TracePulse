import { BrowserRouter, Routes, Route } from "react-router-dom";

import LandingPage from "./Components/LandingPage";
import Signup from "./Pages/Signup";
import Login from "./Pages/Login";
import Home from "./Pages/Home";
import Contact from "./Pages/ContactUs";
import Layout from "./Components/Layout";
function App() {
  return (
    <BrowserRouter>
      <Routes>

        <Route path="/" element={<LandingPage />} />

        <Route path="/signup" element={<Signup />} />

        <Route path="/login" element={<Login />} />

        <Route element={<Layout />}>
          <Route path="/Home" element={<Home />} />
          <Route path="/Contact" element={<Contact />} />
        </Route>

      </Routes>
    </BrowserRouter>
  );
}

export default App;