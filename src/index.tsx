import { createRoot } from "react-dom/client";
import Home from "./pages/Home/Home";

const rootElement = document.getElementById("root") as Element;
const root = createRoot(rootElement);

root.render(<Home />);
