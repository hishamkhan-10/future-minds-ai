'use client';

import dynamic from 'next/dynamic';

// Mount the dedicated Create Account screen at /signup. Rendered client-side
// (ssr: false), matching the homepage and /signin pattern — it reuses the exact
// same visual shell (background + card) as the Sign In screen.
const SignUpPage = dynamic(() => import('../../src/components/SignUpPage'), { ssr: false });

export default function Page() {
  return <SignUpPage />;
}
