import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
// import Nav from './components/Nav/Nav';
import { DASHBOARD_ROUTE, HOME_ROUTE } from "./routes";
import Home from "../pages/Home/Home";
import Dashboard from "../pages/Dashboard/Dashboard";

const AppRouter = () => (
  <div>
    <Router>
      {/* <Nav /> */}
      <Routes>
        <Route path={HOME_ROUTE} element={<Home />} />
        <Route path={DASHBOARD_ROUTE} element={<Dashboard />} />
        <Route path="*" element={<Home />} />
      </Routes>
    </Router>
  </div>
);

export default AppRouter;
