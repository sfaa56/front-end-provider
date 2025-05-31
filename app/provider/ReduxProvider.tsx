// app/providers/ReduxProvider.tsx
'use client';

import { Provider } from 'react-redux';
import { store } from '@/store/store';
import { setUserFromStorage } from '@/features/auth/authSlice';
import { useEffect } from 'react';
import { useDispatch } from 'react-redux';

function HydrateAuthState() {
  const dispatch = useDispatch();

  useEffect(() => {
    const user = localStorage.getItem('user');
    const token = sessionStorage.getItem('token'); // optional if you use sessionStorage

    if (user) {
      dispatch(setUserFromStorage({ user: JSON.parse(user), token }));
    }
  }, [dispatch]);

  return null;
}

export function ReduxProvider({ children }: { children: React.ReactNode }) {
  return (
    <Provider store={store}>
      <HydrateAuthState />
      {children}
    </Provider>
  );
}
