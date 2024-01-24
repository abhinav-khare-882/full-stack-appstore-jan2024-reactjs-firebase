import React, { useCallback, useEffect, useMemo } from 'react';
import { LoginBG } from '../assets';
import { FcGoogle } from 'react-icons/fc';
import { GoogleAuthProvider, onAuthStateChanged, getAuth, signInWithRedirect } from 'firebase/auth';
import {auth} from '../config/fibase.config';
import  useUser  from '../hooks/user/useUser';
import {useNavigate} from 'react-router-dom'
import { HashLoader } from 'react-spinners';

const Authentication = () => {
  const googleProvider = useMemo(() => new GoogleAuthProvider(), []); // useMemo to memoize the provider
  const {data: user, isLoading, isError, refetch} = useUser()
  const navigate = useNavigate();
  useEffect(() => {
    if(!isLoading && user){
      navigate("/",{replace: true})
    }
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      // if (user) {
      //   console.log('User is already signed in:', user);
      // }
    });

    return () => unsubscribe(); // Unsubscribe when the component unmounts
  }, [isLoading,isError]);
  if(isLoading){
    return <div><HashLoader color="#FF9E01" size={60} /></div>
  }
  if(isError){
    return <div>Error occured while fetching user data</div>
  }
  const handleLoginAction = async () => {
    try {
      const userCred =  await signInWithRedirect(auth, googleProvider);
      if(userCred){
        console.log(userCred)
      }
      // No need to handle the user here, onAuthStateChanged will trigger with the user information
    } catch (error) {
      console.error('Error during login:', error);
    }
  } // Include googleProvider in the dependency array

  return (
    <div
      style={{
        background: `url(${LoginBG})`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        backgroundRepeat: 'no-repeat',
      }}
      className='w-screen h-screen flex items-center justify-center px-4 py-6'
    >
      <div className='w-full lg:w-96 px-4 py-6 rounded-md backdrop-blur-md flex items-center justify-center flex-col gap-8 bg-[rgba(255,255,255,0.1)]'>
        <div className='flex flex-col items-center justify-center gap-2'>
          <p className='text-2xl text-white'>Welcome back!!</p>
          <p className='text-lg text-gray-200'>Sign In to access your store</p>
        </div>

        <div
          onClick={handleLoginAction}
          className='w-full lg:w-auto px-4 py-3 rounded-md flex items-center justify-center border border-gray-200 cursor-pointer active:scale-95 transition-all duration-150 ease-in-out gap-4 bg-[rgba(255,255,255,0.2)]'
        >
          <FcGoogle className='text-3xl' />
          <p className='text-lg font-semibold text-white'>Sign In with Gmail</p>
        </div>
      </div>
    </div>
  );
};

export default Authentication;
