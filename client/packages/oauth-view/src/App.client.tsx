import { hydrate } from 'react-dom';
import App from './App';
import { BrowserRouter } from 'react-router-dom';

// @ts-ignore
const initialData = window['__INITIAL_DATA__'];

hydrate(
  <BrowserRouter>
    <App {...initialData} />
  </BrowserRouter>,
  document.getElementById('root') as HTMLElement
);
