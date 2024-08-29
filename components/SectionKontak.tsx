import React from 'react';
import { ParallaxProvider, Parallax, useParallax } from 'react-scroll-parallax';
import { motion, useScroll, useTransform } from 'framer-motion';
import { Mailbox, MapPin } from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { BsMailbox, BsMapFill } from 'react-icons/bs';

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

const SectionKontak = () => {
  const { scrollYProgress } = useScroll();
  const y = useTransform(scrollYProgress, [0, 1], ['0%', '50%']);

  return (
    <ParallaxProvider>
      <section id="kontak" className="relative min-h-screen overflow-hidden">
        <ParallaxImage
          src="/images/asset2.jpg"
          speed={-10}
          className="opacity-50 z-0"
        />
        <div className="relative z-10 max-w-6xl mx-auto px-4 py-16 text-center">
          <motion.div style={{ y }} className="mb-12">
            <h2 className="text-4xl font-bold mb-4">Kunjungi Kami</h2>
          </motion.div>

          <Parallax speed={-5}>
            <Card className="bg-white/10 backdrop-blur-md rounded-xl overflow-hidden mb-12">
              <CardContent className="p-0">
                <iframe
                  title="google maps"
                  src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3959.9825468028403!2d107.72293321022936!3d-7.011335192960881!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x2e68c17c82394c1b%3A0x5b350d79d054412c!2sKantor%20Desa%20Rancakasumba!5e0!3m2!1sid!2sid!4v1724591778974!5m2!1sid!2sid"
                  width="100%"
                  height="300"
                  style={{ border: 0 }}
                  allowFullScreen
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                ></iframe>
              </CardContent>
            </Card>
          </Parallax>

          <Parallax speed={5}>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-12">
              <div className="flex flex-col items-center">
                <Mailbox size={40} className="mb-4" />
                <p className="text-lg">pjrancakasumba@gmail.com</p>
              </div>
              <div className="flex flex-col items-center">
                <MapPin size={40} className="mb-4" />
                <p className="text-lg">
                  Jalan Babakan Desa No.27 Rancakasumba
                  <br />
                  Kecamatan Solokanjeruk
                  <br />
                  Kabupaten Bandung
                </p>
              </div>
            </div>
          </Parallax>
        </div>
      </section>
    </ParallaxProvider>
  );
};

export default SectionKontak;
