import { useState } from 'react'
import Header from './Component/Header'
import Promo from './Component/Promotion'
import Categories from './Component/Categories'
import Footer from './Component/Footer'
import Tasks from './Component/Tasks'
import Data from './data/data'

function App() {
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

export default App
