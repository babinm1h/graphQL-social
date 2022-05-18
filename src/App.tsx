import { useMutation } from '@apollo/client';
import React, { useContext, useEffect } from 'react';
import AppRoutes from './components/AppRoutes';
import MainLayout from './components/MainLayout/MainLayout';
import { AuthContext } from './context/auth';
import { GET_AUTH } from './graphQL/users/mutation';
import { IGetAuthResponse } from './graphQL/types';
import Loader from './components/Loader/Loader';


const App = () => {
  const { fetchAuth } = useContext(AuthContext)

  const [getAuth, { loading }] = useMutation<IGetAuthResponse>(GET_AUTH, {
    update(_, result) {
      if (result.data) {
        fetchAuth(result.data.getAuth)
      }
    }
  })


  useEffect(() => {
    getAuth()
  }, [])


  if (loading) {
    return <div className="text-center h-screen w-full flex items-center justify-center">
      <Loader />
    </div>
  }


  return (
    <>
      <MainLayout>
        <AppRoutes />
      </MainLayout>
    </>
  );
};

export default App;