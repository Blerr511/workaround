import './App.css';
import { Routes, Route, Link, BrowserRouter } from 'react-router-dom';
import { StaticRouter } from 'react-router-dom/server';
import { JSXTemplate } from './AppServer.props';
import { ConsentPage } from './pages';

export interface AppProps {
  name: string;
  renderProps?: JSXTemplate.RenderProps;
}

function App(props: AppProps) {
  const Router = props.renderProps ? StaticRouter : BrowserRouter;

  return (
    <div className="App">
      <header>
        <p>
          Edit <code>{props.name}</code> and save to reload.
        </p>
        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn React
        </a>
      </header>
      <Router location={props.renderProps?.$req.url || ''}>
        <Routes>
          <Route path="/" element={<div>/</div>} />
          <Route path="/authorize" element={<div>authorize</div>} />
          <Route
            path="/consent"
            element={<ConsentPage appName="" renderProps={props.renderProps} />}
          />
          <Route path="/auth/login" element={<div>auth/login</div>} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
