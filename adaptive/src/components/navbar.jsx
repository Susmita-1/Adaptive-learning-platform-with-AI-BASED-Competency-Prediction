import { Link, useNavigate, useLocation } from "react-router-dom";
import { useState, useEffect } from "react";

function Navbar() {
  const navigate = useNavigate();
  const location = useLocation();
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  // Handle scroll effect
  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const handleLogout = () => {
    sessionStorage.removeItem("isAuth");
    sessionStorage.removeItem("quizDone");
    sessionStorage.removeItem("analysisDone");
    navigate("/login");
  };

  const navLinks = [
    { path: "/dashboard", name: "Dashboard", icon: "📊" },
    { path: "/quiz", name: "Quiz", icon: "📝" },
    { path: "/analysis", name: "Analysis", icon: "📈" },
  ];

  const isActive = (path) => location.pathname === path;

  return (
    <>
      <nav
        style={{
          ...styles.nav,
          background: scrolled
            ? "linear-gradient(135deg, #667eea 0%, #764ba2 100%)"
            : "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
          boxShadow: scrolled
            ? "0 4px 20px rgba(0,0,0,0.1)"
            : "0 2px 10px rgba(0,0,0,0.1)",
          padding: scrolled ? "12px 30px" : "15px 30px",
        }}
      >
        {/* Logo Section */}
        <div
          style={styles.logoContainer}
          onClick={() => navigate("/dashboard")}
        >
          <div style={styles.logoIcon}>🎓</div>
          <div>
            <div style={styles.logoText}>Adaptive Learning</div>
            <div style={styles.logoSubtext}>AI-Powered Platform</div>
          </div>
        </div>

        {/* Desktop Navigation */}
        <div style={styles.desktopNav}>
          {navLinks.map((link) => (
            <Link
              key={link.path}
              to={link.path}
              style={{
                ...styles.link,
                background: isActive(link.path)
                  ? "rgba(255,255,255,0.2)"
                  : "transparent",
                borderRadius: "8px",
              }}
              onMouseEnter={(e) => {
                if (!isActive(link.path)) {
                  e.target.style.background = "rgba(255,255,255,0.1)";
                }
              }}
              onMouseLeave={(e) => {
                if (!isActive(link.path)) {
                  e.target.style.background = "transparent";
                }
              }}
            >
              <span style={styles.linkIcon}>{link.icon}</span>
              {link.name}
            </Link>
          ))}

          {/* User Profile & Logout */}
          <div style={styles.userSection}>
            <div style={styles.userAvatar}>
              <span>👤</span>
            </div>
            <button onClick={handleLogout} style={styles.logoutBtn}>
              <span>🚪</span>
              Logout
            </button>
          </div>
        </div>

        {/* Mobile Menu Button */}
        <button
          style={styles.mobileMenuBtn}
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
        >
          <div
            style={{
              ...styles.hamburger,
              transform: mobileMenuOpen ? "rotate(45deg)" : "none",
            }}
          />
          <div
            style={{
              ...styles.hamburger,
              opacity: mobileMenuOpen ? 0 : 1,
              transform: mobileMenuOpen ? "translateX(-20px)" : "none",
            }}
          />
          <div
            style={{
              ...styles.hamburger,
              transform: mobileMenuOpen ? "rotate(-45deg)" : "none",
              marginTop: mobileMenuOpen ? "-8px" : "0",
            }}
          />
        </button>
      </nav>

      {/* Mobile Menu */}
      {mobileMenuOpen && (
        <div style={styles.mobileMenu}>
          {navLinks.map((link) => (
            <Link
              key={link.path}
              to={link.path}
              style={{
                ...styles.mobileLink,
                background: isActive(link.path)
                  ? "linear-gradient(135deg, #667eea 0%, #764ba2 100%)"
                  : "transparent",
                color: isActive(link.path) ? "white" : "#333",
              }}
              onClick={() => setMobileMenuOpen(false)}
            >
              <span style={styles.linkIcon}>{link.icon}</span>
              {link.name}
            </Link>
          ))}
          <button onClick={handleLogout} style={styles.mobileLogoutBtn}>
            <span>🚪</span>
            Logout
          </button>
        </div>
      )}
    </>
  );
}

const styles = {
  nav: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    padding: "15px 30px",
    background: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
    color: "white",
    position: "sticky",
    top: 0,
    zIndex: 1000,
    transition: "all 0.3s ease",
  },
  logoContainer: {
    display: "flex",
    alignItems: "center",
    gap: "12px",
    cursor: "pointer",
    transition: "transform 0.3s ease",
  },
  logoIcon: {
    fontSize: "32px",
    background: "rgba(255,255,255,0.2)",
    padding: "8px",
    borderRadius: "12px",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  },
  logoText: {
    fontSize: "20px",
    fontWeight: "bold",
    letterSpacing: "0.5px",
  },
  logoSubtext: {
    fontSize: "11px",
    opacity: 0.8,
    marginTop: "2px",
  },
  desktopNav: {
    display: "flex",
    alignItems: "center",
    gap: "20px",
  },
  link: {
    color: "white",
    textDecoration: "none",
    fontWeight: "500",
    padding: "8px 16px",
    transition: "all 0.3s ease",
    display: "flex",
    alignItems: "center",
    gap: "8px",
    fontSize: "14px",
  },
  linkIcon: {
    fontSize: "18px",
  },
  userSection: {
    display: "flex",
    alignItems: "center",
    gap: "15px",
    marginLeft: "10px",
    paddingLeft: "20px",
    borderLeft: "1px solid rgba(255,255,255,0.3)",
  },
  userAvatar: {
    width: "35px",
    height: "35px",
    background: "rgba(255,255,255,0.2)",
    borderRadius: "50%",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    fontSize: "18px",
    cursor: "pointer",
    transition: "all 0.3s ease",
  },
  logoutBtn: {
    background: "rgba(255,255,255,0.2)",
    color: "white",
    border: "none",
    padding: "8px 16px",
    borderRadius: "8px",
    cursor: "pointer",
    fontSize: "14px",
    fontWeight: "500",
    display: "flex",
    alignItems: "center",
    gap: "8px",
    transition: "all 0.3s ease",
  },
  mobileMenuBtn: {
    display: "none",
    background: "none",
    border: "none",
    cursor: "pointer",
    padding: "10px",
    flexDirection: "column",
    gap: "5px",
  },
  hamburger: {
    width: "25px",
    height: "3px",
    background: "white",
    borderRadius: "3px",
    transition: "all 0.3s ease",
  },
  mobileMenu: {
    position: "fixed",
    top: "70px",
    right: 0,
    left: 0,
    background: "white",
    padding: "20px",
    boxShadow: "0 10px 20px rgba(0,0,0,0.1)",
    zIndex: 999,
    animation: "slideDown 0.3s ease",
    borderBottomLeftRadius: "20px",
    borderBottomRightRadius: "20px",
  },
  mobileLink: {
    display: "flex",
    alignItems: "center",
    gap: "12px",
    padding: "12px 20px",
    textDecoration: "none",
    color: "#333",
    fontWeight: "500",
    borderRadius: "10px",
    marginBottom: "8px",
    transition: "all 0.3s ease",
  },
  mobileLogoutBtn: {
    width: "100%",
    padding: "12px 20px",
    background: "#f44336",
    color: "white",
    border: "none",
    borderRadius: "10px",
    cursor: "pointer",
    fontSize: "14px",
    fontWeight: "500",
    display: "flex",
    alignItems: "center",
    gap: "12px",
    marginTop: "10px",
    transition: "all 0.3s ease",
  },
};

// Add CSS for responsive design
const styleSheet = document.createElement("style");
styleSheet.textContent = `
  @media (max-width: 768px) {
    .desktop-nav {
      display: none !important;
    }
    .mobile-menu-btn {
      display: flex !important;
    }
  }
  
  @keyframes slideDown {
    from {
      opacity: 0;
      transform: translateY(-20px);
    }
    to {
      opacity: 1;
      transform: translateY(0);
    }
  }
  
  @media (min-width: 769px) {
    .mobile-menu {
      display: none !important;
    }
  }
`;
document.head.appendChild(styleSheet);

export default Navbar;