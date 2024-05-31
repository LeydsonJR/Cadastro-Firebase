import React from 'react';
import { BrowserRouter as Router, Route, Routes, Link } from 'react-router-dom';
import Register from './componentes/Register/Register';
import Login from './componentes/Login/Login';
import {Nav} from './StyledApp';
import UserListComponent from './componentes/UserList'


const App: React.FC = () => {
  return (
    <Router>
      <div>
        <Nav>
          <ul>
            <li><Link to="/register">Cadastro</Link></li>
            <li><Link to="/login">Login</Link></li>
            <li><Link to="/users">Users</Link></li>
          </ul>
        </Nav>
        <Routes>
          <Route path="/register" element={<Register />} />
          <Route path="/login" element={<Login />} />
          <Route path="/users" element={<UserListComponent />} />
        </Routes>
      </div>
    </Router>
  );
};

export default App;