import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import { Amplify } from "aws-amplify";
import { Authenticator, ThemeProvider } from "@aws-amplify/ui-react"; 
import awsExports from "./aws-exports";

import Home from "./pages/Home";
import Preferences from "./pages/Preferences";
import Header from "./components/Header";
import Sidebar from "./components/Sidebar";
import NewsList from "./NewsList";

import "./App.css";

Amplify.configure(awsExports);

// Custom theme for AWS Amplify Authenticator
const customTheme = {
  name: "Custom Theme",
  tokens: {
    components: {
      button: {
        primary: {
          backgroundColor: { value: "#4CAF50" }, // Green button background
          color: { value: "#FFFFFF" }, // White button text
        },
      },
      input: {
        borderColor: { value: "#4CAF50" }, // Green border for input fields
      },
    },
  },
};

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
  return (
    <ThemeProvider theme={customTheme}> 
      <Authenticator>
        {({ signOut }) => (
          <Router>
            <div className="auth-container">
              <button onClick={signOut} style={{ margin: "10px", padding: "8px 16px" }}>
                Sign Out
              </button>
              <Routes>
                <Route path="/*" element={<AppLayout />} />
              </Routes>
            </div>
          </Router>
        )}
      </Authenticator>
    </ThemeProvider>
  );
}

export default App;
