import { useEffect } from "react";
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import Cookies from "js-cookie";

// ===== CONTEXT PROVIDERS =====
import { UserProvider } from "@context/Usercontext";
import { AuthProvider } from "@context/AuthContext";

// ===== HOOKS =====
import useFetch from "@hooks/useFetch";

// ===== PAGES & COMPONENTS =====
import HomePage from "@pages/Home/HomePage";
// Onboarding pages (همه داخل pages/onboarding)
import OnboardingPage1 from "@pages/onboarding/Onboardingpages";
import OnboardingPage2 from "@pages/onboarding/Onboardingpages2";
import OnboardingPage3 from "@pages/onboarding/Onboardingpages3";
import OnboardingPage4 from "@pages/onboarding/Onboardingpages4";
import OnboardingPage5 from "@pages/onboarding/Onboardingpages5";

// ===== Feature pages =====
import TaskLocation1 from "@pages/features/Tasklocation";
import TaskLocation2 from "@pages/features/Tasklocation2";
import TaskLocation3 from "@pages/features/Tasklocation3";
import TaskLocation4 from "@pages/features/Tasklocation4";
import TaskLocation5 from "@pages/features/Tasklocation5";


import TaskerListPage from "@pages/Tasker/Taskerlist";
import TaskerProfilePage from "@pages/Tasker/TaskerPrfoile";
import TaskDetailPage from "@pages/Tasker/TaskDetail";

import PaymentPage from "@pages/Payment/Payment";
import AddNewPaymentPage from "@pages/Payment/Addnewpayment";

// ===== Profile pages =====
import ProfilePage from "@pages/profile/Profile";
import HelpAndSupportPage from "@pages/profile/HelpandSupport";
import CustomerServicesPage from "@pages/profile/CostumerServices";
import TermsAndConditionsPage from "@pages/profile/TermsAndConditions";

// Edit Profile pages
import PersonalInfoPage from "@pages/profile/PersonalInfo";
import AddNewAddressPage from "@pages/profile/AddNewAddress";
import AccountSecurityPage from "@pages/profile/AccountandSecurity";

// Notifications
import NotificationPage from "@pages/profile/Notification";


import MyTasksPage from "@pages/MyTasks/MyTasks";
import MyTasksChatPage from "@pages/MyTasks/Chat";
import FinalInvoicePage from "@pages/MyTasks/FinalInvoice";
import LeaveReviewPage from "@pages/MyTasks/LeaveReview";
import TaskInformationPage from "@pages/MyTasks/TaksInformation";

import FixifyLoginPage from "@pages/Auth/FixifyLogin";
import SignUpPage from "@pages/Auth/SignUp";

import TechnicianProfileEditorPage from "@pages/technician/TechnicianProfile";
import NotFound from "./pages/Auth/NotFound";


function App() {
  // Your existing hook to fetch location data
  const { data, isloading, error } = useFetch("https://fixfy.liara.run/api/v1/location/index");
  const userCity = Cookies.get("userCity");

  // Your existing effect to prevent browser zoom
  useEffect(() => {
    const handleWheel = (e) => e.ctrlKey && e.preventDefault();
    const handleKeyDown = (e) =>
      (e.ctrlKey || e.metaKey) && ["+", "-", "="].includes(e.key) && e.preventDefault();
    document.addEventListener("wheel", handleWheel, { passive: false });
    document.addEventListener("keydown", handleKeyDown);
    return () => {
      document.removeEventListener("wheel", handleWheel);
      document.removeEventListener("keydown", handleKeyDown);
    };
  }, []);

  return (
    // Your original UserProvider for location data
    <UserProvider value={{ data, isloading, error }}>
      {/* This single Router now wraps your entire application */}
      <Router basename="/">
        {/* The AuthProvider is placed inside the Router to get access to navigation hooks */}
        <AuthProvider>
          {/* All Routes are now children of both UserProvider and AuthProvider */}
          <Routes>
            {/* Onboarding */}
            <Route
              path="/"
              element={
                userCity ? (
                  <Navigate to="/home" replace />
                ) : (
                  <Navigate to="/onboarding/1" replace />
                )
              }
            />
            <Route path="/onboarding/1" element={<OnboardingPage1 />} />
            <Route path="/onboarding/2" element={<OnboardingPage2 />} />
            <Route path="/onboarding/3" element={<OnboardingPage3 />} />
            <Route path="/onboarding/4" element={<OnboardingPage4 />} />
            <Route path="/onboarding/5" element={<OnboardingPage5 />} />


            {/* --- Tasker Pages --- */}
            <Route path="/taskerlist" element={<TaskerListPage />} />
            <Route path="/tasker/:id" element={<TaskerProfilePage />} />
            <Route path="/task-detail" element={<TaskDetailPage />} />

            <Route path="/technicalprofile" element={<TechnicianProfileEditorPage />} />

            {/* --- Profile --- */}
            <Route path="/profile" element={<ProfilePage />} />
            <Route path="/HelpandSupport" element={<HelpAndSupportPage />} />
            <Route path="/CostumerServices" element={<CustomerServicesPage />} />
            <Route path="/TermsAndConditions" element={<TermsAndConditionsPage />} />
            <Route path="/PersonalInfo" element={<PersonalInfoPage />} />
            <Route path="/add-new-address" element={<AddNewAddressPage />} />
            <Route path="/account-security" element={<AccountSecurityPage />} />
            <Route path="/notification" element={<NotificationPage />} />

            {/* --- MyTask --- */}
            <Route path="/mytask" element={<MyTasksPage />} />
            <Route path="/chat" element={<MyTasksChatPage />} />
            <Route path="/taskpage" element={<TaskInformationPage />} />
            <Route path="/finalinvoice" element={<FinalInvoicePage />} />
            <Route path="/Leavereview" element={<LeaveReviewPage />} />


            {/* --- Signup and Login (These will now work correctly) --- */}
            <Route path="/login" element={<FixifyLoginPage />} />
            <Route path="/signup" element={<SignUpPage />} />

            {/* --- Payment --- */}
            <Route path="/payment" element={<PaymentPage />} />
            <Route path="/add-new-payment" element={<AddNewPaymentPage />} />

            {/* --- Feature pages --- */}
            <Route path="/task-location/1" element={<TaskLocation1 />} />
            <Route path="/task-location/2" element={<TaskLocation2 />} />
            <Route path="/task-location/3" element={<TaskLocation3 />} />
            <Route path="/task-location/4" element={<TaskLocation4 />} />
            <Route path="/task-location/5" element={<TaskLocation5 />} />

            {/* --- Home --- */}
            <Route
              path="/home"
              element={
                isloading ? (
                  <p className="text-center mt-10">Loading...</p>
                ) : error ? (
                  <p className="text-center mt-10">Error: {error}</p>
                ) : (
                  <HomePage />
                )
              }
            />
            {/* Not found */}
              <Route path="*" element={<NotFound/>}/>
            
          </Routes>
        </AuthProvider>
      </Router>
    </UserProvider>
  );
}

export default App;
