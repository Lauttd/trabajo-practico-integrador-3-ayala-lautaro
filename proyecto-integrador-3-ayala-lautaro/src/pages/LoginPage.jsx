import { useState } from "react";
import { Link, useNavigate } from "react-router";
import { Loading } from "../components/Loading.jsx";
import { useForm } from "../hooks/useForm.js";

export const LoginPage = ({ onLogin }) => {
  const navigate = useNavigate();

  const { formState, handleChange, handleReset } = useForm({
    username: "",
    password: "",
  });

  const [loading, setLoading] = useState(false);

  const handleLogin = async (event) => {
    event.preventDefault();

    try {
      const res = await fetch("http://localhost:3000/api/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        credentials: "include",
        body: JSON.stringify(formState),
      });

      const data = await res.json();

      if (res.ok) {
        onLogin();
        console.log(res.ok);
      } else {
        alert(data.message || "Credenciales invalidas");
        handleReset();
      }
    } catch (error) {
      console.error(error);
      alert("Error en el servidor");
      handleReset();
    } finally {
      setLoading(false);
      navigate("/home");
    }
  };

  return (
    // CONTENEDOR PRINCIPAL (d-flex, min-vh-100, bg-light)
    <main className="min-vh-100 d-flex align-items-center justify-content-center bg-light p-3">
      {loading && <Loading />}
      <div className="w-100" style={{ maxWidth: '400px' }}> {/* Límite de ancho */}
        {/* TARJETA DEL FORMULARIO (card, shadow-lg, rounded-3) */}
        <div className="card p-5 shadow-lg rounded-3">
          {/* Header */}
          <div className="mb-4 text-center">
            <h1 className="h3 fw-bolder text-dark">Welcome</h1>
          </div>

          <form onSubmit={handleLogin} className="d-grid gap-3"> {/* d-grid gap-3 para espaciado */}
            {/* Input Username */}
            <div className="form-group">
              <label htmlFor="username" className="form-label small fw-medium text-secondary">
                <span className="d-flex align-items-center">👤 Username</span>
              </label>
              <input
                type="text"
                name="username"
                placeholder="your username"
                value={formState.username}
                onChange={handleChange}
                id="username"
                className="form-control" 
                required
                disabled={loading}
              />
            </div>

            {/* Input Password */}
            <div className="form-group">
              <label htmlFor="password" className="form-label small fw-medium text-secondary">
                <span className="d-flex align-items-center">🔒 Password</span>
              </label>
              <input
                type="password"
                name="password"
                placeholder="*******"
                value={formState.password}
                onChange={handleChange}
                id="password"
                className="form-control" 
                required
                disabled={loading}
              />
            </div>


            <button
              type="submit"
              className="btn btn-primary w-100 fw-bold mt-4"
              disabled={loading}
            >
              <span className="fs-5">
                {loading ? "Logging in..." : "Enter TP2"}
              </span>
            </button>


            <div className="text-center mt-3">
              <p className="small text-secondary m-0">
                Forgot your details?{" "}
                <span className="text-secondary-emphasis">Coming soon</span>
              </p>
            </div>
          </form>

          {/* Link a Register */}          <p className="text-center small text-secondary mt-4 pt-3 border-top border-secondary-subtle">
            ¿You don't have an account?{" "}
            <Link
              to="/register"
              className="text-primary fw-semibold"
            >
              Register
            </Link>
          </p>
        </div>
      </div>
    </main>
  );
};