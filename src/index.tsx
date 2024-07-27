import { createRoot } from "react-dom/client";
import AppRouter from "./router/router";
import "./styles/reset.css";
import "./styles/body-parts.css";
import "./styles/variables.css";

const rootElement = document.getElementById("root") as Element;
const root = createRoot(rootElement);

root.render(<AppRouter />);
