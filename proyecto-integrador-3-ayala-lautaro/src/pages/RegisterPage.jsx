import { useState } from "react";
import { Link, useNavigate } from "react-router";
import { Loading } from "../components/Loading.jsx";
import { useForm } from "../hooks/useForm.js";

export const RegisterPage = () => {
  const navigate = useNavigate();
  const { formState, handleChange, handleReset } = useForm({
    username: "",
    email: "",
    password: "",
    name: "",
    lastname: "",
  });

  const [loading, setLoading] = useState(false);

  const handleSubmit = async (event) => {
    event.preventDefault();
    setLoading(true);

    const payload = {
      name: formState.name,
      lastname: formState.lastname,
      email: formState.email,
      username: formState.username,
      password: formState.password,
    };

    try {
      const res = await fetch("http://localhost:3000/api/register", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        credentials: "include",
        body: JSON.stringify(payload),
      });
      const data = await res.json();
      if (res.ok) {
        console.log("Usuario Registrado");
      } else {
        alert(data.message || "Error al registrarse");
        handleReset();
      }
    } catch (error) {
      console.error(error);
      alert("Error en el servidor");
      handleReset();
    } finally {
      setLoading(false);
      navigate("/login");
    }
  };

  return (

    <main className="min-vh-100 d-flex align-items-center justify-content-center bg-light p-3">
      {loading && <Loading />}
      <div className="w-100" style={{ maxWidth: '960px' }}>

        <div className="card p-4 p-md-5 shadow-lg rounded-3">
          {/* Header */}
          <div className="mb-4">
            <h1 className="h3 fw-bolder text-dark text-center">
              CREATE YOUR ACCOUNT
            </h1>

            <div className="mt-2 d-flex justify-content-center">
              <div className="bg-primary rounded-pill" style={{ width: '96px', height: '4px' }}></div>
            </div>
          </div>

          <form onSubmit={handleSubmit} className="d-grid gap-3">
            {/* Sistema de Grillas para 2 columnas en MD y superior */}
            <div className="row row-cols-1 row-cols-md-2 g-4">
              {/* Columna izquierda */}
              <div className="d-grid gap-3">
                {/* Username */}
                <div className="form-group">
                  <label htmlFor="username" className="form-label small fw-medium text-secondary">
                    <span className="d-flex align-items-center">👤 Username</span>
                  </label>
                  <input
                    type="text"
                    name="username"
                    value={formState.username}
                    onChange={handleChange}
                    disabled={loading}
                    id="username"
                    placeholder="Tu usuario único"
                    className="form-control"
                    required
                  />
                </div>


                <div className="form-group">
                  <label htmlFor="email" className="form-label small fw-medium text-secondary">
                    <span className="d-flex align-items-center">📧 Email</span>
                  </label>
                  <input
                    type="email"
                    name="email"
                    value={formState.email}
                    onChange={handleChange}
                    disabled={loading}
                    id="email"
                    placeholder="tu@email.com"
                    className="form-control"
                    required
                  />
                </div>


                <div className="form-group">
                  <label htmlFor="password" className="form-label small fw-medium text-secondary">
                    <span className="d-flex align-items-center">🔒 Password</span>
                  </label>
                  <input
                    type="password"
                    name="password"
                    value={formState.password}
                    onChange={handleChange}
                    disabled={loading}
                    id="password"
                    placeholder="********"
                    className="form-control"
                    required
                  />
                </div>
              </div>


              <div className="d-grid gap-3">
                {/* Firstname */}
                <div className="form-group">
                  <label htmlFor="name" className="form-label small fw-medium text-secondary">
                    <span>Name</span>
                  </label>
                  <input
                    type="text"
                    name="name"
                    value={formState.name}
                    onChange={handleChange}
                    disabled={loading}
                    id="name"
                    placeholder="your name"
                    className="form-control"
                    required
                  />
                </div>

                <div className="form-group">
                  <label htmlFor="lastname" className="form-label small fw-medium text-secondary">
                    <span>Lastname</span>
                  </label>
                  <input
                    type="text"
                    name="lastname"
                    value={formState.lastname}
                    onChange={handleChange}
                    disabled={loading}
                    id="lastname"
                    placeholder="lastname"
                    className="form-control"
                    required
                  />
                </div>

                <div className="pt-4 d-grid gap-3 mt-md-5 mt-lg-0">

                  <button
                    type="button"
                    onClick={handleReset}
                    className="btn btn-secondary w-100 fw-semibold"
                  >
                    🔄 Reset
                  </button>

                  <button
                    type="submit"
                    className="btn btn-primary w-100 fw-bold"
                    disabled={loading}
                  >
                    {loading ? "Registrando..." : "Register"}
                  </button>

                  <p className="text-center small text-secondary mt-3">
                    ¿Are you already registered?{" "}
                    <Link
                      to="/login"
                      className="text-primary fw-semibold"
                    >
                      Login
                    </Link>
                  </p>
                </div>
              </div>
            </div>
          </form>
        </div>
      </div>
    </main>
  );
};