import { useEffect, useState } from "react";
import { Loading } from "../components/Loading";
import { useForm } from "../hooks/useForm.js";

export const TasksPage = ({ onTasksChange }) => {
  const [tasks, setTasks] = useState([]);
  const [loading, setLoading] = useState(true);

  const { formState, setForm, handleChange, handleReset } = useForm({
    title: "",
    description: "",
    is_completed: false,
  });


  const [idEdit, setIdEdit] = useState(null);

  const fetchTasks = async () => {
    // if (tasks.length === 0) {
    setLoading(true);
    // }

    try {
      const res = await fetch("http://localhost:3000/api/tasks-by-user", {
        credentials: "include",
      });
      if (res.ok) {
        const data = await res.json();
        console.log(data);
        setTasks(data.tasks || (Array.isArray(data) ? data : []));
      } else {
        console.error("Error loading tasks");
        setTasks([]);
      }
    } catch (error) {
      console.error(error);
      setTasks([]);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchTasks();
  }, []);

  const handleSubmit = async (event) => {
    event.preventDefault();

    if (idEdit) {
      await handleUpdateTask();
    } else {
      await handleCreateTask();
    }
  };

  const handleSelectEdit = (task) => {
    setIdEdit(task.id);
    setForm({
      title: task.title,
      description: task.description,
      is_completed: task.is_completed,
    });
  };

  const handleCanceleEdit = () => {
    setIdEdit(null);
    handleReset();
  };

  const handleCreateTask = async () => {
    if (!formState.title) {
      alert("the title is required");
      return;
    }

    try {
      const res = await fetch("http://localhost:3000/api/tasks", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        credentials: "include",
        body: JSON.stringify(formState),
      });
      if (res.ok) {
        alert("The task created");
        handleReset();
        await fetchTasks();
        onTasksChange && onTasksChange();
      } else {
        const data = await res.json();
        alert(data.message || "Error creating task");
      }
    } catch (error) {
      console.error(error);
      alert("Error in the server");
    }
  };

  const handleUpdateTask = async () => {
    if (!formState.title) {
      alert("The title is required");
      return;
    }
    try {
      const res = await fetch(`http://localhost:3000/api/tasks/${idEdit}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        credentials: "include",
        body: JSON.stringify(formState),
      });

      if (res.ok) {
        alert("The task updated");
        handleCanceleEdit();
        await fetchTasks();
        onTasksChange && onTasksChange();
      } else {
        const data = await res.json();
        alert(data.message || "Error updating task");
      }
    } catch (error) {
      console.error(error);
      alert("Error in the server");
    }
  };

  const handleDeleteTask = async (taskId) => {
    if (!window.confirm("Are you sure you want to delete this task?")) {
      return;
    }

    try {
      const res = await fetch(`http://localhost:3000/api/tasks/${taskId}`, {
        method: "DELETE",
        credentials: "include",
      });
      if (res.ok) {
        alert("The task deleted");
        await fetchTasks();
        onTasksChange && onTasksChange();
      } else {
        const data = await res.json();
        alert(data.message || "Error deleting the task");
      }
    } catch (error) {
      console.error(error);
      alert("Error in the server");
    }
  };

  return (

    <main className="min-vh-100 bg-light p-3 p-md-5">

      <div className="container-lg mx-auto row g-4">

        <section className="col-lg-4">
          <div className="card p-4 shadow-lg rounded-3 sticky-top" style={{ top: '80px' }}>
            <h2
              className={`h4 fw-bold mb-4 ${
                idEdit ? "text-warning-emphasis" : "text-primary"
              }`}
            >
              {idEdit ? "Edit" : "Create"}{" "}
              <span className="fw-light">Task</span>
            </h2>

            <form onSubmit={handleSubmit} className="d-grid gap-3">
              {/* Input Title */}
              <div className="form-group">
                <label
                  htmlFor="title"
                  className="form-label small fw-medium text-secondary"
                >
                  Title
                </label>
                <input
                  type="text"
                  id="title"
                  name="title"
                  value={formState.title}
                  onChange={handleChange}
                  placeholder="Example: Buy Bread"
                  className="form-control"
                  required
                />
              </div>

              {/* Input Description */}
              <div className="form-group">
                <label
                  htmlFor="description"
                  className="form-label small fw-medium text-secondary"
                >
                  Description
                </label>
                <textarea
                  name="description"
                  id="description"
                  value={formState.description}
                  onChange={handleChange}
                  placeholder="Details"
                  rows="4"
                  className="form-control resize-none"
                ></textarea>
              </div>

              {/* Checkbox */}
              <div className="form-check pt-2">
                <input
                  type="checkbox"
                  id="is_completed"
                  name="is_completed"
                  checked={formState.is_completed}
                  onChange={handleChange}
                  className="form-check-input"
                />
                <label
                  htmlFor="is_completed"
                  className="form-check-label small fw-medium text-secondary"
                >
                  Mark as completed
                </label>
              </div>

              <div className="d-grid gap-2 pt-3">
    
                <button
                  type="submit"
                  className={`btn w-100 fw-semibold ${
                    idEdit
                      ? "btn-warning"
                      : "btn-primary"
                  }`}
                >
                  {idEdit ? "update task" : "save task"}
                </button>

   
                {idEdit && (
                  <button
                    type="button"
                    onClick={handleCanceleEdit}
                    className="btn btn-light w-100 fw-semibold text-dark"
                  >
                    cancel updated
                  </button>
                )}
              </div>
            </form>
          </div>
        </section>

        {/* SECCIÓN LISTA DE TAREAS (2/3 en desktop) */}
        <section className="col-lg-8 d-grid gap-3">
          <h2 className="h4 fw-bold text-dark border-bottom pb-2 mb-3">
            My Tasks
          </h2>

          <div className="d-grid gap-3">
            {loading && <Loading />}

            {!loading && (
              <>
                {tasks.length === 0 ? (
                  <p className="alert alert-warning">

                  </p>
                ) : (
                  <div className="d-grid gap-3">
                    {tasks.map((task) => (
                      // TARJETA DE TAREA INDIVIDUAL
                      <div
                        key={task.id}
                        className={`card p-3 shadow rounded-3 d-flex flex-row align-items-center ${
                          task.is_completed
                            ? "border-start border-4 border-success opacity-75"
                            : "border-start border-4 border-primary hover-shadow"
                        }`}
                      >
                        <div className="flex-grow-1 me-3">
                          <h3
                            className={`h5 fw-semibold mb-1 ${
                              task.is_completed
                                ? "text-decoration-line-through text-secondary"
                                : "text-dark"
                            }`}
                          >
                            {task.title}
                          </h3>
                          <p className="small text-secondary text-truncate mb-1">
                            {task.description}
                          </p>
                          {/* Etiqueta de estado */}
                          <span
                            className={`badge ${
                              task.is_completed
                                ? "bg-success-subtle text-success"
                                : "bg-primary-subtle text-primary"
                            }`}
                          >
                            {task.is_completed ? "COMPLETED" : "PENDING"}
                          </span>
                        </div>

                        {/* BOTONES DE ACCIÓN */}
                        <div className="d-flex gap-2">
                          <button
                            onClick={() => handleSelectEdit(task)}
                            className="btn btn-outline-primary btn-sm rounded-circle"
                            title="Edit"
                            style={{ width: '40px', height: '40px' }}
                          >
                            <svg
                              className="w-100 h-100"
                              fill="none"
                              stroke="currentColor"
                              viewBox="0 0 24 24"
                              xmlns="http://www.w3.org/2000/svg"
                            >
                              <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth="2"
                                d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z"
                              ></path>
                            </svg>
                          </button>
                          <button
                            onClick={() => handleDeleteTask(task.id)}
                            className="btn btn-outline-danger btn-sm rounded-circle"
                            title="Delete"
                            style={{ width: '40px', height: '40px' }}
                          >
                            <svg
                              className="w-100 h-100"
                              fill="none"
                              stroke="currentColor"
                              viewBox="0 0 24 24"
                              xmlns="http://www.w3.org/2000/svg"
                            >
                              <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth="2"
                                d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"
                              ></path>
                            </svg>
                          </button>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </>
            )}
          </div>
        </section>
      </div>
    </main>
  );
};