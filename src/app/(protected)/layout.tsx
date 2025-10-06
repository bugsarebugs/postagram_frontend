'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import  useUserActions from "@/hooks/user.actions";

export default function ProtectedLayout({ children }: { children: React.ReactNode }) {
  const router = useRouter();
  const [authChecked, setAuthChecked] = useState(false);
  const { getUser } = useUserActions();
  

  useEffect(() => {
    const checkAuth = () => {
      try {
        const auth = localStorage.getItem('auth');
        const user  = getUser();
        if (!auth) {
          router.replace('/login');
          return;
        }

        if (!user) {
          router.replace('/login');
          return;
        }

        // ✅ All good
        setAuthChecked(true);
      } catch {
        router.replace('/login');
      }
    };

    // ⚠️ Wait a moment to ensure localStorage is ready after login
    setTimeout(checkAuth, 100);
  }, [router, getUser]);

  if (!authChecked) {
    return <div>Loading...</div>; // Or a spinner if you want
  }

  return <>{children}</>;
}
