import { AppRouter } from "./router/AppRouter.jsx";
import { Footer } from "./components/Footer.jsx";
import { Navbar } from "./components/NavBar.jsx";
import { useEffect, useState } from "react";
import { Loading } from "./components/Loading.jsx";
export const App = () => {
  const [isAuth, setIsAuth] = useState(false);
  const [loading, setLoading] = useState(true);
  const [taskRefreshKey, setTaskRefreshKey] = useState(0);

  const checkAuth = async () => {
    try {
      const res = await fetch("http://localhost:3000/api/profile", {
        credentials: "include",
      });

      if (res.ok) {
        setIsAuth(true);
      } else {
        setIsAuth(false);
      }
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    checkAuth();
  }, []);

  const handleLogin = () => {
    setIsAuth(true);
  };

  const handleLogout = () => {
    setIsAuth(false);
  };

  const handleTaskChange = () => {
    setTaskRefreshKey((prevKey) => prevKey + 1);
  };

  if (loading) {
    return (
      <div className="min-vh-100 d-flex justify-content-center align-items-center">
        <Loading />
      </div>
    );
  }

  return (
    <>
      <Navbar isAuth={isAuth} onLogout={handleLogout} />
      <AppRouter
        isAuth={isAuth}
        onLogin={handleLogin}
        onLogout={handleLogout}
        taskRefreshKey={taskRefreshKey}
        onTasksChange={handleTaskChange}
      />
      <Footer />
    </>
  );
};

export default App;