import React from 'react';
import Section from './Section';
import TabelPerangkatDesa from './TabelPerangkatDesa';
import Pagination from './Pagination';
import { useState } from 'react';
import { Parallax } from 'react-scroll-parallax';
import { motion } from 'framer-motion';

interface Perangkat {
  jabatan: string;
  nama: string;
  alamat: string;
}

interface SectionPerangkatProps {
  perangkatDesa: Perangkat[];
}

const SectionPerangkat: React.FC<SectionPerangkatProps> = ({
  perangkatDesa,
}) => {
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 8;
  const totalPages = Math.ceil(perangkatDesa.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const currentPageData = perangkatDesa.slice(startIndex, endIndex);

  return (
    <Section id="perangkat" title="Perangkat Desa">
      <div className="relative overflow-hidden">
        {/* Background parallax layer */}
        <Parallax translateY={[-20, 20]} className="absolute inset-0 z-0">
          <div className="bg-blue-200 opacity-50 w-full h-full" />
        </Parallax>

        {/* Content parallax layer */}
        <Parallax translateY={[-15, 15]} className="relative z-10 py-5">
          <motion.div
            className="bg-white bg-opacity-80 rounded-lg shadow-lg p-6 m-6"
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: false }}
          >
            <TabelPerangkatDesa perangkatDesa={currentPageData} />
          </motion.div>
        </Parallax>

        <Parallax translateY={[-10, 10]} className="relative z-20 py-5">
          <motion.div
            className="flex justify-center"
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            viewport={{ once: false }}
          >
            <Pagination
              currentPage={currentPage}
              totalPages={totalPages}
              onPrevious={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
              onNext={() =>
                setCurrentPage((prev) => Math.min(prev + 1, totalPages))
              }
            />
          </motion.div>
        </Parallax>

        {/* Decorative elements with parallax */}
        <Parallax
          translateX={[-30, 30]}
          className="absolute top-10 left-0 z-30"
        >
          <div className="w-12 h-12 sm:w-20 sm:h-20 rounded-full bg-blue-300 opacity-30" />
        </Parallax>
        <Parallax
          translateX={[40, -40]}
          className="absolute bottom-10 right-0 z-30"
        >
          <div className="w-20 h-20 sm:w-32 sm:h-32 rounded-full bg-blue-400 opacity-20" />
        </Parallax>
      </div>
    </Section>
  );
};

export default SectionPerangkat;
