import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useUser } from "../contexts/userContext";

function ProtectedLayout({ children }) {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const { user } = useUser();
  const navigate = useNavigate();

  // useEffect(() => {
  //   const loggedStatus = async (token) => {
  //     const response = isLoggedIn(token);

  //     setIsAuthenticated(response.status);
  //   };

  //   const token = Cookies.get("jwt");
  //   console.log("token", token);
  //   if (!token && !user) {
  //     setIsAuthenticated(false);
  //     navigate("/login");
  //   } else loggedStatus(token);
  // }, [navigate, user]);

  useEffect(() => {
    if (!user._id) {
      setIsAuthenticated(false);
      navigate("/login");
    } else setIsAuthenticated(true);
  }, [user, navigate]);

  if (isAuthenticated) return children;
}

export default ProtectedLayout;
