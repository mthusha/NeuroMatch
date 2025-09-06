import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
// import Home from "./home/Home";
import Login from "./auth/login";
import Register from "./auth/Register";
import Dashboard from "./profiles/job_seeker/Jobseeker";
import CompanyView from "./profiles/job_seeker/components/company/CompanyView"
import { AuthProvider } from "./context/AuthContext";
import AppliedJobs from './profiles/job_seeker/AppliedJobs'
// import PrivateRoute from "./routes/PrivateRoutes";
// import logo from "./logo.svg";
import "./App.css";
import UserTypeRedirect from "./routes/UserTypeRedirect";
import HiringDashboard from "./profiles/hiring_parties/HiringDashboard";
import InterviewPanel from "./profiles/job_seeker/components/InterviewPanel";
import AppliedJobCo from "./profiles/hiring_parties/AppliedJobCo";
import InterviewHistory from "./profiles/job_seeker/components/interview_componets/historice/InterviewHistory"
import NotFoundPage from "./profiles/comman/404";
import InterviewNoUserCompleted from "./profiles/job_seeker/components/interview_componets/InterviewNoUserCompleted";

function App() {
  return (
    <Router>
      {" "}
      <AuthProvider>
        <Routes>
          <Route path="/" element={<Login />} />
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
          <Route path="*" element={<NotFoundPage />} />

          {/* view search */}
          <Route path="/company/:id" element={<CompanyView />} />
          <Route path="/view-applied-jobs" element={<AppliedJobs />} />
          <Route
            path="/seeker-interview/:jobId?"
            element={<InterviewPanel />}
          />
          <Route path="/view-applied-jobs-co" element={<AppliedJobCo />} />
          <Route path="/interview-past" element={<InterviewHistory />} />
          <Route
            path="/interview-no-user-completed"
            element={<InterviewNoUserCompleted />}
          />
          {/* <Route path="/user/:id" element={<UserView />} /> */}
        </Routes>
      </AuthProvider>
    </Router>
  );
}


export default App;
