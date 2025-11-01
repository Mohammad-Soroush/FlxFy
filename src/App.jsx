import { useState } from 'react'
import HomePage from './pages/HomePage'
import useFetch from './Hooks/useFetch'
import { UserProvider } from './userContext/Usercontext'


function App() {
  const { data, isloading, error } = useFetch("http://127.0.0.1:8000/api/v1/location/index")
  if (error) return <p>Error: {error}</p>
  if (isloading) return <p>Loading...</p>
  return (
    <>
      <UserProvider value={{ data, isloading, error }}>
        <HomePage />
      </UserProvider>
    </>
  )
}

export default App
