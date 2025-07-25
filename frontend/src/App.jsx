import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<h1 className="text-center mt-5">Inventario Simple</h1>} />
      </Routes>
    </Router>
  );
}

export default App;
