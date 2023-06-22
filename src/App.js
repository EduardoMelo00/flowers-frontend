import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import LoginPage from './components/loginPage/loginPage.js';
import EmailSentPage from './components/loginPage/EmailSentPage.js';
import WelcomePage from './components/welcome/welcomePage.js'; // You'll create this component in the next step
import VideoPage from './components/videoPage/VideoPlayerPage.js';
import ChangePassword from './components/changePassword/changePassword.js';
import SuccessPage from './components/changePassword/SuccessPage.js';
import LiveVideoPage from './components/liveVideoPage/liveVideoPage.js';
import YoutubePage from './components/youtubePage/youtubePage.js';


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
      </Routes>
    </Router>
  );
}

export default App;
