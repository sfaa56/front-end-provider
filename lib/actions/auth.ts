'use server';

import { createSession,deleteSession  } from '../session'; // Your session function
import { redirect } from 'next/navigation';

export async function handleLogin(accessToken: string) {
  await createSession(accessToken);
  redirect('/'); // or wherever you want
}


export async function handleLogout() {
  await deleteSession();
  redirect('/sign-in');
}