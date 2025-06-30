import React, {useState, useEffect, use}from 'react';
import {useDispatch} from 'react-redux';
import authService from './appwrite/auth';
import {login, logout} from './store/authSlice';
import { Footer, Header } from './components';
import { Outlet } from 'react-router-dom';

function App() {

  const [loading, setLoading] = useState(true);
  const dispatch = useDispatch();

  useEffect(() => {
    authService.getCurrentUser()
      .then((userData) => {
        if (userData) {
          dispatch(login({ userData }));
        }else {
          dispatch(logout());
        }
      })
      .finally(() => setLoading(false));
  },)

  return !loading ? (
    <div className='flex flex-col min-h-screen bg-gray-900 text-white'>
      <Header />
      <main className='flex-1 flex flex-col items-center justify-center w-full'>
        <Outlet />
      </main>
      <Footer />
    </div>
  ) : null

}

export default App
