// import { Routes, Route, Link, Navigate } from "react-router-dom";
// import Login from "./pages/Login";
// import Profile from "./pages/Profile";
// import ProtectedRoute from "./components/ProtectedRoute";

// function App() {
//   return (
//     <div>
//       <nav>
//         <Link to="/login">Login</Link> |{" "}
//         <Link to="/profile">Profile</Link>
//       </nav>

//       <Routes>
//         {/* Default route */}
//         <Route path="/" element={<Navigate to="/profile" replace />} />

//         <Route path="/login" element={<Login />} />

//         <Route
//           path="/profile"
//           element={
//             <ProtectedRoute>
//               <Profile />
//             </ProtectedRoute>
//           }
//         />

//         {/* Fallback */}
//         <Route path="*" element={<Navigate to="/login" replace />} />
//       </Routes>
//     </div>
//   );
// }

// export default App;


import { Routes, Route, Link, Navigate } from "react-router-dom";
import Login from "./pages/Login";
import Profile from "./pages/Profile";
import Employees from "./pages/Employees"; // 👈 ADD THIS
import ProtectedRoute from "./components/ProtectedRoute";

function App() {
  return (
    <div>
      <nav>
        <Link to="/login">Login</Link> |{" "}
        <Link to="/profile">Profile</Link> |{" "}
        <Link to="/employees">Employees</Link> {/* 👈 OPTIONAL NAV */}
      </nav>

      <Routes>
        {/* Default route */}
        <Route path="/" element={<Navigate to="/profile" replace />} />

        <Route path="/login" element={<Login />} />

        <Route
          path="/profile"
          element={
            <ProtectedRoute>
              <Profile />
            </ProtectedRoute>
          }
        />

        {/* 👇 EMPLOYEES CRUD ROUTE */}
        <Route
          path="/employees"
          element={
            <ProtectedRoute>
              <Employees />
            </ProtectedRoute>
          }
        />

        {/* Fallback */}
        <Route path="*" element={<Navigate to="/login" replace />} />
      </Routes>
    </div>
  );
}

export default App;
