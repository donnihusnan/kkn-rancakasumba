import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import localFont from 'next/font/local';
import './globals.css';

const inter = Inter({ subsets: ['latin'] });
const myFont = localFont({ src: '../public/MedievalSharp-Regular.ttf' });

export const metadata: Metadata = {
  title: 'Rancakasumba',
  description:
    'Website Desa Rancakasumba Kecamatan Solokan Jeruk Kabupaten Bandung',
  icons: {
    icon: '/images/icon.png',
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <>
      <html lang="en">
        <body className={inter.className}>{children}</body>
      </html>
    </>
  );
}
