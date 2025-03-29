import React from 'react';
import logo from './logo.svg';
import './App.css';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Login from './Login';
import HousePricePredictor from './HousePricePredictor';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        {/* <Route path="/" element={<Login />} /> */}
        <Route path="/" element={<HousePricePredictor />} />
        <Route path="/predict" element={<HousePricePredictor />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
