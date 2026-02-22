import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Landing from './pages/Landing';
import Mindmap from './pages/Mindmap';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Landing />} />
        <Route path="/mindmap" element={<Mindmap />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
