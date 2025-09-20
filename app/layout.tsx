import type { Metadata } from 'next';
import Providers from '@/components/TanStackProvider/TanStackProvider';
import Header from '@/components/Header/Header';
import Footer from '@/components/Footer/Footer';
import { Roboto } from 'next/font/google';
import './globals.css';

const roboto = Roboto({
  subsets: ['latin'],
  weight: ['400', '700'],
  display: 'swap',
  variable: '--font-roboto',
});

export const metadata: Metadata = {
  title: 'NoteHub',
  description: 'NoteHub — an application for creating and managing notes',
  openGraph: {
    title: 'NoteHub',
    description: 'NoteHub — an application for creating and managing notes',
    url: 'https://your-vercel-url.vercel.app',
    images: ['https://ac.goit.global/fullstack/react/notehub-og-meta.jpg'],
  },
};

interface RootLayoutProps {
  children: React.ReactNode;
  modal?: React.ReactNode;
}

export default function RootLayout({ children, modal }: RootLayoutProps) {
  return (
    <html lang="en" className={roboto.variable}>
      <body>
        <Providers>
          <Header />
          {children}
          {modal}
          <Footer />
        </Providers>
      </body>
    </html>
  );
}


