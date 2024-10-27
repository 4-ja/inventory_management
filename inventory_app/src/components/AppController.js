import React from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import LoginForm from './LoginForm';
import SignupForm from './SignupForm';
import InventoryTable from './InventoryTable';
import Dash from './Dash';  

const AppController = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<SignupForm />} />
        <Route path="/login" element={<LoginForm />} />
        <Route path="/dashboard" element={<Dash />} /> 
        <Route path="/items" element ={<InventoryTable />} /> 
      </Routes>
    </BrowserRouter>
  );
};

export default AppController;
