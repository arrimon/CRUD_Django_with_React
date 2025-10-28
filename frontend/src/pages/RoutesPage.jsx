import React from 'react'
import { Routes, Route } from 'react-router-dom';
import ListPage from './ListPage'
import FormPage from './FormPage';
import HomePage from './HomePage';
import AboutPage from './AboutPage';
import ServicePage from './ServicePage';
import LoginPage from './LoginPage';
import ProtectedRoute from './ProtectedRoute';
import ProtectedLayout from './components/ProctedLayout';
import 'bootstrap/dist/css/bootstrap.min.css';

const RoutesPage = () => {
  return (
    <>
        <main>
            <Routes>
               {/* Public routes */}
              <Route path="/" element={<HomePage />} />
              <Route path="/about" element={<AboutPage />} />
              <Route path="/Services" element={<ServicePage />} />
              <Route path="/login" element={<LoginPage />} />
                
              {/* Protected Routes */}
              <Route element={<ProtectedRoute />}>
                <Route path="/listpage" element={<ListPage />} />
                <Route path="/create" element={<FormPage />} />
                <Route path="/edit/:id" element={<FormPage />} />
              </Route>
            </Routes>
        </main>
    </>
  )
}

export default RoutesPage