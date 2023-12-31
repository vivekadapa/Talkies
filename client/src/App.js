import './App.css';
import React, { lazy, Suspense, useEffect, useState } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Cookies from 'universal-cookie'
import { AuthProvider } from './AuthContext';
const Login = lazy(() => import('./pages/Login'));
const SignUp = lazy(() => import('./pages/SignUp'));
const Home = lazy(() => import('./pages/Home'));
const Layout = lazy(() => import('./components/Layout'));
const Tv = lazy(() => import('./pages/Tv'))
const Movies = lazy(() => import('./pages/Movies'))
const Bookmark = lazy(() => import('./pages/Bookmark'))
const Profile = lazy(() => import('./pages/Profile'))
const Details = lazy(() => import('./pages/Details'))




// const cookies = new Cookies();



function App() {

  return (
    <AuthProvider>
      <Router>
        <Suspense fallback={<div className='flex items-center justify-center min-h-screen bg-bgdarkb text-white'>Loading....</div>}>
          <div className="App min-w-screen min-h-screen">
            <Routes>
              <Route path='/' element={<Layout />}>
                <Route index element={<Home />} />
                <Route path='tv' element={<Tv />} />
                <Route path='movies' element={<Movies />} />

                <Route path='bookmarks' element={<Bookmark />} />
                <Route path='profile' element={<Profile />} />
                <Route path='/:id' element={<Details />} />
                <Route path='tv/:id' element={<Details />} />
                <Route path='movies/:id' element={<Details />} />

              </Route>

              <Route path='/login' element={<Login />} />
              <Route path='/signup' element={<SignUp />} />
            </Routes>
          </div>
        </Suspense>
      </Router>
    </AuthProvider>
  );
}

export default App;
