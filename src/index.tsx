import { createRoot } from "react-dom/client";
import AppRouter from "./router/router";

const rootElement = document.getElementById("root") as Element;
const root = createRoot(rootElement);

root.render(<AppRouter />);
