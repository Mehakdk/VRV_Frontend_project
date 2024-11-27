import React from 'react';
import { BrowserRouter as Router, Route, Routes, Link } from 'react-router-dom';
import UserManagement from './pages/UserManagement';

const App: React.FC = () => {
  return (
    <Router>
      <div className="min-h-screen bg-gray-100">
        {/* Navigation Bar */}
        <nav className="bg-blue-500 text-white p-4">
          <div className="container mx-auto flex justify-between items-center">
            <h1 className="text-xl font-bold">User Management App</h1>
            <div>
              <Link to="/" className="mr-4 hover:underline">
                User Management
              </Link>
            </div>
          </div>
        </nav>

        {/* Page Content */}
        <div className="container mx-auto p-4">
          <Routes>
            <Route path="/" element={<UserManagement />} />
          </Routes>
        </div>
      </div>
    </Router>
  );
};

export default App;
