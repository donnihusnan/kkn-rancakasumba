import Section from './Section';
import { useRef } from 'react';
import { Parallax, useParallax } from 'react-scroll-parallax';
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
      style={{
        backgroundImage: `url(${src})`,
        backgroundSize: 'cover',
        willChange: 'transform',
      }}
    />
  );
};

const SectionBeranda = () => {
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ['start start', 'end start'],
  });

  const opacity = useTransform(scrollYProgress, [0, 1], [1, 0.9]);
  const scale = useTransform(scrollYProgress, [0, 1], [1, 0.95]);

  return (
    <motion.section
      ref={ref}
      style={{ opacity, scale, willChange: 'opacity, transform' }}
      id="beranda"
      className="relative min-h-screen flex items-center justify-center overflow-hidden"
    >
      <ParallaxImage
        src="/images/asset.webp"
        speed={-10} // Reduced parallax speed for better performance
        className="opacity-80"
      />
      <div className="z-10 mt-[-5rem] max-w-4xl mx-auto px-4 flex flex-col items-center justify-center min-h-screen">
        <motion.h1
          className="text-4xl sm:text-5xl md:text-6xl font-bold mb-4 text-center"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1 }}
        >
          RANCAKASUMBA
        </motion.h1>
        <motion.h3
          className="text-3xl sm:text-xl md:text-2xl mb-8 text-center"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.5 }}
        >
          Desa Madani
        </motion.h3>
      </div>
      <motion.div
        className="absolute bottom-10 transform -translate-x-1/2"
        animate={{ y: [0, 10, 0] }}
        transition={{ repeat: Infinity, duration: 1.5 }}
      >
        <ChevronDown color="#166534" size={40} />
      </motion.div>
    </motion.section>
  );
};

export default SectionBeranda;
