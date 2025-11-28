import { useEffect, useState } from "react";
import { Link } from "react-router";
import { Loading } from "../components/Loading.jsx";

export const HomePage = ({ taskRefreshKey }) => {
  const [userData, setUserData] = useState(null);
  const [tasks, setTasks] = useState([]);
  const [loading, setLoading] = useState(true);

  const loadHomeData = async () => {
    try {
      setLoading(true);

      const promiseProfile = fetch("http://localhost:3000/api/profile", {
        credentials: "include",
      });
      const promiseTasks = fetch("http://localhost:3000/api/tasks-by-user", {
        credentials: "include",
      });

      const [profileResponse, tasksResponse] = await Promise.all([
        promiseProfile,
        promiseTasks,
      ]);

      if (profileResponse.ok) {
        const profileData = await profileResponse.json();
        setUserData(profileData);
      } else {
        console.error("Error loading profile");
      }
      if (tasksResponse.ok) {
        const tasksData = await tasksResponse.json();
        setTasks(
          tasksData.tasks || (Array.isArray(tasksData) ? tasksData : [])
        );
      } else {
        console.error("Error loading tasks");
      }
    } catch (error) {
      console.error("Error loading Home:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadHomeData();
  }, [taskRefreshKey]);

  const allTasks = tasks.length;
  const completedTasks = tasks.filter((task) => task.is_completed).length;
  const pendingTasks = allTasks - completedTasks;

  if (loading) {
    return (
      <div className="min-vh-100 d-flex align-items-center justify-content-center bg-light">
        <Loading />
      </div>
    );
  }

  return (
    // CONTENEDOR PRINCIPAL
    <main className="min-vh-100 bg-light p-4 p-md-5">
      {/* DASHBOARD CARD (card, mx-auto, shadow-lg, rounded-3) */}
      <div className="card col-12 col-md-10 col-lg-8 mx-auto p-4 p-md-5 shadow-lg rounded-3">
        {/* TÍTULO DE BIENVENIDA */}
        <h1 className="h3 fw-light text-secondary mb-4">
          Welcome,{" "}
          <span className="fw-bold text-primary">
            {userData?.user?.name || "User"}
          </span>
        </h1>

        {/* CONTENEDOR DE ESTADÍSTICAS (Bootstrap Grid) */}
        <div className="row row-cols-1 row-cols-md-3 g-4 border-top border-bottom py-4">
          {/* Tarjeta de Tareas - ALL */}
          <div className="col">
            <div className="card bg-primary-subtle border-start border-4 border-primary shadow-sm text-center h-100">
              <div className="card-body p-3">
                <h2 className="card-title h1 fw-bolder text-primary">
                  {allTasks}
                </h2>
                <p className="card-text small fw-medium text-secondary mt-1">Tasks All</p>
              </div>
            </div>
          </div>
          
          {/* Tarjeta de Tareas Completadas */}
          <div className="col">
            <div className="card bg-success-subtle border-start border-4 border-success shadow-sm text-center h-100">
              <div className="card-body p-3">
                <h2 className="card-title h1 fw-bolder text-success">
                  {completedTasks}
                </h2>
                <p className="card-text small fw-medium text-secondary mt-1">Completed</p>
              </div>
            </div>
          </div>

          {/* Tarjeta de Tareas Pendientes */}
          <div className="col">
            <div className="card bg-warning-subtle border-start border-4 border-warning shadow-sm text-center h-100">
              <div className="card-body p-3">
                <h2 className="card-title h1 fw-bolder text-warning-emphasis">
                  {pendingTasks}
                </h2>
                <p className="card-text small fw-medium text-secondary mt-1">Pending</p>
              </div>
            </div>
          </div>
        </div>
        
        {/* Botón de Acción */}
        <div className="pt-4 d-flex justify-content-center">
          <div className="col-md-6">
            <Link
              to="/tasks"
              className="btn btn-primary btn-lg w-100 fw-bold shadow-sm"
            >
              Go to tasks
            </Link>
          </div>
        </div>
      </div>
    </main>
  );
};