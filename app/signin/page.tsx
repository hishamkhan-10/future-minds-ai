'use client';

import dynamic from 'next/dynamic';

// Mount the dedicated Sign In screen at /signin. Rendered client-side
// (ssr: false), matching the homepage pattern — it reuses the exact same Sign
// In UI (background + card) that previously launched as a navbar overlay.
const SignInPage = dynamic(() => import('../../src/components/SignInPage'), { ssr: false });

export default function Page() {
  return <SignInPage />;
}
