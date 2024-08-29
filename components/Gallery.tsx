import { motion } from 'framer-motion';
import Image from 'next/image';
import { useState } from 'react';
import { Parallax } from 'react-scroll-parallax';

const Gallery = ({ images }) => {
  const [rotateX, setRotateX] = useState({});
  const [rotateY, setRotateY] = useState({});

  const handleMouseMove = (event, index) => {
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

  const handleMouseLeave = (index) => {
    // Smooth transition back to the original position
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
              rotateX: rotateX[index] || 0,
              rotateY: rotateY[index] || 0,
              transition: 'transform 0.3s ease', // Adjusted transition timing
            }}
            onMouseMove={(e) => handleMouseMove(e, index)}
            onMouseLeave={() => handleMouseLeave(index)}
          >
            <Image
              width={50}
              height={50}
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
