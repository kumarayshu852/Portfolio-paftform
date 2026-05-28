import {BrowserRouter,  Routes, Route, Navigate} from 'react-router-dom';
import {AuthProvider, useAuth} from './context/AuthContext';
import ProtectedRoute from './routes/ProtectedRoute';
import Navbar from './components/shared/Navbar';

// real imports
import LoginPage from './pages/LoginPage';
import SignupPage from './pages/SignupPage';
import AdminDashboard from './pages/admin/AdminDashboard';
import HomePage from './pages/HomePage';
import AddProjectPage from './pages/admin/AddProjectPage';
import EditProjectPage from './pages/admin/EditProjectPage';
import ProjectDetailPage from './pages/ProjectDetailPage';

import ProfilePage from './pages/ProfilePage';


// pages 
//const HomePage=() =><h1 className='text-white text-4xl p-10'>Home</h1>;
//const LoginPage=() =><h1 className='text-white text-4xl p-10'>Login</h1>;
//const SignupPage=()=><h1 className='text-white text-4xl p-10'>Signup</h1>;
//const ProjectDetailPage=()=><h1 className='text-white text-4xl p-10'>Project Detail</h1>;
//const AdminDashboard=()=><h1 className='text-white text-4xl p-10'>Admin Dashboard</h1>;
//const AddProjectPage=()=><h1 className='text-white text-4xl p-10'>Add Project</h1>;
//const EditProjectPage=() =><h1 className='text-white text-4xl p-10'>Edit Project</h1>;


const App=() =>{
  return(
    <AuthProvider>
      <BrowserRouter>
      <Navbar/>
      <Routes>
        {/* public Routes*/}
        <Route path="/" element={<HomePage/>}/>
        <Route path="/login" element={<LoginPage/>}/>
        <Route path="/signup" element={<SignupPage/>}/>
        <Route path='/project/:id' element={<ProjectDetailPage/>}/>
        <Route path='/profile'element={<ProfilePage/>}/>


        {/*admin Routes */}
        <Route path="/admin" element={
          <ProtectedRoute><AdminDashboard/></ProtectedRoute>
        }/>
        <Route path='/admin/add' element={
          <ProtectedRoute><AddProjectPage/></ProtectedRoute>
        }/>
        <Route path='/admin/edit/:id' element={
          <ProtectedRoute><EditProjectPage/></ProtectedRoute>
        }/>
      </Routes>
      </BrowserRouter>
    </AuthProvider>
  );
};

export default App;
