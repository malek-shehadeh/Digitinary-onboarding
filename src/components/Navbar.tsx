import {Link} from "react-router-dom"
import "../style/Navbar.scss"

const Navbar: React.FC = () => {
  return (
    <nav className="navbar">
      <div className="navbar-container">
        <Link to="/" className="navbar-link">
          Home
        </Link>
        <Link to="/" className="navbar-link">
          About Us
        </Link>
        <Link to="/" className="navbar-link">
          Contact Us
        </Link>
      </div>
    </nav>
  )
}

export default Navbar

