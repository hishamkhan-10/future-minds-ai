'use client';

import dynamic from 'next/dynamic';

// Render the app entirely on the client (ssr: false), exactly as the old
// Vite build did — the page hydrates into an empty body and the full tree
// (Navbar, Hero, all sections, Footer) renders client-side. This guarantees
// identical runtime behavior for the theme toggle, scroll reveal, navbar
// scroll-spy and the shared-element drawer transition.
const App = dynamic(() => import('../src/App'), { ssr: false });

export default function Page() {
  return <App />;
}
