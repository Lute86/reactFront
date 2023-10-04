import { useRef } from "react";
import { FaBars, FaTimes } from "react-icons/fa";
import "./Navbar.css";
import { Link } from "react-router-dom";
import { useGlobalState } from "../context";

function Navbar() {
	const navRef = useRef();
	const { darkMode, setDarkMode,
    isLoggedIn, setIsLoggedIn,
    userRole, setUserRole,
     } = useGlobalState();

	const showNavbar = () => {
		navRef.current.classList.toggle(
			"responsive_nav"
		);
	};

	const closeNavbar = () => {
    navRef.current.classList.remove("responsive_nav");
  };

	return (
		<header>
			<h3>N.O.C.</h3>
			<nav ref={navRef}>
				<Link to="/" onClick={closeNavbar}>Home</Link>
				<Link to="/courses" onClick={closeNavbar}>Courses</Link>
				{/* {!userRole && <Link to="/registration">Registration</Link>} */}
				{userRole=='user' && <Link to="/user" onClick={closeNavbar}>Dashboard</Link>}
				{userRole=='admin' && <Link to="/admin" onClick={closeNavbar}>Dashboard</Link>}
				{isLoggedIn && <Link to="/logout" onClick={closeNavbar}>Logout</Link>}
				{!isLoggedIn && (<span> <Link to="/contact" onClick={closeNavbar}>Contact</Link></span>)}
				{!isLoggedIn && (<span> <Link to="/login" onClick={closeNavbar}>Login</Link></span>)}
				<button
					className="nav-btn nav-close-btn"
					onClick={showNavbar}>
					<FaTimes />
				</button>
			</nav>
			<button
				className="nav-btn"
				onClick={showNavbar}>
				<FaBars />
			</button>
		</header>
	);
}

export default Navbar;