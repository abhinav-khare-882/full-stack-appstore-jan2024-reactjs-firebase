import React from 'react'
import useUser from '../hooks/user/useUser'
import useApps from '../hooks/apps/useApps'
import { MainLoader } from '../components'
import { LeftContainer, RightContainer } from '../containers'

const Layout = () => {
  const {
    data: user,
    isLoading: userLoading,
    isError: useError,
    refetch: useFetch,
  } = useUser();
  const {
    data: apps,
    isLoading: appsLoading,
    isError: appsError,
    refetch: appsRefetch,
  } = useApps();

  if(userLoading || appsLoading){
    return <MainLoader/>
  }
  return (
    <main className='w-screen h-screen flex-1 flex items-start justify-start'>
      {/* left section */}
      <LeftContainer/>
      {/* right section */}
      <RightContainer/>
    </main>
  )
}

export default Layout