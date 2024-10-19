import { createRoot } from 'react-dom/client';
import AppRouter from './router/AppRouter';
import '../presentation/styles/reset.css';
import '../presentation/styles/body-parts.css';
import '../presentation/styles/variables.css';
import '@mantine/core/styles.css';
import '@mantine/charts/styles.css';

const rootElement = document.getElementById('root') as Element;
const root = createRoot(rootElement);

root.render(<AppRouter />);
