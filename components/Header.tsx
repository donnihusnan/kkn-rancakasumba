import React, { useState } from 'react';
import Image from 'next/image';
import logo from '../public/images/logo.webp';
import HamburgerMenu from 'react-hamburger-menu';
import { motion, useScroll, useTransform } from 'framer-motion';

interface HeaderProps {
  isHeaderVisible: boolean;
}

const Header: React.FC<HeaderProps> = ({ isHeaderVisible }) => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleMenu = () => setIsOpen(!isOpen);

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 bg-gradient-to-r from-green-600 to-green-800 text-white p-4 transition-transform duration-300 ${
        isHeaderVisible ? 'translate-y-0' : '-translate-y-full'
      }`}
    >
      <nav className="flex flex-col md:flex-row justify-between items-center max-w-6xl mx-auto">
        <Image
          src={logo}
          alt="Logo Rancakasumba"
          width={120}
          height={50}
          priority
          className="w-24 h-auto md:w-32"
        />
        <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
          <div className="md:hidden pt-2">
            <HamburgerMenu
              isOpen={isOpen}
              menuClicked={toggleMenu}
              width={24}
              height={18}
              strokeWidth={2}
              rotate={0}
              color="white"
              borderRadius={0}
              animationDuration={0.5}
            />
          </div>
        </motion.div>

        <ul
          className={`${
            isOpen ? 'block' : 'hidden'
          } md:flex flex-col md:flex-row md:space-x-4 mt-4 md:mt-0 space-y-4 md:space-y-0`}
        >
          {['Beranda', 'Tentang', 'Perangkat', 'Kontak'].map((item) => (
            <li key={item}>
              <a
                href={`#${item.toLowerCase()}`}
                className="relative overflow-hidden group px-2 py-1 text-sm md:text-base hover:text-green-300 transition-colors duration-300"
                onClick={() => setIsOpen(false)}
              >
                {item}
                <span className="absolute left-0 bottom-0 w-full h-0.5 bg-green-300 transform scale-x-0 group-hover:scale-x-100 transition-transform duration-300 origin-left"></span>
              </a>
            </li>
          ))}
        </ul>
      </nav>
    </header>
  );
};

export default Header;
