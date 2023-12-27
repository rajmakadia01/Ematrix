import React, { useState, createContext } from 'react';
import Dashboard from './Dashboard';
import Client from './Client';
import Login from './Login';
import { BrowserRouter as Router, Routes, Route, Navigate, } from 'react-router-dom';
export const AuthContext = createContext();

function App() {
  const [loggedIn, setLoggedIn] = useState(false);

  return (
    <AuthContext.Provider value={{ loggedIn, setLoggedIn }}>
      <Router>
        <Routes>
          <Route path="/login" element={<Login />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/client" element={<Client />} />
          <Route path="*" element={<Navigate to="/login" />} />
        </Routes>
      </Router>
    </AuthContext.Provider>
  );
}



export default App;
