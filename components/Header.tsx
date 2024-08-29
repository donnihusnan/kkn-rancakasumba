import Image from 'next/image';
import logo from '../public/images/logo.png';

const Header = ({ isHeaderVisible }) => (
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
      />
      <ul className="flex flex-wrap justify-center space-x-4">
        {['Beranda', 'Tentang', 'Perangkat', 'Kontak'].map((item) => (
          <li key={item}>
            <a
              href={`#${item.toLowerCase()}`}
              className="relative overflow-hidden group px-2 py-1 hover:text-green-300 transition-colors duration-300"
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

export default Header;
