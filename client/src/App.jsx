// import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
// import Login from './pages/Login';
// import Signup from './pages/Signup';
// import Homepage from './pages/Homepage';
// import ManualEntryForm from './components/ManualEntryForm';
// import Profile from './pages/Profile';
// import BudgetPage from './pages/BudgetPage';
// import ViewBudgetsPage from './pages/ViewBudget';
// import ReceiptsPage from './pages/ReceiptsPage';
// import BudgetOverviewPage from './pages/BudgetOverviewPage';
// import ForgotPassword from './pages/ForgotPassword';
// import ResetPassword from './pages/ResetPassword';

// export default function App() {
//   return (
//     <Router>
//       <Routes>
//         <Route path="/" element={<Homepage/>} />

//         <Route path="/login" element={<Login />} />
//         <Route path="/signup" element={<Signup />} />
//           <Route path="/manual-entry" element={<ManualEntryForm/>} />
//            <Route path="/profile" element={<Profile/>} />
//            <Route path="/budget" element={<BudgetPage/>} />
//            <Route path="/view-budgets" element={<ViewBudgetsPage/>} />
//             <Route path="/receipts" element={<ReceiptsPage/>} />
//             <Route path="/budget-overview" element={<BudgetOverviewPage/>} />
//             <Route path="/forgot-password" element={<ForgotPassword/>} />
//         <Route path="/reset-password/:token" element={<ResetPassword/>} />
           

    
//       </Routes>
//     </Router>
//   );
// }


import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
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
  const token = localStorage.getItem("access_token");

  return (
    <Router>
      <Routes>
        
        <Route path="/" element={token ? <Homepage /> : <Navigate to="/login" replace />} />

        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/manual-entry" element={<ManualEntryForm />} />
        <Route path="/profile" element={<Profile />} />
        <Route path="/budget" element={<BudgetPage />} />
        <Route path="/view-budgets" element={<ViewBudgetsPage />} />
        <Route path="/receipts" element={<ReceiptsPage />} />
        <Route path="/budget-overview" element={<BudgetOverviewPage />} />
        <Route path="/forgot-password" element={<ForgotPassword />} />
        <Route path="/reset-password/:token" element={<ResetPassword />} />
      </Routes>
    </Router>
  );
}

