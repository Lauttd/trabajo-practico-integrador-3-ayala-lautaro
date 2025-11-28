import { Navigate, Outlet } from "react-router";

export const PrivateRoutes = ({ isAuth }) => {
  return isAuth ? (
    <>
      {/* <Navbar /> */}
      <Outlet />
    </>
  ) : (
    <Navigate to="/register" />
  );
};
