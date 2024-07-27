import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { Nav } from "../components";
import { DASHBOARD_ROUTE, HOME_ROUTE } from "./routes";
import Home from "../pages/Home/Home";
import Dashboard from "../pages/Dashboard/Dashboard";
import { ThemeProvider } from "../context/Theme/ThemeProvider";
import { ThemeWrapper } from "../context/Theme/ThemeWrapper";

const AppRouter = () => (
  <ThemeProvider>
    <ThemeWrapper>
      <Router>
        <Nav />
        <Routes>
          <Route path={HOME_ROUTE} element={<Home />} />
          <Route path={DASHBOARD_ROUTE} element={<Dashboard />} />
          <Route path="*" element={<Home />} />
        </Routes>
      </Router>
    </ThemeWrapper>
  </ThemeProvider>
);

export default AppRouter;
