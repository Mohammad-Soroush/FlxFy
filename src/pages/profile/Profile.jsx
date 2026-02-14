import React from 'react';
import { useAuth } from '@context/AuthContext'; // هوک ما
import ProfileLoggedIn from '@pages/profile/ProfileLogin';
import ProfileGuest from '@pages/profile/ProfileGuest';
import Loading from '@components/ui/Loading';

      // کامپوننت کاربر مهمان

function ProfilePage() {
  // از هوک، فقط آبجکت user و وضعیت loading را می‌گیریم
  const { user, loading } = useAuth();

  // اگر در حال بررسی اولیه توکن بود، یک پیام لودینگ نشان بده
  if (loading) {
    return (
      <Loading/>
    );
  }

  // این شرط اصلی است:
  // اگر آبجکت 'user' وجود داشت (null نبود)، کامپوننت کاربر لاگین کرده را نمایش بده
  // در غیر این صورت، کامپوننت کاربر مهمان را نمایش بده
  return user ? <ProfileLoggedIn /> : <ProfileGuest />;
}

export default ProfilePage;
