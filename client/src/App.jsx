import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Login from './pages/Login';
import Signup from './pages/Signup';
import Homepage from './pages/Homepage';

export default function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Homepage/>} />

        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
    
      </Routes>
    </Router>
  );
}
