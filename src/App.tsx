import {
  BrowserRouter as Router,
  Navigate,
  Routes,
  Route,
} from "react-router-dom";
import { CssBaseline, ThemeProvider } from "@mui/material";
import { FC, useState, useEffect } from "react";

import UserProfile from "./pages/UserProfile/UserProfile";
import { mainRoutes } from "./routes/routes";
import { useAuth } from "./hooks/useAuth";
import Splash from "./components/Splash";
import Layout from "./layout/Layout";
import theme from "./layout/theme";

const App: FC = () => {
  const { isAuthenticated, isFirstVisit } = useAuth();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setLoading(false);
    }, 3000);

    return () => clearTimeout(timer);
  }, []);

  if (loading) {
    return <Splash />;
  }

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Router>
        <Routes>
          <Route path="/profile/:userId" element={<UserProfile />} />
          {!isAuthenticated ? (
            isFirstVisit ? (
              <Route path="*" element={<Navigate to="/sign-up" replace />} />
            ) : (
              <Route path="*" element={<Navigate to="/login" replace />} />
            )
          ) : (
            <Route path="*" element={<Navigate to="/" replace />} />
          )}
          {mainRoutes.map((route) => (
            <Route
              key={route.path}
              path={route.path}
              element={<Layout>{route.element}</Layout>}
            />
          ))}
        </Routes>
      </Router>
    </ThemeProvider>
  );
};

export default App;
