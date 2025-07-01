import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import LoginPage from './components/loginPage/loginPage.js';
import EmailSentPage from './components/loginPage/EmailSentPage.js';
import WelcomePage from './components/welcome/welcomePage.js'; // You'll create this component in the next step
import VideoPage from './components/videoPage/VideoPlayerPage.js';
import ChangePassword from './components/changePassword/changePassword.js';
import ForgotPasswordPage from './components/changePassword/ForgotPasswordPage.js';
import ResetPasswordPage from './components/changePassword/ResetPasswordPage.js';
import SuccessPage from './components/changePassword/SuccessPage.js';
import LiveVideoPage from './components/liveVideoPage/liveVideoPage.js';
import YoutubePage from './components/youtubePage/youtubePage.js';
import AdminLogin from './components/loginAdmin/AdminLogin.js';
import AdminLoginPage from './components/loginAdmin/AdminLoginPage.js';
import AdminPage from './components/admin/AdminPage.js';
import AddUserPage from './components/admin/AddUserPage.js';
import UploadPage from './components/uploadPage/uploadPage.js';



function App() {
  return (
    <Router>
      <Routes>
      <Route path="/" element={<Navigate to="/login" />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/welcome" element={<WelcomePage />} />
        <Route path="/video/:id" element={<VideoPage />} />
        <Route path="/change-password" element={<ChangePassword/>} />
        <Route path="/live" element={<LiveVideoPage/>} />
        <Route path="/youtube/:videoUrl" element={<YoutubePage />} />
        <Route path="/success" element={<SuccessPage />} />
        <Route path="/email-sent" element={<EmailSentPage />} />
        <Route path="/forgot-password" element={<ForgotPasswordPage />} />
        <Route path="/reset-password" element={<ResetPasswordPage />} />
        <Route path="/login-admin" element={<AdminLogin />} />
        <Route path="/login-admin-page" element={<AdminLoginPage />} />
        <Route path="/admin" element={<AdminPage />} />
        <Route path="/admin/add-user" element={<AddUserPage />} />
        <Route path="/upload/:uploadId" element={<UploadPage />} />

        
        
      </Routes>
    </Router>
  );
}

export default App;
