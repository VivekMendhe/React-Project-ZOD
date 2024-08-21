import { Outlet, Navigate } from "react-router-dom";

const PrivateComponents = () => {
  const auth = localStorage.getItem("user");
  return auth ? <Outlet /> : <Navigate to="signin" />;
};

export default PrivateComponents;
