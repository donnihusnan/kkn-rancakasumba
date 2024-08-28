'use client';

import { useCallback, useEffect, useState, useRef } from 'react';
import { ParallaxProvider, Parallax, useParallax } from 'react-scroll-parallax';
import { motion, useScroll, useTransform } from 'framer-motion';
import { ChevronDown } from 'lucide-react';
import { BsFillHouseFill } from 'react-icons/bs';
import Image from 'next/image';
import logo from '../public/images/logo.png';

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

export default function Home() {
  const [scrollY, setScrollY] = useState(0);
  const [isHeaderVisible, setIsHeaderVisible] = useState(true);
  const [year, setYear] = useState(new Date().getFullYear());

  useEffect(() => {
    setYear(new Date().getFullYear());
  }, []);

  const handleScroll = useCallback(() => {
    const currentScrollY = window.scrollY;
    if (currentScrollY > scrollY) {
      setIsHeaderVisible(false);
    } else {
      setIsHeaderVisible(true);
    }
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

  useEffect(() => {
    const growCursor = () => {
      const cursor = document.querySelector('.custom-cursor');
      if (cursor) cursor.classList.add('grow');
    };

    const shrinkCursor = () => {
      const cursor = document.querySelector('.custom-cursor');
      if (cursor) cursor.classList.remove('grow');
    };

    const links = document.querySelectorAll('a, button');
    links.forEach((link) => {
      link.addEventListener('mouseover', growCursor);
      link.addEventListener('mouseleave', shrinkCursor);
    });

    return () => {
      links.forEach((link) => {
        link.removeEventListener('mouseover', growCursor);
        link.removeEventListener('mouseleave', shrinkCursor);
      });
    };
  }, []);

  const ref = useRef(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ['start start', 'end start'],
  });

  const opacity = useTransform(scrollYProgress, [0, 1], [1, 0]);
  const scale = useTransform(scrollYProgress, [0, 1], [1, 0.8]);

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

  return (
    <>
      <ParallaxProvider>
        <div className="bg-gradient-to-b from-green-50 to-green-100 text-green-900 min-h-screen">
          <header
            className={`fixed top-0 left-0 right-0 z-50 bg-gradient-to-r from-green-600 to-green-800 text-white p-4 transition-transform duration-300 ${
              isHeaderVisible ? 'translate-y-0' : '-translate-y-full'
            }`}
          >
            <nav className="flex flex-col md:flex-row justify-between items-center max-w-6xl mx-auto">
              <Image
                src={logo}
                alt="Logo Rancakasumba"
                width={120}
                height={50}
              />

              <ul className="flex flex-wrap justify-center space-x-4">
                {['Beranda', 'Tentang', 'Potensi', 'Lokasi'].map((item) => (
                  <li key={item}>
                    <a
                      href={`#${item.toLowerCase()}`}
                      className="relative overflow-hidden group px-2 py-1 hover:text-green-300 transition-colors duration-300"
                    >
                      {item}
                      <span className="absolute left-0 bottom-0 w-full h-0.5 bg-green-300 transform scale-x-0 group-hover:scale-x-100 transition-transform duration-300 origin-left"></span>
                    </a>
                  </li>
                ))}
              </ul>
            </nav>
          </header>

          <main>
            <motion.section
              ref={ref}
              style={{ opacity, scale }}
              id="beranda"
              className="relative min-h-screen flex items-center justify-center overflow-hidden"
            >
              <ParallaxImage
                src="/images/asset.jpg"
                speed={-20}
                className="opacity-80"
              />
              <div className="relative z-10 text-center flex flex-col items-center justify-center min-h-screen">
                <motion.h2
                  className="text-6xl font-bold mb-4"
                  initial={{ opacity: 0, y: 50 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 1 }}
                >
                  RANCAKASUMBA
                </motion.h2>
                <motion.p
                  className="text-xl mb-8"
                  initial={{ opacity: 0, y: 50 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 1, delay: 0.5 }}
                >
                  Nyaman Aman Tenang
                </motion.p>
              </div>
              <motion.div
                className="absolute bottom-10 left-1/2 transform -translate-x-1/2"
                animate={{ y: [0, 10, 0] }}
                transition={{ repeat: Infinity, duration: 1.5 }}
              >
                <ChevronDown size={40} />
              </motion.div>
            </motion.section>

            <section id="tentang" className="relative min-h-screen py-20">
              <Parallax speed={10}>
                <div className="max-w-4xl mx-auto px-4 flex flex-col items-center justify-center min-h-screen">
                  <h2 className="text-4xl font-bold mb-8 text-center">
                    Tentang Desa
                  </h2>
                  <p className="text-lg mb-4">
                    Terletak di jantung alam, Rancakasumba sungguh indah desa
                    yang menawarkan perpaduan sempurna antara pesona tradisional
                    dan kenyamanan modern. Komunitas kami bangga melestarikan
                    kami warisan budaya yang kaya sambil menerapkan praktik
                    hidup berkelanjutan.
                  </p>
                  <p className="text-lg">
                    Dari padang rumput hijau subur hingga sungai sebening
                    kristal, setiap sudut Rancakasumba menceritakan kisah
                    harmoni di antara keduanya manusia dan alam. Datang dan
                    rasakan kehangatan kami komunitas dan keindahan lanskap
                    kita.
                  </p>
                </div>
              </Parallax>
            </section>

            <section
              id="potensi"
              className="relative min-h-screen py-20 bg-green-100 flex flex-col items-center justify-center"
            >
              <ParallaxImage
                src="/images/sawah.jpg"
                speed={-10}
                className="opacity-50"
              />
              <div className="relative z-10 max-w-6xl mx-auto px-4 text-center">
                <h2 className="text-4xl font-bold mb-12">Potensi Desa</h2>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                  {['Historic Mill', 'Botanical Gardens', 'Artisan Market'].map(
                    (attraction, index) => (
                      <Parallax key={index} speed={5 * (index + 1)}>
                        <motion.div
                          whileHover={{ scale: 1.05 }}
                          whileTap={{ scale: 0.95 }}
                          className="h-full"
                        >
                          <div className="bg-white p-6 rounded-lg shadow-lg transform transition-all duration-300 hover:shadow-xl h-full">
                            <h3 className="text-xl font-semibold mb-2">
                              {attraction}
                            </h3>
                            <p className="text-gray-600">
                              Lorem ipsum dolor sit amet, consectetur adipiscing
                              elit. Vivamus lacinia odio vitae vestibulum.
                            </p>
                          </div>
                        </motion.div>
                      </Parallax>
                    )
                  )}
                </div>
              </div>
            </section>

            <section id="lokasi" className="relative min-h-screen mb-20 py-20">
              <Parallax speed={20}>
                <div className="max-w-4xl mx-auto px-4 flex flex-col items-center justify-center min-h-screen">
                  <h2 className="text-4xl font-bold mb-8 text-center">
                    Kunjungi Kami
                  </h2>
                  <iframe
                    title="google maps"
                    src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3959.9825468028403!2d107.72293321022936!3d-7.011335192960881!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x2e68c17c82394c1b%3A0x5b350d79d054412c!2sKantor%20Desa%20Rancakasumba!5e0!3m2!1sid!2sid!4v1724591778974!5m2!1sid!2sid"
                    width="600"
                    height="450"
                    style={{ border: 0 }}
                    allowFullScreen
                    loading="lazy"
                    referrerPolicy="no-referrer-when-downgrade"
                  ></iframe>
                </div>
              </Parallax>
            </section>

            <section
              id="galeri"
              className="relative min-h-screen bg-green-50 py-20 z-40"
            >
              <div className="max-w-4xl mx-auto px-4 flex flex-col items-center justify-center min-h-screen">
                <h2 className="text-4xl font-bold mb-12 text-center">
                  Galeri Desa
                </h2>
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                  {galleryImages.map((src, index) => (
                    <Parallax key={index} speed={5 + index * 3}>
                      <motion.div
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        whileFocus={{ scale: 1.05 }}
                        className="relative overflow-hidden rounded-lg shadow-lg"
                      >
                        <img
                          src={src}
                          alt={`Gallery image ${index + 1}`}
                          className="w-full h-64 object-cover"
                        />
                      </motion.div>
                    </Parallax>
                  ))}
                </div>
              </div>
            </section>

            <section id="contact" className="relative min-h-screen mt-20">
              <ParallaxImage
                src="/images/asset2.jpg"
                speed={0}
                className="opacity-50 z-auto"
              />
              <div className="relative z-10 max-w-4xl mx-auto px-4 text-center flex flex-col items-center justify-center min-h-screen">
                <h2 className="text-4xl font-bold mb-8">Contact Us</h2>
                <p className="text-lg mb-8">
                  Lorem ipsum dolor sit amet, consectetur adipiscing elit.
                  Vivamus lacinia odio vitae vestibulum.
                </p>
                <a
                  href="#beranda"
                  className="bg-green-600 text-white px-6 py-3 rounded-full text-lg font-semibold hover:bg-green-700 transition duration-300"
                >
                  Hubungi Kami
                </a>
              </div>
            </section>
          </main>
        </div>
      </ParallaxProvider>
      <footer className="mt-6 bg-green-800 text-white min-h-6 z-50 w-full overflow-hidden mx-auto">
        <p>{`©KKN UIN SUNAN GUNUNG DJATI ${year}.`}</p>
      </footer>
    </>
  );
}
