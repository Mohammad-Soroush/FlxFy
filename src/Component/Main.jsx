import React from 'react';
import Header from './Header';
import Promo from './Promotion';
import Categories from './Categories';
import Footer from './Footer';


function Main() {
  return (
    <div className="min-h-screen overflow-x-hidden">
      <Header />
      <main className="mb-20">
        <div className="container mx-auto max-w-screen-xl px-4 sm:px-10">
          <Promo />
          <Categories />
        </div>
      </main>
      <Footer />
    </div>
  );
}

export default Main;
