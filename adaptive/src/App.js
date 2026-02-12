import { BrowserRouter, Routes, Route } from "react-router-dom";
import Login from "./pages/login";
import Dashboard from "./pages/dashboard";
import Quiz from "./pages/quiz";
import Analysis from "./pages/analysis";
import PrivateRoute from "./routes/privateRoutes";



function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route
          path="/dashboard"
          element={
            <PrivateRoute><Dashboard /></PrivateRoute>

          }
        />
        <Route
          path="/quiz"
          element={
            <PrivateRoute>
              <Quiz />
            </PrivateRoute>
          }
        />

        <Route
          path="/analysis"
          element={
            <PrivateRoute> <Analysis /> </PrivateRoute>
          }
        />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
