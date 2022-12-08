import { Routes, Route, Outlet } from 'react-router-dom'
import Components from './components/Components';
import { Login } from './features/auth/Login';
import RequireAuth from './features/auth/RequiredAuth';
import Form from './features/form/Form';
import Dashboard from './components/dashboard-section/Dashboard';
import Landing from './components/Landing';
import Payment from './components/Payment';
import UserInformation from './components/dashboard-section/UserInformation';
import AgentBucketInfo from './components/agent-dashboard-section/AgentBucketInfo';
import AgentDashboard from './components/agent-dashboard-section/AgentDashboard';
import NetworkStatus from "./components/NetworkStatus";
import { ToastContainer } from "react-toastify";

export const App = () => {  
  return (
    <>
    <div className="">
      <ToastContainer autoClose={3000} hideProgressBar />
      {/* <NetworkStatus/> */}
    </div>
    <Routes>
      <Route path="/" element={<Outlet />}>
        {/* public routes */}
        <Route index element={<Login />} />
        <Route path='comp' element={<Components />} />
        <Route path='landing' element={<Landing />} />
        <Route path='payment' element={<Payment />} />
        {/* protected routes */}
        <Route path="form/:type" element={<Form/>} />
        <Route path="info/:id" element={<UserInformation/>} />
        <Route path="bucket/info/:id" element={<AgentBucketInfo/>} />
        <Route path='payment' element={<Payment />} />
        <Route element={<RequireAuth />}>
          <Route path='admin-dashboard'element={<Dashboard />} />
          <Route path='agent-dashboard'element={<AgentDashboard />} />
        </Route>
      </Route>
    </Routes>
    </>
  );
}