import React from 'react';
import Section from './Section';
import { Parallax } from 'react-scroll-parallax';
import { motion } from 'framer-motion';

const SectionTentang = () => (
  <Section id="tentang" title="Tentang Desa">
    <div className="relative overflow-hidden">
      {/* Background parallax layer */}
      <Parallax translateY={[-20, 20]} className="absolute inset-0 z-0">
        <div className="bg-green-200 opacity-50 w-full h-full" />
      </Parallax>

      {/* Content parallax layers */}
      <Parallax translateY={[-15, 15]} className="relative z-10">
        <motion.p
          className="text-base sm:text-lg m-6 px-4 sm:px-8"
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          Desa ini dilintasi oleh aliran sungai citarum dan sebagian besar
          wilayahnya adalah lahan pertanian, Selain itu, sektor perdagangan
          lokal juga berperan penting dalam perekonomian desa, dengan berbagai
          usaha kecil dan menengah yang menggerakkan ekonomi masyarakat.
          Infrastruktur di Desa Rancakasumba mencakup akses jalan utama yang
          menghubungkan desa dengan pusat kecamatan dan kota-kota sekitarnya.
        </motion.p>
      </Parallax>

      <Parallax translateY={[-10, 10]} className="relative z-20">
        <motion.p
          className="text-base sm:text-lg m-6 px-4 sm:px-8"
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
        >
          Kehidupan sosial di desa ini dipenuhi dengan tradisi dan upacara adat
          yang mencerminkan kekayaan budaya setempat, diiringi dengan adanya
          berbagai organisasi masyarakat yang aktif, seperti kelompok tani dan
          PKK. Potensi alam dan budaya juga menjadi perhatian dalam upaya
          pengembangan desa, dengan harapan untuk meningkatkan kualitas hidup
          dan memberikan dampak positif bagi perekonomian lokal.
        </motion.p>
      </Parallax>

      {/* Decorative elements with parallax */}
      <Parallax translateX={[-30, 30]} className="absolute top-10 left-0 z-30">
        <div className="w-12 h-12 sm:w-20 sm:h-20 rounded-full bg-green-300 opacity-30" />
      </Parallax>
      <Parallax
        translateX={[40, -40]}
        className="absolute bottom-10 right-0 z-30"
      >
        <div className="w-20 h-20 sm:w-32 sm:h-32 rounded-full bg-green-400 opacity-20" />
      </Parallax>
    </div>
  </Section>
);

export default SectionTentang;
