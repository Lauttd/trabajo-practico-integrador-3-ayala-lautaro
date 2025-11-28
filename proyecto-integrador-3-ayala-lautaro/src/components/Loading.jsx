export const Loading = () => {
  return (
    <div className="modal d-flex justify-content-center align-items-center show" style={{ backgroundColor: 'rgba(0, 0, 0, 0.7)', position: 'fixed', top: 0, left: 0, right: 0, bottom: 0, zIndex: 1050 }}>
      <div className="card text-center bg-warning p-4 border border-dark border-4 shadow" style={{ width: '18rem' }}>
        <div className="card-body">
          <h5 className="card-title text-dark">
            <span className="spinner-grow spinner-grow-sm text-dark me-2" role="status" aria-hidden="true"></span>
            <span className="fw-bolder">CARGANDO...</span>
          </h5>
          <p className="card-text text-secondary small">
          </p>
          <div className="progress mt-3">
            <div 
              className="progress-bar progress-bar-striped progress-bar-animated bg-dark" 
              role="progressbar" 
              style={{ width: '100%' }} 
              aria-valuenow="100" 
              aria-valuemin="0" 
              aria-valuemax="100"
            ></div>
          </div>
        </div>
      </div>
    </div>
  );
};