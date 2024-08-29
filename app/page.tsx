'use client';

import { useCallback, useEffect, useState, useRef } from 'react';
import { ParallaxProvider, Parallax, useParallax } from 'react-scroll-parallax';
import { motion, useScroll, useTransform } from 'framer-motion';
import { ChevronDown } from 'lucide-react';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import SectionGallery from '@/components/SectionGallery';
import SectionBeranda from '@/components/SectionBeranda';
import SectionPerangkat from '@/components/SectionPerangkat';
import SectionPotensi from '@/components/SectionPotensi';
import SectionTentang from '@/components/SectionTentang';
import SectionKontak from '@/components/SectionKontak';

interface ParallaxImageProps {
  src: string;
  speed: number;
  className?: string;
}

const ParallaxImage: React.FC<ParallaxImageProps> = ({
  src,
  speed,
  className,
}) => {
  const { ref } = useParallax<HTMLDivElement>({ speed });
  return (
    <div
      ref={ref}
      className={`absolute inset-0 bg-cover bg-center ${className}`}
      style={{ backgroundImage: `url(${src})` }}
    />
  );
};

const Home = () => {
  const [scrollY, setScrollY] = useState(0);
  const [isHeaderVisible, setIsHeaderVisible] = useState(true);

  const perangkatDesa = [
    {
      jabatan: 'Kepala Desa',
      nama: 'H.AGUNG RAHADIAN, S.Ip, M.SI',
      alamat: 'Kp. Mangga Dua RT.04 RW.01 Sukapura, Dayeuhkolot',
    },
    {
      jabatan: 'Sekretaris Desa',
      nama: 'IRHAM TAUFIK, S.E.',
      alamat: 'Kp. Bojong Rangkas RT.004 RW.012',
    },
    {
      jabatan: 'Kaur Keuangan',
      nama: 'DANDI HIMAWAN MALIKI',
      alamat: 'Kp. Sagalaherang RT.002 RW.009',
    },
    {
      jabatan: 'Kaur Perencanaan',
      nama: 'MUHAMMAD SIDIQ',
      alamat: 'Kp. Bojong Gede RT.004 RW.011',
    },
    {
      jabatan: 'Kaur Umum',
      nama: 'DEDI HARYADI',
      alamat: 'Kp. Sagalaherang RT.002 RW.009',
    },
    {
      jabatan: 'Kaur Kesra',
      nama: 'ROHMAT PERMANA',
      alamat: 'Kp. Tawang Heman RT.001 RW.008',
    },
    {
      jabatan: 'Kasi Pemerintahan',
      nama: 'TETENG HARYANA',
      alamat: 'Kp. Singalaya RT.002 RW.011',
    },
    {
      jabatan: 'Kasi Pelayanan',
      nama: 'MAHBUB',
      alamat: 'Kp. Tawang Heman RT.001 RW.008',
    },
    {
      jabatan: 'Kadus I',
      nama: 'WAHYU TARYANA',
      alamat: 'Kp. Bojong Waru RT.002 RW.005',
    },
    {
      jabatan: 'Kadus II',
      nama: 'ANANG SURYANA',
      alamat: 'Kp. Babakan Sawah RT.004 RW.006',
    },
    {
      jabatan: 'Kadus III',
      nama: 'AEP SAEPULOH',
      alamat: 'Kp. Citoke RT.003 RW.010',
    },
    {
      jabatan: 'Kadus IV',
      nama: 'EMAN SUKMANA',
      alamat: 'Kp. Bojong Gede RT.004 RW.011',
    },
    {
      jabatan: 'Staf Desa',
      nama: 'IRMAN ABDURROHMAN',
      alamat: 'Kp. Tawang Heman RT.001 RW.008',
    },
    {
      jabatan: 'Staf Desa',
      nama: 'ASEP SODIKIN',
      alamat: 'Kp. Rancabeureum RT.001 RW.007',
    },
    {
      jabatan: 'Staf Desa',
      nama: 'DUDI SUPRIADI',
      alamat: 'Kp. Sagalaherang RT.002 RW.009',
    },
    {
      jabatan: 'Operator Desa',
      nama: 'ASEP ABDUSSALAM',
      alamat: 'Kp. Kantreng RT.002 RW.006',
    },
  ];

  const galleryImages = [
    '/images/asset.jpg',
    '/images/asset2.jpg',
    '/images/asset3.jpg',
    '/images/asset4.jpg',
    '/images/asset5.jpg',
    '/images/asset6.jpg',
    '/images/asset7.jpg',
    '/images/sawah.jpg',
  ];

  const handleScroll = useCallback(() => {
    const currentScrollY = window.scrollY;
    setIsHeaderVisible(currentScrollY <= scrollY);
    setScrollY(currentScrollY);
  }, [scrollY]);

  useEffect(() => {
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, [handleScroll]);

  useEffect(() => {
    const cursor = document.createElement('div');
    cursor.classList.add('custom-cursor');
    document.body.appendChild(cursor);

    const moveCursor = (e: MouseEvent) => {
      requestAnimationFrame(() => {
        cursor.style.left = `${e.clientX}px`;
        cursor.style.top = `${e.clientY}px`;
      });
    };

    document.addEventListener('mousemove', moveCursor);

    return () => {
      document.removeEventListener('mousemove', moveCursor);
      document.body.removeChild(cursor);
    };
  }, []);

  return (
    <ParallaxProvider>
      <div className="overflow-hidden relative min-h-screen bg-gradient-to-b from-green-50 to-green-100 text-green-900">
        <Header isHeaderVisible={isHeaderVisible} />
        <SectionBeranda />
        <SectionTentang />
        <SectionPotensi />
        <SectionPerangkat perangkatDesa={perangkatDesa} />
        <SectionGallery galleryImages={galleryImages} />
        <SectionKontak />
        <Footer />
      </div>
    </ParallaxProvider>
  );
};

export default Home;
