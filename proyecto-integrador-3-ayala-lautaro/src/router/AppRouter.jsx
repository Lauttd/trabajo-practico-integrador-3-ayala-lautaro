import { Navigate, Route, Routes } from "react-router";
import { HomePage } from "../pages/HomePage.jsx";
import { LoginPage } from "../pages/LoginPage.jsx";
import { RegisterPage } from "../pages/RegisterPage.jsx";
import { PrivateRoutes } from "./PrivateRoute.jsx";
import { PublicRoutes } from "./PublicRoute.jsx";
import { ProfilePage } from "../pages/ProfilePage.jsx";
import { TasksPage } from "../pages/TasksPage.jsx";

export const AppRouter = ({
  isAuth,
  onLogin,
  onLogout,
  taskRefreshKey,
  onTaskChange,
}) => {
  return (
    <Routes>
      <Route element={<PublicRoutes isAuth={isAuth} />}>
        <Route path="/login" element={<LoginPage onLogin={onLogin} />} />
        <Route path="/register" element={<RegisterPage />} />
      </Route>
      <Route element={<PrivateRoutes isAuth={isAuth} />}>
        <Route
          path="/home"
          element={<HomePage taskRefreshKey={taskRefreshKey} />}
        />
        <Route path="/profile" element={<ProfilePage onLogout={onLogout} />} />
        <Route
          path="/tasks"
          element={<TasksPage onTaskChange={onTaskChange} />}
        />
      </Route>

      <Route path="*" element={<Navigate to={isAuth ? "/home" : "/login"} />} />
    </Routes>
  );
};
