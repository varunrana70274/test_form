import './App.css';
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from '../src/Components/Screen/Home';
import Output from './Components/Screen/Output';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/OutputPage" element={<Output />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
