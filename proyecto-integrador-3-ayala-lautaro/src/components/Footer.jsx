export const Footer = () => {
  const year = new Date().getFullYear();

  return (
    // bg-light, p-3, mt-5, border-top, text-center small text-secondary
    <footer className="bg-light p-3 mt-5 border-top border-secondary-subtle text-center small text-secondary">
      <div className="container">
        <p className="mb-1">
          &copy; {year} <span className="fw-semibold">Ayala Lautaro Daniel</span>
        </p>
        <p className="m-0">TLP 2</p>
      </div>
    </footer>
  );
};