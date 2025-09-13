import type { Metadata } from 'next';
import localFont from 'next/font/local';
import Header from '@components/Header';
import Footer from '@components/Footer';
import '@styles/global.css';

const stem = localFont({
  src: [
    {
      path: '../fonts/Stem-Light.otf',
      weight: '300',
      style: 'normal',
    },
    {
      path: '../fonts/Stem-Regular.otf',
      weight: '400',
      style: 'normal',
    },
    {
      path: '../fonts/Stem-Medium.otf',
      weight: '500',
      style: 'normal',
    },
    {
      path: '../fonts/Stem-Bold.otf',
      weight: '700',
      style: 'normal',
    },
  ],
});

export const metadata: Metadata = {
  title: 'El Gran Zorro',
  description: 'El juego de apuestas donde todos ganan',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="es">
      <body
        className={`${stem.className} bg-primary-color min-h-screen flex flex-col`}
      >
        <Header />
        <main>
          <div className="w-[90%] max-w-[1200px] flex flex-col items-center gap-4 md:gap-6 py-4 md:py-6 m-0 mx-auto">
            {children}
          </div>
        </main>
        <Footer />
      </body>
    </html>
  );
}
