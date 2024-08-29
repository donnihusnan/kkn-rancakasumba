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
  const [year, setYear] = useState(new Date().getFullYear());

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
        <Footer year={year} />
      </div>
    </ParallaxProvider>
  );
};

export default Home;

//   return (
//     <>
//       <ParallaxProvider>
//         <div className="bg-gradient-to-b from-green-50 to-green-100 text-green-900 min-h-screen">
//           <header
//             className={`fixed top-0 left-0 right-0 z-50 bg-gradient-to-r from-green-600 to-green-800 text-white p-4 transition-transform duration-300 ${
//               isHeaderVisible ? 'translate-y-0' : '-translate-y-full'
//             }`}
//           >
//             <nav className="flex flex-col md:flex-row justify-between items-center max-w-6xl mx-auto">
//               <Image
//                 src={logo}
//                 alt="Logo Rancakasumba"
//                 width={120}
//                 height={50}
//               />

//               <ul className="flex flex-wrap justify-center space-x-4">
//                 {['Beranda', 'Tentang', 'Potensi', 'Lokasi'].map((item) => (
//                   <li key={item}>
//                     <a
//                       href={`#${item.toLowerCase()}`}
//                       className="relative overflow-hidden group px-2 py-1 hover:text-green-300 transition-colors duration-300"
//                     >
//                       {item}
//                       <span className="absolute left-0 bottom-0 w-full h-0.5 bg-green-300 transform scale-x-0 group-hover:scale-x-100 transition-transform duration-300 origin-left"></span>
//                     </a>
//                   </li>
//                 ))}
//               </ul>
//             </nav>
//           </header>

//           <main>
//             <motion.section
//               ref={ref}
//               style={{ opacity, scale }}
//               id="beranda"
//               className="relative min-h-screen flex items-center justify-center overflow-hidden"
//             >
//               <ParallaxImage
//                 src="/images/asset.jpg"
//                 speed={-20}
//                 className="opacity-80"
//               />
//               <div className="relative z-10 text-center flex flex-col items-center justify-center min-h-screen">
//                 <motion.h2
//                   className="text-6xl font-bold mb-4"
//                   initial={{ opacity: 0, y: 50 }}
//                   animate={{ opacity: 1, y: 0 }}
//                   transition={{ duration: 1 }}
//                 >
//                   RANCAKASUMBA
//                 </motion.h2>
//                 <motion.p
//                   className="text-xl mb-8"
//                   initial={{ opacity: 0, y: 50 }}
//                   animate={{ opacity: 1, y: 0 }}
//                   transition={{ duration: 1, delay: 0.5 }}
//                 >
//                   Nyaman Aman Tenang
//                 </motion.p>
//               </div>
//               <motion.div
//                 className="absolute bottom-10 transform -translate-x-1/2"
//                 animate={{ y: [0, 10, 0] }}
//                 transition={{ repeat: Infinity, duration: 1.5 }}
//               >
//                 <ChevronDown size={40} />
//               </motion.div>
//             </motion.section>

//             <section id="tentang" className="relative min-h-screen py-20">
//               <Parallax speed={10}>
//                 <div className="max-w-4xl mx-auto px-4 flex flex-col items-center justify-center min-h-screen">
//                   <h2 className="text-4xl font-bold mb-8 text-center">
//                     Tentang Desa
//                   </h2>
//                   <p className="text-lg mb-4">
//                     Desa Rancakasumba, yang terletak di Kecamatan Solokanjeruk,
//                     Kabupaten Bandung, Provinsi Jawa Barat, merupakan sebuah
//                     desa yang menyimpan pesona alam dan keanekaragaman budaya
//                     lokal. Desa ini dilintasi oleh aliran sungai citarum dan
//                     sebagian besar wilayahnya adalah lahan pertanian, dengan
//                     iklim tropis yang mendukung kegiatan pertanian sepanjang
//                     tahun.
//                   </p>
//                   <p className="text-lg">
//                     Sebagian besar penduduknya mengandalkan pertanian sebagai
//                     mata pencaharian utama. Selain itu, sektor perdagangan lokal
//                     juga berperan penting dalam perekonomian desa, dengan
//                     berbagai usaha kecil dan menengah yang menggerakkan ekonomi
//                     masyarakat.
//                   </p>
//                 </div>
//               </Parallax>
//             </section>

//             <section
//               id="potensi"
//               className="relative min-h-screen py-20 bg-green-100 flex flex-col items-center justify-center"
//             >
//               <ParallaxImage
//                 src="/images/asset3.jpg"
//                 speed={-10}
//                 className="opacity-50"
//               />
//               <div className="relative z-10 max-w-6xl mx-auto px-4 text-center">
//                 <h2 className="text-4xl font-bold mb-12">Potensi Desa</h2>

//                 <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
//                   {['Pertanian', 'Bata Merah', 'Pengrajin'].map(
//                     (attraction, index) => (
//                       <Parallax key={index} speed={5 * (index + 1)}>
//                         <motion.div
//                           whileHover={{ scale: 1.05 }}
//                           whileTap={{ scale: 0.95 }}
//                           style={{
//                             perspective: 1000,
//                           }}
//                           className="h-full"
//                         >
//                           <motion.div
//                             className="bg-white p-6 rounded-lg shadow-lg transform transition-all duration-300 hover:shadow-xl h-full"
//                             style={{
//                               rotateX: rotateX,
//                               rotateY: rotateY,
//                               transition: 'all 0.1s ease',
//                             }}
//                             onMouseMove={(e) =>
//                               handleMouseMove(e, e.currentTarget)
//                             }
//                             onMouseLeave={handleMouseLeave}
//                           >
//                             <h3 className="text-xl font-semibold mb-2">
//                               {attraction}
//                             </h3>
//                             <p className="text-gray-600">
//                               {attraction === 'Pertanian' &&
//                                 `Lahan pertanian yang subur dan luas, menjadikannya pusat produksi berbagai jenis tanaman pangan, pertanian di Rancakasumba berkembang pesat, menghasilkan padi, sayuran, dan buah-buahan berkualitas tinggi.`}
//                               {attraction === 'Bata Merah' &&
//                                 `Dikenal sebagai salah satu produsen bata merah terbaik di wilayah ini. Bahan bangunan yang dihasilkan oleh para pengrajin lokal terkenal akan kekuatannya dan kualitasnya yang unggul.`}
//                               {attraction === 'Pengrajin' &&
//                                 `Komunitas pengrajin yang berbakat, menghasilkan berbagai produk kerajinan tangan yang unik dan berkualitas, mulai dari anyaman, ukiran kayu, hingga produk seni lainnya.`}
//                             </p>
//                           </motion.div>
//                         </motion.div>
//                       </Parallax>
//                     )
//                   )}
//                 </div>
//               </div>
//             </section>

//             <section
//               id="perangkat-desa"
//               className="relative min-h-screen py-20 bg-green-100 flex flex-col items-center justify-center"
//             >
//               <div className="max-w-4xl mx-auto px-4">
//                 <h2 className="text-4xl font-bold mb-8">Perangkat Desa</h2>
//                 <motion.div
//                   className="transform -translate-x-1/2"
//                   animate={{ x: [0, 10, 0] }}
//                   transition={{ repeat: Infinity, duration: 1.5 }}
//                 >
//                   <div className="overflow-x-auto">
//                     <Table>
//                       <TableHeader>
//                         <TableRow className="pl-20">
//                           <TableHead className="text-center">JABATAN</TableHead>
//                           <TableHead className="text-center">NAMA</TableHead>
//                           <TableHead className="text-center">ALAMAT</TableHead>
//                         </TableRow>
//                       </TableHeader>
//                       <TableBody>
//                         {currentPageData.map((perangkat, index) => (
//                           <TableRow key={index}>
//                             <TableCell>{perangkat.jabatan}</TableCell>
//                             <TableCell>{perangkat.nama}</TableCell>
//                             <TableCell>{perangkat.alamat}</TableCell>
//                           </TableRow>
//                         ))}
//                       </TableBody>
//                     </Table>
//                   </div>
//                   <div className="flex justify-center mt-4 space-x-2">
//                     <Button
//                       onClick={() =>
//                         setCurrentPage((prev) => Math.max(prev - 1, 1))
//                       }
//                       disabled={currentPage === 1}
//                     >
//                       Sebelumnya
//                     </Button>
//                     <Button
//                       onClick={() =>
//                         setCurrentPage((prev) => Math.min(prev + 1, totalPages))
//                       }
//                       disabled={currentPage === totalPages}
//                     >
//                       Selanjutnya
//                     </Button>
//                   </div>
//                   <p className="text-center mt-2">
//                     Halaman {currentPage} dari {totalPages}
//                   </p>
//                 </motion.div>
//               </div>
//             </section>

//             <section
//               id="lokasi"
//               className="relative min-h-screen py-20 bg-green-100 flex flex-col items-center justify-center"
//             >
//               <ParallaxImage
//                 src="/images/sawah2.jpg"
//                 speed={30}
//                 className="opacity-50 z-auto"
//               />
//               <Parallax speed={20}>
//                 <div className="max-w-4xl mx-auto px-4 flex flex-col items-center justify-center min-h-screen">
//                   <h2 className="text-4xl font-bold mb-8 text-center">
//                     Kunjungi Kami
//                   </h2>
//                   <iframe
//                     title="google maps"
//                     src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3959.9825468028403!2d107.72293321022936!3d-7.011335192960881!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x2e68c17c82394c1b%3A0x5b350d79d054412c!2sKantor%20Desa%20Rancakasumba!5e0!3m2!1sid!2sid!4v1724591778974!5m2!1sid!2sid"
//                     width="400"
//                     height="450"
//                     style={{ border: 0 }}
//                     allowFullScreen
//                     loading="lazy"
//                     referrerPolicy="no-referrer-when-downgrade"
//                   ></iframe>
//                 </div>
//               </Parallax>
//             </section>

//             <section
//               id="galeri"
//               className="relative min-h-screen py-20 flex flex-col items-center justify-center"
//             >
//               <div className="max-w-4xl mx-auto px-4 flex flex-col items-center justify-center min-h-screen">
//                 <h2 className="text-4xl z-10 font-bold mb-12 text-center">
//                   Galeri Desa
//                 </h2>
//                 <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
//                   {galleryImages.map((src, index) => (
//                     <Parallax key={index} speed={2 + index * 2}>
//                       <motion.div
//                         whileHover={{ scale: 1.05 }}
//                         whileTap={{ scale: 0.95 }}
//                         whileFocus={{ scale: 1.05 }}
//                         className="relative overflow-hidden rounded-lg shadow-lg"
//                       >
//                         <img
//                           src={src}
//                           alt={`Gallery image ${index + 1}`}
//                           className="w-full h-64 object-cover"
//                         />
//                       </motion.div>
//                     </Parallax>
//                   ))}
//                 </div>
//               </div>
//             </section>

//             <section
//               id="contact"
//               className="relative min-h-screen py-20 bg-green-100 flex flex-col items-center justify-center"
//             >
//               <ParallaxImage
//                 src="/images/asset2.jpg"
//                 speed={0}
//                 className="opacity-50 z-auto"
//               />
//               <div className="relative z-10 max-w-4xl mx-auto px-4 text-center flex flex-col items-center justify-center min-h-screen">
//                 <h2 className="text-4xl font-bold mb-8">Contact Us</h2>
//                 <p className="text-lg mb-8">
//                   Lorem ipsum dolor sit amet, consectetur adipiscing elit.
//                   Vivamus lacinia odio vitae vestibulum.
//                 </p>
//                 <a
//                   href="#beranda"
//                   className="bg-green-600 text-white px-6 py-3 rounded-full text-lg font-semibold hover:bg-green-700 transition duration-300"
//                 >
//                   Hubungi Kami
//                 </a>
//               </div>
//             </section>
//           </main>
//         </div>
//       </ParallaxProvider>
//       <footer className="bg-green-800 text-white min-h-6 z-50 w-full overflow-hidden mx-auto">
//         <p>{`©KKN UIN SUNAN GUNUNG DJATI ${year}.`}</p>
//       </footer>
//     </>
//   );
// };
