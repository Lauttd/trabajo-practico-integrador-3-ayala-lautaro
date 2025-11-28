import { Link, useNavigate } from "react-router";

export const Navbar = ({ isAuth, onLogout }) => {
  const navigate = useNavigate();

  const handleLogout = async () => {
    try {
      await fetch("http://localhost:3000/api/logout", {
        method: "POST",
        credentials: "include",
      });
    } catch (error) {
      console.error("Error al cerrar sesión:", error);
    } finally {
      onLogout();
      navigate("/login");
    }
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    navigate("/home");
  };

  return (
    // Usando navbar-dark y bg-dark con shadow y sticky-top
    <nav className="navbar navbar-expand-lg navbar-dark bg-dark shadow sticky-top">
      <div className="container-fluid container">
        {/* TÍTULO/LOGO */}
        <Link className="navbar-brand text-white fw-bold" to="/home">
          TP 2 INTEGRADOR
        </Link>
        
        <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
          <span className="navbar-toggler-icon"></span>
        </button>

        <div className="collapse navbar-collapse" id="navbarNav">
          {isAuth ? (
            // ENLACES PARA USUARIO AUTENTICADO
            <ul className="navbar-nav ms-auto mb-2 mb-lg-0 align-items-center">
              <li className="nav-item">
                <Link
                  to="/home"
                  className="nav-link text-white-50 hover:text-white"
                  onClick={handleSubmit}
                >
                  Home
                </Link>
              </li>
              <li className="nav-item">
                <Link
                  to="/tasks"
                  className="nav-link text-white-50 hover:text-white"
                >
                  Tasks
                </Link>
              </li>
              <li className="nav-item">
                <Link
                  to="/profile"
                  className="nav-link text-white-50 hover:text-white"
                >
                  Profile
                </Link>
              </li>
              <li className="nav-item ms-md-2">
                <button
                  onClick={handleLogout}
                  className="btn btn-danger btn-sm fw-semibold" // Botón de Bootstrap
                >
                  Logout
                </button>
              </li>
            </ul>
          ) : (
            // ENLACES PARA USUARIO NO AUTENTICADO
            <ul className="navbar-nav ms-auto mb-2 mb-lg-0">
              <li className="nav-item">
                <Link
                  to="/login"
                  className="nav-link text-white-50 hover:text-primary fw-semibold"
                >
                  Login
                </Link>
              </li>
              <li className="nav-item">
                <Link
                  to="/register"
                  className="nav-link text-white-50 hover:text-primary fw-semibold"
                >
                  Register
                </Link>
              </li>
            </ul>
          )}
        </div>
      </div>
    </nav>
  );
};