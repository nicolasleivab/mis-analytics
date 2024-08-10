import { createRoot } from 'react-dom/client';
import AppRouter from './application/router/router';
import './presentation/styles/reset.css';
import './presentation/styles/body-parts.css';
import './presentation/styles/variables.css';

const rootElement = document.getElementById('root') as Element;
const root = createRoot(rootElement);

root.render(<AppRouter />);
