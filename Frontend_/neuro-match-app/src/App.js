import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./home/Home";
import Login from "./auth/login";
import Register from "./auth/Register";
import Dashboard from "./profiles/job_seeker/Jobseeker";
import { AuthProvider } from "./context/AuthContext";
import PrivateRoute from "./routes/PrivateRoutes";
import logo from "./logo.svg";
import "./App.css";
import UserTypeRedirect from "./routes/UserTypeRedirect";
import HiringDashboard from "./profiles/hiring_parties/HiringDashboard";
function App() {
  return (
    <Router>
      {" "}
      <AuthProvider>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />

          {/* Protected Routes */}
          <Route
            path="/jobseeker"
            element={
              // <PrivateRoute>
              <Dashboard />
              // </PrivateRoute>
            }
          />
          {/* Protected Hiring Party Routes */}
          <Route
            path="/employer/*"
            element={
              // <PrivateRoute allowedRoles={["employer", "recruiter"]}>
                <HiringDashboard />
              // </PrivateRoute>
            }
          />

          {/* Auto-redirect based on user type */}
          <Route
            path="/dashboard"
            element={
              // <PrivateRoute>
                <UserTypeRedirect />
              // </PrivateRoute>
            }
          />
          {/* Fallback */}
          <Route path="*" element={<Home />} />
        </Routes>
      </AuthProvider>
    </Router>
  );
}


export default App;
