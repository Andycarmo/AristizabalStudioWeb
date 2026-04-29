import { NavLink } from "react-router-dom";

function Navbar({ isMobile = false, onNavigate }) {
  const baseClass = ({ isActive }) =>
    isActive
      ? "text-white border-b border-white"
      : "hover:text-white transition";

  const linkClass = isMobile
    ? "text-xl"
    : "text-sm md:text-base";

  return (
    <nav className={`flex ${isMobile ? "flex-col gap-8" : "gap-8"}`}>
      <NavLink to="/" end className={baseClass + " " + linkClass} onClick={onNavigate}>
        Home
      </NavLink>

      <NavLink to="/tienda" className={baseClass + " " + linkClass} onClick={onNavigate}>
        Store
      </NavLink>

      <NavLink to="/about" className={baseClass + " " + linkClass} onClick={onNavigate}>
        About
      </NavLink>

      <NavLink to="/contact" className={baseClass + " " + linkClass} onClick={onNavigate}>
        Contact
      </NavLink>
    </nav>
  );
}

export default Navbar;