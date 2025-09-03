import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { useState, useEffect } from 'react';
import Login from './pages/Login';
import Signup from './pages/Signup';
import Homepage from './pages/Homepage';
import ManualEntryForm from './components/ManualEntryForm';
import Profile from './pages/Profile';
import BudgetPage from './pages/BudgetPage';
import ViewBudgetsPage from './pages/ViewBudget';
import ReceiptsPage from './pages/ReceiptsPage';
import BudgetOverviewPage from './pages/BudgetOverviewPage';
import ForgotPassword from './pages/ForgotPassword';
import ResetPassword from './pages/ResetPassword';
import PrivateRoute from './components/PrivateRoute';

export default function App() {
  const [token, setToken] = useState(localStorage.getItem("access_token"));

  useEffect(() => {
    const handleStorageChange = () => {
      setToken(localStorage.getItem("access_token"));
    };

    window.addEventListener('storage', handleStorageChange);
    
    
    window.addEventListener('logout', handleStorageChange);

    return () => {
      window.removeEventListener('storage', handleStorageChange);
      window.removeEventListener('logout', handleStorageChange);
    };
  }, []);

  return (
    <div className='max-w-md mx-auto shadow-lg'>
      <Router>
        <Routes>
          <Route path="/login" element={token ? <Navigate to="/" replace /> : <Login />} />
          <Route path="/signup" element={token ? <Navigate to="/" replace /> : <Signup />} />
          <Route path="/forgot-password" element={token ? <Navigate to="/" replace /> : <ForgotPassword />} />
          <Route path="/reset-password/:token" element={token ? <Navigate to="/" replace /> : <ResetPassword />} />
          
          <Route path="/" element={
            <PrivateRoute>
              <Homepage />
            </PrivateRoute>
          } />
          <Route path="/manual-entry" element={
            <PrivateRoute>
              <ManualEntryForm />
            </PrivateRoute>
          } />
          <Route path="/profile" element={
            <PrivateRoute>
              <Profile />
            </PrivateRoute>
          } />
          <Route path="/budget" element={
            <PrivateRoute>
              <BudgetPage />
            </PrivateRoute>
          } />
          <Route path="/view-budgets" element={
            <PrivateRoute>
              <ViewBudgetsPage />
            </PrivateRoute>
          } />
          <Route path="/receipts" element={
            <PrivateRoute>
              <ReceiptsPage />
            </PrivateRoute>
          } />
          <Route path="/budget-overview" element={
            <PrivateRoute>
              <BudgetOverviewPage />
            </PrivateRoute>
          } />
          
          <Route path="*" element={
            token ? <Navigate to="/" replace /> : <Navigate to="/login" replace />
          } />
        </Routes>
      </Router>
    </div>
  );
}