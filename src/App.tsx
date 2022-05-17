import { useMutation } from '@apollo/client';
import React, { useContext, useEffect } from 'react';
import AppRoutes from './components/AppRoutes';
import MainLayout from './components/MainLayout/MainLayout';
import { AuthContext } from './context/auth';
import { GET_AUTH } from './graphQL/users/mutation';
import { IGetAuthResponse } from './graphQL/types';


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
    return <div className="">LoadiN</div>
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