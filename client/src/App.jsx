import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Login from './pages/Login';
import Signup from './pages/Signup';
import Homepage from './pages/Homepage';
import ManualEntryForm from './components/ManualEntryForm';
import Profile from './pages/Profile';
import BudgetPage from './pages/BudgetPage';
import ViewBudgetsPage from './pages/ViewBudget';

export default function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Homepage/>} />

        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
          <Route path="/manual-entry" element={<ManualEntryForm/>} />
           <Route path="/profile" element={<Profile/>} />
           <Route path="/budget" element={<BudgetPage/>} />
           <Route path="/view-budgets" element={<ViewBudgetsPage/>} />

    
      </Routes>
    </Router>
  );
}
