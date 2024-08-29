import { motion } from 'framer-motion';
import { Parallax } from 'react-scroll-parallax';

const Section = ({
  id,
  title,
  children,
  parallaxSpeed = 0,
  className = '',
}) => (
  <section id={id} className={`relative min-h-screen py-20 ${className}`}>
    <Parallax speed={parallaxSpeed}>
      <div className="max-w-4xl mx-auto px-4 flex flex-col items-center justify-center min-h-screen">
        {title && (
          <h2 className="text-4xl font-bold z-30 mb-8 text-center">{title}</h2>
        )}
        {children}
      </div>
    </Parallax>
  </section>
);

export default Section;
