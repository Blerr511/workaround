import './App.css';
import { Routes, Route, BrowserRouter } from 'react-router-dom';
import { ConsentPage } from './pages';
import { LoginPage } from './pages/login';

export interface AppProps {
  name: string;
}

function App(props: AppProps) {
  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<div>/</div>} />
          <Route path="/authorize" element={<div>authorize</div>} />
          <Route path="/consent" element={<ConsentPage appName="" />} />
          <Route path="/auth/login" element={<LoginPage />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
