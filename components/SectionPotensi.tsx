import Section from './Section';
import { useState, useRef } from 'react';
import { Parallax, useParallax } from 'react-scroll-parallax';
import { motion, useInView } from 'framer-motion';

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

const SectionPotensi: React.FC = () => {
  const [rotateX, setRotateX] = useState<number>(0);
  const [rotateY, setRotateY] = useState<number>(0);
  const [timeoutId, setTimeoutId] = useState<NodeJS.Timeout | null>(null);

  const handleMouseMove = (
    event: React.MouseEvent<HTMLDivElement, MouseEvent>,
    card: HTMLDivElement
  ) => {
    if (timeoutId) clearTimeout(timeoutId);

    const newTimeoutId = setTimeout(() => {
      const cardRect = card.getBoundingClientRect();
      const mouseX = event.clientX - cardRect.left - cardRect.width / 2;
      const mouseY = event.clientY - cardRect.top - cardRect.height / 2;
      setRotateX((mouseY / cardRect.height) * 15); // Reduced rotation intensity
      setRotateY(-(mouseX / cardRect.width) * 15);
    }, 16); // 60fps debounce

    setTimeoutId(newTimeoutId);
  };

  const handleMouseLeave = () => {
    if (timeoutId) clearTimeout(timeoutId);
    setRotateX(0);
    setRotateY(0);
  };

  const containerRef = useRef(null);
  const isInView = useInView(containerRef, { once: true, amount: 0.2 });

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
        delayChildren: 0.3,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.6,
        ease: [0.6, -0.05, 0.01, 0.99],
      },
    },
  };

  return (
    <Section id="potensi" title="Potensi Desa">
      <ParallaxImage
        src="/images/asset3.webp"
        speed={-5} // Reduced parallax speed
        className="opacity-70"
      />
      <motion.div
        ref={containerRef}
        className="relative z-10 max-w-6xl mx-auto px-4 text-center"
        variants={containerVariants}
        initial="hidden"
        animate={isInView ? 'visible' : 'hidden'}
      >
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {['Pertanian', 'Bata Merah', 'Pengrajin'].map((attraction, index) => (
            <Parallax key={index} speed={3 * (index + 1)}>
              {' '}
              {/* Lower parallax speed */}
              <motion.div
                variants={itemVariants}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                style={{
                  perspective: 1000,
                }}
                className="h-full"
              >
                <motion.div
                  className="bg-white p-6 rounded-lg shadow-lg transform transition-all duration-300 hover:shadow-xl h-full"
                  style={{
                    rotateX: rotateX,
                    rotateY: rotateY,
                    transition: 'transform 0.1s ease',
                  }}
                  onMouseMove={(e) => handleMouseMove(e, e.currentTarget)}
                  onMouseLeave={handleMouseLeave}
                >
                  <h3 className="text-xl font-semibold mb-2">{attraction}</h3>
                  <p>
                    {attraction === 'Pertanian' &&
                      `Lahan pertanian yang subur dan luas, menjadikannya pusat produksi berbagai jenis tanaman pangan, pertanian di Rancakasumba berkembang pesat, menghasilkan padi berkualitas tinggi.`}
                    {attraction === 'Bata Merah' &&
                      `Dikenal sebagai salah satu produsen bata merah terbaik di wilayah ini. Bahan bangunan yang dihasilkan oleh para pengrajin lokal terkenal akan kekuatannya dan kualitasnya yang unggul.`}
                    {attraction === 'Pengrajin' &&
                      `Komunitas pengrajin yang berbakat, menghasilkan berbagai produk kerajinan tangan yang unik dan berkualitas, mulai dari anyaman, ukiran kayu, hingga produk seni lainnya.`}
                  </p>
                </motion.div>
              </motion.div>
            </Parallax>
          ))}
        </div>
      </motion.div>
    </Section>
  );
};

export default SectionPotensi;
