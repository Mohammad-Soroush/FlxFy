import React from 'react'
import Header from '../Component/Header'
import Promo from '../Component/Promotion'
import Tasks from '../Component/Tasks'
import Categories from '../Component/Categories'
import Footer from '../Component/Footer'
import Data from '../data/data'
import { useUserContext } from '../userContext/Usercontext'
function HomePage() {
  const{data} = useUserContext();
  console.log()
  return (
    <>
    <div className="min-h-screen overflow-x-hidden">
        <Header location={Data.location}/>
        <main className="mb-20">
          <div className="container mx-auto max-w-screen-xl px-4 sm:px-10">
            <Promo/>
            <Tasks task={Data.tasks}/>
            <Categories/>
          </div>
        </main>
        <Footer/>
      </div>
    </>
  )
}

export default HomePage