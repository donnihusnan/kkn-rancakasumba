import Section from './Section';
import { useCallback, useEffect, useState, useRef } from 'react';
import { ParallaxProvider, Parallax, useParallax } from 'react-scroll-parallax';
import { motion, useScroll, useTransform } from 'framer-motion';
import { ChevronDown } from 'lucide-react';

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
      style={{ backgroundImage: `url(${src})`, backgroundSize: 'cover' }}
    />
  );
};

const SectionBeranda = () => {
  const [scrollY, setScrollY] = useState(0);

  const ref = useRef(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ['start start', 'end start'],
  });

  const opacity = useTransform(scrollYProgress, [0, 1], [1, 0]);
  const scale = useTransform(scrollYProgress, [0, 1], [1, 0.8]);

  return (
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
      <div className="z-10 max-w-4xl mx-auto px-4 flex flex-col items-center justify-center min-h-screen">
        <motion.h2
          className="text-4xl sm:text-5xl md:text-6xl font-bold mb-4 text-center"
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1 }}
        >
          RANCAKASUMBA
        </motion.h2>
        <motion.h6
          className="text-3xl sm:text-xl md:text-2xl mb-8 text-center"
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.5 }}
        >
          Desa Madani
        </motion.h6>
      </div>
      <motion.div
        className="absolute bottom-10 transform -translate-x-1/2"
        animate={{ y: [0, 10, 0] }}
        transition={{ repeat: Infinity, duration: 1.5 }}
      >
        <ChevronDown size={40} className="text-green-400" />
      </motion.div>
    </motion.section>
  );
};

export default SectionBeranda;
