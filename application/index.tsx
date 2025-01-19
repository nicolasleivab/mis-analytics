import { createRoot } from 'react-dom/client';
import '../presentation/styles/reset.css';
import '../presentation/styles/variables.css';
import '@mantine/core/styles.css';
import '@mantine/charts/styles.css';
import App from './App';

const rootElement = document.getElementById('root') as Element;
const root = createRoot(rootElement);

root.render(<App />);
