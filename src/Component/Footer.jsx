import React from 'react';

function Footer() {
  return (
    <footer className="fixed bottom-0 left-0 w-full bg-white border border-blue-500 rounded-full sm:rounded-2xl md:rounded-2xl lg:rounded-2xl py-3">
      <div className="container mx-auto max-w-screen-xl">
        <div className="footercollec flex justify-around items-center">
          <div className="home bg-blue-700 p-4 sm:p-5 rounded-full hover:bg-blue-600 active:bg-blue-400">
            <img src="src/assets/House (1).png" className="w-6 sm:w-8 md:w-9" alt="home" />
          </div>
          <div className="Todolist">
            <img src="src/assets/todolist.png" className="w-6 sm:w-8 md:w-9" alt="todolist" />
          </div>
          <div className="User">
            <img src="src/assets/User.png" className="w-6 sm:w-8 md:w-9" alt="user" />
          </div>
        </div>
      </div>
    </footer>
  );
}

export default Footer;