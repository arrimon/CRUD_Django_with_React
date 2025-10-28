import React from 'react'
import { Routes, Route, Link } from 'react-router-dom'
import 'bootstrap/dist/css/bootstrap.min.css';
import Navbar from './pages/Navbar';
import RoutesPage from './pages/RoutesPage';

export default function App() {
  return (
      <>
        <Navbar />
        <RoutesPage />
      </>
  )
}
