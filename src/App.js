import React from "react";
import { BrowserRouter as Router, Route, Routes, Navigate } from "react-router-dom";
import { Amplify } from "aws-amplify";
import { withAuthenticator } from "@aws-amplify/ui-react";
import awsExports from "./aws-exports";

import Home from "./pages/Home";
import Profile from "./pages/Profile";
import Preferences from "./pages/Preferences";
import Header from "./components/Header";
import Sidebar from "./components/Sidebar";
import NewsList from "./NewsList";

import "./App.css";
import "./Profile.css"

Amplify.configure(awsExports);

const AppLayout = () => (
  <div className="app-layout">
    <Header />
    <div className="main-content">
      <Sidebar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/preferences" element={<Preferences />} />
        <Route path="/news" element={<NewsList />} />
      </Routes>
    </div>
  </div>
);

function App() {
  const [isProfileComplete, setIsProfileComplete] = React.useState(false);

  return (
    <Router>
      <Routes>
        {/* Profile route is displayed first after login */}
        {!isProfileComplete && (
          <Route
            path="/profile"
            element={<Profile onComplete={() => setIsProfileComplete(true)} />}
          />
        )}

        {/* Main app layout after profile setup */}
        {isProfileComplete ? (
          <Route path="/*" element={<AppLayout />} />
        ) : (
          <Route path="*" element={<Navigate to="/profile" />} />
        )}
      </Routes>
    </Router>
  );
}

export default withAuthenticator(App);
