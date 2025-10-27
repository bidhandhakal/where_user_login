import { Routes, Route } from "react-router-dom";
import UserLogin from "../pages/auth/UserLogin";
import UserRegister from "../pages/auth/UserRegister";
import Home from "../pages/home/home";

const AppRoutes = () => {
  return (
    <Routes>
      <Route path="/user/login" element={<UserLogin />} />
      <Route path="/user/register" element={<UserRegister />} />
      <Route path="/" element={<Home />} />
    </Routes>
  );
};

export default AppRoutes;
