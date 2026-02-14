import React from "react";
import Header from "@components/layout/Header";
import Promo from "@components/common/Promotion";
import Tasks from "@components/common/Tasks";
import Categories from "@components/common/Categories";
import Footer from "@components/layout/Footer";
import { useAuth } from "@context/AuthContext";
import useActiveTask from "@hooks/useActiveTask";

function HomePage() {
  const { user, loading: authLoading } = useAuth();

  // وقتی auth هنوز loading است، هیچ داده‌ای نمایش نده
  const { activeTask, loading: taskLoading, error } = useActiveTask({
    endpoint: "https://fixfy.liara.run/api/v1/bookings",
    enabled: !!user, // فقط وقتی user داریم fetch کن
  });

  if (authLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        Loading user...
      </div>
    );
  }

  return (
    <div className="min-h-screen flex flex-col bg-white">
      <Header />
      <main className="flex-grow mb-24">
        <div className="container mx-auto max-w-screen-xl px-4 sm:px-10">
          <Promo />

          {taskLoading && <p className="text-gray-400 text-sm">Loading active tasks...</p>}
          {error && <p className="text-red-500 text-sm">Error fetching tasks</p>}

          {user && activeTask ? (
            <div className="animate-in fade-in slide-in-from-top-4 duration-500">
              <Tasks taskData={activeTask} />
            </div>
          ) : user && !activeTask ? (
            <div className="mt-6 text-gray-400 text-center">
              No tasks assigned to you yet.
            </div>
          ) : !user ? (
            <div className="mt-6 text-gray-400 text-center">
              Login to see your active tasks.
            </div>
          ) : null}

          <div className="mt-8">
            <h2 className="text-2xl font-bold text-gray-900 mb-6 px-2">Popular Categories</h2>
            <Categories />
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
}

export default HomePage;