import React, { useState, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Parallax, useParallax } from 'react-scroll-parallax';

interface GalleryProps {
  images: string[]; // Array of image URLs or paths
}

const Gallery: React.FC<GalleryProps> = ({ images }) => {
  const [rotateX, setRotateX] = useState<{ [key: number]: number }>({});
  const [rotateY, setRotateY] = useState<{ [key: number]: number }>({});
  const [selectedImage, setSelectedImage] = useState<string | null>(null);
  const galleryRef = useRef(null);
  const { ref } = useParallax<HTMLDivElement>({ speed: 10 });

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

  const closeLightbox = () => {
    setSelectedImage(null);
  };

  return (
    <>
      <div ref={ref} className="relative overflow-hidden p-8">
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4" ref={galleryRef}>
          {/* Background decorative elements */}
          <div className="absolute inset-0 z-0">
            <Parallax translateY={[-20, 20]}>
              <div className="w-64 h-64 rounded-full bg-blue-200 opacity-30 absolute -top-32 -left-32" />
            </Parallax>
            <Parallax translateY={[20, -20]}>
              <div className="w-96 h-96 rounded-full bg-green-200 opacity-30 absolute -bottom-48 -right-48" />
            </Parallax>
          </div>

          {images.map((src, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              viewport={{ once: true, margin: "-100px" }}
              whileHover={{ scale: 1.05, zIndex: 10 }}
              whileTap={{ scale: 0.95 }}
              className="relative overflow-hidden rounded-lg shadow-lg cursor-pointer"
              style={{
                transform: `perspective(1000px) rotateX(${rotateX[index] || 0}deg) rotateY(${
                  rotateY[index] || 0
                }deg)`,
                transition: 'transform 0.3s ease',
              }}
              onMouseMove={(e) => handleMouseMove(e, index)}
              onMouseLeave={() => handleMouseLeave(index)}
              onClick={() => setSelectedImage(src)}
            >
              <img
                src={src}
                alt={`Gallery image ${index + 1}`}
                className="w-full h-64 object-cover"
              />
              <motion.div
                className="absolute inset-0 bg-black bg-opacity-50 flex items-center justify-center opacity-0 transition-opacity duration-300"
                whileHover={{ opacity: 1 }}
              >
                <p className="text-white text-lg font-semibold">View Full Size</p>
              </motion.div>
            </motion.div>
          ))}
        </div>
      </div>

      {/* Responsive Lightbox */}
      <AnimatePresence>
        {selectedImage && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black bg-opacity-90 z-50 flex items-center justify-center p-4"
            onClick={closeLightbox} // Close lightbox on click anywhere
          >
            <motion.div
              className="relative max-w-full max-h-full w-full h-full flex items-center justify-center"
              initial={{ scale: 0.8 }}
              animate={{ scale: 1 }}
              exit={{ scale: 0.8 }}
              onClick={closeLightbox} // Ensure lightbox closes even if the image is clicked
            >
              <img
                src={selectedImage}
                alt="Full size image"
                className="max-w-full max-h-full w-auto h-auto object-contain"
              />
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

export default Gallery;
