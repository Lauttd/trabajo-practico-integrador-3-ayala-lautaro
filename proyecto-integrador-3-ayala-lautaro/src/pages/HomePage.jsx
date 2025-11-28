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
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <Loading />
      </div>
    );
  }

  return (
    // CONTENEDOR PRINCIPAL
    <main className="min-h-screen bg-gray-50 p-4 md:p-8">
      {/* DASHBOARD CARD */}
      <div className="w-full max-w-4xl mx-auto bg-white p-6 md:p-10 shadow-lg rounded-xl">
        {/* TÍTULO DE BIENVENIDA */}
        <h1 className="text-3xl font-light text-gray-700 mb-6">
          Welcome,{" "}
          <span className="font-bold text-blue-600">
            {userData?.user?.name || "User"}
          </span>
        </h1>

        {/* CONTENEDOR DE ESTADÍSTICAS */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 border-t border-b border-gray-200 py-6">
          {/* 💡 TARJETA FALTANTE: Total de Tareas */}
          <div className="bg-blue-50 p-4 rounded-lg border-l-4 border-blue-500 shadow-sm text-center">
            <h2 className="text-4xl font-extrabold text-blue-600">
              {allTasks}
            </h2>
            <p className="text-sm font-medium text-gray-600 mt-1">Tasks All</p>
          </div>
          {/* Tarjeta de Tareas Completadas */}
          <div className="bg-green-50 p-4 rounded-lg border-l-4 border-green-500 shadow-sm text-center">
            <h2 className="text-4xl font-extrabold text-green-600">
              {completedTasks}
            </h2>
            <p className="text-sm font-medium text-gray-600 mt-1">Completed</p>
          </div>

          {/* Tarjeta de Tareas Pendientes */}
          <div className="bg-yellow-50 p-4 rounded-lg border-l-4 border-yellow-500 shadow-sm text-center">
            <h2 className="text-4xl font-extrabold text-yellow-600">
              {pendingTasks}
            </h2>
            <p className="text-sm font-medium text-gray-600 mt-1">Pending</p>
          </div>

          {/* Botón/Tarjeta de Acción */}
          <div className="flex items-center justify-center">
            <Link
              to="/tasks"
              className="w-full text-center bg-blue-600 text-white font-bold py-3 px-6 rounded-lg shadow-md hover:bg-blue-700 transition duration-150 transform hover:scale-105"
            >
              Go to tasks
            </Link>
          </div>
        </div>
      </div>
    </main>
  );
};
