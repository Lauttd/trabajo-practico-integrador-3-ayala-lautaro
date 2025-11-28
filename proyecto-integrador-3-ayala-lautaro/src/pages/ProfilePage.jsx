import { useEffect, useState } from "react";
import { Loading } from "../components/Loading.jsx";
import { useNavigate } from "react-router";

export const ProfilePage = ({ onLogout }) => {
  const [userData, setUserData] = useState(null);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  const fetchProfile = async () => {
    try {
      const res = await fetch("http://localhost:3000/api/profile", {
        credentials: "include",
      });
      if (res.ok) {
        const data = await res.json();
        setUserData(data.user);
      } else {
        console.error("Error loading profile");
        onLogout();
        navigate("/login");
      }
    } catch (error) {
      console.error(error);
      onLogout();
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchProfile();
  }, );

  const handleLogout = async () => {
    try {
      await fetch("http://localhost:3000/api/logout", {
        credentials: "include",
      });
    } catch (error) {
      console.error("Error logging in", error);
    } finally {
      onLogout();
    }
  };

  return (
    // CONTENEDOR PRINCIPAL
    <main className="min-vh-100 d-flex justify-content-center bg-light p-3 pt-5">
      <section className="col-12 col-md-8 col-lg-6">
        <div className="card p-4 p-md-5 shadow-lg rounded-3">
          {loading && <Loading />}


          <div className="d-flex align-items-center mb-4">

            <div className="bg-primary rounded-circle d-flex align-items-center justify-content-center text-white me-3" style={{ width: '4rem', height: '4rem', fontSize: '1.5rem', fontWeight: 'bold' }}>

              {userData?.name ? userData.name[0] : "U"}
            </div>
            <div>
              <h2 className="h3 fw-bold text-dark mb-0">
                {userData?.name
                  ? `${userData.name} ${userData.lastname}`
                  : "Profile"}
              </h2>
              <p className="text-secondary small mb-0">Personal information</p>
            </div>
          </div>

          <hr className="mb-4" />


          {!loading && userData && (
            <div className="d-grid gap-3">
              {/* Dato: Name */}
              <div className="d-flex justify-content-between align-items-center border-bottom pb-2">
                <span className="text-secondary fw-medium">Name</span>
                <p className="text-dark fw-semibold mb-0">{userData.name}</p>
              </div>


              <div className="d-flex justify-content-between align-items-center border-bottom pb-2">
                <span className="text-secondary fw-medium">Lastname</span>
                <p className="text-dark fw-semibold mb-0">{userData.lastname}</p>
              </div>

              {userData.username && (
                <div className="d-flex justify-content-between align-items-center border-bottom pb-2">
                  <span className="text-secondary fw-medium">Username</span>
                  <p className="text-dark fw-semibold mb-0">
                    {userData.username}
                  </p>
                </div>
              )}


              {userData.email && (
                <div className="d-flex justify-content-between align-items-center border-bottom pb-2">
                  <span className="text-secondary fw-medium">Email</span>
                  <p className="text-dark fw-semibold mb-0">{userData.email}</p>
                </div>
              )}


              <div className="pt-3">
                <button
                  onClick={handleLogout}
                  className="btn btn-danger w-100 fw-bold"
                >
                  Logout
                </button>
              </div>
            </div>
          )}
        </div>
      </section>
    </main>
  );
};