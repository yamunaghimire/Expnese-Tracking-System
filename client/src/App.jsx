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
  // Check if user is authenticated
  const token = localStorage.getItem("access_token");

  return (
    <div className='max-w-md mx-auto'>
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