import React from "react";
import { useNavigate } from "react-router-dom";
import backgroundImage from "./ExpanseImage.jpeg";

const HomePage = () => {
  const navigate = useNavigate();

  const styles = {
    container: {
      fontFamily: "'Poppins', sans-serif",
      color: "#fff",
      overflowX: "hidden",
    },
    section: {
      height: "100vh",
      display: "flex",
      flexDirection: "column",
      justifyContent: "center",
      alignItems: "center",
      padding: "30px",
      backgroundSize: "cover",
      backgroundPosition: "center",
    },
    homeSection: {
      backgroundImage: `url(${backgroundImage})`,
      backgroundAttachment: "fixed",
      position: "relative",
    },
    aboutSection: {
      background: "linear-gradient(45deg, #6a11cb, #2575fc)",
    },
    featuresSection: {
      background: "linear-gradient(45deg, #FF5733, #FF8D1A)",
    },
    overlay: {
      position: "absolute",
      top: "0",
      left: "0",
      right: "0",
      bottom: "0",
      background: "rgba(0, 0, 0, 0.6)",
      zIndex: "-1",
    },
    heading: {
      fontSize: "3rem",
      fontWeight: "700",
      textTransform: "uppercase",
      letterSpacing: "2px",
      textShadow: "2px 2px 4px rgba(0, 0, 0, 0.5)",
      marginBottom: "20px",
    },
    description: {
      fontSize: "1.2rem",
      lineHeight: "1.8",
      maxWidth: "800px",
      textAlign: "center",
      margin: "20px auto",
    },
    buttonContainer: {
      display: "flex",
      gap: "30px",
      flexWrap: "wrap",
      justifyContent: "center",
      marginTop: "30px",
    },
    button: {
      padding: "15px 30px",
      fontSize: "1.2rem",
      fontFamily: "'Poppins', sans-serif",
      borderRadius: "40px",
      cursor: "pointer",
      textDecoration: "none",
      color: "#fff",
      background: "linear-gradient(45deg, #6a11cb, #2575fc)",
      border: "none",
      boxShadow: "0 4px 15px rgba(0, 0, 0, 0.2)",
      transition: "all 0.4s ease",
      marginBottom: "20px",
    },
    buttonHover: {
      transform: "scale(1.1)",
      boxShadow: "0 8px 25px rgba(0, 0, 0, 0.3)",
      background: "linear-gradient(45deg, #2575fc, #6a11cb)",
    },
    adminButtonHover: {
      transform: "scale(1.1)",
      boxShadow: "0 8px 25px rgba(0, 0, 0, 0.3)",
      background: "linear-gradient(45deg, #FF8008, #FFC837)",
    },
    footer: {
      background: "#333",
      color: "#fff",
      textAlign: "center",
      padding: "20px",
      fontSize: "0.9rem",
    },
  };

  const resetButtonStyle = (e, isAdmin) => {
    Object.assign(e.target.style, styles.button, {
      background: isAdmin
        ? "linear-gradient(45deg, #6a11cb, #2575fc)" // Reset to original admin button style
        : styles.button.background,
        transform: "scale(1)", // Reset scale
    });
  };

  return (
    <div style={styles.container}>
      {/* Home Section */}
      <div style={{ ...styles.section, ...styles.homeSection }}>
        <div style={styles.overlay}></div>
        <h1 style={{ ...styles.heading, ...styles.buttonContainer, color: "red",backgroundColor:"white" }}>
          Expense Management System 
        </h1>
        <p style={{ ...styles.description, color: "black",backgroundColor:"white",fontFamily:"Calibri" }}>
        Effortlessly manage your finances with our intuitive and user-friendly Expense Management System. Track your expenses, set budgets, and take charge of your financial journey with ease.
        </p>
        <div style={styles.buttonContainer}>
          <button
            style={styles.button}
            onClick={() => navigate("/user/login")}
            onMouseOver={(e) => Object.assign(e.target.style, styles.buttonHover)}
            onMouseOut={(e) => resetButtonStyle(e, false)}
          >
            Login as User
          </button>
          <button
            style={styles.button}
            onClick={() => navigate("/admin/login")}
            onMouseOver={(e) =>
              Object.assign(e.target.style, styles.adminButtonHover)
            }
            onMouseOut={(e) => resetButtonStyle(e, true)}
          >
            Login as Admin
          </button>
          <button
            style={styles.button}
            onClick={() => navigate("/user/register")}
            onMouseOver={(e) => Object.assign(e.target.style, styles.buttonHover)}
            onMouseOut={(e) => resetButtonStyle(e, false)}
          >
            Register as User
          </button>
          <button
            style={styles.button}
            onClick={() => navigate("/admin/register")}
            onMouseOver={(e) =>
              Object.assign(e.target.style, styles.adminButtonHover)
            }
            onMouseOut={(e) => resetButtonStyle(e, true)}
          >
            Register as Admin
          </button>
        </div>
      </div>

      {/* About Section */}
      <div style={{ ...styles.section, ...styles.aboutSection, backgroundColor:"yellow" }}>
        <h1 style={styles.heading}>About Us</h1>
        <p style={styles.description}>
          Our Expense Management System is designed to simplify your budgeting
          process. Whether you're an individual or managing an organization, we
          have the right tools to help you achieve financial success.
        </p>
      </div>

      {/* Features Section */}
      <div style={{ ...styles.section, ...styles.featuresSection }}>
        <h1 style={styles.heading}>Features</h1>
        <p style={styles.description}>
          - Track expenses effortlessly <br />
          - Generate detailed financial reports <br />
          - Set and monitor budgets <br />
          - Secure access for users and admins
        </p>
      </div>

      {/* Footer */}
      <footer style={styles.footer}>
        &copy; {new Date().getFullYear()} Expense Management System. All rights
        reserved.
      </footer>
    </div>
  );
};

export default HomePage;