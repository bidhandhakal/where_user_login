import { Routes, Route } from "react-router-dom";
import UserLogin from "../pages/auth/UserLogin";
import UserRegister from "../pages/auth/UserRegister";
import Home from "../pages/general/Home";
import PageNotFound from "../pages/general/PageNotFound";
import AgroConnect from "../pages/general/Login";

const AppRoutes = () => {
  return (
    <Routes>
      <Route path="/user/login" element={<UserLogin />} />
      <Route path="/user/register" element={<UserRegister />} />
      <Route path="/" element={<Home />} />
      <Route path="*" element={<AgroConnect />} />
    </Routes>
  );
};

export default AppRoutes;
