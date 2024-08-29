import { motion } from 'framer-motion';
import { useState } from 'react';
import { Parallax } from 'react-scroll-parallax';

interface GalleryProps {
  images: string[]; // Array of image URLs or paths
}

const Gallery: React.FC<GalleryProps> = ({ images }) => {
  const [rotateX, setRotateX] = useState<{ [key: number]: number }>({});
  const [rotateY, setRotateY] = useState<{ [key: number]: number }>({});

  const handleMouseMove = (event: React.MouseEvent<HTMLDivElement>, index: number) => {
    const card = event.currentTarget;
    const cardRect = card.getBoundingClientRect();
    const mouseX = event.clientX - cardRect.left - cardRect.width / 2;
    const mouseY = event.clientY - cardRect.top - cardRect.height / 2;
    setRotateX((prev) => ({
      ...prev,
      [index]: (mouseY / cardRect.height) * 20,
    }));
    setRotateY((prev) => ({
      ...prev,
      [index]: -(mouseX / cardRect.width) * 20,
    }));
  };

  const handleMouseLeave = (index: number) => {
    setRotateX((prev) => ({ ...prev, [index]: 0 }));
    setRotateY((prev) => ({ ...prev, [index]: 0 }));
  };

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
      {images.map((src, index) => (
        <Parallax key={index} speed={2 + index * 2}>
          <motion.div
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="relative overflow-hidden rounded-lg shadow-lg"
            style={{
              transform: `rotateX(${rotateX[index] || 0}deg) rotateY(${
                rotateY[index] || 0
              }deg)`,
              transition: 'transform 0.3s ease',
            }}
            onMouseMove={(e) => handleMouseMove(e, index)}
            onMouseLeave={() => handleMouseLeave(index)}
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
  );
};

export default Gallery;
