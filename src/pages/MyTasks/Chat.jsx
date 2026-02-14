import React, { useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';

// --- RESPONSIVE ACTION MENU ---
const ActionMenu = ({ isOpen, onClose }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-end md:items-center justify-center bg-black/40 backdrop-blur-[2px] p-0 md:p-6 transition-all">
      {/* Clickable Backdrop to close */}
      <div className="absolute inset-0" onClick={onClose} />
      
      {/* The Menu Container */}
      <div className="relative w-full max-w-full md:max-w-[420px] bg-white rounded-t-[32px] md:rounded-[32px] p-6 shadow-2xl animate-in fade-in slide-in-from-bottom duration-300">
        
        {/* Mobile Drag Handle (hidden on desktop) */}
        <div className="mx-auto mb-6 h-1.5 w-12 rounded-full bg-gray-200 md:hidden" />

        {/* Close Button */}
        <button 
          onClick={onClose}
          className="absolute right-6 top-6 p-2 text-gray-400 hover:text-gray-600 transition-colors"
        >
          <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
            <line x1="18" y1="6" x2="6" y2="18"></line>
            <line x1="6" y1="6" x2="18" y2="18"></line>
          </svg>
        </button>

        {/* Action Options */}
        <div className="flex flex-col items-center space-y-1 py-4 md:pt-8">
          <button className="w-full py-4 text-xl font-semibold text-gray-800 hover:bg-gray-50 rounded-2xl transition-colors">
            Reschedule
          </button>
          
          <div className="h-[1px] w-full bg-gray-100" />
          
          <button className="w-full py-4 text-xl font-semibold text-gray-800 hover:bg-gray-50 rounded-2xl transition-colors">
            Cancel this task
          </button>
        </div>
      </div>
    </div>
  );
};

const Chat = () => {
  const navigate = useNavigate();
  const location = useLocation(); // ✅ اضافه شده برای دریافت دیتا
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  // دریافت اطلاعات تسک که از صفحه قبل (مثلاً MyTasks) فرستاده شده است
  const task = location.state?.task;

  return (
    <div className="bg-gray-100 min-h-screen flex justify-center py-0 md:py-10">
      
      <div className="w-full max-w-[400px] md:max-w-5xl bg-white min-h-screen md:min-h-[800px] md:rounded-3xl shadow-2xl overflow-hidden flex flex-col font-sans text-[#1a1a1a] relative">
        
        {/* Header */}
        <header className="px-4 py-4 md:px-8 flex items-center justify-between border-b border-gray-50">
          <button 
            onClick={() => navigate("/mytask")}
            className="p-1 hover:bg-gray-100 rounded-full transition-colors"
          >
            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="m15 18-6-6 6-6"/></svg>
          </button>
          
          <h1 className="text-xl md:text-2xl font-semibold absolute left-1/2 -translate-x-1/2">My Tasks</h1>
          
          <button 
            onClick={() => setIsMenuOpen(true)}
            className="p-1 hover:bg-gray-100 rounded-full transition-colors"
          >
            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="1"/><circle cx="12" cy="5" r="1"/><circle cx="12" cy="19" r="1"/></svg>
          </button>
        </header>

        {/* Tabs */}
        <nav className="flex border-b border-gray-200 md:px-8">
          <button 
            onClick={() => navigate('/finalinvoice', { state: { task } })} // ✅ حالا دیتا به فاکتور پاس داده می‌شود
            className="flex-1 md:flex-none md:px-12 py-3 text-lg font-medium text-gray-400 hover:text-gray-600 transition-colors"
          >
            Task Info
          </button>
          <button className="flex-1 md:flex-none md:px-12 py-3 text-lg font-medium text-[#73a32a] border-b-4 border-[#73a32a]">
            Chat
          </button>
        </nav>

        {/* Chat Area */}
        <main className="flex-grow flex flex-col justify-center items-center p-6 bg-gray-50/50">
          <div className="text-center space-y-2">
            <div className="bg-white p-4 rounded-full shadow-sm inline-block mb-4">
               <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-gray-300" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
              </svg>
            </div>
            <p className="text-gray-500 font-medium md:text-lg">Start a conversation with your tasker</p>
            <p className="text-gray-400 text-sm">Ask about arrival time or task details</p>
          </div>
        </main>

        {/* Message Input Footer */}
        <footer className="p-4 md:p-8 bg-white border-t border-gray-100">
          <div className="max-w-4xl mx-auto flex items-center gap-3">
            <div className="flex-grow flex items-center bg-gray-100 rounded-full px-5 py-3 focus-within:ring-2 ring-[#73a32a]/20 transition-all">
              <input 
                type="text" 
                placeholder="Message..." 
                className="bg-transparent border-none focus:ring-0 w-full text-gray-700 placeholder-gray-400 outline-none"
              />
              <button className="text-gray-400 hover:text-[#73a32a] transition-colors">
                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="m21.44 11.05-9.19 9.19a6 6 0 0 1-8.49-8.49l8.57-8.57A4 4 0 1 1 18 8.84l-8.59 8.51a2 2 0 0 1-2.83-2.83l8.49-8.48"/></svg>
              </button>
            </div>

            <div className="flex items-center gap-1 md:gap-3">
              <button className="p-3 text-gray-500 hover:bg-gray-100 rounded-full transition-colors">
                <svg xmlns="http://www.w3.org/2000/svg" width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M12 2a3 3 0 0 0-3 3v7a3 3 0 0 0 6 0V5a3 3 0 0 0-3-3Z"/><path d="M19 10v2a7 7 0 0 1-14 0v-2"/><line x1="12" x2="12" y1="19" y2="22"/></svg>
              </button>
              <button className="p-3 bg-[#73a32a] text-white rounded-full shadow-md hover:bg-[#5f8722] transition-colors">
                <svg xmlns="http://www.w3.org/2000/svg" width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"/></svg>
              </button>
            </div>
          </div>
        </footer>

        {/* Action Menu Component */}
        <ActionMenu isOpen={isMenuOpen} onClose={() => setIsMenuOpen(false)} />
        
      </div>
    </div>
  );
};

export default Chat;