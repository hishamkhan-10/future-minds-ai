import type { Metadata, Viewport } from 'next';
// Global styles — same files, same order as the old Vite entry
// (main.tsx imported index.css; App.tsx imported App.css).
import '../src/index.css';
import '../src/App.css';

export const metadata: Metadata = {
  metadataBase: new URL('https://futuremindsai.com'),
  title: 'Future Minds AI Training - Master AI Skills for the Future',
  description:
    'Learn Artificial Intelligence, Machine Learning, and Prompt Engineering from industry-focused training at Future Minds AI Training.',
  icons: {
    icon: { url: '/assets/FMA%20LOGO%20favicon.svg', type: 'image/svg+xml' },
  },
  openGraph: {
    type: 'website',
    siteName: 'Future Minds AI Training',
    title: 'Future Minds AI Training - Master AI Skills for the Future',
    description:
      'Practical, hands-on AI, Machine Learning, and Prompt Engineering training for working professionals. Built by practitioners, not academics.',
    images: ['/assets/_LOGO%20FMA.png'],
    url: 'https://futuremindsai.com/',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Future Minds AI Training - Master AI Skills for the Future',
    description:
      'Practical, hands-on AI, Machine Learning, and Prompt Engineering training for working professionals.',
    images: ['/assets/_LOGO%20FMA.png'],
  },
};

export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
  themeColor: '#0A1628',
};

// Anti-FOUC: apply saved/system theme before paint to avoid a flash.
// Identical to the inline script that lived in the old index.html.
const themeScript = `(function () {
  try {
    var t = localStorage.getItem('theme');
    if (t !== 'light' && t !== 'dark') {
      t = window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
    }
    document.documentElement.setAttribute('data-theme', t);
  } catch (e) {}
})();`;

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <script dangerouslySetInnerHTML={{ __html: themeScript }} />
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="" />
        <link
          href="https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700;800&family=Poppins:wght@400;500;600;700;800&display=swap"
          rel="stylesheet"
        />
      </head>
      <body>{children}</body>
    </html>
  );
}
